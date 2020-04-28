<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">Вы в системе</div>
      <div class="col-lg-6">
        <button class="btn btn-primary" @click="click">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/requests/auth.js'

export default {
  methods: {
    click() {
      auth.logout()
      window.location.href = '/'
    }
  }
}
</script>

<style>

</style>