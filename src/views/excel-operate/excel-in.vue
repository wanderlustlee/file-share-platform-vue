<template>
  <div class="excelIn">
    <el-card>
      <div slot="header">
        <span>上传文件</span>
      </div>
      <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="upload"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    // 上传同名文件会覆盖
    upload(file) {
      let size = file.size / 1024 / 1024
      if (size > 5) {
        this.$message.error('图片大小不能超过5MB!')
        return false
      }
      let formData = new FormData();
      formData.append('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyIn0.oHDiid0d18zZu97HIJOrsnNVPIsSzfbuVIX8imy0Y80')
      formData.append('file',file.raw);
      this.$http.post('http://localhost:8888/file/upload', formData)
        .then(response=>{
          console.log(response.data);
          this.$message.success('上传成功！')
        })
    },
  },
}
</script>
<style></style>
