<template>
  <div class="container mt-5">
    <div class="row-4 pt-2">
      <Search :placeholderText="placeholderText" v-on:submit="translate"/>
      <div class="loader__container text-center" v-if="loading">
        <Loader/>
      </div>
      <Word v-else :words="words"/>
      <p class="ml-3" v-if="error">Word was not found</p>
    </div>
  </div>
</template>

<script>
import dictionary from '@/services/dictionary'
import Word from '@/components/Word.vue'
import Loader from '@/components/Loader.vue'
import Search from '@/components/Search.vue'

export default {
  data: () =>({
    placeholderText: 'Search for a word',
    words: null,
    loading: false,
    error: null
  }),
  components: {
    Word,
    Search,
    Loader
  },
  methods: {
    async translate(query) {
      this.error = null
      this.loading = true
      const response = await dictionary.searchWord(query)

      if (response === 404) {
        this.error = response
        this.loading = false
        return
      }
      this.words = response
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

</style>