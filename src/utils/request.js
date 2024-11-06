import axios from 'axios';
const ApiUrl = 'http://192.168.31.21:8888';
// 创建 Axios 实例
const instance = axios.create({
    baseURL: ApiUrl, // 设置基础 URL
    timeout: 3000, // 设置超时时间
});

// 标记 token 是否正在刷新
let isRefreshing = false;
// 存储需要重新发送的请求
const pendingRequests = [];

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 检查是否是登录请求
        if (config.url === "/survey/user/login") {
            return config; // 不添加认证令牌
        }
        // 添加 token 到请求头
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        if (error.response.status === 401 || error.response.status === 402) {
            if (!isRefreshing) {
                isRefreshing = true;
                // 尝试刷新 token
                return refreshToken()
                    .then(newToken => {
                        // 更新本地存储中的 token
                        localStorage.setItem('access_token', newToken);
                        // 重新发送所有待处理的请求
                        pendingRequests.forEach(cb => cb());
                        pendingRequests.length = 0; // 清空队列
                        isRefreshing = false;
                        // 重新发送当前请求
                        return instance(error.config);
                    })
                    .catch(() => {
                        // 如果刷新 token 失败，跳转到登录页面
                        window.location.href = '/login';
                        isRefreshing = false;
                        return Promise.reject(error);
                    }).finally(() => {
                        // 无论成功还是失败，都需要清除 isRefreshing 标记
                        isRefreshing = false;
                    });
            } else {
                // 如果 token 正在刷新，将当前请求添加到待处理队列
                return new Promise(resolve => {
                    pendingRequests.push(() => {
                        return resolve(instance(error.config));
                    });
                });
            }
        }
        return Promise.reject(error.response);// 返回接口返回的错误信息
    }
);

async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(ApiUrl + '/survey/user/refreshToken', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        console.log("wokn",response.data.data.access_token);
        // 返回新的 token
        return response.data.data.access_token;
    } catch (error) {
        throw new Error('Failed to refresh the token');
    }
}

// 导出 Axios 实例
export default instance;