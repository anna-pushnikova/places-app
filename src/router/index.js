import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import auth from '@/requests/auth.js'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      layout: 'auth'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      layout: 'auth'
    }
  },
  {
    name: 'home',
    path: '/',
    component:() => import('@/views/Home.vue'),
    meta: {
      layout: 'main'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authenticated = auth.isAuthenticated()
  if (authRequired && !authenticated) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
