import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/views/ArticleList.vue';
import ArticleForm from '@/views/ArticleForm.vue';

const routes = [
  { path: '/articles', name: 'ArticleList', component: ArticleList },
  { path: '/articles/new', name: 'NewArticle', component: ArticleForm },
  { path: '/articles/edit/:id', name: 'EditArticle', component: ArticleForm },
  { path: '/', redirect: '/articles' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
