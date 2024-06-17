<!-- src/components/PostDetail.vue -->
<template>
    <div>
      <h1>{{ post.post_title }}</h1>
      <p>{{ post.post_content }}</p>
      <img :src="`../../server/public/images/${post.post_image}`" alt="Post Image">
      <router-link :to="`/update-post/${post.post_id}`">Edit Post</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostDetail',
    data() {
      return {
        post: {}
      };
    },
    created() {
      this.fetchPost();
    },
    methods: {
      fetchPost() {
        const id = this.$route.params.id;
        axios.get(`http://localhost:3000/api/posts/${id}`)
          .then(response => {
            this.post = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>

<style>
  img{
    width:200px;
  }
</style>
  