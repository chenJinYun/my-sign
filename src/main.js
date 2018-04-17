import Vue from 'vue'
import VueRouter from 'vue-router' //路由
import routes from './router.config' // 路由路径
import Less from 'Less'
import axios from 'axios' // 请求
import store from './store/' // Vuex
import VueLazyload from 'vue-lazyload' //懒加载
import App from './App.vue'
import Loading from './components/loading' //loding组件
require('./assets/css/base.css'); //全局引入
Vue.use(Less);
Vue.use(VueRouter);
Vue.use(Loading);
// 懒加载插件
Vue.use(VueLazyload, {
    preLoad: 1.3,// // 1.3的距离是 当前dom距离页面底部的高度比例时就开始加载图片了
    error: require('./assets/images/err.png'), // error显示内容
    loading: require('./assets/images/loading.gif'), // loading状态显示内容
    attempt: 1, // 图片加载失败，最多重试的次数
    listenEvents: ['scroll'] // 事件
});
const router = new VueRouter({
    mode: 'history',
    scorllBehavior: () => ({
        y: 0 // 路由跳转y轴下拉的位置
    }),
    linkActiveClass: 'active',
    routes
});
//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(function(config) { //配置发送请求的信息
    store.dispatch('showLoading');
    // setInterval(function () {store.dispatch('hideLoading');},3000)
    return config;
}, function(error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
    store.dispatch('hideLoading');
    return response;
}, function(error) {
    return Promise.reject(error);
    });
// 基本路径
axios.defaults.baseURL = 'http://localhost:3333/'; 
// 请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// 把axios加到vue的$http原型
Vue.prototype.$http = axios;
/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';*/
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (JSON.parse(sessionStorage.getItem('userInfo'))) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
