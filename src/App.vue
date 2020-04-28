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
    
$dark:        #222646;
$light-dark:  #242b51;
$crimson:     #e02261;
$dark-crimson:#742454;
$green:       #55c554;
$orange:      #f65a41;
$dark-green:  #2bb469;
$purple:      #313777;

$theme-colors: (
  "primary": #c91d57,
  "success": #55c554,
  "info":    #f65a41
);

$colors: (
  "dark":       $dark,
  "light-dark": $light-dark,
  "crimson":    $crimson,
  "dark-crimson":$dark-crimson,
  "green":      $green,
  "orange":     $orange,
  "dark-green": $dark-green,
  "purple":     $purple
);

$gray-100: #dcdde3;

$link-color:             $crimson;
$link-hover-decoration:  none;
$modal-content-bg:       $light-dark;

$modal-dialog-margin-y-sm-up:  150px;

$body-bg:                   $dark !default;
$body-color:                $gray-100;

$modal-header-border-width: 0;
$modal-header-border-color: none;  

.modal-content {
  padding: 15px;
}

.avatar {
  display: block;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -50px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  z-index: 9;
  background: $crimson;
  padding: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    vertical-align: middle;
    border: 0;
  }
}

.modal-title {
  padding-top: 25px;
}

$modal-content-border-color: $purple;

@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/_mixins.scss";

@import "~bootstrap/scss/bootstrap-grid.scss";
@import "~bootstrap/scss/buttons.scss";
@import "~bootstrap/scss/_reboot.scss";
@import "~bootstrap/scss/_type.scss";
@import "~bootstrap/scss/forms.scss";
@import "~bootstrap/scss/_card.scss";
@import "~bootstrap/scss/_modal.scss"
// background-color: #222646; темный для фона
// #242b51 слегка посветлее

// #c91d57 яркий малиновый
// #742454 потемнее малиновый
// #55c554 яркий зеленый
// #2bb469 зеленый поспокойнее
// #f65a41 яркиий оранжевый
// #313777 фиолетовый

// #dcdde3 цвет шрифта тонкий

</style>
