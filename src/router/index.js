import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'
import { Message } from 'element-ui'
import getTitle from '@/utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录页' },
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register'),
    meta: { title: '注册页' },
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashbord',
    children: [
      {
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-help' }
      }
    ]
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Layout,
    redirect: '/personal/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Personal-index',
        component: () => import('@/views/personal'),
        meta: { title: '个人中心' }
      }
    ]
  },
]
/*动态添加routers*/
export const asyncRoutes = [
  {
    path: '/file',
    name: 'File',
    redirect: '/file/file-view',
    component: Layout,
    meta: {
      title: '文件',
      icon: 'el-icon-folder-opened'
    },
    children: [
      {
        path: 'file-view',
        name: 'FileView',
        component: () => import('@/views/file/file-view'),
        meta: { title: '查看文件' }
      },
      {
        path: 'file-upload',
        name: 'FileUpload',
        component: () => import('@/views/file/file-upload'),
        meta: { title: '上传文件' }
      },
      {
        path: 'file-verify',
        name: 'FileVerify',
        component: () => import('@/views/file/file-verify'),
        meta: { title: '校验文件' }
      }
    ]
  },
  {
    path: '/question',
    component: Layout,
    name: 'Question',
    redirect: '/question/choice-question-view',
    meta: { icon: 'el-icon-edit', title: '试题' },
    children: [
      {
        path: 'choice-question-view',
        name: 'choice-question-view',
        component: () => import('@/views/question/choice-question-view'),
        meta: { title: '单选题' }
      },
      {
        path: 'short-answer-question-view',
        name: 'short-answer-question-view',
        component: () => import('@/views/question/short-answer-question-view'),
        meta: { title: '简答题' }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    name: 'paper',
    redirect: '/paper/paper-view',
    meta: { icon: 'el-icon-document', title: '试卷' },
    children: [
      {
        path: 'paper-view',
        name: 'paper-view',
        component: () => import('@/views/paper/paper-view'),
        meta: { icon: 'el-icon-s-claim', title: '试题' }
      },
      {
        path: 'paper-answer-view',
        name: 'paper-answer-view',
        component: () => import('@/views/paper/paper-answer-view'),
        meta: { icon: 'el-icon-lunbo iconfont', title: '答案' }
      }
    ]
  },
  {
    path: '*',
    name: '*404',
    redirect: '/404',
    hidden: true
  }
]
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

// 导航守卫
// 校验登录状态，如果没有token，跳转到登录页
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 根据请求getInfo的结果赋予用户对应的router
          const { roles } = await store.dispatch('user/_getInfo')
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          router.addRoutes(addRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          Message.error(error)
        }
      }
    } else {
      // 如果是跳转注册，则不拦截到登录页
      if (to.path === '/register') {
        next()
      }else {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }

    }
  }
})
export default router
