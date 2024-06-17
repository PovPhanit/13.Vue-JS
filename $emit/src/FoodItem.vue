<template>
    <div>
        <h2>
            {{ foodName }}
            <img src="/img_quality.svg" v-show="isFavorite">
        </h2>
        <p>{{ foodDesc }}</p>
        <button @click="toggleFavorite">Favorite</button>
    </div>
</template>

<script>
export default {
    props: ['foodName','foodDesc','isFavorite'],
    methods: {
        //when click it it will render to function toggle-favourith and paramet(foodName) then back to emit
        toggleFavorite() {
            console.log("one");
            this.$emit('toggle-favorite', this.foodName);
        }
    }
};
</script>

<style>
    img {
        height: 1.5em;
        float: right;
    }
</style> 