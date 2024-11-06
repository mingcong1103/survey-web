<template>
  <div class="form-box py-5 px-3">
    <a-card :bordered="false" style="width: 500px;">
      <div class="form">
        <span class="title">CREATE NEW ACCOUNT</span>
        <div>
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
              <a-button type="primary" size="large"  html-type="submit" block @click="handleSubmit">sign up</a-button>
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
      },
      formState: {
        username: '',
        password: '',
        remember: true,
      },
      formRules: {
        username: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email', trigger: 'blur' },
        ],
        password: [{ required: true, message: 'Please input password', trigger: 'blur' }, { min: 8, message: 'Password length must be greater than 8', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    let loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      let bytes  = CryptoJS.AES.decrypt(loginInfo, this.secretKey);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      this.formState = JSON.parse(originalText);
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate().then(() => {
        // 这里可以添加登录逻辑
        request.post('/survey/user/login',{
          email: this.formState.username,
          password: this.formState.password
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
        });
      }).catch(error => {
        console.log('error', error);
      });
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