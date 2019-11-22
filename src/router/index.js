import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Dashboard from '@/components/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
