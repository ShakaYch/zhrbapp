import axios from 'axios'
import qs from 'qs'
// import app from "../main.js"

const http = axios.create({
    baseURL: '/api/4',
    // baseURL: process.env.NODE_ENV === 'development' ? '/api/4' : 'http://154.8.237.28:888/api/4',
    // baseURL: 'https://news-at.zhihu.com/api/4',
    // baseUrl: process.env.NODE_ENV === 'dev' ? '/api/4' :'https://news-at.zhihu.com/api/4',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
})

// 请求参数处理
http.interceptors.request.use(config => {
    // 数据加载动画
    // app.$vux.loading.show({
    //     text: '数据加载中……'
    // });
    config.method === 'post'
        ? config.data = qs.stringify({ ...config.data })
        : config.params = { ...config.params };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
},     //请求错误处理
    error => {

        // app.$vux.toast.show({
        //     type: 'warn',
        //     text: error
        // });

        Promise.reject(error)
    })

// 请求响应处理
http.interceptors.response.use(
    response => {
        // 成功请求到数据
        //这里根据后端提供的数据进行对应的处理
        if (response.statusText === "OK" && response.status === 200) {
            return response.data;
        } else {
            //常规错误处理
            console.log('error infomation')
        }
    },
    //响应错误处理
    error => {
        console.log('error' + error);
        console.log(JSON.stringify(error));
        return Promise.reject(error)
    }
);

export default http