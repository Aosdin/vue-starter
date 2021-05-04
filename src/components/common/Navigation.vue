<template>
  <nav>
    <a
      href="javascript:;"
      @click="hideNavi"
    >메뉴닫기</a>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  methods: {
    ...mapActions('common', {
      setNavigation: 'setNavigation'
    }),
    hideNavi () {
      this.setNavigation(false)
    }
  }
}
</script>
