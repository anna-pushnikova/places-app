<template>
  <modalAuthBase
    :title="title"
    :path="path"
    :linkText="linkText"
  >
    
    <template v-slot:content>
      <div class="modal-header justify-content-center" slot="content">
        <form @submit.prevent="validate">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <vue-recaptcha
        ref="recaptcha"
        size="invisible"
        :sitekey="sitekey"
        @verify="onSubmit"
        @expired="onCaptchaExpired"
      />
    </template>

    <template v-slot:footer>
    </template>

  </modalAuthBase>
</template>

<script>
import modalAuthBase from '@/components/ModalAuth_base.vue'
import { required, email } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    modalAuthBase,
    VueRecaptcha 
  },
  data: () => ({
    title: 'Login',
    path: '/register',
    linkText: 'Need an account? Sign up!',
    email: '',
    password: '',
    sitekey: process.env.VUE_APP_GOOGLE_RECAPTCHA_KEY
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required
    }
  },
  methods: {
    validate() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return 
      }
      this.$refs.recaptcha.execute()
    },

    onSubmit(recaptchaToken) {
      const credentials = {
        email: this.email,
        password: this.password,
        recaptcha_token: recaptchaToken
      }

      this.login(credentials)
        .then(() => {
          // this.$router.push('/')
          window.location.href = '/'
        })
        .catch(e => e.message)
    },

     onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    },

    ...mapActions('authentication', [
      'login'
    ])
  }
}
</script>

<style>

</style>