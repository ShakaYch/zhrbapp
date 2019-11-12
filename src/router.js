import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Detail from './views/Detail.vue'
import Index from './views/Index.vue'
import User from './views/User.vue'
import Login from './views/Login.vue'
import UserInfo from './views/UserInfo.vue'
import Comment from './views/Comment.vue'
import Collection from './views/Collection.vue'

import $storage from "@/utils/Storage.js";
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', component: Index, name: 'index', meta: { title: '首页', keepAlive: true } },
        {
          path: '/detail', name: 'detail', meta: { title: '详情' },
          // component: Detail
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/login',
      component: User,
      children: [
        { path: 'login', name: 'login', component: Login, meta: { title: '登录' } },
        {
          path: 'register', name: 'register', meta: { title: '注册' },
          component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
        }
      ]
    },
    {
      path: '/userinfo',
      name: 'userInfo',
      component: UserInfo,
      meta: { title: '用户信息' }
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta: { title: '评论列表' }
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: { title: '收藏页面' }
    }
  ]
})

//守卫 若没有登录则无法打开 收藏页 个人详情页
router.beforeEach((to, from, next) => {
  if (!$storage.getSession("user")) {
    if (to.path == "/userinfo") {
      router.push({
        path: '/user/login'
      })
    }
  }
  next()

})

export default router
