<script>
import { Modal } from 'ant-design-vue';
import Footer from "../components/Footer.vue";
import request from "../utils/request.js";
import { Empty } from 'ant-design-vue';
export default {
  components: {
    Footer
  },
  data(){
    return {
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      exchangeData:[],
      userInfo: {
        balance: 0.00,
        email: '',
      },
      product_list:[],
      data : [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ]
    }
  },
  mounted() {
    this.getUserInfo();
    this.getProductList();
    this.getExchangeData();
  }
  ,methods: {
    getExchangeData(){
      request.post('/survey/exchange/exchange_list',{
        page: 1,
        limit: 10
      }).then(res => {
        if (res.code === 200) {
          this.exchangeData = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    exchangeProduct(id,product_name,price){
      Modal.confirm({
        title: 'Product Exchange',
        content: 'You have selected '+product_name +'. Are you sure you want to redeem this product? This will consume your '+price+' points. Once confirmed, it cannot be cancelled.',
       centered: true,
        okText: 'Confirm',
        onOk: () => {
          request.post('/survey/exchange/exchange_product',{
            product_id: id
          }).then(res => {
            if (res.code === 200) {
              Modal.success({
                title: 'Exchange Success',
                content: res.msg
              });
              setTimeout(() => {
                this.getExchangeData();
                this.getUserInfo();
              }, 1000);
            }else {
              Modal.warning({
                title: 'Exchange Warning',
                content: res.msg
              });
            }
          });
        }
      });
    },
    getProductList(){
      request.post('/survey/product/product_list',{
        page: 1,
        limit: 50
      }).then(res => {
        if (res.code === 200) {
          this.product_list = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    getUserInfo() {
      request.post('/survey/user/userinfo').then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
        }else {
          console.log(res.msg);
        }
      });
    }
  }
}
</script>

<template>
  <div>
    <div class="has-background-light">
      <div class="container">
        <a-row>
          <a-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="container py-5 px-3">
              <p class="is-size-1 has-text-weight-bold">You Wallet</p>
              <p class="is-size-6 has-text-grey">Your wallet balance can be redeemed for the products we offer without any fees.</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="container pt-5 px-3">
      <a-row :gutter="[16,32]">
        <a-col  :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-card title="Wallet Info" :bordered="false" style="height: 400px;">
            <div>
              <a-statistic title="Account Balance" :precision="2" :value="userInfo.balance" />
              <a-statistic title="Wallet Type" class="mt-2" :precision="2" value="Binance Pay" />
              <a-statistic title="Wallet Address" class="mt-2" :precision="2" :value="userInfo.wallet_address ? userInfo.wallet_address :'No wallet address set'" />
              <div class="mt-6 is-flex is-justify-content-space-between">
                <router-link to="/userCenter/transfer" class="button is-fullwidth is-primary mr-2 has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-send"></i>
                    </span>
                    <span>Balance Transfer</span>
                  </router-link>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="carousel">
            <div class="carousel-inner">
              <div v-for="(product_item,index) in product_list" class="product-card">
                <img draggable="false" style="height: 200px;width: 200px;" :src="product_item.product_img" :alt="product_item.product_name">
                <h2 class="is-unselectable truncate-text">{{ product_item.product_name }}</h2>
                <p class="product-description truncate-text is-unselectable">{{ product_item.product_desc }}</p>
                <p class="is-unselectable">{{ product_item.price }}</p>
                <button class="button is-primary exchange-button" @click="exchangeProduct(product_item.id,product_item.product_name,product_item.price)">
                  <span class="icon is-small">
                    <i class="bi bi-check-circle"></i>
                  </span>
                  <span>Choose it</span>
                </button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="container my-5 px-3">
      <a-row>
        <a-col :span="24">
          <div class="is-flex is-align-items-center is-justify-content-space-between">
            <span class="is-size-4">Exchange Record</span>
            <span class="">More</span>
          </div>
          <div>
            <div>
              <a-list item-layout="horizontal" :data-source="exchangeData">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <template #actions>
                      <span class="has-text-danger" v-if="item.status === 0">
                        <a-tooltip placement="left">
                          <template #title>{{ item.desc }}</template>
                          <span>Review Failure</span>
                        </a-tooltip>
                      </span>
                      <span class="has-text-primary" v-else-if="item.status === 1">Completed</span>
                      <span class="has-text-warning" v-else>Awaiting review</span>
                    </template>
                    <a-list-item-meta :description="item.product.product_desc">
                      <template #title>
                        <a>{{ item.product.product_name }}</a>
                      </template>
                      <template #avatar>
                        <a-avatar :src="item.product.product_img" />
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  overflow-x: hidden; /* 隐藏滚动条 */
}
.carousel-inner {
  display: flex;
  /* 添加底部内边距以避免内容被裁剪 */
  overflow-x: auto; /* 允许横向滚动 */
  scroll-behavior: smooth; /* 平滑滚动 */
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
  padding: 5px;
}
.carousel-inner::-webkit-scrollbar {
  display: none; /* Chrome/Safari 隐藏滚动条 */
}
.product-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: -1px -1px 4px 0 rgba(100, 100, 111, 0.05),
  1px 1px 4px 0 rgba(100, 100, 111, 0.05);
  min-width: 200px;
  max-width: 240px;
  height: 395px; /* 设置单个商品卡片的高度 */
  margin-right: 10px;
  flex: 0 0 auto; /* 防止缩放 */
  text-align: left; /* 左对齐 */
  display: flex;
  flex-direction: column; /* 垂直排列内容 */
  justify-content: space-between; /* 在垂直方向上均匀分配空间 */
}
.product-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.exchange-button {
  color: white;
  font-size: 14px;
  transition: background 0.3s;
  margin-top: 10px; /* 添加顶部间距 */
}
.product-card h2 {
  margin: 10px 0 5px; /* 调整标题的外边距 */
  font-size: 18px;
}
.product-card p {
  color: #777;
  font-size: 14px;
  margin: 0; /* 移除段落的外边距 */
}
.product-description {
  color: #555;
  font-size: 12px; /* 描述字体较小 */
  margin: 5px 0; /* 添加上下间距 */
}
.truncate-text {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}

</style>