<script>
import request from "../utils/request.js";
import Footer from "../components/Footer.vue";
import dayjs from 'dayjs';
export default {
  components: {Footer},
  data() {
    return {
      loginHistoryDataLoading: true,
      userInfoLoading: true,
      newDataLoading: true,
      userInfo:{
        first_name: '',
        last_name: '',
        email: '',
        shipping_address: '',
        register_ip: ''
      },
      loginHistoryCol: [
        {
          title: 'Login Time',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 120
        },
        {
          title: 'Login IP',
          dataIndex: 'ip_address',
          key: 'ip_address',
          width: 100
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
          width: 80,
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          width: 100,
        },
        {
          title: 'Region',
          dataIndex: 'region',
          key: 'region',
          width: 80,
        },
        {
          title: 'Result',
          dataIndex: 'status',
          key: 'status',
          width: 80,
        }
      ],
      loginHistoryData: [],
      newsData:[],
      fundStatistics: {
        exchangeAuditCount: 0,
        exchangeSuccessCount: 0,
        todaySurveyCount: "0.00",
        todayIntegralIncome: "0.00",
        yesterdayIntegralIncome: "0.00",
        exchangeSuccessPoints: "0.00",
      }
    }
  },
  mounted() {
    this.getUserInfo();
    this.getLoginHistory();
    this.getNewsData();
    this.getFundStatistics();
  },
  methods: {
    async getUserInfo() {
       request.post('/survey/user/userinfo').then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
          this.userInfoLoading = false;
        }else {
          console.log(res.msg);
        }
      });
    },
    async getLoginHistory() {
      request.post('/survey/loginlogs/login_history').then(res => {
        if (res.code === 200) {
          this.loginHistoryData = res.data;
          this.loginHistoryDataLoading = false;
        }else {
          console.log(res.msg);
        }
      });
    },
    async getFundStatistics(){
       request.post('/survey/user/fundStatistics').then(res => {
        if (res.code === 200) {
          this.fundStatistics = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    async getNewsData() {
       request.post('/survey/news/new_list').then(res => {
        if (res.code === 200) {
          this.newsData = res.data;
          // this.newDataLoading = false;
        } else {
          console.log(res.msg);
        }
      });
    },
    formatCreatedAt(dateString) {
      if (typeof dateString !== 'string') {
        return ''; // 返回空字符串或默认值
      }

      // 使用正则表达式提取日期部分
      const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);

      if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];

        return `${year}-${month}-${day}`;
      } else {
        return ''; // 返回空字符串或默认值
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="has-background-light">
      <div class="container py-5 px-3">
        <a-row :gutter="[32,32]">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <a-card :loading="userInfoLoading" title="You info" :bordered="false" :bodyStyle="{height:'260px'}">
              <div class="card-content">
                <p class="is-size-6  is-capitalized">{{ userInfo.first_name + ' ' + userInfo.last_name }}</p>
                <p class="is-size-7">SurveyClub</p>
                <p class="mt-4 is-size-6 truncate-text">{{ userInfo.email }}</p>
                <p class="mt-2 is-size-6 truncate-text">{{ userInfo.wallet_address ? userInfo.wallet_address : "No wallet address set" }}</p>
                <p class="mt-2 is-size-6 truncate-text">{{ userInfo.shipping_address ? userInfo.shipping_address : "You haven't bound your delivery address yet" }}</p>
                <div class="mt-4 is-flex is-justify-content-space-between">
                  <router-link to="/userCenter/wallet" class="button is-fullwidth is-primary mr-2 has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-wallet2"></i>
                    </span>
                    <span>Wallet</span>
                  </router-link>
                  <router-link to="/userCenter/serviceTicket" class="button is-fullwidth is-link ml-2 has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-chat-dots"></i>
                    </span>
                    <span>Service Ticket</span>
                  </router-link>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
            <a-card title="News" :bordered="false" :bodyStyle="{height:'260px',padding:'0'}">
              <div class="new">
                <div v-for="(item,index) in newsData" class="news-item">
                  <router-link :to="{ name: 'newDetails', params: { id: item.id } }">
                    <p class="is-size-6 has-text-grey truncate-text">{{ item.title }}</p>
                  </router-link>
                  <span class="is-size-6 has-text-grey-light">{{ formatCreatedAt(item.created_at) }}</span>
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="container px-3">
      <a-row :gutter="[32,32]">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-tabs>
            <a-tab-pane key="1" tab="Login History">
              <a-table :loading="loginHistoryDataLoading" sticky :columns="loginHistoryCol" :showHeader="false" :pagination="false" :data-source="loginHistoryData" :scroll="{ x: 800 }">
                <template #bodyCell="{ column,text }">
                  <template v-if="column.key === 'status' && text === 'failure'">
                    <span><i class="bi bi-x-lg is-danger"></i></span>
                  </template>
                  <template v-if="column.key === 'status' && text === 'success'">
                    <span><i class="bi bi-check-lg is-success"></i></span>
                  </template>
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>

    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.new {
  display: flex;          /* 容器成为Flex容器 */
  flex-direction: column; /* 子元素垂直堆叠 */
  height: 100%;
}
.news-item {
  padding: 15px 20px;
  flex: 1
}
.news-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}
.truncate-text {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.tip-box {
  margin-top: 20px;
  border: #f0f0f0 1px solid;
  padding: 15px;
  border-radius: 2px;
}
.tip-box-title {
  position: relative; /* 使伪元素相对于 span 定位 */
  padding-left: 10px; /* 为左边留出空间，以便显示竖线 */
}
.tip-box-title::before {
  content: ''; /* 伪元素内容为空 */
  width: 2px; /* 竖线的宽度 */
  height: 15px; /* 竖线的高度 */
  background-color: #cccccc; /* 竖线的颜色 */
  position: absolute; /* 绝对定位 */
  left: 0; /* 竖线与左侧元素的间距 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中调整 */
}
.total-box {
  margin-top: 20px;
  display: flex; /* 容器成为Flex容器 */
  justify-content: space-between; /* 在主轴上均匀分配空间 */
  //background-color: #f3f4f6; /* 背景颜色 */
  border: #f0f0f0 1px solid; /* 边框 */
  padding: 10px 15px 10px 15px; /* 内边距 */
  border-radius: 2px;
}
.total-item {
  display: flex; /* 容器成为Flex容器 */
  flex-direction: column; /* 子元素垂直堆叠 */
  justify-content: center;
  align-items: center;
}
.total-item-title {
  color: #666666;
  font-size: 14px;
  position: relative; /* 使伪元素相对于 span 定位 */
  padding-left: 10px; /* 为左边留出空间，以便显示竖线 */
}
.total-item-title::before {
  content: ''; /* 伪元素内容为空 */
  width: 2px; /* 竖线的宽度 */
  height: 15px; /* 竖线的高度 */
  background-color: #cccccc; /* 竖线的颜色 */
  position: absolute; /* 绝对定位 */
  left: 0; /* 竖线与左侧元素的间距 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中调整 */
}
.total-item-value {
  margin-top: 5px;
  font-size: 14px;
  color: #555555;
}
</style>