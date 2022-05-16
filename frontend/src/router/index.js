import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddMeal from '@/views/AddMeal.vue'
import LoginView from '@/views/LoginView.vue'
import CreateAccount from '@/views/CreateAccount.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add-meal',
    name: 'addMeal',
    component: AddMeal,
    beforeEnter: (_to, _from, next) => {
      const user = store.getters['currentUser']
      if (user) next()
      else next({ path: '/login' })
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (_to, _from, next) => {
      const user = store.getters['currentUser']
      if (user) next({ path: '/' })
      else next()
    }
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: CreateAccount,
    beforeEnter: (_to, _from, next) => {
      const user = store.getters['currentUser']
      if (user) next({ path: '/' })
      else next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
