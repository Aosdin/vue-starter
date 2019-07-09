<template>
  <div>
    <h3>Weather Info</h3>
    <p>API KEY :
      <input
        v-model="iptAPIKey"
        type="text"
      >
    </p>
    {{ weaher }}
    <p>Wind Speed : {{ wind.speed }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WeatherInfo',
  data () {
    return {
      iptAPIKey: '1e5e3d5c9c01d394508a72c8fa1ed9de'
    }
  },
  computed: {
    ...mapState('api', {
      weaher: state => state.weather
    }),
    wind () {
      return this.weaher ? this.weaher.wind : {}
    }
  },
  methods: {
    ...mapActions('api', {
      getWeatherAction: 'getWeather'
    })
  },
  mounted () {
    this.getWeatherAction(this.iptAPIKey)
      .catch(err => {
        return alert(`Something wrong...! ${err.message}`)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
