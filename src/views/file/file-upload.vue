<template>
  <div class="excelIn">
    <el-card>
      <div slot="header">
        <span>上传文件</span>
      </div>
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8888/file/upload"
          :headers="headers"
          :on-change="upload"
          :on-success="uploadSuccess"
          >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">不可超过10M</div>
      </el-upload>
    </el-card>


  </div>
</template>

<script>
  import API from '@/api'
  import store from '@/store'
export default {
  data() {
    return {
      formData: {},
      headers: {
        'Authorization': store.getters.token
      }
    }
  },
  methods: {
    // 上传同名文件会覆盖
    upload(file) {
      let size = file.size / 1024 / 1024
      if (size > 10) {
        this.$message.error('图片大小不能超过10MB!')
        return false
      }
      this.formData = new FormData();
      this.formData.append('file',file.raw);
    },
    uploadFile() {
      let config = {
        headers: {
          'Authorization': store.getters.token
        }
      }
      this.$http.post('http://localhost:8888/file/upload', this.formData, config)
        .then(() => {
          this.formData = {}
          this.$message.success('上传成功！')
        })
    },
    uploadSuccess() {
      this.$message.success('上传成功！')
    }
  },
}
</script>
<style></style>
