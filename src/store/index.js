import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store=new Vuex.Store({
  // 状态值：存放的属性可以在多个组件之间进行共享
  state:{
    // 默认值从session中读取，无惧刷新操作
    uid:sessionStorage.getItem("uid"),
    uname:sessionStorage.getItem("uname"),
    phone:sessionStorage.getItem("phone"),
    // uid:null,
    // uname:null,
    // phone:null
  },
  // 方法：组件可以调用这些方法来操作状态值
  mutations:{
    // state中的值，必须通过方法来修改
    // 此处的方法参数1都是固定的state
    // 参数2就是其他的自定义参数，例如此处我们要传递的格式为{}
    updateUser(state,user){
      // sessionStorage：其中存储的值可以在页面刷新时，依然存在，将这些值保存zaisetitem中
      sessionStorage.setItem("uname",user.uname);
      sessionStorage.setItem("phone",user.phone);
      sessionStorage.setItem("uid",user.uid);

      state.phone=user.phone;
      state.uname=user.uname;
      state.uid=user.uid;
    }
  }
})