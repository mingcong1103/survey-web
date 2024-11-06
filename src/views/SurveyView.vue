<script>
import request from "../utils/request.js";
import { message } from "ant-design-vue";
import Footer from "../components/Footer.vue";
export default {
  name: "SurveyView",
  components: {Footer},
  data(){
    return {
      surveyLoading:true,
      orderLimit: false,
      showSubmitButton: true,
      timer: null,
      countdown: 60,
      submitAnswer: null,
      radioStyle: {
        display: 'flex',
        paddingTop: '22px',
        paddingBottom: '5px',
      },
      orderInfo: {},
      RecordList: [],
      columns: [
        {
          title: 'Order',
          dataIndex: 'order',
          key: 'order',
          width: 200
        },
        {
          title: 'Problem_number',
          dataIndex: 'problem_number',
          key: 'problem_number',
          width: 200
        },
        {
          title: 'Schedule_number',
          dataIndex: 'schedule_number',
          key: 'schedule_number',
          width: 100
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 130
        },
        {
          title: 'Create Date',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 200
        }
      ]
    }
  },
  mounted() {
    this.create_order();
    this.getRecordList()
  },
  methods: {
    async getRecordList() {
      request.post('/survey/order/order_list', {
        page: 1,
        limit: 10
      }).then(res => {
        if (res.code === 200) {
          this.RecordList = res.data.list
        }else {
          console.log(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    async create_order(){
      request.post('/survey/order/create_order').then(res => {
        if (res.code === 200){
          this.orderInfo = res.data;
        }else if (res.code === 39999){
          this.$router.replace('/userCenter/verifyMailbox');
        }else if (res.code === 40001) {
          this.orderLimit = true;
        }
      }).catch(error => {
        message.error(error.data.msg);
      }).finally(() => {
        this.surveyLoading = false;
      });
    },
    async handleSubmit() {
      if (!this.submitAnswer) {
        message.warning('Please select an answer');
        return;
      }
      this.showSubmitButton = false;
      // 处理提交逻辑，例如发送到服务器
      request.post('/survey/order/submit_order',{
        order: this.orderInfo.order,
        answer: this.submitAnswer
      }).then(res => {
        this.timer = null;
        this.timer = setInterval(() => {
          if (this.countdown === 0) {
            clearInterval(this.timer);
            this.countdown = 60;
            this.showSubmitButton = true;
          } else {
            this.countdown--;
          }
        }, 1000);
        if (res.code === 200){
          this.create_order();
          this.submitAnswer = null;
        }else {
          message.warning(res.msg);
        }
      }).catch(error => {
        if (error.data.code === 429) {
          this.countdown = error.data.data.wait_seconds;
          this.timer = null;
          this.timer = setInterval(() => {
            if (this.countdown === 0) {
              clearInterval(this.timer);
              this.countdown = 60;
              this.showSubmitButton = true; // 重新显示提交按钮
            } else {
              this.countdown--;
            }
          }, 1000);
        }
        message.warning(error.data.msg);
      });
    }
  },
  computed:{
    orderProgress(){
      if (!this.orderInfo) return 0;
      if (!this.orderInfo.schedule_number || !this.orderInfo.problem_number) return 0;
      return this.orderInfo.schedule_number / this.orderInfo.problem_number * 100;
    },
    countdownProgress(){
      return this.countdown < 60;
    }
  }
}
</script>

<template>
  <div v-cloak>
    <div class="has-background-light">
      <div class="container py-5 px-3">
        <a-row :gutter="[32,32]">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
            <a-card :bordered="false" :bodyStyle="{minHeight:'340px'}">
              <div v-if="!orderLimit" class="is-flex is-flex-direction-column">
                <div class="pb-3">
                  <span class="is-size-6">{{orderInfo && orderInfo.problem ? orderInfo.problem.problem :'Loading...'}}</span>
                </div>
                <div class="is-flex is-flex-direction-column">
                  <a-radio-group v-model:value="submitAnswer" size="large">
                    <a-radio :style="radioStyle" value="A"><span class="is-clipped">{{orderInfo && orderInfo.problem ? orderInfo.problem.answer_a :'Loading...'}}</span></a-radio>
                    <a-radio :style="radioStyle" value="B"><span class="is-clipped">{{orderInfo && orderInfo.problem ? orderInfo.problem.answer_b :'Loading...'}}</span></a-radio>
                    <a-radio :style="radioStyle" value="C"><span class="is-clipped">{{orderInfo && orderInfo.problem ? orderInfo.problem.answer_c :'Loading...'}}</span></a-radio>
                    <a-radio :style="radioStyle" value="D"><span class="is-clipped">{{orderInfo && orderInfo.problem ? orderInfo.problem.answer_d :'Loading...'}}</span></a-radio>
                  </a-radio-group>
                </div>
                <div class="pt-3">
                  <button v-if="!showSubmitButton" class="button is-primary is-fullwidth has-text-white mt-2" type="button" disabled>Submit Answer({{countdown}}s)</button>
                  <button v-else class="button is-primary is-fullwidth has-text-white mt-2" type="button" @click="handleSubmit">Submit Answer</button>
                </div>
              </div>

              <a-result v-else status="warning" title="You have reached the order limit today, please come back tomorrow">
              </a-result>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <a-card :bordered="false" :bodyStyle="{minHeight:'340px'}">
              <div>
                <span class="is-size-6">Order ID: {{ orderInfo && orderInfo.order ?orderInfo.order:'Loading...' }}</span>
              </div>
              <a-progress
                  :stroke-color="{ '0%': '#04d1b2', '100%': '#87d068'}"
                  :percent="orderProgress"
              />
              <a-statistic title="Status">
                <template #formatter>
                  <i class="bi bi-check-circle-fill has-text-primary"></i>
                </template>
              </a-statistic>
              <a-statistic title="Scope" class="mt-1">
                <template #formatter>
                  <a-tag color="cyan">society</a-tag>
                  <a-tag color="cyan">military</a-tag>
                  <a-tag color="cyan">culture</a-tag>
                  <a-tag color="cyan">all</a-tag>
                </template>
              </a-statistic>
              <a-statistic title="Share">
                <template #formatter>
                  <a-tag color="#55acee">
                    <template #icon>
                      <i class="bi bi-twitter-x"></i>
                    </template>
                    Twitter
                  </a-tag>
                  <a-tag color="#cd201f">
                    <template #icon>
                      <i class="bi bi-youtube"></i>
                    </template>
                    Youtube
                  </a-tag>
                  <a-tag color="#3b5999">
                    <template #icon>
                      <i class="bi bi-facebook"></i>
                    </template>
                    Facebook
                  </a-tag>
                  <a-tag color="#55acee">
                    <template #icon>
                      <i class="bi bi-linkedin"></i>
                    </template>
                    LinkedIn
                  </a-tag>
                </template>
              </a-statistic>
              <div class="mt-3 is-flex is-justify-content-space-between">
                <router-link to="/userCenter/promotion" class="button is-fullwidth is-primary is-small has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-share"></i>
                    </span>
                  <span>Share</span>
                </router-link>
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
            <div>
              <span class="is-size-4">Order Record</span>
              <a-button @click="getRecordList" type="text" class="ml-1 is-size-6"><i class="bi bi-arrow-clockwise"></i></a-button>
            </div>

            <router-link to="/userCenter/questionnaireRecord" class="has-text-black">More</router-link>
          </div>
          <div>
            <div class="my-5 px-3">
              <a-table
                  :columns="columns"
                  :data-source="RecordList"
                  :showHeader="false"
                  :pagination="false"
                  :scroll="{x:1000}"
              >
                <template v-slot:bodyCell="{text, record, index, column}">
                  <span v-if="column.key === 'status' && text === 1"><span class="tag is-success has-text-white">complete</span></span>
                  <span v-else-if="column.key === 'status' && text === 0"><span class="tag is-warning has-text-white">uncompleted</span></span>
                  <span v-else>{{text}}</span>
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
.truncate-text {
  white-space:nowrap; /* 换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>