import $axios from './index'

export function login(data) {
  const url = '/user/login'
  return $axios.post(url, data)
}
export function getInfo() {
  const url = 'https://www.fastmock.site/mock/e876fd174751b3c01365da9911f2ff19/admin/getInfo'
  return $axios.get(url)
}


