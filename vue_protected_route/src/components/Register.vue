<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      register() {
        axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
        .catch(() => {
          alert('Error registering');
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  