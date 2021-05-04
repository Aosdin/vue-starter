import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import common from './modules/common'
/**
 * Vuex
 * https://vuex.vuejs.org
 * Must call `Vue.use` before creating new instance
 */
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  }
})
