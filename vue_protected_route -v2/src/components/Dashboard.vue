<template>
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push({ name: 'Home' });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  