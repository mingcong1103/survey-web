<script>
import request from '../utils/request.js';
import { Modal } from 'ant-design-vue';
import { message } from 'ant-design-vue';
export default {
  name: "UpdateMailbox",
  data() {
    return {
      countdown: 60,
      new_email: '',
      code: '',
      confirm_password: ''
    }
  },
  methods:{
    // 发送验证码
    SendCode() {
      request.post('/survey/user/sendUpdateEmailCode', {
        email: this.new_email
      }).then(res => {
        if (res.code === 200) {
          message.success(res.msg);
          let timer = setInterval(() => {
            if (this.countdown === 0) {
              clearInterval(timer);
              this.countdown = 60;
            } else {
              this.countdown--;
              console.log(this.countdown);
            }
          }, 1000);
        } else {
          message.warning(res.msg);
        }
      });
    },
    submitUpdateEmail() {
      request.post('/survey/user/updateEmailAddress', {
        email: this.new_email,
        code: this.code
      }).then(res => {
        if (res.code === 200) {
          Modal.success({
            title: 'Success',
            content: res.msg,
            onOk: () => {
              this.$router.go(0);
            }
          });
        } else {
          Modal.warning({
            title: 'Warning',
            content: res.msg
          });
        }
      });
    },
    clearInput() {
      this.new_email = '';
      this.code = '';
    }
  }
}
</script>

<template>
  <label class="label">New Email</label>
  <div class="field is-grouped">
    <div class="control has-icons-left has-icons-right is-expanded">
      <input class="input is-success" type="text" placeholder="New Email" v-model="new_email" autocomplete="off">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-envelope"></i>
        </span>
      </span>
    </div>
    <div class="control">
      <button v-if="countdown=== 60" class="button is-primary has-text-white px-5" @click="SendCode">
        <span class="icon is-small">
        <i class="bi bi-send"></i>
        </span>
        <span>Send</span>
      </button>
      <button v-else class="button is-primary has-text-white px-5" disabled>
        <span class="icon is-small">
        <i class="bi bi-send"></i>
        </span>
        <span>{{ countdown }}</span>
      </button>
    </div>
  </div>
  <div class="field">
    <label class="label">Verification Code</label>
    <div class="control">
      <input class="input is-success" type="number" placeholder="Verification Code" v-model="code" autocomplete="off">
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-primary px-6 has-text-white" @click="submitUpdateEmail">
        <span class="icon is-small">
          <i class="bi bi-check-circle"></i>
        </span>
        <span>Submit</span>
      </button>
    </div>
    <div class="control">
      <button class="button px-6 is-light has-text-danger" @click="clearInput">
        <span class="icon is-small">
          <i class="bi bi-trash3"></i>
        </span>
        <span>Cancel</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>