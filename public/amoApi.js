const axios = require("axios");

class AmoCRM {
  constructor(subdomain, accessToken) {
    this.subdomain = subdomain;
    this.accessToken = accessToken;
    this.apiBaseUrl = `https://${subdomain}.amocrm.ru/api/v4`;
  }

  async createContact(name, email, phone) {
    const response = await axios.post(
      `${this.apiBaseUrl}/contacts`,
      {
        name,
        custom_fields_values: [
          { field_id: "email", values: [{ value: email, enum_code: "WORK" }] },
          { field_id: "phone", values: [{ value: phone, enum_code: "WORK" }] },
        ],
      },
      { headers: this.getHeaders() }
    );

    return response.data._embedded.contacts[0];
  }

  async createDeal(contactId, price) {
    const response = await axios.post(
      `${this.apiBaseUrl}/leads`,
      {
        name: "Deal",
        contacts_id: [contactId],
        price,
      },
      { headers: this.getHeaders() }
    );

    return response.data._embedded.leads[0];
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }
}

module.exports = AmoCRM;
