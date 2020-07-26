<template>
	<view class="content">
		<image src="../../static/img/logo.png" mode="" class="logo" :class="start?'':'logomove'"></image>
		<!-- <image src="../../static/img/startntt.png" mode="" class="ntt" v-if="start"></image>
		<view class="font_mon font_b" v-if="start">最强共识-为极致而生</view> -->
		<view style="height: 60upx;"></view>
		<view class="btbox flex_center f_j_b" v-if="start">
			<view class="s_btna font_max" @click="crigister">注册</view>
			<view class="color_black s_btnb font_max" @click="clogo">登录</view>
		</view>
		<image src="../../static/img/Welcome.png" mode="" class="welcomea" v-if="wellogin" :class="wellogin?'welcomemove':''"></image>
		<image src="../../static/img/Register.png" mode="" class="welcomeb" v-if="welrigister" :class="welrigister?'welcomemove':''"></image>
		<image src="../../static/img/forget.png" mode="" class="welcomec" v-if="welforget" :class="welforget?'welcomemove':''"></image>
		<view class="font_mon font_b weltel mart" v-if="wellogin" :class="wellogin?'welcomemove':''">最强共识-为极致而生</view>
		<view class="font_mon font_b weltel mart" v-if="welrigister" :class="welrigister?'welcomemove':''">最强共识-为极致而生</view>
		<view class="font_mon font_b weltel mart" v-if="welforget" :class="welforget?'welcomemove':''">最强共识-为极致而生</view>
		<!-- login -->
		<view class="flex_center f_j_b int_box" v-if="login" :class="login?'welcomemove':''">
			<input type="text" placeholder="钱包名称" maxlength="11" v-model="phone"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app.checkMobile(phone)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="login" :class="login?'welcomemove':''">
			<input type="text" password placeholder="登录密码" v-model="password"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(password)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="forgethint mart" v-if="login" :class="login?'welcomemove':''" @click="cforget">忘记密码</view>
		<view class="btn font_max" v-if="loginbt" :class="loginbt?'welcomemove':''" @click="loginit">登录</view>
		<view class="font_mon" v-if="loginbt" :class="loginbt?'welcomemove':''" style="margin-top: 50rpx;" @click="crigister">没有账号？去注册</view>
		<!-- rigister -->
		<view class="flex_center f_j_b int_box" v-if="rigister" :class="rigister?'welcomemove':''">
			<input type="text" placeholder="钱包名称" v-model="phone"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app.checkMobile(phone)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="rigister" :class="rigister?'welcomemove':''">
			<input type="text" placeholder="验证码" v-model="AuthCode"/>
			<view class="" @click="getAuthCode">{{codeBtnText}}</view>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<!-- <view class="forgethint mart" v-if="rigister" :class="rigister?'welcomemove':''"  @click="getAuthCode">{{codeBtnText}}</view> -->
		<view class="flex_center f_j_b int_box martt" v-if="rigister" :class="rigister?'welcomemove':''">
			<input type="text" password placeholder="设置密码（8-16位数字与字母的组合）" v-model="password"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(password)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="rigister" :class="rigister?'welcomemove':''">
			<input type="text" password placeholder="确认密码" v-model="passwordtwo"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(passwordtwo)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="rigister" :class="rigister?'welcomemove':''">
			<input type="text" placeholder="邀请码（选填）" v-model="InviteCode"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="InviteCode"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="forgethint martt" v-if="rigister" :class="rigister?'welcomemove':''" @click="goxieyi">注册表示同意 《用户协议》</view>
		<view class="btn font_max" v-if="rigisterbt" :class="rigisterbt?'welcomemove':''" @click="rigisterit">注册</view>
		<view class="font_mon" v-if="rigisterbt" :class="rigisterbt?'welcomemove':''" style="margin-top: 50rpx;" @click="clogo">已有账号？去登录</view>
		<!-- forget -->
		<view class="flex_center f_j_b int_box" v-if="forget" :class="forget?'welcomemove':''">
			<input type="text" placeholder="钱包名称" v-model="phone"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app.checkMobile(phone)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="forget" :class="forget?'welcomemove':''">
			<input type="text" placeholder="验证码" v-model="AuthCode"/>
			<view class="" @click="getAuthCode">{{codeBtnText}}</view>
			<!-- <image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="AuthCode"></image> -->
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<!-- <view class="forgethint mart" v-if="forget" :class="forget?'welcomemove':''" @click="getAuthCode">{{codeBtnText}}</view> -->
		<view class="flex_center f_j_b int_box martt" v-if="forget" :class="forget?'welcomemove':''">
			<input type="text" password placeholder="设置密码（8-16位数字与字母的组合）" v-model="password"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(password)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b int_box martt" v-if="forget" :class="forget?'welcomemove':''">
			<input type="text" password placeholder="确认密码" v-model="passwordtwo"/>
			<image src="../../static/img/ok.png" mode="" class="ok_icon" v-if="app._checkPwd(passwordtwo)"></image>
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="btn font_max" v-if="forgetbt" :class="forgetbt?'welcomemove':''" @click="forgetit">确定</view>
		<view class="font_mon" v-if="forgetbt" :class="forgetbt?'welcomemove':''" style="margin-top: 50rpx;" @click="clogo">已有账号？去登录</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	import { setToken } from "../../utils/userAuth";
	export default {
		data() {
			return {
				start:true,
				login:false,
				loginbt:false,
				rigister:false,
				rigisterbt:false,
				forget:false,
				forgetbt:false,
				wellogin:false,
				welrigister:false,
				welforget: false,
				
				phone:'',
				password:'',
				passwordtwo:'',
				AuthCode:'',
				InviteCode:'',
				
				codeLoading: false,
				codeReload: false,
				codeBtnText: '获取验证码',
				codeTimer: null,
				codeCount: 60,
				codeCountMax: 60,
			}
		},
		onLoad(e){
			if(e.out){
				
			}else{
				this.getinfo()
			}
			
		},
		methods: {
			clogo(){
				this.start = false
				this.rigister = false
				this.rigisterbt = false
				this.forget = false
				this.forgetbt = false
				this.welrigister = false
				this.welforget = false
				
				this.phone = ''
				this.password = ''
				this.passwordtwo = ''
				this.AuthCode = ''
				this.InviteCode = ''
				
				this.codeLoading= false
				this.codeReload= false
				this.codeBtnText= '获取验证码'
				this.codeCount= 60
				this.codeCountMax= 60
				clearInterval(this.codeTimer);
				
				setTimeout(()=>{
					this.wellogin = true
					setTimeout(()=>{
						this.login = true
						setTimeout(()=>{
							this.loginbt = true
						},500)
					},500)
				},500)
			},
			crigister(){//创建钱包
				uni.navigateTo({
					url: '/pages/start/createWallet'
				})
				// this.start = false
				// this.login = false
				// this.loginbt = false
				// this.forget = false
				// this.forgetbt = false
				// this.wellogin = false
				// this.welforget = false
				// this.phone = ''
				// this.password = ''
				// this.passwordtwo = ''
				// this.AuthCode = ''
				// this.InviteCode = ''
				// this.codeLoading= false
				// this.codeReload= false
				// this.codeBtnText= '获取验证码'
				// this.codeCount= 60
				// this.codeCountMax= 60
				// clearInterval(this.codeTimer);
				// setTimeout(()=>{
				// 	this.welrigister = true
				// 	setTimeout(()=>{
				// 		this.rigister = true
				// 		setTimeout(()=>{
				// 			this.rigisterbt = true
				// 		},500)
				// 	},500)
				// },500)
			},
			cforget(){//忘记密码
				uni.navigateTo({
					url: '/pages/start/backUpWallet3'
				})
				// this.start = false
				// this.login = false
				// this.loginbt = false
				// this.rigister = false
				// this.rigisterbt = false
				// this.wellogin = false
				// this.welrigister = false
				// this.phone = ''
				// this.password = ''
				// this.passwordtwo = ''
				// this.AuthCode = ''
				// this.InviteCode = ''
				// this.codeLoading= false
				// this.codeReload= false
				// this.codeBtnText= '获取验证码'
				// this.codeCount= 60
				// this.codeCountMax= 60
				// clearInterval(this.codeTimer);
				// setTimeout(()=>{
				// 	this.welforget = true
				// 	setTimeout(()=>{
				// 		this.forget = true
				// 		setTimeout(()=>{
				// 			this.forgetbt = true
				// 		},500)
				// 	},500)
				// },500)
			},
			getinfo(){
				let params = {
				}
				this.$request({
					url: 'user',
					method: 'get',
					data: params
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						return
					}
					reLaunch('index/index')
				})
				.catch(err => {
				})
			},
			getAuthCode(){
				console.log(11111)
				if (this.codeLoading || this.codeReload) {
					return;
				}
				if(this.phone == ''||!this.app.checkMobile(this.phone)){
					_toast('请输入正确的手机号')
					return
				}
				if(this.rigister){
					var params ={
						scene :'1',
						mobile :this.phone,
					}
				}else{
					var params ={
						scene :'3',
						mobile :this.phone,
					}
				}
				this.codeLoading = true;
				this.$request({
					url: 'sms/send',
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
			loginit() {
				if(this.phone.length == 0) {
					_toast('钱包名称不能为空');
					return
				};
				if(this.phone.length < 5) {
					_toast('钱包名称字符不能小于5');
					return
				};
				if(this.password.length < 8) {
					_toast('密码位数不能小于8');
					return
				};
				// if(!this.app._checkPwd(this.password)){
				// 	_toast('请输入正确的密码')
				// 	return false
				// }
				// _toast("登录中");
				let params = {
					account_number: this.phone,
					password: this.password,
				}
				this.$request({
						url: 'login',
						method: 'post',
						data: params
					})
					.then(res => {
						uni.hideLoading()
						console.log(res)
						if(res.code == 200) {
							setToken(res.data.token_type + ' ' + res.data.access_token);
							this.$store.dispatch('setUserInfo')
							this.$store.dispatch('setCoinInfo')
							reLaunch('index/index')
						}else {
							console.log(res)
							if(res.code == 10002) {
								_toast("账号不存在");
							};
							if(res.code == 10000) {
								_toast("登录密码错误");
							}
						}
					})
					.catch(err => {
						console.log(err)
						uni.hideLoading()
					})
			},
			rigisterit(){
				if(!this.app._checkPwd(this.password)){
					_toast('请输入正确的密码')
					return false
				}
				if(this.password != this.passwordtwo){
					_toast('两次密码不一致')
					return false
				}
				// if(this.AuthCode == ''){
				// 	_toast('请输入验证码')
				// 	return false
				// }
				// if(this.InviteCode == ''){
				// 	_toast('请输入邀请码')
				// 	return false
				// }
				uni.showLoading({
					
				})
				var params = {
					password : this.password,
					password2: this.passwordtwo,
					username :this.phone,
					invite_code: this.InviteCode
					// vcode:this.AuthCode,
					// invite_code:this.InviteCode,
				}
				// var params = {
				// 	password : this.password,
				// 	password2: this.passwordtwo,
				// 	mobile :this.phone,
				// 	vcode:this.AuthCode,
				// 	invite_code:this.InviteCode,
				// }
				console.log(params)
				this.$request({
					url: 'register/username',
					method: 'post',
					data: params
				})
				.then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					setToken(res.data.token_type + ' ' + res.data.access_token);
					this.$store.dispatch('setUserInfo')
					this.$store.dispatch('setCoinInfo')
					reLaunch('index/index')
				})
				.catch(err => {
					uni.hideLoading()
				})
			},
			forgetit(){
				if(this.phone.length == 0) {
					_toast('钱包名称不能为空');
					return
				};
				if(this.phone.length < 5) {
					_toast('钱包名称字符不能小于5');
					return
				};
				
				
				
				if(!this.app._checkPwd(this.password)){
					_toast('请输入正确的密码')
					return false
				}
				if(this.password != this.passwordtwo){
					_toast('两次密码不一致')
					return false
				}
				if(this.AuthCode == ''){
					_toast('请输入验证码')
					return false
				}
				uni.showLoading({})
				let params = {
					mobile :this.phone,
					password :this.password,
					vcode : this.AuthCode,
					password2:this.passwordtwo,
				}
				this.$request({
					url: '/post.forgetpassword',
					method: 'post',
					data: params
				})
				.then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					clearInterval(this.codeTimer);
					this.clogo()
				})
				.catch(err => {
					uni.hideLoading()
				})
			},
			goxieyi(){
				navigateTo('user/document?way='+ 'user_protocol')
			},
		}
	}
</script>

<style>
@import url("../../common/css/start.css");
</style>
