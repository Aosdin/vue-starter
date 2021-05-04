<template>
  <div
    class="full-base"
    :class="{'active': isNavigation}"
  >
    <header-area />
    <navigation />
    <router-view />
    <footer-area />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import HeaderArea from '../components/common/Header.vue'
import Navigation from '../components/common/Navigation.vue'
import FooterArea from '../components/common/Footer.vue'

export default {
  name: 'FullBase',
  components: {
    HeaderArea,
    Navigation,
    FooterArea
  },
  computed: {
    ...mapState('common', {
      isNavigation: state => state.isNavigation
    })
  }
}
</script>
