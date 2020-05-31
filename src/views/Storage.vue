<template>
  <div class="container">
    <div class="row mt-4">
      <div class="loader__container text-center" v-if="loading">
        <Loader/>
      </div>
      <File v-else :files="files" v-on:upload="uploadFile($event)" v-on:delete="deleteFile"/>
    </div>
  </div>
</template>

<script>

import auth from '@/services/auth'
import Loader from '@/components/Loader.vue'
import requestBody from '@/utils/prepareRequestBody.js'
import File from '@/components/File.vue'

export default {
  data: () => ({
    files: [],
    loading: true
  }),
  components: {
    Loader,
    File
  },
  async created() {
    this.loading = true
    this.loadFiles()
  },
  methods: {
    async deleteFile(fileId) {
      try {
        const request = await gapi.client.drive.files.delete({
          'fileId': fileId
        })
        this.$swal('File was deleted', 'success') 
      } catch(e) {
        this.$swal('Something went wrong', 'error') 
      }
      this.loadFiles()
    },

    async uploadFile(e) {
      const file = e.target.files[0]

      const reader = new FileReader() 

      reader.readAsBinaryString(file)
      
      reader.onload = async () => {
        const multipartRequestBody = requestBody(file, reader)
        const boundary = '-------314159265358979323846'
        try {
          const response = await gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': {
              'uploadType': 'multipart'
            },
            'headers': {
              'Content-Type': 'multipart/related; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
          })
          this.$swal('File was added', 'success') 
        } catch(e) {
          this.$swal('Something went wrong', 'error') 
        }
        this.loadFiles()
      }
    },

    async loadFiles() {
      const client = await this.$gapi._libraryInit('client')
      const request = client.drive.files.list({'fields': "files(id, name, webContentLink, webViewLink)"})
      request.execute(response => {
        this.files = response.files
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
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
}

.loader__container {
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

</style>