<template>
  <div class="container mt-5">
    <div class="row-4 pt-2">
      <Search :placeholderText="placeholderText" v-on:submit="search"/>
      <div class="loader__container text-center" v-if="loading">
        <Loader/>
      </div>
      <Country v-else :countries="countries"/>
      <p class="ml-3" v-if="error">Country was not found</p>
    </div>
  </div>
</template>

<script>
import countries from '@/services/countries'
import Loader from '@/components/Loader.vue'
import Country from '@/components/Country.vue'
import Search from '@/components/Search.vue'

export default {
  data: () => ({
    placeholderText: 'Search for a country',
    countries: [],
    error: null,
    loading: false
  }),
  components: {
    Country,
    Search,
    Loader
  },
  methods: {
    async search(query) {
      this.error = null
      this.loading = true
      const response = await countries.searchCountry(query)

      if (response === 404) {
        this.error = response
        this.loading = false
        return
      }

      this.countries = response
      this.loading = false
    }
  }
}
</script>

