import * as t from './types'

export default {
  [t.GET_WEATHER_PENDING]: (state) => {
    state.isAPILoading = true
  },
  [t.GET_WEATHER_SUCCESS]: (state, { result }) => {
    state.isAPILoading = false
    state.weather = result
  },
  [t.GET_WEATHER_FAIL]: (state) => {
    state.isAPILoading = false
  }
}
