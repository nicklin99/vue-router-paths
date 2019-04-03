import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'
import App from './App.vue'
import Hello from './Hello.vue'
import Profile from './Profile.vue'
import watchRouterPaths from '../../index.js'

Vue.use(Antd)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [{
      path: '/',
      component: Hello,
      meta: {
        title: '首页',
    },
    children: [
      {
        path: '/profile',
        component: Profile,
        meta: {
          title: '个人中心'
        },
        children: [
          {path:'setting', meta:{title:'设置'}},
          {path:'avatar', meta:{title:'头像'}},
          {path:'address', meta:{title:'收货地址'}},
        ]
      },
    ]
    }, // No props, no nothing
    {
      path: '/hello/a',
      component: Hello,
      props: true,
      meta: {
        title: 'hello'
      },
      children: [{
        path: '/hello/sub/:name',
        component: Hello,
        props: true,
        meta: {
          title: 'hello2'
        }
      }]
    },
    {
      path:'/user',
      redirect:'/profile',
      meta: {
        title: '个人中心'
      },
    },
  ]
})
watchRouterPaths(router)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})