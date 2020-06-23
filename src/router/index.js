import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入使用路由管理的组件
import About from '../views/About.vue';
import Index from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Contact from '../views/Contact.vue';
import News from '../views/News.vue';
import NewsDetail from '../views/NewsDetail.vue';
import Product from '../views/Product.vue';
import ProductDetails from "../views/ProductDetails.vue";
import Cart from '../views/Cart.vue';

// 按照固定格式 配置：路径和组件之间的对应关系
const routes=[
  {
    path:"/",
    component:Index,
  },
  {
    path:"/about",
    component:About,
  },
  {
    path:"/register",
    component:Register,
  },
  {
    path:"/login",
    component:Login,
  },
  {
    path:"/contact",
    component:Contact,
  },
  {
    path:"/news",
    component:News,
  },
  {
    path:"/newsdetail/:nid",
    component:NewsDetail,
    // 命名路由：给路由起名字，便于使用
    name:'newsdetail'
  },
  {
    path:"/product/:type",
    component:Product,
  },
  {
    path:"/productdetails/:pid",
    component:ProductDetails,
  },
  {
    path:"/cart",
    component:Cart,
  }
];

// 路由独享制作
export const router = new VueRouter({
  mode:"history",
  routes,
});