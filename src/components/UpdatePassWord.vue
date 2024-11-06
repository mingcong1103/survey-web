<template>
  <div class="field">
    <label class="label">Old Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="password" placeholder="Old Password" v-model="old_password">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-lock"></i>
        </span>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">New Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="password" placeholder="New Password" v-model="new_password">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-lock"></i>
        </span>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Confirm Password</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="password" placeholder="confirm Password" v-model="confirm_password">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-lock"></i>
        </span>
      </span>
    </div>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button type="button" class="button is-primary px-6 has-text-white" @click="getUpdatePassword">
        <span class="icon is-small">
          <i class="bi bi-check-circle"></i>
        </span>
        <span>Submit</span>
      </button>
    </div>
    <div class="control">
      <button type="button" class="button px-6 is-light has-text-danger" @click="clearInput">
        <span class="icon is-small">
          <i class="bi bi-trash3"></i>
        </span>
        <span>Cancel</span>
      </button>
    </div>
  </div>
</template>
<script>
import request from '../utils/request.js';
import { Modal } from 'ant-design-vue';
export default {
  name: 'UpdatePassWord',
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  methods: {
    getUpdatePassword() {
      request.post('/survey/user/updatePassword',{
        oldPassword: this.old_password,
        newPassword: this.new_password,
        confirmPassword: this.confirm_password
      }).then(res => {
        if (res.code === 200) {
          Modal.success({
            title: 'Success',
            content: res.msg
          });
        }else {
          Modal.warning({
            title: 'Warning',
            content: res.msg
          });
        }
      });
    },
    clearInput() {
      this.old_password = '';
      this.new_password = '';
      this.confirm_password = '';
    }
  }
}

</script>