<template>
  <div>
    <Header/>
    <!-- 此标签会根据路由的路径，切换渲染成对应的组件 -->
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  components:{
    Header,
    Footer
  }

}
</script>

<style>
/* 引入外部的css */
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>