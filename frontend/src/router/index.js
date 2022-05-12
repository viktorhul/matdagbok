import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import AddMeal from '../views/AddMeal.vue'
import CreateAccount from '../views/CreateAccount.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/add-meal/:id?',
    component: AddMeal
  },
  {
    path: '/create-account',
    component: CreateAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
