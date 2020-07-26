<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					安全设置
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 110rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="flex_center f_j_b list_box">
			<view class="font_mon">登录密码</view>
			<view class="flex_center">
				<!-- <view class="">********</view> -->
				<view class="bt bta font_mon" @click="clogin">修改</view>
			</view>
		</view>
		<view class="flex_center f_j_b list_box">
			<view class="font_mon">交易密码</view>
			<view class="flex_center">
				<!-- <view class="">********</view> -->
				<view class="bt bta font_mon" @click="cpay">修改</view>
			</view>
		</view>
		
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="" v-if="login">
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">设置登录密码</view>
					<view class="flex_center f_j_b int_box martt" >
						<input type="text" placeholder="验证码" v-model="AuthCode"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="AuthCode"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="forgethint mart"  @click="getAuthCode">{{codeBtnText}}</view>
					<view class="flex_center f_j_b int_box" >
						<input type="text" password placeholder="设置密码（8-16位数字与字母的组合）" v-model="password"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(password)"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="flex_center f_j_b int_box martt">
						<input type="text" password placeholder="确认密码" v-model="passwordtwo"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(passwordtwo)"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="flex_center f_j_e bt_box">
						<view class="btc" @click="close">取消</view>
						<view class="btb marll" @click="sure">确认</view>
					</view>
				</view>
			</view>
			
			<view class="" v-if="!login">
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">设置交易密码</view>
					<view class="flex_center f_j_b int_box martt" >
						<input type="text" placeholder="验证码" v-model="AuthCode"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="AuthCode"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="forgethint mart"  @click="getAuthCode">{{codeBtnText}}</view>
					<view class="flex_center f_j_b int_box" >
						<input type="text" password placeholder="设置交易密码（8-16位数字与字母的组合）" v-model="PayPassword"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(PayPassword)"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="flex_center f_j_b int_box martt">
						<input type="text" password placeholder="确认交易密码" v-model="PayPasswordtwo"/>
						<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(PayPasswordtwo)"></image>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="flex_center f_j_e bt_box">
						<view class="btc" @click="close">取消</view>
						<view class="btb marll" @click="sure">确认</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	import { getToken , delToken } from '../../utils/userAuth.js'
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		data() {
			return {
				AuthCode:'',
				login:true,
				password:'',
				passwordtwo:'',
				PayPassword:'',
				PayPasswordtwo:'',
				
				codeLoading: false,
				codeReload: false,
				codeBtnText: '获取验证码',
				codeTimer: null,
				codeCount: 60,
				codeCountMax: 60,
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
			}
		},
		onLoad() {
			
		},
		
		methods: {
			clogin(){
				this.open(0,'center')
				this.login = true
			},
			cpay(){
				this.open(0,'center')
				this.login = false
			},
			open(Class, Position) {
				this.$nextTick(function() {
					this.AlertClass = Class;
					this.AlertPosition = Position;
					this.$nextTick(function() {
						this.$refs.openAlert.Show();
					});
				});
			},
			close(){
				this.$refs.openAlert.Close();
				clearInterval(this.codeTimer);
				this.AuthCode = ''
				this.password = ''
				this.passwordtwo = ''
				this.PayPassword = ''
				this.PayPasswordtwo = ''
			},
			getAuthCode(){
				if (this.codeLoading || this.codeReload) {
					return;
				}
				if(this.login){
					var params ={
						scene :'3',
						mobile :this.userInfo.user.mobile,
					}
				}else{
					var params ={
						scene :'4',
						mobile :this.userInfo.user.mobile,
					}
				}
				
				this.codeLoading = true;
				this.$request({
					url: '/post.notify.send',
					method: 'post',
					data: params
				})
				.then(res => {
					this.codeLoading = false;
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.codeReload = true;
					this.codeCount--;
					this.codeBtnText = this.codeCount + 's后再次获取';
					this.codeTimer = setInterval(() => {
						if (this.codeCount > 0) {
							this.codeCount--;
							this.codeBtnText = this.codeCount + 's后再次获取';
						} else {
							clearInterval(this.codeTimer);
							this.codeTimer = null;
							this.codeBtnText = '获取验证码';
							this.codeCount = this.codeCountMax;
							this.codeReload = false;
						}
					}, 1000);
				})
				.catch(err => {
					console.log(err)
					console.log('bb')
				})
			},
			
			xx(){},
			sure(){
				if(this.login){
					if(this.password!=this.passwordtwo){
						_toast('两次密码不一致')
						return
					}
					var params = {
						mobile:this.userInfo.user.mobile,
						password:this.password,
						password2:this.password,
						vcode:this.AuthCode
					}
					var url = '/post.forgetpassword'
				}else{
					if(this.PayPassword!=this.PayPasswordtwo){
						_toast('两次密码不一致')
						return
					}
					var params = {
						mobile:this.userInfo.user.mobile,
						pay_password:this.PayPassword,
						pay_password2:this.PayPasswordtwo,
						vcode:this.AuthCode
					}
					var url = '/post.forgetPayPassword'
				}
				this.app.showLoadinig()
				this.$request({
					url: url,
					method: 'post',
					data: params,
				})
				.then(res => {
					this.app.hideLoading()
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					_toast(res.message)
					this.$store.dispatch('setUserInfo')
					this.close()
				})
				.catch(err => {
				})
			},
			
			back(){
				uni.navigateBack({
					
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/set.css");
</style>
