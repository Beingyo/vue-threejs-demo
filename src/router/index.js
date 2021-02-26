import Vue from 'vue'
import Router from 'vue-router'
import test1 from '@/components/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', meta: {title: '首页'}, component: () => import('@/components/index')},

    {path: '/demo', name: 'demo', meta: {title: 'demo'}, component: () => import('@/page/demo/index')},
    {path: '/test', name: 'test', meta: {title: 'test'}, component: () => import('@/page/test/index')},

    {path: '/test1', name: 'test1', component: test1}
  ]
})
