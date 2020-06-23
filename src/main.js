import Vue from 'vue';
import App from './App.vue';
import {router} from "./router";

import axios from "axios";
import VueAxios from "vue-axios";

// 配置请求的根路径,要先将axios引入才能进行此项配置
axios.defaults.baseURL="http://101.96.128.94:9999/mfresh/data/";

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

// 全局引入过滤器 日期的制作
import {date, fullImage} from "./filter";
Vue.filter('date',date);
Vue.filter("fullImage",fullImage);

// 引入vuex的store并注册到vue
import {store} from "./store";


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
