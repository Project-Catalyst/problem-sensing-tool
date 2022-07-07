import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import SensingForm from '@/views/SensingForm.vue'
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
    component: SensingForm
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
