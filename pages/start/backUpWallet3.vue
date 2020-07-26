<template>
	<view class="cointaner column b-b">
		<view class="flex j-center" style="margin-bottom: 40rpx;">
			<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
			<view class="m-l-5 f-12">密码用于保护私钥和交易授权，强度非常重要</view>
		</view>
		<view class="w-100" style="background-color: #FFFFFF;margin-bottom: 40rpx;">
			<textarea class="w-100" style="margin-bottom: 40rpx;height: 260rpx;padding: 16rpx;color: #000000;" 
			v-model="password1" placeholder="请输入助记词,以英文状态下的逗号符分开" />
		</view>
		<!-- 钱包密码 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="password2" maxlength="20" placeholder="钱包密码（8-20位数字与字母组合）" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<!-- 重复密码 -->
		<view class="b-b input column">
			<input type="text" class="c-w m-b-16" v-model="password3" maxlength="20" placeholder="重复密码" placeholder-class="c-8c8 f-14">
			<view class="border"></view>
		</view>
		<!-- 确认 -->
		<view class="b-b column">
			<view style="height: 96rpx;background-color: #2d2c3f;margin-bottom: 48rpx;border-radius: 8rpx;" class="f-center j-center w-100" 
			@tap="sure">确认</view>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		data() {
			return {
				dataList: [],
				dataListSure: [],
				copyList: [],
				password1: "",
				password2: "",
				password3: ""
			}
		},
		methods: {
			sure() {
				if(this.password1.length == 0) {
					_toast('助记词不能为空');
					return
				};
				if(this.password2.length < 8) {
					_toast('密码位数不能小于8');
					return
				};
				if(this.password2 != this.password3){
					_toast('两次密码不一致')
					return false
				};
				this.$request({
					url: 'password/forget/mnemonic',
					method: 'POST',
					data: {
						mnemonic: this.password1.split(","),
						password: this.password2,
						password2: this.password3
					}
				})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/com.css");
	view {
		display: flex;
		font-size: 28rpx;
	}
	.cointaner {
		padding: 24rpx 32upx;
	}
	.m-l-5 {
		margin-left: 10rpx;
	}
	.f-24 {
		font-size: 48rpx;
	}
	.item {
		height: 52rpx;
		padding: 0rpx 20rpx;
		border-radius: 4rpx;
		color: #256AC3;
		border: 2upx solid #256AC3;
		background-color: #cddaed;
		margin: 0 10px 28rpx 0;
	}
	.item2 {
		padding: 0 20rpx;
		height: 52rpx;
		border-radius: 4rpx;
		color: #FFFFFF;
		border: 2upx solid #ffffff;
		margin: 0 10px 28rpx 0;
	}
	.input {
		/* padding: 0 32rpx; */
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
