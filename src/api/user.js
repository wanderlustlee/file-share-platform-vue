import $axios from './index'

export default {
  getUserLoad(params) {
    const url = '/user/load-history'
    return $axios.get(url, params)
  }
}
