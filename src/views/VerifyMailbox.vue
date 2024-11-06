<script>
import request from "../utils/request.js";
import {message} from "ant-design-vue";
import { Modal } from 'ant-design-vue';
import Footer from "../components/Footer.vue";
export default {
  components: {Footer},
  data(){
    return {
      countdown: 60,
      formState: {
        email: '',
        verifyCode: '',
        password: '',
        password_confirm: ''
      },
      formRules: {
        email: [
          {required: true, message: 'Please input email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email', trigger: 'blur'},
        ],
        verifyCode: [
          {required: true, message: 'Please input verify code', trigger: 'blur'},
          {min: 6, message: 'Verify code length must be greater than 6', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async sendVerifyEmailCode() {
      request.post('/survey/user/sendVerifyEmailCode', {
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
        request.post('/survey/user/verifyEmail', {
          code: this.formState.verifyCode,
        }).then(res => {
          if (res.code === 200) {
            Modal.success({
              title: "Verify success",
              content: res.msg,
              onOk: () => {
                this.$router.replace("/userCenter/clientArea");
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
  <div>
    <div class="form-box py-5 px-3">
      <a-card :bordered="false" style="width: 500px;">
        <div class="form">
          <span class="title">VERIFY MAILBOX</span>
          <div>
            <a-form
                ref="form"
                :model="formState"
                :rules="formRules"
                autocomplete="off"
                layout="vertical"
            >

              <a-form-item
                  label="Verify code"
                  name="verifyCode"
              >
                <a-input-search
                    v-model:value="formState.verifyCode"
                    placeholder="Verify code"
                    size="large"
                >
                  <template #enterButton>
                    <a-button
                        v-if="countdown === 60"
                        type="primary"
                        @click="sendVerifyEmailCode"
                    >
                      Send
                    </a-button>
                    <a-button v-else type="primary">{{ countdown }}</a-button>
                  </template>
                </a-input-search>
              </a-form-item>

              <a-form-item>
                <a-button size="large" type="primary" html-type="submit" block @click="handleSubmit"
                          :disabled="formState.verifyCode === ''">
                  Verify
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </a-card>
    </div>
    <Footer></Footer>
  </div>

</template>

<style scoped>
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: rgba(0, 0, 0, 0.02);
  background: url("../assets/bg-two.jpeg");
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