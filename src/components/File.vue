<template>
<div class="row d-flex justify-content-between flex-wrap mt-5">
  <div 
    v-for="(file, key) in files"
    :key="key"
    class="file__card col-3 m-1 my-4">
    <CloseButton @click.native="$emit('delete', file.id)"/>
    <h5 class="mb-3">{{file.name}}</h5>
    <font-awesome-icon icon="file-alt" class="file__icon mt-2"/>
    <div class="btn__group mt-4">
      <a class="btn btn-primary w-100 d-inline-block mb-1" :href="file.webViewLink" target="_blank">View file</a>
      <a class="btn btn-primary w-100 d-inline-block" :href="file.webContentLink">Download File</a>
    </div>
  </div>
  <div class="col-3 file__card file__card--add my-4 m-1 my-4">
    <label for="file-upload" class="file__label" type="file">
    </label>
    <input id="file-upload" type="file" ref="fileUpload" @change="$emit('upload', $event)">
    <font-awesome-icon for="file-upload" icon="plus" class="file__icon file__icon--plus mt-2" />
  </div>
</div>
</template>

<script>
import CloseButton from '@/components/Close_button'

export default {
  props: {
    files: Array
  },
  components: {
    CloseButton
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.file__card {
  background-color: map_get($colors, "light-dark");
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}

.file__icon {
  font-size: 150px;
  display: block;
  z-index: 1;
}

.loader__container {
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

#file-upload {
  display: none;
}

.row:after {
  content: '';
  width: 26%;
}

.file__card--add {
  margin-top: 24px;
  justify-content: center;
  border: none;
  color: map_get($colors, "white");
  cursor: pointer;
  background-color: map_get($colors, "light-dark");
  position: relative;
  justify-content: center;
  align-items: center;

  display: block !important;
  padding: 0;

  width: 100%;
  height: 410px;
  z-index: 0;
}

.file__icon--plus {
  font-size: 100px;
  margin-top: 50% !important;
  margin-left: auto;
  margin-right: auto;
}

.file__label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 0;
  cursor: pointer;

}

</style>