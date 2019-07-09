<template>
  <div>
    <h1>Weather</h1>
    <weather-info />
  </div>
</template>

<script>
import WeatherInfo from '@/components/api/WeatherInfo.vue'
export default {
  name: 'Main',
  head: {
    title: {
      inner: 'Weather'
    },
    // Meta tags
    meta: [
      { name: 'keywords', content: 'Weather' }
    ]
  },
  components: {
    WeatherInfo
  }
}
</script>
