<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/posts">Posts</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // name: 'App'
};
</script>

<style>
nav {
  margin-bottom: 1em;
}
nav a {
  margin-right: 2em;
}
</style>


