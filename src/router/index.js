import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Sensing from '@/views/Sensing.vue'
import SensedEdit from '@/views/SensedEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sensing',
    name: 'sensing',
    component: Sensing
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: SensedEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
