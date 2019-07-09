import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  isAPILoading: false,
  weather: null
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
