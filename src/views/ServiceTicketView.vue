<script>
import request from "../utils/request.js";
import Footer from "../components/Footer.vue";
import {message} from "ant-design-vue";

export default {
  components: {Footer },
  data() {
    return {
      html: '',
      columns: [
        {
          title: 'title',
          dataIndex: 'title',
          key: 'title',
          width: 200,
          ellipsis: true,
        },
        {
          title: 'description',
          dataIndex: 'description',
          key: 'description',
          width: 200,
          ellipsis: true,
        },
        {
          title: 'reply_content',
          dataIndex: 'reply_content',
          key: 'reply_content',
          width: 200
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 200
        },
        {
          title: 'Create Date',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 200
        }
      ],
      ticketData:[],
      title:"",
    }
  },
  mounted() {
    this.getTicketData();
  },
  methods: {
    getTicketData(){
      request.post('/survey/ticket/ticket_list',{
        page: 1,
        limit: 10
      }).then(res => {
        if (res.code === 200) {
          this.ticketData = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    createTicket(){
      if (this.title === '' || this.html === '') {
        message.error("Please enter the title and description");
        return;
      }
      request.post('/survey/ticket/create_ticket',{
        title: this.title,
        description: this.html
      }).then(res => {
        if (res.code === 200) {
          message.success("Create a service ticket successfully");
          setTimeout(() => {
            this.getTicketData();
            this.title = "";
            this.html = "";
          }, 1000);
        }else {
          message.error(res.msg);
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
              <p class="is-size-1 has-text-weight-bold">Service TicKet</p>
              <p class="is-size-6 has-text-grey">Use the customer service ticket and we will help you as quickly as possible</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="container">
      <div class="pt-5 px-3 is-bordered">
        <div class="field">
          <label class="label has-text-weight-normal">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Enter a title" v-model="title">
          </div>
        </div>
        <div class="field">
          <label class="label has-text-weight-normal">Description</label>
            <div class="control">
              <textarea class="textarea" rows="10" placeholder="Enter a description" v-model="html"></textarea>
            </div>
          </div>
        </div>
      <div class="pt-5 px-3">
        <div class="is-flex is-justify-content-space-between">
          <span>Text length: {{ html.length }}</span>
          <button class="button is-primary has-text-white" @click="createTicket">Submit a service ticket</button>
        </div>
      </div>
    </div>
    <div class="container my-3 px-3">
      <a-row>
        <a-col :span="24">
          <div class="is-flex is-align-items-center is-justify-content-space-between">
            <span class="is-size-4">Service Ticket Record</span>
          </div>
          <div>
            <div class="my-5 px-3">
              <a-table
                  :columns="columns"
                  :data-source="ticketData"
                  :showHeader="false"
                  :pagination="false"
                  :scroll="{x:1000}"
              >
                <template v-slot:bodyCell="{text, record, index, column}">
                  <template v-if="column.dataIndex === 'title'">
                    <a-tooltip placement="topLeft" :title="text">
                      {{ text }}
                    </a-tooltip>
                  </template>
                  <template v-if="column.dataIndex === 'description'">
                    <a-tooltip placement="topLeft" :title="text">
                      {{ text }}
                    </a-tooltip>
                  </template>
                  <template v-if="column.dataIndex === 'reply_content'">
                    <a-tooltip placement="topLeft" :title="text">
                      {{ text }}
                    </a-tooltip>
                  </template>
                  <template v-if="column.dataIndex === 'status'">
                    <span v-if="text === 'open'" class="tag is-success has-text-white">{{ text }}</span>
                    <span v-else class="tag is-warning has-text-white">{{ text }}</span>
                  </template>
                  <template v-if="column.dataIndex === 'created_at'">
                    <a-tooltip placement="topLeft" :title="text">
                      {{ text }}
                    </a-tooltip>
                  </template>
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

<style src="@wangeditor/editor/dist/css/style.css"></style>