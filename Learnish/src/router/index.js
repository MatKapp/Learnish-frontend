import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import LoginPage from '@/components/login/LoginPage';
import RegisterPage from '@/components/register/RegisterPage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log('test');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});

export default router;
