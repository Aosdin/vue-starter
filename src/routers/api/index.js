// base
import FullBase from '@/container/FullBase'

// page
import Weather from '@/pages/api/Weather'

export default {
  path: '/api',
  component: FullBase,
  redirect: '/api/weather',
  children: [
    {
      path: '/api/weather',
      name: 'api-weather',
      component: Weather
    }
  ]
}
