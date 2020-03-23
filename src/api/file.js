import $axios from './index'

export default {
  upload(data, config) {
    const url = '/file/upload'
    return $axios.post(url, data, config)
  },
  getDownloadUrl(data) {
    const url = '/file/download-url'
    return $axios.get(url, data)
  },
  preview(data) {
    const url = '/file/preview'
    return $axios.get(url, data)
  },
  getFileList() {
    const url = '/file/list'
    return $axios.get(url)
  },
  queryByFileName(data) {
    const url = '/file/query'
    return $axios.get(url, data)
  }
}
