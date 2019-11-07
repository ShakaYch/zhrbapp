import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    user: {
      name: '',
      nickname: '',
    },
    // 登录状态
    ifLogin: false,
  },
  getters: {//类似Vue 的 computed
    getUserName(state) {//上面的state
      return state.user.name;
    },
    getNickName(state) {//上面的state
      return state.user.nickname;
    }
  },
  mutations: {
    changeStatus(state, params) {//登录后改变状态
      state.ifLogin = true;
      //默认给昵称一个注册账号
      params.nickname = params.nickname;
      state.user = params;
    },
    changeUserInfo(state, params) {//修改用户的昵称
      state.user.nickname = params;
    },
    logout(state) {//注销
      state.ifLogin = false;
      state.user = { name: '', nickname: '' };
    },
  },
  actions: {//注册actions，相当于vue里的 methods
    changeStatusFunc(context, params) {// 获取一个与store实例具有相同方法属性的context对象
      context.commit('changeStatus', params);
    },
    changeUserInfoFunc(context, params) {// 获取一个与store实例具有相同方法属性的context对象
      context.commit('changeUserInfo', params);
    },
    logoutFunc(context) {// 获取一个与store实例具有相同方法属性的context对象
      context.commit('logout');
    }
  }
})
