<template>
  <div class="uploadImg">
    <span class="el-icon-plus"></span>
    <input type="file" class="upload_ipu" ref="fileLoad" @input="upload" />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      imgShow: false,
      imgSrc: ''
    }
  },
  methods: {
    createUrl(file) {
      if (window.URL) {
        return window.URL.createObjectURL(file)
      } else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(file)
      } else {
        return null
      }
    },
    // 上传同名文件会覆盖
    upload() {
      let file = this.$refs.fileLoad.files[0]
      console.log(this.$refs.fileLoad.files)
      let size = file.size / 1024 / 1024
      // if (!this.accept.includes(file.type.toLowerCase())) {
      //   this.$message.error('图片格式不正确!')
      //   return false
      // }
      if (size > 5) {
        this.$message.error('图片大小不能超过5MB!')
        return false
      }

      let formData = new FormData();
      formData.append('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyIn0.oHDiid0d18zZu97HIJOrsnNVPIsSzfbuVIX8imy0Y80')
      formData.append('file',file);
      this.$http.post('http://localhost:8888/file/upload', formData)
        .then(response=>{
          console.log(response.data);
        })

      // this.imgSrc = this.createUrl(file)
      // this.imgShow = true
      this.$message.success('上传成功！')
      this.$refs.fileLoad.value = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadImg {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 180px;
  height: 180px;
  transition: all 0.2s;
  &:hover {
    border-color: #409eff;
  }
  span {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .upload_ipu {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    z-index: 2;
  }
  img {
    width: 178px;
    height: 178px;
    position: absolute;
    border-radius: 6px;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
