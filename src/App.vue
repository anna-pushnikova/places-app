<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import authLayout from './layout/authLayout'
import mainLayout from './layout/mainLayout'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },
  components: {
    authLayout,
    mainLayout
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap-grid.scss";
@import '@/assets/main.scss';

@import "~bootstrap/scss/buttons.scss";
@import "~bootstrap/scss/forms.scss";
@import "~bootstrap/scss/_card.scss";
@import "~bootstrap/scss/_modal.scss";
@import "~bootstrap/scss/_reboot.scss";
@import "~bootstrap/scss/utilities/_sizing";
@import "~bootstrap/scss/_type.scss";
@import '~bootstrap/scss/_nav.scss';
@import '~bootstrap/scss/_navbar.scss';
@import '~bootstrap/scss/_dropdown.scss';
@import '~bootstrap/scss/_alert.scss';
@import '~bootstrap/scss/_close';

</style>
