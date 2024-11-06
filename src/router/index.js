import { createRouter, createWebHistory } from 'vue-router';
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
import Lo from "../components/Lo.vue";
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
        component: Login
    },
	{
		path: '/lo',
		name: 'Lo',
		component:Lo
	},
	{
        path: '/register',
		name: 'Register',
        component: Register
    },
	{
        path: '/forgetPassword',
		name: 'ForgetPassword',
        component: ForgetPassword
    },
	{
		path: '/userCenter',
		name: 'UserCenter',
		component: UserCenter,
		redirect: '/userCenter/clientArea',
		meta: { requiresAuth: true,title: '主页'},
		children: [
			{
				path: '/userCenter/clientArea',
				name: 'ClientArea',
				component: ClientArea,
				meta: { requiresAuth: true,title: '客户区'},
			},
			{
				path: '/userCenter/profile',
				name: 'Profile',
				component: Profile,
				meta: { requiresAuth: true,title: '个人资料'},
			},
			{
				path: '/userCenter/verifyMailbox',
				name: 'VerifyMailbox',
				component: VerifyMailbox,
				meta: { requiresAuth: true,title: '验证邮箱'},
			},
			{
				path: '/userCenter/wallet',
				name: 'Wallet',
				component: Wallet,
				meta: { requiresAuth: true,title: '钱包'},
			},
			{
				path: '/userCenter/transfer',
				name: 'Transfer',
				component: Transfer,
				meta: { requiresAuth: true,title: '转账'},
			},
			{
				path: '/userCenter/promotion',
				name: 'promotion',
				component: Promotion,
				meta: { requiresAuth: true,title: '推广'},
			},
			{
				path: '/userCenter/userManage',
				name: 'UserManage',
				component: UserManage,
				meta: { requiresAuth: true,title: '用户管理'},
			},
			{
				path: '/userCenter/serviceTicket',
				name: 'ServiceTicket',
				component: ServiceTicket,
				meta: { requiresAuth: true,title: '服务单'},
			},
			{
				path: '/userCenter/questionnaireRecord',
				name: 'QuestionnaireRecord',
				component: QuestionnaireRecord,
				meta: { requiresAuth: true,title: '问卷记录'},
			},
			{
				path: '/userCenter/notificationInformation',
				name: 'NotificationInformation',
				component: NotificationInformation,
				meta: { requiresAuth: true,title: '通知信息'},
			},
			{
				path: '/userCenter/survey',
				name: 'survey',
				component: Survey,
				meta: { requiresAuth: true,title: '调查问卷'},
			},
			{
				path: '/userCenter/newDetails/:id',
				name: 'newDetails',
				component: NewDetails,
				meta: { requiresAuth: true,title: '公告详情'},
			},
			{
				path: '/userCenter/surveyActivity',
				name: 'surveyActivity',
				component: SurveyActivity,
				meta: { requiresAuth: true,title: '调查活动'},
			}
		]
	}

];

const router = createRouter({
	history: createWebHistory(),
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