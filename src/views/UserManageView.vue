<script>
import request from "../utils/request.js";
import {message} from "ant-design-vue";
import Footer from "../components/Footer.vue";

export default {
  components: {Footer},
  data() {
    return {
      enableAddUserModal: false,
      RecordList: [],
      Record_pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 200
        },
        {
          title: 'First Name',
          dataIndex: 'first_name',
          key: 'first_name',
          width: 200
        },
        {
          title: 'Last Name',
          dataIndex: 'last_name',
          key: 'last_name',
          width: 200
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: 130
        },
        {
          title: 'Email Verify',
          dataIndex: 'email_verify',
          key: 'email_verify',
          width: 130
        },
        {
          title: 'Create Date',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 200
        }
      ],
      addUserForm: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirm: '',
      },
      addUserRules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email', trigger: 'blur' },
        ],
        first_name: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
        last_name: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
        password: [{ required: true, message: 'Please input password', trigger: 'blur' }, { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }],
        password_confirm: [{ required: true, message: 'Please input confirm password', trigger: 'blur' }, { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }],
      }
    }
  },
  mounted() {
    this.getRecordList()
  },
  methods: {
    async getRecordList() {
      request.post('/survey/user/subordinateList', {
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
    tableChange(pagination, filters, sorter) {
      this.Record_pagination.current = pagination.current
      this.Record_pagination.pageSize = pagination.pageSize
      this.getRecordList()
    },
    openAddUserModal() {
      this.enableAddUserModal = true
    },
    getAddUser(){
      request.post('/survey/user/createSubordinate', this.addUserForm).then(res => {
        if (res.code === 200) {
          message.success(res.msg);
          this.enableAddUserModal = false;
          this.getRecordList();
          this.addUserForm = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            password_confirm: '',
          }
        } else {
          message.error(res.msg);
        }
      }).catch(err => {
        message.error(err.data.msg);
      });
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        this.getAddUser();
      }).catch(error => {
        console.log('error', error);
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
              <p class="is-size-1 has-text-weight-bold">User Manage</p>
              <p class="is-size-6 has-text-grey">Manage your subordinate users and help others create accounts</p>
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
          style="min-height: 400px;"
      >
        <template v-slot:bodyCell="{text, record, index, column}">
          <span v-if="column.key === 'status' && text === 'NORMAL'"><span class="tag is-success has-text-white">{{text}}</span></span>
          <span v-else-if="column.key === 'status' && text === 'BANNED'"><span class="tag is-danger has-text-white">{{text}}</span></span>
          <span v-else-if="column.key === 'status' && text === 'ABNORMAL'"><span class="tag is-warning has-text-white">{{text}}</span></span>
          <span v-else-if="column.key === 'email_verify' && text === 0"><span class="tag is-warning has-text-white">unverified</span></span>
          <span v-else-if="column.key === 'email_verify' && text === 1"><span class="tag is-success has-text-white">verified</span></span>
          <span v-else>{{text}}</span>
        </template>
      </a-table>
    </div>
    <a-float-button type="primary" @click="openAddUserModal">
      <template #icon>
        <span class="icon is-small">
          <i class="bi bi-person-plus"></i>
        </span>
      </template>
    </a-float-button>
    <a-modal
        :open="enableAddUserModal"
        :ok-button-props="{ hidden: true }"
        :cancel-button-props="{ hidden: true }"
        @cancel="enableAddUserModal = false"
    >
      <a-form
          ref="form"
          autocomplete="off"
          layout="vertical"
          :model="addUserForm"
          :rules="addUserRules"
      >
        <a-form-item
            label="Email"
            name="email"
        >
          <a-input  v-model:value="addUserForm.email"  placeholder="Email" />
        </a-form-item>
        <div>
          <a-row :gutter=[8]>
            <a-col :span="12">
              <a-form-item label="First Name" name="first_name">
                <a-input v-model:value="addUserForm.first_name" placeholder="First Name" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Last Name" name="last_name">
                <a-input v-model:value="addUserForm.last_name" placeholder="Last Name" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <a-form-item label="Password" name="password">
          <a-input-password v-model:value="addUserForm.password" placeholder="Password" />
        </a-form-item>
        <a-form-item label="Confirm password" name="password_confirm">
          <a-input-password v-model:value="addUserForm.password_confirm" placeholder="Confirm password" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block @click="handleSubmit">Add</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>