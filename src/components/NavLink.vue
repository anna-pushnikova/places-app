<template>
  <li class="nav-item mr-3">
    <router-link class="nav-link" :to="link" role="button">
      {{title}}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    link: String
  }
}
</script>

<style>

</style>