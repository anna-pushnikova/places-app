<template>
<div class="container mt-0">
  <div class="row">
    <div class="loader__container text-center" v-if="loading">
      <Loader/>
    </div>
    <div v-else class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Profile</h4>
          </div>
          <div class="modal-body">
            <img class="card-image" :src="user.image" alt="">
            <div class="card-body">
              <b>Name: </b><span class="card-text"> {{user.name}}</span><br>
              <b>Email: </b><span class="card-text"> {{user.email}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  data: () => ({
    user: '',
    loading: true
  }),
  components: {
    Loader
  },
  async created() {
    this.loading = true
    await this.initLibrary()
    this.loading = false
  },
  methods: {
    async initLibrary() {
      this.user = await this.$gapi.currentUser()
    }
  }
  
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.container {
  position: relative;
}

.card {
  margin-top: 20px;
  padding: 40px 10px 20px;
}

.card-image {
  width: 40%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  height: auto;

}

.card-text:hover {
  text-decoration: underline;
  color: map_get($colors, "orange");
}

.loader__container {
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: relative;
}

.modal {
  display: block;
  z-index: -1;
}

.modal-title {
  width: 100%;
  text-align: center
}

.card-body {
  margin-top: 20px;
}

</style>