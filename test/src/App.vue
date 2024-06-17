<template>
  <Navigate />
</template>




<script>
import Navigate from './Navigate.vue'

export default {
  components: {
    Navigate
  }
}
</script>

<style>
  a {
    display: inline-block;
    background-color: black;
    border: solid 1px black;
    color: white;
    padding: 5px;
    margin: 10px;
  }
  a:hover,
  a.router-link-active {
    background-color: rgb(110, 79, 13);
  }
  div {
    border: dashed black 1px;
    padding: 20px;
    margin: 10px;
    display: inline-block;
  }
</style> 