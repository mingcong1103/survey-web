<script>
  import request from "../utils/request.js";
  import UpdatePassWord from "../components/UpdatePassWord.vue";
  import UpdateMailbox from "../components/UpdateMailbox.vue";
  import UpdateWallet from "../components/UpdateWallet.vue";
  import UpdateDeliveryAddress from "../components/UpdateDeliveryAddress.vue";
  import GoogleAuthenticator from "../components/GoogleAuthenticator.vue";
  import {message} from "ant-design-vue";
  export default {
    components: {GoogleAuthenticator, UpdateDeliveryAddress, UpdateWallet, UpdateMailbox, UpdatePassWord},
    data() {
      return {
        userInfo:{},
        activeKey: ['1'],
        UserCustomStyle:{
          height: '300px',
        },
        helpList:[],
        customStyle: {
          height: '300px',
          overflowY: 'scroll',
          padding: '0',
        },
        text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
      }
    },
    mounted() {
      this.getUserInfo();
      this.getHelpList();
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
      getHelpList() {
        request.post('/survey/help/help_list').then(res => {
          if (res.code === 200) {
            this.helpList = res.data;
          } else {
            console.log(res.msg);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

<template>
  <div>
    <div class="has-background-light">
      <div class="container py-5 px-3">
        <a-row :gutter="[32,32]">
          <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <a-card class="p-0 m-0" title="You Info" :bordered="false" :bodyStyle="UserCustomStyle">
              <div class="is-flex is-flex-direction-column">
                <div class="is-flex is-justify-content-space-between">
                  <span class="is-size-6">First Name:</span>
                  <span class="is-size-6">{{ userInfo.first_name }}</span>
                </div>
                <div class="mt-3 is-flex is-justify-content-space-between">
                  <span class="is-size-6">Last Name:</span>
                  <span class="is-size-6">{{ userInfo.last_name }}</span>
                </div>
                <div class="mt-3 is-flex is-justify-content-space-between">
                  <span class="is-size-6">Email:</span>
                  <span class="is-size-6">{{ userInfo.email }}</span>
                </div>
                <div class="mt-3 is-flex is-justify-content-space-between">
                  <span class="is-size-6">Wallet Address:</span>
                  <span class="is-size-6 is-lowercase">{{ userInfo.wallet_address }}</span>
                </div>
                <div class="mt-3 is-flex is-justify-content-space-between">
                  <span class="is-size-6 text-label">Shipping Address:</span>
                  <span class="is-size-6 is-lowercase truncate-text">{{ userInfo.shipping_address }}</span>
                </div>
                <div class="my-5 is-flex is-justify-content-center is-align-items-center">
                  <router-link to="/userCenter/clientArea" class="button is-fullwidth is-primary mr-2 has-text-white">
                    <span class="icon is-small">
                      <i class="bi bi-send"></i>
                    </span>
                    <span>User Center</span>
                  </router-link>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
            <a-card title="FAQ" :bordered="false" :bodyStyle="customStyle">
              <a-collapse ghost>
                <a-collapse-panel v-for="(item,index) in helpList" :key="index" :header="item.title">
                  <p>{{ item.content }}</p>
                </a-collapse-panel>
              </a-collapse>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="has-background-white">
      <div class="container">
        <div class="py-5 px-3">
          <a-tabs>
            <a-tab-pane key="1" force-render>
              <template #tab>
                <i class="bi bi-person-lock"></i>
                Change Password
              </template>
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <UpdatePassWord></UpdatePassWord>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" force-render>
              <template #tab>
                <i class="bi bi-envelope"></i>
                Update Mailbox
              </template>
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <UpdateMailbox></UpdateMailbox>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <i class="bi bi-wallet2"></i>
                Update Wallet
              </template>
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <UpdateWallet></UpdateWallet>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="4" force-render>
              <template #tab>
                <i class="bi bi-truck-front"></i>
                Update delivery address
              </template>
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <UpdateDeliveryAddress></UpdateDeliveryAddress>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="5" force-render>
              <template #tab>
                <i class="bi bi-key"></i>
                Google Authenticator
              </template>
              <a-row>
                <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <GoogleAuthenticator></GoogleAuthenticator>
                </a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.truncate-text {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden;    /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.text-label {
  min-width: 200px;
}
</style>