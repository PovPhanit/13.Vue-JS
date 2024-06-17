<template>
  <div id="app">

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <button  @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isAuthenticated:!!localStorage.getItem('token'),
    };
  },
  methods: {
    isAuthenticateds() {
      this.isAuthenticated=false;
    },
    logout() {
      this.isAuthenticateds();
      localStorage.removeItem('token');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  cursor: pointer;
}
</style>
