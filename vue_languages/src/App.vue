

<template>
  <select name="lang"  v-model="lang" >
    <option value="en">English</option>
    <option value="kh">Khmer</option>
  </select>
  <h1>{{ translate("welcomeMsg") }}</h1>
  <h1>{{ translate("mainPage") }}</h1>
</template>

<script>
  import en from './languages/english/translation';
  import kh from './languages/khmer/translation'
  export default {
     mixins:[en,kh],
     data(){
      return{
        lang:"en",
      }
     },
     methods:{
      translate(prop){
        return this[this.lang][prop];
      }
     }
  };
</script>
<style>

</style>
