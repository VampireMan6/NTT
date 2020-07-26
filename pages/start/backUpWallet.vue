<template>
	<view class="cointaner column b-b">
		<view class="flex j-center" style="margin-bottom: 72rpx;">
			<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
			<view class="m-l-5 f-12">密码用于保护私钥和交易授权，强度非常重要</view>
		</view>
		<view class="w-100 j-center column">
			<image style="width: 160rpx;height: 160rpx;" src="../../static/img/wallet-1.png" mode=""></image>
			<view class="f-24" style="color: #595959;margin: 120rpx 0 32rpx 0;">备份你的钱包</view>
		</view>
		<text style="color: #8C8C8C;margin-bottom: 48rpx;">备份钱包：导出 <text style="color: #547CE2;">[助记词]</text> 并抄写到安全的地方，千万不要保存在网络上，然后尝试转入、转出小额资产开始使用</text>
		<!-- 备份钱包 -->
		<view class="b-b column">
			<view style="height: 96rpx;background-color: #2d2c3f;margin-bottom: 48rpx;border-radius: 8rpx;" class="f-center j-center w-100" 
			@tap="backUpWallet">备份钱包</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			backUpWallet() {
				uni.navigateTo({
					url: '/pages/start/backUpWallet1'
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
</style>
