<template>
  <div class="container">
    <div class="row justify-content-center mt-2">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'

export default {
  components: {
    Map
  },
  async created() {
    const gapi = await this.$gapi
  }
}
</script>

<style lang="scss">


</style>