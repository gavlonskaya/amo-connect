import axios from "axios";

class AmoCRMService {
  constructor() {}

  async authorize() {
    try {
      const authResponse = await axios.post(
        "https://amoconnecttest.amocrm.ru/oauth2/access_token",
        {
          client_id: "f5fbe8ac-49f4-4323-bbab-2d14031d3c79",
          client_secret:
            "5hibEJ0jQ1K9aM3YI1GXt74retvgR0repPzlepNeZr3gyDhTeCgpk3gnC8PEvTB1",
          grant_type: "authorization_code",
          code: "def5020004f8dc6a40c3c08a169dbcfbefe8dd2b2da63c84911085cd18fce82cd1bfac21a0bf51df89d1affa1aa358684cb4446d21cd11e75181091dc7597f6dd2b20784b49a251c0888cabd9810c47095f827ed58a11199816a2194fe0865b84a653c9c1b200e28adb9d57aa544d0e998a59d7717bea74225f0ad4a01b1883e4bccb54b8fa67bdae7306214fd39af5ef84bb35602ba1ae2aa2a7f9128d1c333e5ed6e5956bc88305c7e2690c837d725c023793a5eee481f81a617c918e032d420d24cc6aec31201d0d55e035de7c01d0879de266602cbd6860582ff59a1a684fba2a78014601b8d39647856a8bf24649c1f4e5d6527ea754ec252d73710c2a4f678b561c4e17bf082a49d32a44745f81cc2e1fc1ae60835ce4d25b32f43d6e49cccfd06e39b16456cf5aa70cebc260df56c49aef5bf0d58b7306965c7894a88a217cef32057e38d357bcaea697a9727dd1cfa79e616b61b87b58ccbbe2eccec3817fefaa6a6e04fba81a230655e5e79458e01fd4f936b621880d96c5d22c336a8ee010a546822125b4fc8175fafd4e8098fd887b5f0154ad3c1c4d2a127d2f80066d91a90c66a050346640177e8230537a21b5d44c0294641668ff482e5480266ea55e4ffa424971b376e2eb2320e6a84fb58035c299bb695a88d2c86c0bbbc8d22",
          redirect_uri: "https://google.com",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      return authResponse.data.access_token;
    } catch (error) {
      console.error("Ошибка при авторизации в AmoCRM:", error);
      throw error;
    }
  }

  async createLead(accessToken, formData) {
    try {
      const response = await axios.post(
        "https://amoconnecttest.amocrm.ru/api/v4/leads/complex",
        {
          name: `Сделка для ${formData.name}`,
          price: formData.price,
          _embedded: {
            contacts: [
              {
                first_name: formData.name,
                custom_fields_values: [
                  {
                    field_code: "EMAIL",
                    values: [{ enum_code: "WORK", value: formData.email }],
                  },
                  {
                    field_code: "PHONE",
                    values: [{ enum_code: "WORK", value: formData.phone }],
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Заявка успешно отправлена в AmoCRM:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке заявки в AmoCRM:", error);
      throw error;
    }
  }
}

export default new AmoCRMService();
