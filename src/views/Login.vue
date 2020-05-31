<template>
  <modalAuthBase
    :title="title"
  >
    <template v-slot:content>
      <div class="modal-header justify-content-center" slot="content">
        <button type="button" class="btn btn-primary" @click.prevent="onSubmit">Google</button>
      </div>
    </template>

    <template v-slot:footer>
    </template>

  </modalAuthBase>
</template>

<script>
import modalAuthBase from '@/components/ModalAuth_base.vue'
import { mapMutations } from 'vuex'
import auth from '@/services/auth.js'

export default {
  name: 'Login',
  components: {
    modalAuthBase
  },
  data: () => ({
    title: 'Login',
    id: '',
    name: '',
    image: ''
  }),
  async created() {
    const gapi = await this.$gapi
  },
  methods: {
    async onSubmit() {

      const googleUser = await this.$gapi.signIn()

      // Get token and set it to Local Storage
      const load = await this.$gapi._load()
      const token = load.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token

      auth.setToken(token)

      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/main.scss';

.modal-content {
  padding: 15px;
}

.avatar {
  display: block;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -50px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  z-index: 9;
  background: map_get($colors, "crimson");
  padding: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    vertical-align: middle;
    border: 0;
  }
}

.modal-title {
  padding-top: 25px;
}
</style>