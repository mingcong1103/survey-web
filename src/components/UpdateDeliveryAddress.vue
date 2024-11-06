<script>
import request from '../utils/request.js';
import { Modal } from 'ant-design-vue';
export default {
  name: "UpdateDeliveryAddress",
  data() {
    return {
      address: '',
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
          this.address = res.data.shipping_address;
        }else {
          console.log(res.msg);
        }
      });
    },
    submitInput() {
      request.post('/survey/user/updateShipPingAddress', {
        shipping_address: this.address
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
      this.address = '';
    }
  }
}
</script>

<template>
  <div class="field">
    <label class="label">Delivery address</label>
    <div class="control">
      <textarea class="textarea is-success" placeholder="" v-model="address"></textarea>
    </div>
  </div>
  <div class="field is-grouped">
    <div class="control">
      <button class="button is-primary px-6 has-text-white" @click="submitInput">
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