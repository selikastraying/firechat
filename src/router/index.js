import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next('/')
  } else {
    next()
  }
})

export default router
