import Vue from 'vue'
import Router from 'vue-router'
import test1 from '@/components/test1'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', meta: {title: '首页'}, component: () => import('@/components/index')},

    {path: '/demo', name: 'demo', meta: {title: 'demo'}, component: () => import('@/page/demo/demo')},
    {path: '/demo1', name: 'demo1', meta: {title: 'demo1'}, component: () => import('@/page/demo/demo1')},
    {path: '/demo2', name: 'demo2', meta: {title: 'demo2'}, component: () => import('@/page/demo/demo2')},
    {path: '/demo3', name: 'demo3', meta: {title: 'demo3'}, component: () => import('@/page/demo/demo3')},
    {path: '/demo4', name: 'demo4', meta: {title: 'demo4'}, component: () => import('@/page/demo/demo4')},
    {path: '/demo5', name: 'demo5', meta: {title: 'demo5'}, component: () => import('@/page/demo/demo5')},

    {path: '/test1', name: 'test1', component: test1}
  ]
})
