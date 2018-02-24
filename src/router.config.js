import Home from './components/Home.vue'  // 首页
import Category from './components/Category.vue' // 分类
import Cart from './components/Cart.vue' // 购物车
import GoodsDetail from './components/GoodsDetail.vue' // 商品
import SearchPage from './components/SearchPage.vue' // 查询
import Mine from './components/Mine.vue' // 我的
import Login from './components/Login.vue' //登录
import Reg from './components/Reg.vue' //注册
export default [{
    path: '/home',
    component: Home
}, {
    path: '/catgory',
    component: Category
}, {
    path: '/cart',
    component: Cart
}, {
    path: '/search',
    component: SearchPage
}, {
    path: '/mine',
    component: Mine
}, {
    path: '/login',
    component: Login
}, {
    path: '/register',
    component: Reg
}, {
    path: '/catgory/:id',
    component: Category
}, {
    path: '/detail/:id',
    component: GoodsDetail
}, {
    path: '/',
    redirect: '/home'
}, {
    path: '*',
    redirect: '/home'
}]
