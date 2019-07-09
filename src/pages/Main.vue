<template>
  <div class="main">
    <h1>Main page</h1>
    <router-link
      :to="{ name: 'api-weather' }"
    >
      <button>
        Go Weather
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Main',
  head: {
    title: {
      inner: 'Main'
    },
    // Meta tags
    meta: [
      { name: 'keywords', content: 'Main' }
    ]
  }
}
</script>

<style lang="scss" scoped>
  .main {
    text-align: center;
    button {
      border: 1px solid #ccc;
    }
  }
</style>
