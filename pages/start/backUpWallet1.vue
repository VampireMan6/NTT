<template>
	<view class="cointaner column b-b">
		<view class="flex j-center">
			<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
			<view class="m-l-5 f-12">密码用于保护私钥和交易授权，强度非常重要</view>
		</view>
		<view class="w-100 f-center" style="margin: 10rpx 0;">
			<view style="font-size: 36rpx;">抄写下你的钱包助记词</view>
		</view>
		<view style="color: #8C8C8C;margin-bottom: 64rpx;">助记词用于恢复钱包或者重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全的地方。</view>
		<view class="f-w" style="margin-bottom: 40rpx;">
			<view style="" class="item j-center b-b" v-for="(item,i) in dataList" :key="i">
				{{item}}
			</view>
		</view>
		<!-- 下一步 -->
		<view class="b-b column">
			<view style="height: 96rpx;background-color: #2d2c3f;margin-bottom: 48rpx;border-radius: 8rpx;" class="f-center j-center w-100" 
			@tap="backUpWallet">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getMessage();//助记词生成
		},
		data() {
			return {
				dataList: []
			}
		},
		methods: {
			getMessage() {
				this.$request({
					url: 'user/mnemonic/rand',
					method: 'get',
					
				})
				.then(res => {
					console.log(res)
					if (res.code == 200) {
						this.dataList = res.data;
						uni.setStorage({//保存助记词
							key: 'backUpWalletList',
							data: this.dataList
						});
					}else {
						// _toast(res.message);
					}
				})
				.catch(err => {
				})
			},
			backUpWallet() {
				uni.navigateTo({
					url: '/pages/start/backUpWallet2'
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
		padding: 24rpx 32rpx;
	}
	.m-l-5 {
		margin-left: 10rpx;
	}
	.f-24 {
		font-size: 48rpx;
	}
	.item {
		padding: 0 20rpx;
		height: 52rpx;
		border-radius: 4rpx;
		color: #256AC3;
		border: 2upx solid #256AC3;
		background-color: #0d284d;
		margin: 0 10px 28rpx 0;
	}
</style>
