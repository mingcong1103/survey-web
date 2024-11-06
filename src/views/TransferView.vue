<script>
import {message} from "ant-design-vue";
import request from "../utils/request.js";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      current: 0,
      userInfo: {
        balance: 0.00,
        email: '',
      },
      transferInfo: {
        transferAmount: '',
        transferEmail: '',
        transferError: '',
      },
      stepItem: [
        {
          title: 'Send',
        },
        {
          title: 'Enter Amount',
        },
        {
          title: 'Confirm transfer',
        },
      ],
      transferData:[]
    };
  },
  mounted() {
    this.getUserInfo();
    this.getTransferData();
  },
  methods: {
    getUserInfo() {
      request.post('/survey/user/userinfo').then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    clearTransferInfo(){
      this.transferInfo = {
        transferAmount: '',
        transferEmail: '',
      }
      this.current = 0;
    },
    transferTo() {
      if(this.current === 0){
        if(this.transferInfo.transferEmail === '' || !this.isValidEmail(this.transferInfo.transferEmail)){
          message.error('Please enter the email address to transfer to');
          return;
        }
      }
      if(this.current === 1){
        if(this.transferInfo.transferAmount === null || this.transferInfo.transferAmount <= 0){
          message.error('Please enter the amount you want to transfer');
          return;
        }
      }
      this.current += 1;
      if(this.current === 3){
        setTimeout(() => {
          request.post('/survey/transfer/transfer_balance',{
            balance: this.transferInfo.transferAmount,
            email: this.transferInfo.transferEmail
          }).then(res => {
            if (res.code === 200) {
              this.current = 4;
              setTimeout(() => {
                this.getTransferData();
                this.getUserInfo();
              }, 3000);
            }else {
              this.transferInfo.transferError = res.msg;
              this.current = 5;
            }
          });
        }, 3000);

      }

    },
    getTransferData(){
      request.post('/survey/transfer/transfer_list',{
        page: 1,
        limit: 10
      }).then(res => {
        if (res.code === 200) {
          this.transferData = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    transferBack(){
      this.current--;
    },
    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    },
  },
}

</script>

<template>
  <div>
    <div class="has-background-light">
      <div class="container py-5 px-3">
        <p class="is-size-1 has-text-weight-bold">Wallet Transfer</p>
        <p class="is-size-6 has-text-grey">Binance Pay is a digital wallet that allows you to make payments with your Binance account.</p>
      </div>
    </div>
    <div class="container pt-5 px-3">
      <a-row :gutter="[16,32]">
        <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <a-card title="Wallet Info" style="min-height: 400px;">
            <div>
              <a-statistic title="Account Balance" :precision="2" :value="userInfo.balance" />
              <a-statistic title="Wallet Type" class="mt-2" :precision="2" value="Binance Pay" />
              <a-statistic title="Wallet Address" class="mt-2" :precision="2" :value="userInfo.wallet_address ? userInfo.wallet_address :'No wallet address set'" />
              <div class="mt-6 is-flex is-justify-content-space-between">
                <router-link to="/userCenter/wallet" class="button is-fullwidth is-primary mr-2 has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-wallet2"></i>
                    </span>
                    <span>Wallet</span>
                  </router-link>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
          <a-card style="min-height: 400px;" :bordered="true">
            <div>
                <a-steps :current="current" size="default" :items="stepItem"></a-steps>
                <div class="steps-content">
                  <div v-if="current === 0">
                    <p class="mt-6 is-size-5 has-text-grey">Enter the email address to transfer to</p>
                    <div class="field mt-5">
                      <div class="control has-icons-left has-icons-right is-expanded">
                        <input class="input is-success" type="email" placeholder="Email" v-model="transferInfo.transferEmail" autocomplete="off">
                        <span class="icon-text has-text-black-light">
                          <span class="icon is-small is-left">
                            <i class="bi bi-envelope"></i>
                          </span>
                        </span>
                      </div>
                    </div>
                    <button class="button is-primary is-fullwidth has-text-white mt-6" @click="transferTo">
                      <span class="icon is-small">
                        <i class="bi bi-check-lg"></i>
                      </span>
                      <span>Continue</span>
                      </button>
                  </div>
                  <div v-if="current === 1">
                    <p class="mt-6 is-size-5 has-text-grey">Enter the amount you want to transfer</p>
                    <div class="field mt-5">
                      <div class="control has-icons-left has-icons-right is-expanded">
                        <input class="input is-success" type="number" placeholder="Amount" v-model="transferInfo.transferAmount" autocomplete="off">
                        <span class="icon-text has-text-black-light">
                          <span class="icon is-small is-left">
                            <i class="bi bi-envelope"></i>
                          </span>
                        </span>
                      </div>
                    </div>
                    <button class="button is-primary is-fullwidth has-text-white mt-6" @click="transferTo">
                      <span class="icon is-small">
                        <i class="bi bi-check-lg"></i>
                      </span>
                      <span>Continue</span>
                    </button>
                    <button class="button is-light is-fullwidth has-text-danger mt-1" @click="transferBack">
                      <span class="icon is-small">
                        <i class="bi bi-arrow-return-left"></i>
                      </span>
                      <span>Previous</span>
                    </button>
                  </div>
                  <div v-if="current === 2">
                    <p class="mt-2 is-size-5 has-text-grey">Please confirm the transfer information</p>
                    <div>
                      <p class="mt-6 is-size-6">Amount: {{ transferInfo.transferAmount }}</p>
                      <p class="mt-1 is-size-6">Transfer to: {{ transferInfo.transferEmail }}</p>
                    </div>
                    <button class="button is-primary is-fullwidth has-text-white mt-6" @click="transferTo">
                      <span class="icon is-small">
                        <i class="bi bi-check-lg"></i>
                      </span>
                      <span>Confirm</span>
                      </button>
                    <button class="button is-light is-fullwidth has-text-danger mt-1" @click="transferBack">
                      <span class="icon is-small">
                        <i class="bi bi-arrow-return-left"></i>
                      </span>
                      <span>Previous</span>
                    </button>
                  </div>
                  <div class="is-flex is-justify-content-center is-flex-direction-column" v-if="current === 3">
                    <p class="mt-6 is-size-5 has-text-grey">Loading...</p>
                    <a-spin class="mt-6 " size="large" />
                  </div>
                  <div v-if="current === 4">
                    <a-result
                        status="success"
                        title="Successfully transferred"
                        sub-title="Points have been transferred successfully and are credited to your account in real time."
                    >
                      <template #extra>
                        <a-button key="continue" type="primary" @click="clearTransferInfo">Continue to transfer</a-button>
                      </template>
                    </a-result>
                  </div>
                  <div v-if="current === 5">
                    <a-result
                        status="error"
                        title="Transferred Submission Failed"
                        :sub-title="'The transfer failed,' + transferInfo.transferError"
                    >
                      <template #extra>
                        <a-button key="continue" type="primary" @click="clearTransferInfo">
                          <span class="icon">
                            <i class="bi bi-send"></i>
                          </span>
                          <span>Continue to transfer</span>
                          </a-button>
                      </template>
                    </a-result>
                  </div>
                </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="container my-5 px-3">
      <a-row>
        <a-col :span="24">
          <div class="is-flex is-align-items-center is-justify-content-space-between">
            <span class="is-size-4">Transfer Record</span>
            <span class="">More</span>
          </div>
          <div>
            <a-list item-layout="horizontal" :data-source="transferData">
              <template #renderItem="{ item }">
                <a-list-item>
                  <template #actions>
                    <span class="has-text-grey-dark is-size-6">-{{ item.balance }}</span>
                  </template>
                  <a-list-item-meta :description="item.created_at">
                    <template #title>
                      <span>{{item.to_username}}</span>
                    </template>
                    <template #avatar>
                      <a-avatar class="has-background-primary is-capitalized" :size="40">{{ item.to_user.first_name.charAt(0) }}</a-avatar>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </a-col>
      </a-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.steps-content {
  display: flex;
  justify-content: center;
}
</style>