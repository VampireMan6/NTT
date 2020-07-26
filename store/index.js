import Vue from 'vue'
import Vuex from 'vuex'
import request from '../utils/request'
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		userInfo:'',//用户信息
		coininfo:'',//币种信息
	},
	getters:{
		 userInfo: state => state.userInfo,
		 coininfo: state => state.coininfo
	},
	mutations:{
		//设置用户信息
		SET_USER_INFO: (state, userInfo) => {
		    // 设置用户信息
		    state.userInfo = userInfo;
		},
		//删除用户信息
		DELETE_USER_INFO: (state) => {
		    // 设置用户信息
		    state.userInfo = '';
		},
		//设置用户信息
		SET_COIN_INFO: (state, coininfo) => {
		    // 设置用户信息
		    state.coininfo = coininfo;
		},
	},
	actions:{
		setUserInfo({ commit }) {
			request({
				url: 'user',
				method: 'get',
				params: {}
			})
			.then(res => {
				console.log(res)
				 commit('SET_USER_INFO', res.data)
			})
			.catch(err => {
				
			})
		},
		deleteUserInfo({ commit }) {
		    commit('DELETE_USER_INFO')
		},
		setCoinInfo({ commit }) {
			request({
				url: 'user/coins',
				method: 'get',
				params: {}
			})
			.then(res => {
				console.log(res)
				 commit('SET_COIN_INFO', res.data.list)
			})
			.catch(err => {
				
			})
		},
	}
})
export default store