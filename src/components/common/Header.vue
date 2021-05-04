<template>
  <header>
    <a
      href="javascript:;"
      style="float: left;"
      @click="showNavi"
    >메뉴열기</a>
    <h1 style="margin: 0;">header</h1>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState('common', {
      isNavigation: state => state.isNavigation
    })
  },
  methods: {
    ...mapActions('common', {
      setNavigation: 'setNavigation'
    }),
    showNavi () {
      this.setNavigation(!this.isNavigation)
    }
  }
}
</script>
