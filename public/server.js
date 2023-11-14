const express = require("express");
const axios = require("axios");
const { URLSearchParams } = require("url");

const app = express();
app.use(express.json());

const amoConfig = {
  clientId: "f5fbe8ac-49f4-4323-bbab-2d14031d3c79",
  clientSecret:
    "5hibEJ0jQ1K9aM3YI1GXt74retvgR0repPzlepNeZr3gyDhTeCgpk3gnC8PEvTB1",
  redirectUri: "http://localhost:3000/auth/callback",
};

app.get("/auth", (req, res) => {
  const params = new URLSearchParams({
    client_id: amoConfig.clientId,
    state: "ваш-state",
    redirect_uri: amoConfig.redirectUri,
    response_type: "code",
  });

  const authUrl = `https://www.amocrm.ru/oauth?${params.toString()}`;
  res.redirect(authUrl);
});

app.get("/auth/callback", async (req, res) => {
  const { code, state } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://www.amocrm.ru/oauth2/access_token",
      {
        client_id: amoConfig.clientId,
        client_secret: amoConfig.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: amoConfig.redirectUri,
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken);

    res.send("Аутентификация успешна");
  } catch (error) {
    console.error("Ошибка при получении токена доступа:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
