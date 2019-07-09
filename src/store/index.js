import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import api from './modules/api'
/**
 * Vuex
 * https://vuex.vuejs.org
 * Must call `Vue.use` before creating new instance
 */
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api
  }
})
