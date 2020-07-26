<template>
	<view class="cointaner column">
		<view class="top w-100 column">
			<view class="flex j-center" style="margin-bottom: 8rpx;">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
				<view class="m-l-5 f-12">密码用于保护私钥和交易授权，强度非常重要</view>
			</view>
			<view class="flex j-center">
				<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
				<view class="m-l-5 f-12">ESC不存储密码，也无法帮您找回，请务必</view>
			</view>
		</view>
		<!-- 钱包名称 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="username" maxlength="20" placeholder="钱包名称必须在5到20个字符之间" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<!-- 钱包密码 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="password" maxlength="20" placeholder="钱包密码（8-20位数字与字母组合）" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<!-- 重复密码 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="password2" maxlength="20" placeholder="重复密码" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<!-- 邀请码 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="invite_code" placeholder="邀请码（可不填）" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<view class="p-x-16 b-b j-center" style="margin-bottom: 48rpx;" @tap="agree">
			<view style="width: 32rpx;height: 32rpx; border-radius: 100%;" :class="agreeState?'b-blue':'b-w'" ></view>
			<view class="m-l-5" style="color: #8C8C8C;">我已经仔细阅读并同意 <text style="color: #547CE2;" class="m-l-5">服务及隐私条款</text></view>
		</view>
		<!-- 创建钱包、导入钱包 -->
		<view class="p-x-16 b-b column">
			<view style="height: 96rpx;background-color: #2d2c3f;margin-bottom: 48rpx;border-radius: 8rpx;" class="f-center j-center w-100" @tap="createWallet">创建钱包</view>
			<view class="w-100 f-center">导入钱包</view>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	import { setToken } from "../../utils/userAuth";
	export default {
		data() {
			return {
				username: "",
				password: "",
				password2: "",
				invite_code: "",
				agreeState: false,
			}
		},
		methods: {
			agree() {
				this.agreeState = !this.agreeState;
			},
			createWallet() {
				if(this.username.length == 0) {
					_toast('钱包名称不能为空');
					return
				};
				if(this.username.length < 5) {
					_toast('钱包名称字符不能小于5');
					return
				};
				if(this.password.length < 8) {
					_toast('密码位数不能小于8');
					return
				};
				if(this.password != this.password2) {
					_toast('两次密码不正确');
					return
				};
				if(!this.agreeState) {
					_toast('请同意条款项');
					return
				}
				this.$request({
					url: 'register/username',
					method: 'POST',
					data: {
						username: this.username,
						password: this.password,
						password2: this.password2,
						invite_code: this.invite_code
					}
				})
				.then(res => {
					console.log(res)
					if (res.code == 200) {
						_toast('钱包创建成功');
						setToken(res.data.token_type + ' ' + res.data.access_token);
						this.$store.dispatch('setUserInfo')
						this.$store.dispatch('setCoinInfo')
						setTimeout(()=> {
							uni.navigateTo({
								url: '/pages/start/backUpWallet'
							})
						},1000)
					}else {
						// _toast(res.message);
					}
				})
				.catch(err => {
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/com.css");
	view {
		display: flex;
		/* flex-direction: column; */
		font-size: 28rpx;
	}
	.top {
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		background-color: #547CE2;
		height: 124rpx;
		margin-bottom: 56rpx;
	}
	.input {
		padding: 0 32rpx;
		margin-bottom: 32rpx;
	}
	.c-8c8 {
		color: #8C8C8C;
	}
	.m-b-16 {
		margin-bottom: 32rpx;
	}
	.m-l-5 {
		margin-left: 10rpx;
	}
	.border {
		height: 2upx;
		width: 100%;
		background-color: #E8E8E8;
		margin-bottom: 32rpx;
	}
	.f-14 {
		font-size: 28rpx;
	}
	.p-x-16 {
		padding: 0 32rpx;
	}
	.b-blue {
		background-color: #547CE2;
	}
	.b-w {
		background-color: #FFFFFF;
	}
</style>
