<template>
  <li class="nav-item dropdown mr-3">
    <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Profile
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" href="/profile">Profile Info</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="/login" @click="logout">Logout</a>
    </div>
  </li>
</template>

<script>
import auth from '@/services/auth.js'

export default {
  methods: {
    async logout() {
      await this.$gapi.signOut()
      auth.logout()
      window.location.href = '/'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.dropdown-item:focus {
  background-color: map_get($colors, "crimson");
}

</style>