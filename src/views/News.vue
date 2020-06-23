<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul>
          <li v-for="(item,index) in data" :key="index">
            <span>{{item.pubTime | date}}</span>
            <router-link :to="{name:'newsdetail',params:{nid:item.nid}}">{{item.title}}</router-link>
          </li>
          <!-- <li><span>2016-02-21</span><a href="">净美仕新风净化系统助力校园新风行动</a></li>
          <li><span>2016-02-21</span><a href="">全国新风行动全面启动助推净美仕战略升级</a></li>
          <li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li> -->
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a v-if="pageNum>1" @click="getData(pageNum-1)">上一页</a>
        <a v-else class="default">上一页</a>
        <a 
        v-for="(item,index) in pageCount"
         :key="index"
         :class="{cur:pageNum==item}"
         @click="getData(item)">{{item}}</a>
        <!-- <a href="">2</a>
        <a href="">4</a>
        <a href="">3</a>
        <a href="">5</a> -->
        <a  v-if="pageNum<pageCount" @click="getData(pageNum+1)">下一页</a>
        <a v-if="pageNum==pageCount" class="default">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 从打印的返回值中复制的
      data:[],
      pageNum:0,
      pageCount:0,
      totalRecord:0,
      pageSize:0
    }
  },
  mounted() {
      this.getData(1);
    },
    methods: {
      getData(pno){
        let url="news_select.php";  //因为main.js已经设置了基础路径，所以在此只有写后缀就好
        let params="pageNum="+pno;
        this.axios.post(url,params)
        .then(res => {
          console.log(res)
          this.data=res.data.data;
          this.pageNum=res.data.pageNum;
          this.pageCount=res.data.pageCount;
          this.totalRecord=res.data.totalRecord;
          this.pageSize=res.data.pageSize;
        })
        .catch(err => {
          console.error(err); 
        })
      }
    },
};
</script>

<style>
</style>