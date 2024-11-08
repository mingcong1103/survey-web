import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
// 导入你的路由组件
import Home from "../views/HomeView.vue"
import Login from "../views/LoginView.vue"
import Register from "../views/RegisterView.vue"
import UserCenter from "../views/UserCenterView.vue"
import ClientArea from "../views/ClientAreaView.vue"
import Profile from "../views/ProfileView.vue"
import Wallet from "../views/WalletView.vue"
import Transfer from "../views/TransferView.vue"
import UserManage from "../views/UserManageView.vue"
import ServiceTicket from "../views/ServiceTicketView.vue";
import QuestionnaireRecord from "../views/QuestionnaireRecordView.vue";
import NotificationInformation from "../views/NotificationInformationView.vue";
import Survey from "../views/SurveyView.vue";
import NewDetails from "../views/NewDetails.vue";
import Promotion from "../views/PromotionView.vue";
import SurveyActivity from "../views/SurveyActivity.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import VerifyMailbox from "../views/VerifyMailbox.vue";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
        path: '/login',
		name: 'Login',
        component: Login,
		meta: { title: 'SurveyMonkey- Login'}
    },
	{
        path: '/register',
		name: 'Register',
        component: Register,
		meta: { title: 'SurveyMonkey- Register'}
    },
	{
        path: '/forgetPassword',
		name: 'ForgetPassword',
        component: ForgetPassword,
		meta: { title: 'SurveyMonkey- Forget Password'}
    },
	{
		path: '/userCenter',
		name: 'UserCenter',
		component: UserCenter,
		redirect: '/userCenter/clientArea',
		meta: { requiresAuth: true,title: 'SurveyMonkey- User Center'},
		children: [
			{
				path: '/userCenter/clientArea',
				name: 'ClientArea',
				component: ClientArea,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Client Area'},
			},
			{
				path: '/userCenter/profile',
				name: 'Profile',
				component: Profile,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Profile'},
			},
			{
				path: '/userCenter/verifyMailbox',
				name: 'VerifyMailbox',
				component: VerifyMailbox,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Verify Mailbox'},
			},
			{
				path: '/userCenter/wallet',
				name: 'Wallet',
				component: Wallet,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Wallet'},
			},
			{
				path: '/userCenter/transfer',
				name: 'Transfer',
				component: Transfer,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Transfer'},
			},
			{
				path: '/userCenter/promotion',
				name: 'promotion',
				component: Promotion,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Promotion'},
			},
			{
				path: '/userCenter/userManage',
				name: 'UserManage',
				component: UserManage,
				meta: { requiresAuth: true,title: 'SurveyMonkey- User Manage'},
			},
			{
				path: '/userCenter/serviceTicket',
				name: 'ServiceTicket',
				component: ServiceTicket,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Service Ticket'},
			},
			{
				path: '/userCenter/questionnaireRecord',
				name: 'QuestionnaireRecord',
				component: QuestionnaireRecord,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Questionnaire Record'},
			},
			{
				path: '/userCenter/notificationInformation',
				name: 'NotificationInformation',
				component: NotificationInformation,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Notification Information'},
			},
			{
				path: '/userCenter/survey',
				name: 'survey',
				component: Survey,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Survey'},
			},
			{
				path: '/userCenter/newDetails/:id',
				name: 'newDetails',
				component: NewDetails,
				meta: { requiresAuth: true,title: 'SurveyMonkey- New Details'},
			},
			{
				path: '/userCenter/surveyActivity',
				name: 'surveyActivity',
				component: SurveyActivity,
				meta: { requiresAuth: true,title: 'SurveyMonkey- Survey Activity'},
			}
		]
	}

];

const router = createRouter({
	history: createWebHistory(), // 简写 `history: history`
	routes // 简写 `routes: routes`
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// to 和 from 代表路由对象
	// next 是一个函数，表示放行
	// next() 放行  next('/login') 强制跳转
	if (to.meta && to.meta.title) {
		document.title = to.meta.title;
	}
	// 判断该路由是否需要登录权限
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 这条路由需要认证权限
		if (!isUserLoggedIn()) { // 假设 isUserLoggedIn() 是你的登录验证函数
			// 未登录则跳转至登录页
			next({ path: '/login' });
		} else {
			// 已经登录，则正常进入页面
			next();
		}
	} else {
		// 不需要认证权限，直接进入
		next();
	}
});

function isUserLoggedIn() {
	// 返回用户是否登录的状态
	// 可以从 Vuex store 或者 localStorage 获取
	return localStorage.getItem('access_token') !== null;
}

export default router;