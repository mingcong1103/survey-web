import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    state: {
        // 初始状态
        count: 0,
        UserInfo: null
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setUserInfo(state, user) {
            state.UserInfo = user;
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment');
        },
        setUserInfo({ commit }, user) {
            commit('setUserInfo', user);
        }
    },
    plugins: [
        createPersistedState({
            // 配置项
            key: 'vuex', // 存储的键名，默认为 'vuex'
            storage: window.localStorage // 存储方式，默认为 localStorage
        })
    ]
});

export default store;