<template>
  <div class="field">
    <div class="control has-icons-left has-icons-right">
      <div class="box pl-3">
        <i class="bi bi-wallet2 mr-2"></i>
        <span><span class="has-text-weight-bold">Address</span>:{{old_address ? old_address : "No wallet address set" }}</span>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">New Wallet Address</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="text" placeholder="New Wallet Address" v-model="new_address">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-wallet2"></i>
        </span>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Confirm Wallet Address</label>
    <div class="control has-icons-left has-icons-right">
      <input class="input is-success" type="text" placeholder="confirm Wallet Address" v-model="confirm_address">
      <span class="icon-text has-text-black-light">
        <span class="icon is-small is-left">
          <i class="bi bi-wallet2"></i>
        </span>
      </span>
    </div>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button class="button is-primary px-6 has-text-white" @click="submitUpdateWallet">
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
<script>
import request from '../utils/request.js';
import {message, Modal} from 'ant-design-vue';
export default {
  name: 'UpdateWallet',
  data() {
    return {
      old_address: '',
      new_address: '',
      confirm_address: ''
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
          this.old_address = res.data.wallet_address;
        }else {
          console.log(res.msg);
        }
      });
    },
    submitUpdateWallet() {
      if (this.new_address !== this.confirm_address) {
        message.warning('The two addresses are inconsistent');
        return;
      }
      request.post('/survey/user/updateWalletAddress',{
        wallet_address: this.new_address,
      }).then(res => {
        if (res.code === 200) {
          Modal.success({
            title: 'Success',
            content: res.msg,
            onOk: () => {
              this.$router.go(0);
            }
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
      this.new_address = '';
      this.confirm_address = '';
    }
  }
}

</script>