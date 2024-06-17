<!-- src/components/UpdatePost.vue -->
<template>
    <div>
      <h1>Update Post</h1>
      <form @submit.prevent="updatePost">
        <input v-model="title" placeholder="Title" required />
        <textarea v-model="content" placeholder="Content" required></textarea>
        <button type="submit">Update Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UpdatePost',
    data() {
      return {
        title: '',
        content: ''
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
            this.title = response.data.post_title;
            this.content = response.data.post_content;
          })
          .catch(error => {
            console.error(error);
          });
      },
      updatePost() {
        const id = this.$route.params.id;
        axios.put(`http://localhost:3000/api/posts/${id}`, {
          title: this.title,
          content: this.content
        })
          .then(() => {
            this.$router.push(`/posts/${id}`);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  