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
        const response = await fetch('https://amoconnecttest.amocrm.ru/api/v4/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (data.success) {
          console.log('Данные успешно отправлены в AmoCRM:', data);
        } else {
          console.error('Ошибка при отправке данных в AmoCRM:', data.error);
        }
      } catch (error) {
        console.error('Ошибка при отправке данных в AmoCRM:', error.message);
      }
    },
  },
};
</script>
  
<style scoped></style>
  