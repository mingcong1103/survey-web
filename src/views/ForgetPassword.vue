<script>
import request from "../utils/request.js";
import {message} from "ant-design-vue";
import { Modal } from 'ant-design-vue';
export default {
  data(){
    return {
      countdown: 60,
      formState:{
        email: '',
        verifyCode: '',
        password: '',
        password_confirm: ''
      },
      formRules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email', trigger: 'blur' },
        ],
        verifyCode: [
          { required: true, message: 'Please input verify code', trigger: 'blur' },
          { min: 6, message: 'Verify code length must be greater than 6', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }
        ],
        password_confirm: [
          { required: true, message: 'Please input confirm password', trigger: 'blur' },
          { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async sendResetPasswordCode() {
      request.post('/survey/user/sendResetPasswordCode', {
        email: this.formState.email
      }).then(res => {
        if (res.code === 200) {
          let timer = setInterval(() => {
            if (this.countdown === 0) {
              clearInterval(timer);
              this.countdown = 60;
            } else {
              this.countdown--;
              console.log(this.countdown);
            }
          }, 1000);
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        request.post('/survey/user/resetPassword', {
          email: this.formState.email,
          code: this.formState.verifyCode,
          password: this.formState.password,
          password_confirm: this.formState.password_confirm
        }).then(res => {
          if (res.code === 200) {
            Modal.success({
              title: 'Password reset success',
              content: res.msg,
              onOk: () => {
                this.$router.replace("/login");
              }
            });
          } else {
            message.error(res.msg);
          }
        })
      })
    }
  }
}
</script>

<template>
  <div class="form-box py-5 px-3">
    <a-card :bordered="false" style="width: 500px;">
      <div class="form">
        <span class="title">FORGET PASSWORD</span>
        <div>
          <a-form
              ref="form"
              :model="formState"
              :rules="formRules"
              autocomplete="off"
              layout="vertical"
          >
            <a-form-item
                label="Email address"
                name="email"
            >
              <a-input v-model:value="formState.email" placeholder="Email address" size="large"/>
            </a-form-item>

            <a-form-item
                label="Verify code"
                name="verifyCode"
            >
              <a-input-search
                  v-model:value="formState.verifyCode"
                  placeholder="verify code"
                  size="large"
              >
                <template #enterButton>
                  <a-button v-if="countdown === 60" type="primary" @click="sendResetPasswordCode" :disabled="formState.email === ''" >Send</a-button>
                  <a-button v-else type="primary">{{ countdown }}</a-button>
                </template>
              </a-input-search>
            </a-form-item>

            <a-form-item
                label="Password"
                name="password"
            >
              <a-input v-model:value="formState.password" placeholder="Password" size="large"/>
            </a-form-item>

            <a-form-item
                label="Confirm password"
                name="password_confirm"
            >
              <a-input v-model:value="formState.password_confirm" placeholder="Confirm password" size="large"/>
            </a-form-item>

            <a-form-item>
              <a-button size="large"  type="primary" html-type="submit" block @click="handleSubmit" :disabled="formState.email === '' || formState.verifyCode === '' || formState.password === '' || formState.password_confirm === ''" >Confirm</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* 可选，使背景图固定 */
}

.form {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 22px;
}
</style>