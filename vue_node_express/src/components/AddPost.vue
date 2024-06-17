<!-- src/components/AddPost.vue -->
<template>
    <div>
      <h1>Add Post</h1>
      <form @submit.prevent="addPost">
        <input v-model="title" placeholder="Title" required />
        <textarea v-model="content" placeholder="Content" required></textarea>
        <input type="file" @change="onFileChange" required />
        <button type="submit">Add Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddPost',
    data() {
      return {
        title: '',
        content: '',
        image: null
      };
    },
    methods: {
      onFileChange(e) {
        this.image = e.target.files[0];
      },
      addPost() {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('image', this.image);
  
        axios.post('http://localhost:3000/api/posts', formData)
          .then(() => {
            this.$router.push('/posts');
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  