import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddMeal from '@/views/AddMeal.vue'
import LoginView from '@/views/LoginView.vue'
import CreateAccount from '@/views/CreateAccount.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: CreateAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
