<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <font-awesome-icon icon="globe-americas" class="mr-2" />
      <a class="navbar-brand" href="/">Places</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <Dropdown/>
          <Navlink v-for="(link, key) in links" :key="key" :title="link.title" :link="link.link"/>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import 'jquery/dist/jquery'
import 'popper.js/dist/popper-utils'
import 'bootstrap/js/dist/dropdown';

import Dropdown from '@/components/Dropdown.vue'
import Navlink from '@/components/NavLink.vue'

export default {
  data: () => ({
    links: [
      { title: 'Home', link: '/' },
      { title: 'Countries', link: '/countries' },
      { title: 'Dictionary', link: '/dictionary' },
      { title: 'Storage', link: '/storage' }
    ]
  }),
  components: {
    Dropdown,
    Navlink
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.navbar {
  background-color: map_get($colors, "light-dark");
  color: map_get($colors, "gray");;
  position: fixed !important;
  z-index: 1000 !important;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 0;
}
</style>