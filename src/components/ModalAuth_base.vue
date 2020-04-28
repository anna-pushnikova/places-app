<template>
  <div class="modal-dialog modal-login">
    <div class="modal-content">

      <slot name="header">
        <div class="modal-header justify-content-center">
          <div class="avatar">
            <img src="../assets/avatar.png" alt="avatar">
          </div>
          <h4 class="modal-title">{{title}}</h4>
        </div>
      </slot>

      <slot class="modal-header justify-content-center"  name="content">
      </slot>

      <slot name="footer">
        <div class="modal-header justify-content-center text-center">
          <div class="small">
            <router-link :to="path">{{linkText}}</router-link>
          </div>
        </div>
      </slot>

    </div>
  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>