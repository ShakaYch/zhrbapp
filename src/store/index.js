import Vue from 'vue'//引入Vue
import Vuex from 'vuex'//引入Vuex
//使用vuex
Vue.use(Vuex);

//创建vuex实例
const store = new Vuex.Store({
    state: {
        // 用户信息
        user: {},
        // 登录状态
        ifLogin: false,
        listSrocllTop:0
    },
    getters: {//类似Vue 的 computed
        getStateUserName(state) {//上面的state
            return state.user.name;
        }
    },
    mutations: {
        changeStatus(state){//登录后改变状态
            state.ifLogin = true;
        },
        handleCollection(state,type){//收藏或取消（0为收藏 1 为取消）
        }
    },
    actions:{//注册actions，相当于vue里的 methods
        changeStatusFunc(context){// 获取一个与store实例具有相同方法属性的context对象
            context.commit('changeStatus');
        }
    }
})

export default store//导出store