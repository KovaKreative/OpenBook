import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Stories from '@/components/Stories';
import New from '@/components/New';
import Edit from '@/components/Edit';
import Read from '@/components/Read';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/stories',
      name: 'Stories',
      component: Stories
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/read/:id',
      name: 'Read',
      component: Read
    }
  ]
});
