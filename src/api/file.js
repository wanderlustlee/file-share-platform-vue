import $axios from './index'

export default {
  upload(data) {
    const url = '/file/upload'
    return $axios.post(url, data)
  },
  getDownloadUrl(params) {
    const url = '/file/download-url'
    return $axios.get(url, params)
  },

  preview(data) {
    const url = '/file/preview'
    return $axios.post(url, data)
  },
  getFileList() {
    const url = '/file/list'
    return $axios.get(url)
  }
}
