<script>
import request from '../utils/request.js';
import { Modal } from 'ant-design-vue';
import { message } from 'ant-design-vue';
export default {
  data() {
    return {
      enableGoogleAuthenticationModal: false,
      disableGoogleAuthenticationModal: false,
      google_security: false,
      login_google: 0,
      secret: '',
      qrCode: '',
      code: ''
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      request.post('/survey/user/userinfo').then(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.google_security = res.data.google_security;
          this.login_google = res.data.login_google;
        } else {
          console.log(res.msg);
        }
      });
    },
    submitCloseGoogleCode() {
      if (this.code === '') {
        message.warning('Please enter the verification code');
        return;
      }
      request.post('/survey/user/closeGoogleSecurity', {
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
    enableGoogleAuthentication() {
      console.log('enableGoogleAuthentication');
      this.getGenerateSecurityCodeAndQrCode();
      this.enableGoogleAuthenticationModal = true;
    },
    disableGoogleAuthentication() {
      this.disableGoogleAuthenticationModal = true;
    },
    getGenerateSecurityCodeAndQrCode() {
      request.post('/survey/user/generateSecurityCodeAndQrCode').then(res => {
        if (res.code === 200) {
          console.log(res.data);
          this.secret = res.data.secret;
          this.qrCode = res.data.qrCode;
        } else {
          message.warning(res.msg);
        }
      });
    },
    submitVerifyGoogleCode() {
      if (this.code === '') {
        message.warning('Please enter the verification code');
        return;
      }
      request.post('/survey/user/verifyGoogleCode', {
        code: this.code,
        secret: this.secret
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
    submitGoogleSecurityOption() {
      request.post('/survey/user/googleSecurityOption', {
        login_google: this.login_google
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
    }
  }
}
</script>

<template>
  <div>
    <div v-if="!google_security" style="border: none" class="box has-background-warning has-text-white">
      <i class="bi is-small bi-exclamation-triangle-fill"></i>
      <span class="mx-2">Google Secure Authentication is not enabled</span>
      <button class="tag" @click="enableGoogleAuthentication">Enable</button>
    </div>
    <div v-else style="border: none" class="box has-background-success has-text-white">
      <i class="bi bi-check-circle-fill"></i>
      <span class="mx-2">Google Secure Authentication enabled</span>
      <button class="tag" @click="disableGoogleAuthentication">closure</button>
    </div>

    <div class="field is-narrow">
      <label class="label">Login requires Google Authentication</label>
      <div class="control">
        <div class="select is-success is-fullwidth">
          <select v-model="login_google">
            <option value="0">Close</option>
            <option value="1">Open</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary px-6 has-text-white" @click="submitGoogleSecurityOption">
        <span class="icon is-small">
          <i class="bi bi-check-circle"></i>
        </span>
          <span>Submit</span>
        </button>
      </div>
    </div>
    <a-modal
        :open="enableGoogleAuthenticationModal"
        ok-text="verify"
        cancel-text="Cancel"
        @cancel="enableGoogleAuthenticationModal = false"
        @ok="submitVerifyGoogleCode"
    >
      <div class="field">
        <label class="label">Security Key</label>
        <div class="control">
          <span class="tag is-warning is-size-6 mx-1">{{ secret }}</span>
        </div>
      </div>
      <div class="field">
        <label class="label">Quick QR Code</label>
        <div class="control">
          <a-image :preview="false" :width="200" :src="qrCode" />
        </div>
      </div>
      <div class="field">
        <label class="label">Verification Code</label>
        <div class="control">
          <input class="input is-success" type="number" placeholder="Verification Code" v-model="code" autocomplete="off">
        </div>
      </div>
    </a-modal>
    <a-modal
        :open="disableGoogleAuthenticationModal"
        title="Close Google Authenticator"
        ok-text="verify"
        cancel-text="Cancel"
        @cancel="disableGoogleAuthenticationModal = false"
        @ok="submitCloseGoogleCode"
    >
      <div class="field">
        <div class="control">
          <input class="input is-success" type="number" placeholder="Verification Code" v-model="code" autocomplete="off">
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>

</style>