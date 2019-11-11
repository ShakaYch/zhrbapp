import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './assets/iconfont/iconfont.css'
import './assets/style/reset.min.css'
import './assets/style/border.min.css'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    //为了头部组件和列表组件的回到顶部
    Bus: new Vue()
  }
}).$mount('#app')
