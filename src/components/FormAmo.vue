<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="name">Имя:</label>
      <input v-model="formData.name" type="text" id="name" required>

      <label for="email">Email:</label>
      <input v-model="formData.email" type="email" id="email" required>

      <label for="phone">Телефон:</label>
      <input v-model="formData.phone" type="tel" id="phone" required>

      <label for="price">Цена:</label>
      <input v-model="formData.price" type="number" id="price" required>

      <button type="submit">Отправить заявку</button>
    </form>
  </div>
</template>
  
<script>
import AmoCRMService from '@/../public/AmoCRMService';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        price: 0,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const accessToken = await AmoCRMService.authorize();
        await AmoCRMService.createLead(accessToken, this.formData);
      } catch (error) {
        console.error('Ошибка при отправке заявки в AmoCRM:', error);
      }
    },
  },
};
</script>
  
<style scoped></style>
