<template>
  <div>
    <!-- login.html 12~40 -->
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span class="tips" id="uname_prompt_text"></span>用户名：
            </dt>
            <dd>
              <input type="text" id="uname" placeholder="邮箱/手机号" v-model="email" />
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input type="password" id="pwd" placeholder="密码" v-model="upwd" />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="doLogin">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      upwd: ""
    };
  },
  methods: {
    doLogin() {
      console.log(this.email, this.upwd);

      let url = "user_login.php";
      let params = `unameOrPhone=${this.email}&upwd=${this.upwd}`;

      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            // 成功时, 直接跳转到首页
            this.$router.replace("/");
            // 保存用户信息到 vux 的 state 中
            // commit(): 用于触发 store 中的mutations中的方法
            // 参数1: 方法名,  参数2: 自定义的参数
            this.$store.commit("updateUser", res.data);
          } else {
            alert("很遗憾, 登录失败! 请重新尝试");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>