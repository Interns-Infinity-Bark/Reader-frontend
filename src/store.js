import Vue from 'vue'
import Vuex from 'vuex'
import { get } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userSession: null,
        adminSession: null,
    },
    getters: {
        isUserLoggedIn(state) {
            return !!state.userSession;
        },
        isAdminLoggedIn(state) {
            return !!state.adminSession;
        },
    },
    mutations: {
        setUserSession(state, session) {
            state.userSession = session;
        },
        setAdminSession(state, session) {
            state.adminSession = session;
        },
        clearUserSession(state) {
            state.userSession = null;
        },
        clearAdminSession(state) {
            state.adminSession = null;
        },
    },
    actions: {
        async getUserSession({ commit }) {
            const ret = await get('/reader/');
            if (ret.status === 'ok') {
                commit('setUserSession', ret.data.user);
            }
            return ret.data;
        },
        async getAdminSession({ commit }) {
            const ret = await get('/reader/admin/');
            if (ret.status === 'ok') {
                commit('setAdminSession', ret.data.user);
            }
            return ret.data;
        },
        async logoutUser({ commit }) {
            const ret = await get('/reader/logout');
            if (ret.status === 'ok') {
                commit('clearUserSession');
            }
            return ret.data;
        },
        async logoutAdmin({ commit }) {
            const ret = await get('/reader/admin/logout');
            if (ret.status === 'ok') {
                commit('clearAdminSession');
            }
            return ret.data;
        },
    }
})
