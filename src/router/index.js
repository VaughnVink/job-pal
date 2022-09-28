import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'jobs',
    component: () => import('../views/JobsView.vue')
  },
  {
    path: '/jobs/:id',
    name: 'job',
    component: () => import('../views/JobView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
