<!-- src/components/PostList.vue -->
<template>
    <div>
      <h1>Posts</h1>
      <router-link to="/add-post">Add Post</router-link>
      <ul>
        <li v-for="post in posts" :key="post.post_id">
          <router-link :to="`/posts/${post.post_id}`">{{ post.post_title }}</router-link>
          <button @click="deletePost(post.post_id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostList',
    data() {
      return {
        posts: []
      };
    },
    created() {
      this.fetchPosts();
    },
    methods: {
      fetchPosts() {
        axios.get('http://localhost:3000/api/posts')
          .then(response => {
            this.posts = response.data.sqlData;
          })
          .catch(error => {
            console.error(error);
          });
      },
      deletePost(id) {
        axios.delete(`http://localhost:3000/api/posts/${id}`)
          .then(() => {
            this.fetchPosts();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  