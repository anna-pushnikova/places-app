<template>
  <nav class="navbar mt-4">
    <form class="form-inline my-2" @submit.prevent="search()">
      <input class="form-control mr-sm-2" v-model="query" type="search" :placeholder="this.placeholderText" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </nav>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
  props: {
    placeholderText: String
  },
  methods: {
    async search() {
      this.$emit('submit', this.query)
      this.query = ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.navbar {
  background-color: map_get($colors, 'light-dark');
  border-radius: 10px;
  margin: 10px 4px;
}

</style>