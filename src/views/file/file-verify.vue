<template>
  <div class="excelIn">
    <el-card>
      <div slot="header">
        <span>校验文件</span>
      </div>
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8888/file/verify"
          :headers="headers"
          :on-change="upload"
          :on-success="uploadSuccess"
          >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击校验</em></div>
        <div class="el-upload__tip" slot="tip">不可超过100M</div>
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
      if (size > 100) {
        this.$message.error('大小不能超过100MB!')
        return false
      }
      this.formData = new FormData();
      this.formData.append('file', file.raw);
    },

    // 未使用，使用组件的函数
    uploadFile() {
      let config = {
        headers: {
          'Authorization': store.getters.token
        }
      }
      this.$http.post('http://localhost:8888/file/verify', this.formData, config)
        .then((res) => {
          this.formData = {}
          if (res.status === 200) {
            if (res.data) {
              this.$message.success("该文件为原文件，可放心使用")
            } else {
              this.$message.success("该文件被修改过，请谨慎使用")
            }
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    uploadSuccess(res) {
      if (res.status === 200) {
        if (res.data) {
          this.$message.success("该文件为原文件，可放心使用")
        } else {
          this.$message.success("该文件被修改过，请谨慎使用")
        }
      } else {
        this.$message.error(res.msg)
      }
    }
  },
}
</script>
<style>
  .upload-demo {
    text-align: center;
  }
</style>
