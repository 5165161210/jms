<template>
  <div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <router-link to="/Product/1" :class="{cur:type==1}">净美仕净化器</router-link>
        <router-link to="/Product/2" :class="{cur:type==2}">净美仕滤网</router-link>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item,index) in data" :key="index">
          <a href>
            <img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt />
          </a>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{item.model}}</p>
              <span>{{item.title2}}</span>
            </h3>
            <router-link :to="`/productdetails/${item.pid}`">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(pageNum-1)" v-if="pageNum>1">上一页</a>
        <a v-else class="default">上一页</a>
        <a 
        @click="getData(item)"
        v-for="(item,index) in pageCount" 
        :key="index"
        :class="{cur:item==pageNum}"
        >{{item}}</a>
        <a @click="getData(pageNum+1)" v-if="pageNum<pageCount">下一页</a>
        <a v-else class="default">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 只有data中的值才能直接在html中使用
  data() {
    return {
      // 组件实例化时会执行一次
      type: this.$route.params.type,
      data: [],
      pageCount: 0,
      pageNum: 0,
      pageSize: 0,
      totalRecord: 0
    };
  },
  mounted() {
    this.getData(1);
  },
  // watch监听器：指定监听某个元素，元素变化时就会触发监听器
  watch: {
    // 监听$route的变化，参数1为变化成的值
    $route(newvalue) {
      console.log(newvalue);
      this.type = newvalue.params.type;
      this.getData(1);
    }
  },
  methods: {
    getData(pno) {
      let url = `product_select.php?type=${this.type}&pageNum=${pno}`;

      this.axios
        .get(url)
        .then(res => {
          console.log(res);
          this.data = res.data.data;
          this.type = res.data.type;
          this.pageCount = res.data.pageCount;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.totalRecord = res.data.totalRecord;
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







