<template>
  <div class="form-box py-5 px-3">
    <a-card :bordered="false" style="width: 500px;">
      <div class="form">
        <div class="is-flex">
          <span class="title">WELCOME LOGIN</span>
          <a @click="changeGoogleKey" class="ml-3 has-text-primary"><i class="bi bi-shield-lock is-size-6"></i></a>
        </div>
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
                name="username"
            >
              <a-input v-model:value="formState.username" placeholder="Email address" size="large"/>
            </a-form-item>

            <a-form-item
                label="Password"
                name="password"
            >
              <a-input-password v-model:value="formState.password" placeholder="Password" size="large"/>
            </a-form-item>

            <a-form-item
                v-show="googleKey"
                label="Google Authenticator"
                name="authKey"
            >
              <a-input v-model:value="formState.authKey" placeholder="Auth Key" size="large"/>
            </a-form-item>

            <div>
              <a-row>
                <a-col :span="12">
                  <a-form-item name="remember">
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <div class="is-flex is-justify-content-right">
                    <router-link class="has-text-grey" to="/forgetPassword">Forget password</router-link>
                  </div>
                </a-col>
              </a-row>
            </div>
            <a-form-item>
              <a-button
                  size="large"
                  :disabled="formState.username === '' || formState.password === ''"
                  type="primary"
                  html-type="submit"
                  block
                  @click="handleSubmit"
                  :loading="loginLoading"
              >Log in</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import request from "../utils/request.js";
import {message} from "ant-design-vue";
import { Modal } from 'ant-design-vue';
import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
      secretKey:"KW,3f;l1<TTu*`W3,fKS#/S=g-Wf(x^OLqV@#bE)kl,e%3h!5-#8~irxJ85Dzh}8",
      googleKey:false,
      loginLoading:false,
      formState: {
        username: '',
        password: '',
        authKey: '',
        remember: true,
      },
      formRules: {
        username: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email', trigger: 'blur' },
        ],
        password: [
            { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }
        ],
        authKey: [
          { required: false, message: 'Please input auth key', trigger: 'blur' },
          { min: 6, message: 'Auth key length must be greater than 6', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    // 检查是否有记住密码
    let loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      let bytes  = CryptoJS.AES.decrypt(loginInfo, this.secretKey);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      this.formState = JSON.parse(originalText);
    }
  },
  methods: {
    changeGoogleKey() {
      this.googleKey = !this.googleKey;
    },
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        // 这里可以添加登录逻辑
        this.loginLoading = true;
        request.post('/survey/user/login',{
          email: this.formState.username,
          password: this.formState.password,
          authKey: this.formState.authKey
        }).then(res => {
          if (res.code === 200) {
            if (this.formState.remember) {
              let loginInfo = {
                username: this.formState.username,
                password: this.formState.password,
                remember: this.formState.remember
              }
              let encryptText = CryptoJS.AES.encrypt(JSON.stringify(loginInfo),this.secretKey).toString();
              localStorage.setItem('loginInfo', encryptText);
            } else {
              localStorage.removeItem('loginInfo');
            }
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            this.$router.replace('/userCenter');
          }else {
            Modal.warning({
              title: 'Login failed',
              content: res.msg,
            });
          }
        }).catch(err => {
          message.error(err.data.msg);
        }).finally(() => {
          this.loginLoading = false;
        });
      }).catch(error => {
        console.log('error', error);
      })
    }
  }
};
</script>

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