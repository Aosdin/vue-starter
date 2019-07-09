import * as t from './types'
import { getWeatherAPI } from './api'

export default {
  getWeather ({ commit }, key) {
    commit(t.GET_WEATHER_PENDING)
    return Promise.resolve()
      .then(() => {
        return getWeatherAPI(key)
      })
      .then((response) => {
        const result = response.data || {}
        // const { data } = result || {}
        // const status = response.status || []
        commit(t.GET_WEATHER_SUCCESS, { result })
        return response
      })
      .catch((err) => {
        commit(t.GET_WEATHER_FAIL)
        throw err
      })
  }
}
