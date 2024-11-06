<script>
import request from "../utils/request.js";
import Footer from "../components/Footer.vue";
import {message} from "ant-design-vue";
export default {
  components: {Footer},
  data() {
    return {
      RecordList: [],
      Record_pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
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
    this.getRecordList()
  },
  methods: {
    async getRecordList() {
      request.post('/survey/order/order_list', {
        page: this.Record_pagination.current,
        limit: this.Record_pagination.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.RecordList = res.data.list
          this.Record_pagination.total = res.data.total
        }else {
          console.log(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    tableChange(e){
      this.Record_pagination.current = e.current;
      this.Record_pagination.pageSize = e.pageSize;
      this.getRebateList();
    },
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
              <p class="is-size-1 has-text-weight-bold">Questionnaire Record</p>
              <p class="is-size-6 has-text-grey">View the questionnaire record</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="container my-5 px-3">
      <a-table
      :columns="columns"
      :data-source="RecordList"
      :pagination="Record_pagination"
      :showHeader="true"
      @change="tableChange"
      :scroll="{x:1000}"
      >
        <template v-slot:bodyCell="{text, record, index, column}">
          <span v-if="column.key === 'status' && text === 1"><span class="tag is-success has-text-white">complete</span></span>
          <span v-else-if="column.key === 'status' && text === 0"><span class="tag is-warning has-text-white">uncompleted</span></span>
          <span v-else>{{text}}</span>
        </template>
      </a-table>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>