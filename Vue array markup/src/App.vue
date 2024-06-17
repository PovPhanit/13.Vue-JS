<template>
  <h1>Food</h1>
  <p>Each food item created with v-for is now identified uniquely with the key attribute, and the problem is fixed. The favorite image now stays with the 'Fish' element, and is not transferred to 'Cake'.</p>
  <button @click="removeItem">Remove Item</button>
  <div id="wrapper">
    <food-item
      v-for="x in foods"
      :key="x.name"
      :food-name="x.name"
      :food-desc="x.desc"
      :is-favorite="x.favorite"/>
  </div> 
</template>

<script>
export default {
  data() { 
    return {
      foods: [
        { name: 'Apples', desc: 'Apples are a type of fruit that grow on trees.', favorite: true},
        { name: 'Pizza', desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.', favorite: false},
        { name: 'Rice', desc: 'Rice is a type of grain that people like to eat.', favorite: false},
        { name: 'Fish', desc: 'Fish is an animal that lives in water.', favorite: true},
        { name: 'Cake', desc: 'Cake is something sweet that tastes good.', favorite: false}
      ]
    };
  },
  methods: {
    removeItem() {
      this.foods.splice(1,1);
    }
  }
}
</script>

<style>
  #wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  #wrapper > div {
    border: dashed black 1px;
    flex-basis: 120px;
    margin: 10px;
    padding: 10px;
    background-color: lightgreen;
  }
</style>          