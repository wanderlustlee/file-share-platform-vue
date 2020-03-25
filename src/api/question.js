import $axios from './index'

export default {
  getChoiceQuestionList(data) {
    const url = '/question/choice/list'
    return $axios.get(url, data)
  },
  addChoiceQuestion(data) {
    const url = '/question/choice/add'
    return $axios.post(url, data)
  },
  editChoiceQuestion(data) {
    const url = '/question/choice/update'
    return $axios.post(url, data)
  },
  queryChoiceQuestionByDescription(data) {
    const url = '/question/choice/query'
    return $axios.get(url, data)
  },

  getShortAnswerQuestionList(data) {
    const url = '/question/short-answer/list'
    return $axios.get(url, data)
  },
  addShortAnswerQuestion(data) {
    const url = '/question/short-answer/add'
    return $axios.post(url, data)
  },
  editShortAnswerQuestion(data) {
    const url = '/question/short-answer/update'
    return $axios.post(url, data)
  },
  queryShortAnswerQuestionByDescription(data) {
    const url = '/question/short-answer/query'
    return $axios.get(url, data)
  }

}
