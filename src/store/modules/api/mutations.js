import * as t from './types'

export default {
  [t.GET_WEATHER_PENDING]: (state) => {
    state.isAPILoading = true
    state.confirmPasswordStatus = 0
  },
  [t.GET_WEATHER_SUCCESS]: (state, { result }) => {
    state.isAPILoading = false
    state.weather = result
    console.log(state.weather)
  },
  [t.GET_WEATHER_FAIL]: (state) => {
    state.isAPILoading = false
  }
}
