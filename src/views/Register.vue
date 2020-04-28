<template>
  <modalAuthBase :title="title" :path="path" :linkText="linkText">
    <template v-slot:content>
      <div class="modal-header justify-content-center" slot="content">
        <form @submit.prevent="validate">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <small
              id="emailHelp"
              class="form-text text-muted"
              v-if="$v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email"
            >Provide a valid e-mail.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" 
            v-model="password"/>
            <small
              id="passwordHelp"
              class="form-text text-muted"
              v-if="($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)"
            >Password must contain at least {{$v.password.$params.minLength.min}} characters.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword2">Confirm Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="exampleInputPassword2" 
              v-model="confirmPassword"
            />
            <small 
              id="confirmPasswordHelp" 
              class="form-text text-muted"
              v-if="($v.confirmPassword.$dirty && !$v.confirmPassword.required) || ($v.confirmPassword.$dirty && !$v.confirmPassword.sameAs)"
            >Passwords do not match.</small>
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

    <template v-slot:footer></template>
  </modalAuthBase>
</template>

<script>
import modalAuthBase from "@/components/ModalAuth_base.vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import VueRecaptcha from 'vue-recaptcha'
import { mapActions } from 'vuex'

export default {
  name: "Register",
  data: () => ({
    title: "Register",
    path: "/login",
    linkText: "Have an account? Go to login",
    password: '',
    confirmPassword: '',
    email: '',
    sitekey: process.env.VUE_APP_GOOGLE_RECAPTCHA_KEY
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(6),
      required
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  components: { 
    modalAuthBase,
    VueRecaptcha 
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

      this.register(credentials)
        .then(() => {
          debugger
          this.$router.push('/')
          // window.location.href = '/'
        })
        .catch(e => e.message)
    },

     onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    },

    ...mapActions('authentication', [
      'register'
    ])
  }
};
</script>

<style>
</style>