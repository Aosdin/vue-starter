import axios from 'axios'

const axiosInstance = function () {
  return axios.create({
    baseURL: `http://api.openweathermap.org`,
    timeout: 50000
    // withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // }
  })
}
export function getWeatherAPI (key) {
  return new Promise((resolve, reject) => {
    return axiosInstance().get(`/data/2.5/weather?q=Seoul&appid=${key}`)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}
