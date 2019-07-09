<template>
  <div class="full-base">
    <header-area />
    <router-view />
    <footer-area />
  </div>
</template>

<script>
import HeaderArea from '../components/common/Header.vue'
import FooterArea from '../components/common/Footer.vue'

export default {
  name: 'FullBase',
  components: {
    HeaderArea,
    FooterArea
  }
}
</script>

<style scoped>
  .full-base{
    text-align: center;
  }
</style>
