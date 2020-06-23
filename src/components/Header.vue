<template>
  <div class="header_box">
    <header class="header container">
      <h1 class="logo">
        <a href="index.html" class="link"></a>
      </h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li>
            <a href="#">中文</a>
          </li>
          <li>
            <em>|</em>
          </li>
          <li>
            <a href="#">English</a>
          </li>
          <li>
            <a href="#" class="weixin"></a>
          </li>
          <li>
            <a href="#" class="weibo"></a>
          </li>
          <li v-if="!$store.state.uid">
            <router-link to="/login" class="h_login">登录</router-link>
          </li>
          <li v-if="!$store.state.uid">
            <em>|</em>
          </li>
          <li v-if="!$store.state.uid">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>
          <li class="top_user" v-if="$store.state.uid">
            <!-- 用户名从vuex的store中读取 -->
            <a href>{{$store.state.uname}}</a>
          </li>
          <li class="top_quit" v-if="$store.state.uid">
            <a href @click="logout">退出</a>
          </li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text" />
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/">
                <span class="icon_home"></span>首页
              </router-link>
            </li>
            <li>
              <router-link to="/about">关于净美仕</router-link>
            </li>
            <li>
              <router-link to="/news">公司动态</router-link>
            </li>
            <li class="nav_pd">
              <router-link to="/Product/1">
                产品中心
                <span class="icon_pd"></span>
              </router-link>
              <div class="pd_dropdown">
                <router-link to="/Product/1">净美仕净化器</router-link>
                <router-link to="/Product/2">净美仕滤网</router-link>
              </div>
            </li>
            <li>
              <router-link to="/contact">联系我们</router-link>
            </li>
          </ul>
        </div>
        <div class="s_cart" v-if="$store.state.uid">
          <router-link to="/cart">
            <span class="icon_cart"></span>购物车(
            <strong id="cart_sum">0</strong>)
            <span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <!--<h3>您的购物车为空~</h3>-->
            <ul>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>
                共计：
                <strong>0.00</strong>
              </span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$store.state.uids);
  },
  methods: {
    logout(){
      // 退出操作
      // 利用 null  和 空字符串  在 if 判断时, 都自动转false 的特点
      // 防止退出时, 刷新报错!
      this.$store.commit("updateUser",{uid:"",uname:"",phone:""});

      // 当前路由如果在购物车页面，则跳转到首页
      console.log(this.$route);
      if(this.$route.path=="/cart"){
        this.$router.replace("/");
      }
    }
  },
};
</script>

<style>
</style>