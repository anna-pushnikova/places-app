import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import auth from '@/services/auth.js'

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
    name: 'home',
    path: '/',
    component:() => import('@/views/Home.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    name: 'storage',
    path: '/storage',
    component:() => import('@/views/Storage.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    name: 'countries',
    path: '/countries',
    component:() => import('@/views/Countries.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component:() => import('@/views/Profile.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    name: 'dictionary',
    path: '/dictionary',
    component:() => import('@/views/Dictionary.vue'),
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
  let publicPages = ['/login']
  let authRequired = !publicPages.includes(to.path)
  let authenticated = auth.isAuthenticated()
  if (authRequired && !authenticated) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
