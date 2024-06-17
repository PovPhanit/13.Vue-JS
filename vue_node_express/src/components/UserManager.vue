<!-- src/components/UserManager.vue -->
<template>
    <div>
      <h1>User Manager</h1>
      <form @submit.prevent="insertUser">
        <input v-model="name" placeholder="Name" />
        <input v-model="email" placeholder="Email" />
        <button type="submit">Add User</button>
      </form>
  
      <form @submit.prevent="updateUser">
        <input v-model="id" placeholder="User ID" />
        <input v-model="name" placeholder="New Name" />
        <input v-model="email" placeholder="New Email" />
        <button type="submit">Update User</button>
      </form>
  
      <form @submit.prevent="deleteUser">
        <input v-model="id" placeholder="User ID" />
        <button type="submit">Delete User</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        id: '',
        name: '',
        email: ''
      };
    },
    methods: {
      async insertUser() {
        try {
          await axios.post('http://localhost:3000/insert', {
            name: this.name,
            email: this.email
          });
          alert('User added successfully');
        } catch (error) {
          console.error(error);
        }
      },
      async updateUser() {
        try {
          await axios.put(`http://localhost:3000/update/${this.id}`, {
            name: this.name,
            email: this.email
          });
          alert('User updated successfully');
        } catch (error) {
          console.error(error);
        }
      },
      async deleteUser() {
        try {
          await axios.delete(`http://localhost:3000/delete/${this.id}`);
          alert('User deleted successfully');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  