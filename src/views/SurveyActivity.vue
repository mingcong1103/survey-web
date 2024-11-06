<script >
import Footer from "../components/Footer.vue";
import request from "../utils/request.js";
import { message } from "ant-design-vue";
import dayjs  from "dayjs";
export default {
  data(){
    return {
      activityColumns: [
        {
          title: 'Activity Name',
          dataIndex: 'activity_title',
          key: 'activity_title',
          width: 300
        },
        {
          title: 'Activity Desc',
          dataIndex: 'activity_desc',
          key: 'activity_desc',
          width: 600
        },
        {
          title: 'Bonus Points',
          dataIndex: 'bonus_points',
          key: 'bonus_points',
          width: 120
        },
        {
          title: 'Order Quantity',
          dataIndex: 'order_quantity',
          key: 'order_quantity',
          width: 200
        },
        {
          title: 'End Time',
          dataIndex: 'end_time',
          key: 'end_time',
          width: 200
        },
        {
          title: 'operate',
          key: 'operate',
          width: 100
        }
      ],
      activityList: [],
      myActivityColumns: [
        {
          title: 'Activity Name',
          dataIndex: ['activity', 'activity_title'],
          key: 'activity_title',
          width: 400
        },
        {
          title: 'Checkin Time',
          dataIndex: 'checkin_time',
          key: 'checkin_time',
          width: 300
        },
        {
          title: 'Bonus Points',
          dataIndex: 'bonus_points',
          key: 'bonus_points',
          width: 200
        },
        {
          title: 'Order Quantity',
          dataIndex: ['activity', 'order_quantity'],
          key: 'order_quantity',
          width: 300
        },
        {
          title: 'consecutive_days',
          dataIndex: 'consecutive_days',
          key: 'consecutive_days',
          width: 200
        },
        {
          title: 'Create Date',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 300
        },
        {
          title: 'operate',
          key: 'operate',
          width: 100
        }
      ],
      myActivityList: [],
    }
  },
  mounted() {
    this.getActivityList();
    this.getMyActivityList();
  },
  methods:{
    dayjs,
    async getActivityList() {
      request.post('/survey/activity/activity_list').then(res => {
        if (res.code === 200) {
          this.activityList = res.data;
        } else {
          message.error(res.msg);
        }
      }).catch(err => {
        message.error(err);
      })
    },
    async getMyActivityList() {
      request.post('/survey/activity/my_activity').then(res => {
        if (res.code === 200) {
          this.myActivityList = res.data;
        } else {
          message.error(res.msg);
        }
      }).catch(err => {
        message.error(err);
      })
    },
    async receiveActivity(activity_id){
      request.post('/survey/activity/receive_activity',{
        activity_id: activity_id
      }).then(res => {
        if (res.code === 200) {
          message.success(res.msg);
          this.getMyActivityList();
        } else {
          message.warning(res.msg);
        }
      }).catch(err => {
        message.error(err);
      })
    },
    async checkinActivity(activity_id){
      request.post('/survey/activity/checkin',{
        activity_id: activity_id
      }).then(res => {
        if (res.code === 200) {
          message.success(res.msg);
          this.getMyActivityList();
        } else {
          message.warning(res.msg);
        }
      }).catch(err => {
        message.error(err);
      })
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
    },
    noeDate(){
      const currentTimestamp = Date.now();
      // 将时间戳转换为 Date 对象
      const currentDate = new Date(currentTimestamp);

      // 格式化日期为 "YYYY-MM-DD" 格式
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<template>
<div>
  <div class="has-background-light">
    <div class="container py-5 px-3">
      <a-row :gutter="[32,32]">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-card title="Activity List" :bordered="false">
            <a-table :showHeader="false" :columns="activityColumns" :data-source="activityList" :pagination="false" :scroll="{x:1200}">
              <template #bodyCell="{ text, record, index, column }">
                <template v-if="column.dataIndex === 'order_quantity'">
                  <div><span class="pr-1">{{ text }}</span><i class="bi bi-hourglass"></i></div>
                </template>
                <template v-if="column.key === 'end_time'">
                  <div><span class="pr-1">{{ formatCreatedAt(text) }}</span></div>
                </template>
                <template v-if="column.key === 'bonus_points'">
                  <div><span class="pr-1">{{ text }}</span><i class="bi bi-database"></i></div>
                </template>
                <template v-if="column.key === 'operate'">
                  <a-button type="primary" @click="receiveActivity(record.id)">
                    <span class="icon is-small">
                      <i class="bi bi-check-circle"></i>
                    </span>
                    <span class="ml-1">choose it</span>
                    </a-button>
                </template>
              </template>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
      <div class="mt-3">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <a-card title="My Activity" :bordered="false">
              <a-row>
                <a-table :showHeader="false" :columns="myActivityColumns" :data-source="myActivityList" :pagination="false" :scroll="{x:1270}">
                  <template #bodyCell="{ text, record, index, column }">
                    <template v-if="column.key === 'bonus_points'">
                      <a-tooltip>
                        <template #title>Bonus Points</template>
                        <div><span class="pr-1">{{ text }}</span><i class="bi bi-database"></i></div>
                      </a-tooltip>
                    </template>
                    <template v-if="column.key === 'order_quantity'">
                      <a-tooltip>
                        <template #title>Order Quantity</template>
                        <div><span class="pr-1">{{ text }}</span><i class="bi bi-hourglass"></i></div>
                      </a-tooltip>
                    </template>
                    <template v-if="column.key === 'consecutive_days'">
                      <a-tooltip>
                        <template #title>Consecutive Days</template>
                        <div><span class="pr-1">{{ text }}</span><i class="bi bi-sun"></i></div>
                      </a-tooltip>
                    </template>
                    <template v-if="column.key === 'created_at'">
                      <a-tooltip>
                        <template #title>Created Date</template>
                        <div><span class="pr-1">{{ text }}</span></div>
                      </a-tooltip>
                    </template>
                    <template v-if="column.key === 'operate'">
                      <a-button type="primary" @click="checkinActivity(record.activity_id)" :disabled="formatCreatedAt(record.checkin_time) === noeDate()">
                        <span class="icon is-small">
                          <i class="bi bi-check-square"></i>
                        </span>
                        <span class="ml-1">Sign in</span>
                      </a-button>
                    </template>
                  </template>
                </a-table>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="mt-3">
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <a-card :bordered="false">
              <p>Activity Rules</p>
              <ul>
                <li>1. Select the task you want to complete in the task list. Once you successfully receive the task, you cannot change it.</li>
                <li>2. The accumulated sign-in points will be automatically cleared if the task requirements are not completed or the activity ends.</li>
                <li>3. The activity can be signed in once a day, and the bonus points will be automatically cleared after the activity ends.</li>
                <li>4. Complete the tasks within the validity period of the event, and the accumulated reward points will be automatically issued to your account</li>
              </ul>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
  <Footer></Footer>
</div>
</template>

<style scoped>

</style>