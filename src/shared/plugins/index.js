import * as filters from './filters'

const plugins = {
  install (Vue, options = {}) {
    // filters
    Object.values({
      ...filters
    }).forEach((filter) => {
      const { name, fn } = filter
      Vue.filter(name, fn)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugins)
}

export default plugins
