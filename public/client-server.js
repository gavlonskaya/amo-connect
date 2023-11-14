const express = require("express");
const app = express();
app.use(express.json());

app.post("/notify-client", (req, res) => {
  const { message, contact, deal } = req.body;
  console.log(message);
  console.log("Contact:", contact);
  console.log("Deal:", deal);
  res.json({ success: true, message: "Notification sent to client" });
});

const CLIENT_PORT = process.env.CLIENT_PORT || 8080;
app.listen(CLIENT_PORT, () => {
  console.log(`Client server is running on port ${CLIENT_PORT}`);
});
