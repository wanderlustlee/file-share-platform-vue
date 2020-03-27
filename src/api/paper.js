import $axios from './index'

export default {
  getDownloadUrl(data) {
    const url = '/file/download-url'
    return $axios.get(url, data)
  },
  preview(data) {
    const url = '/file/preview'
    return $axios.get(url, data)
  },
  getPaperQuestionList(data) {
    const url = '/paper/question/list'
    return $axios.get(url, data)
  },
  queryByFileName(data) {
    const url = '/file/query'
    return $axios.get(url, data)
  }
}
