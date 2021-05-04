import Vue from 'vue'
import VueRouter from 'vue-router'

import FullBase from '@/container/FullBase'
// modules
import api from './api'

// page
import Main from '@/pages/Main'

/**
 * Vue router
 * https://router.vuejs.org
 * Must call `Vue.use` before creating new instance
 */
Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: FullBase,
      children: [
        {
          path: '/',
          name: 'main',
          component: Main
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // TODO: Checking authentications
  next()
})
router.afterEach((to, from, next) => {
  // TODO: Checking authentications
})

export default router
