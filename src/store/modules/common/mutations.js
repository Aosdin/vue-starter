import * as t from './types'

export default {
  [t.SET_NAVIGATION]: (state, payload) => {
    console.log(payload)
    state.isNavigation = payload
  }
}
