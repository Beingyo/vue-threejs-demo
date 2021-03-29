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
    {path: '/demo6', name: 'demo6', meta: {title: 'demo6'}, component: () => import('@/page/demo/demo6')},
    {path: '/demo7', name: 'demo7', meta: {title: 'demo7'}, component: () => import('@/page/demo/demo7')},
    {path: '/demo8', name: 'demo8', meta: {title: 'demo8'}, component: () => import('@/page/demo/demo8')},
    {path: '/demo9', name: 'demo9', meta: {title: 'demo9'}, component: () => import('@/page/demo/demo9')},
    {path: '/demo10', name: 'demo10', meta: {title: 'demo10'}, component: () => import('@/page/demo/demo10')},
    {path: '/demo11', name: 'demo11', meta: {title: 'demo11'}, component: () => import('@/page/demo/demo11')},

    {path: '/test1', name: 'test1', component: test1}
  ]
})
