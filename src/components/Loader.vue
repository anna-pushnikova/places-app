<template>
<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '~bootstrap/scss/_functions';
@import '~bootstrap/scss/_variables';
@import '~bootstrap/scss/_spinners';
@import '@/assets/main.scss';

.spinner-border {
  position: absolute;
  top: 50%;
  left: 50%;
  color: map_get($colors, "crimson");
  width: 4rem;
  height: 4rem;
}

</style>