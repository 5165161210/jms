<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href>首页</a>&gt;
          <a href>产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_con">
          <div class="cartcon_title">
            <span>
              <input type="checkbox" v-model="checkAll"/> 全选
            </span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="products.length==0">购物车中没有任何商品！</h2>
            <li v-else v-for="(item,index) in products" :key="index">
              <input 
              type="checkbox" 
              class="cart_checkbox" 
              v-model="item.checked"
              @change="doCheck()"
              />
              <a href class="cart_img">
                <img :src="'http://101.96.128.94:9999/mfresh/' +item.pic" alt />
              </a>
              <a href class="cart_title">{{item.title1}}</a>
              <i>¥{{item.price}}</i>
              <div>
                <span @click="doMinuse(index)">-</span>
                <input type="text" v-model="item.count" @input="countChange(index)" />
                <span @click="doAdd(index)">+</span>
              </div>
              <strong>¥{{item.price*item.count}}</strong>
              <em @click="doDel(index)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span>
            已选商品
            <em>{{piece}}</em>件
          </span>
          <span>
            总金额：
            <strong>¥{{total}}</strong>
          </span>
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      total:0,
      piece:0,  //件数
      checkAll:false   //全选：默认值设为false，表示不全选
    };
  },
  // 监听器,观察者
  watch: {
    // 监听checkAll属性的变化，参数1 是变化的值
    checkAll(newValue){
      console.log(newValue);
      // 让所有的选矿都和此框的值相同
      this.products.forEach(item=>{
        item.checked=newValue;
      });
      this.doCheck();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    countChange(index){
      console.log(index);
      let url="cart_detail_update.php";
      let product=this.products[index];
      let {pid,did,count}=product;
      let params=`pid=${pid}&did=${did}&count=${count}`;

      this.axios.post(url,params)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err); 
      })
    },
    // 购物车数量增加
    doAdd(index){
      let num=parseInt(this.products[index].count);
      this.products[index].count=num+1;
      this.countChange(index);
    },
    // 购物车数量减少
    doMinuse(index){
      if(this.products[index].count==1){
        alert("商品最少1个");
        return;
      }
      let num=parseInt(this.products[index].count);
      this.products[index].count=num-1;
      this.countChange(index);
    },
    // 删除购物车哪一项
    doDel(index){
      let url = "cart_detail_delete.php";
      let params="did="+this.products[index].did;

      this.axios.post(url,params)
      .then(res => {
        console.log(res)
        if(res.data.code==1){
          // 1代表删除成功，删除本地对应的栏目
          this.products.splice(index,1)
        }
      })
      .catch(err => {
        console.error(err); 
      })
    },
    // 选中购物车项目
    doCheck(){
      // 把勾选的的项目变为其反向值，然后再计算总价格
      // this.products[index].checked=!this.products[index].checked;

      // 总价格：已勾选项目的总价之和
      let total=0;
      this.piece=0;
      this.products.forEach(item=>{
        if(item.checked){
          // 如果商品是勾选的
          total+=item.count*item.price;
          this.piece+=1;
        }
      });
      this.total=total;
    },
    getData() {
      let uid = this.$store.state.uid;

      let url = "cart_detail_select.php?uid=" + uid;

      this.axios
        .get(url)
        .then(res => {
          console.log(res);
          this.products = res.data.products;

          // 人为为每条数据项 增加一个属性 来代表是否勾选
          this.products.forEach(item=>{
            item.checked=false;  //false代表未选中
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  
};
</script>

<style>
</style>