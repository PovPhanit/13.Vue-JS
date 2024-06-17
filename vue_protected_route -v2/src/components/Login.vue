<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          this.$router.push({ name: 'Dashboard' });
        })
        .catch(() => {
          alert('Invalid credentials');
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  