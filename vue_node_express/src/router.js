// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import PostList from './components/PostList.vue';
import PostDetail from './components/PostDetail.vue';
import AddPost from './components/AddPost.vue';
import UpdatePost from './components/UpdatePost.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/posts', name: 'PostList', component: PostList },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetail },
  { path: '/add-post', name: 'AddPost', component: AddPost },
  { path: '/update-post/:id', name: 'UpdatePost', component: UpdatePost }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
