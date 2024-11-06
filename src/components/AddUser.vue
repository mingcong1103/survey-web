<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import request from '../utils/request.js';
const form = ref();
const addUserForm = ref({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
});
const addUserRules = ref({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email', trigger: 'blur' },
  ],
  first_name: [{ required: true, message: 'Please input first name', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Please input last name', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
});
function getAddUser(){
  request.post('/survey/user/createSubordinate',addUserForm).then(res => {
    if (res.code === 200) {
      message.success(res.msg);
      this.enableAddUserModal = false;
      this.getRecordList();
    } else {
      message.error(res.msg);
    }
  }).catch(err => {
    message.error(err.data.msg);
  });
}

function handleSubmit(e) {
  console.log('提交表单',addUserForm);
  form.value.validate().then(() => {
    getAddUser();
  })
  .catch(error => {
    console.log('error', error);
  });
}
</script>

<template>
  <a-form
      ref="form"
      autocomplete="off"
      :model="addUserForm"
      layout="vertical"
      :rules="addUserRules"
      @submit="handleSubmit"
  >
    <a-form-item
        label="Email"
        name="email"
    >
      <a-input v-model:value="addUserForm.email"  placeholder="Email" />
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
    <a-form-item>
      <a-button type="primary" html-type="submit" block>注册</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>

</style>