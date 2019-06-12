import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import WordsPage from '../words/WordsPage'
import WordsBagsPage from '../words/WordsBagsPage'
import AddWordPage from '../words/AddWordPage'
import AddWordsBagPage from '../words/AddWordsBagPage'
import WordsBagManage from '../words/WordsBagManage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/wordsBags', component: WordsBagsPage },
    { path: '/wordsBags/add', component: AddWordsBagPage },
    { path: '/words/:wordsBagId', component: WordsPage },
    {path: '/wordsBags/:wordsBagId/manage', component: WordsBagManage},

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log(to);

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})