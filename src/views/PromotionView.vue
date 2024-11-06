<script>
import ProfileView from "./ProfileView.vue";
import Footer from "../components/Footer.vue";
import { message} from "ant-design-vue";
import request from "../utils/request.js";
export default {
  components: {Footer, ProfileView},
  data(){
    return {
      dataSource: [
        {
          key: 'money',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Order',
          dataIndex: 'order',
          key: 'order',
        },
        {
          title: 'Money',
          dataIndex: 'money',
          key: 'money',
        },
        {
          title: 'Desc',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: 'Create Date',
          dataIndex: 'created_at',
          key: 'created_at',
        },
      ],
      linkInfo: {
        clicks: 0,
        sign_count: 0,
        conversion_rate: 0,
        points: 0,
        today: 0,
        yesterday: 0,
        link: ''
      },
      rebateList: [],
      rebate_pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.getLink();
    this.getRebateList();
  },
  methods:{
    async getLink(){
      request.post('/survey/promotionlinks/getLink').then(res => {
        if (res.code === 200) {
          this.linkInfo = res.data;
        }else {
          console.log(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    getCreateLink(){
      request.post('/survey/promotionlinks/createLink').then(res => {
        if (res.code === 200) {
          this.linkInfo = res.data;
        }else {
          console.log(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    getRebateList(){
      request.post('/survey/rebate/rebateList',{
        page: this.rebate_pagination.current,
        limit: this.rebate_pagination.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.rebateList = res.data.list;
          this.rebate_pagination.total = res.data.total;
        }else {
          console.log(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    tableChange(e){
      this.rebate_pagination.current = e.current;
      this.rebate_pagination.pageSize = e.pageSize;
      this.getRebateList();
    },
    copyText(value) {
      this.$copyText(value).then(function(e) {
        message.success('Copy success');
      }, function(e) {
        message.error('Copy failed');
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
              <p class="is-size-1 has-text-weight-bold">Profile Commission</p>
              <p class="is-size-6 has-text-grey">Share your exclusive promotion link to develop your subordinates and get more benefits</p>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="container py-3 px-3">
        <a-row :gutter="[32,32]">
          <a-col  :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-card title="Link Statistics" :bordered="false" :bodyStyle="{height:'200px'}">
              <a-row>
                <a-col :span="24">
                  <a-statistic title="Clicks" :value="linkInfo.clicks" style="margin-right: 50px" />
                </a-col>
              </a-row>
              <a-row class="mt-2">
                <a-col :span="12">
                  <a-statistic title="Signups" :value="linkInfo.sign_count" style="margin-right: 50px" />
                </a-col>
                <a-col :span="12">
                  <a-statistic title="Conversions" :value="linkInfo.conversion_rate + '%'" />
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col  :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-card title="Points Statistics" :bordered="false" :bodyStyle="{height:'200px'}">
              <a-row>
                <a-col :span="24">
                  <a-statistic title="Points earned" :value="linkInfo.points" style="margin-right: 50px" />
                </a-col>
              </a-row>
              <a-row class="mt-2">
                <a-col :span="12">
                  <a-statistic title="Today's income" :value="linkInfo.today" style="margin-right: 50px" />
                </a-col>
                <a-col :span="12">
                  <a-statistic title="Yesterday's income" :value="linkInfo.yesterday" />
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col  :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-card title="Link" :bordered="false" :bodyStyle="{height:'200px'}">
              <a-input v-if="linkInfo.link" class="" size="large" :value="linkInfo.link" readonly />
              <a-input v-else class="" size="large" value="You didn't promote the link" readonly />

              <button v-if="linkInfo.link" class="button is-primary is-fullwidth has-text-white mt-3" @click="copyText(linkInfo.link)">
                <span class="icon is-small"><i class="bi bi-copy"></i></span>
                <span>Copy</span>
              </button>
              <button v-else class="button is-primary is-fullwidth has-text-white mt-3" @click="getCreateLink">
                <span class="icon is-small"><i class="bi bi-pencil-square"></i></span>
                <span>Create Link</span>
              </button>
              <div class="py-2">
                <span class="is-size-6 has-text-black-light">Copy your own recommendation link and send it to your friends to participate in the survey</span>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="container my-5 px-3">
      <a-row>
        <a-col :span="24">
          <div class="is-flex is-align-items-center is-justify-content-space-between">
            <span class="is-size-4">Commission record</span>
          </div>
          <div>
            <div class="mt-3">
              <a-table sticky :showHeader="false" :dataSource="rebateList" :columns="columns" :pagination="rebate_pagination" @change="tableChange" :scroll="{x:1000}">
                <template v-slot:bodyCell="{text, record, index, column}">
                  <span>{{text}}</span>
                </template>
              </a-table>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>