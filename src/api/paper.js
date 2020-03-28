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
  getPaperAnswerList(data) {
    const url = '/paper/answer/list'
    return $axios.get(url, data)
  },
  queryQuestionByPaperName(data) {
    const url = '/paper/question/query'
    return $axios.get(url, data)
  },
  queryAnswerByPaperName(data) {
    const url = '/paper/answer/query'
    return $axios.get(url, data)
  }
}
