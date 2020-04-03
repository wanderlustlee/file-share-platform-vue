import $axios from './index'

export default {
  getUserLoad(params) {
    const url = '/user/history'
    return $axios.get(url, params)
  },

  register(params) {
    const url = '/user/register'
    return $axios.post(url, params)
  },

  validateUserName(params) {
    const url = '/user/validate'
    return $axios.get(url, params)
  },

  getVisitCount() {
    const url = '/user/visit-count'
    return $axios.get(url)
  }

}
