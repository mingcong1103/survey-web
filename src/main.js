import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// 引入state
import store from "./store/index.js";
// 引入复制
import VueClipboard from 'vue-clipboard2'
// 引入bluma
import 'bulma/css/bulma.css'
import router from './router/index.js'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueClipboard)
app.mount('#app')
