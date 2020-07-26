<template>
	<view class="content">
		<view style="height: var(--status-bar-height);"></view>
		<image src="../../static/img/globalsuccess.png" mode="" class="success_icon"></image>
		<view class="color_green tel">闪兑成功</view>
		<view class="text_ver martt wid"><text style="font-size: 34rpx;">NTT</text><text style="font-size: 44rpx;" class="marl">{{amount}}</text></view>
		<image src="../../static/img/jiantou.png" class="jiantou" style="transform: rotate(90deg);" mode=""></image>
		<view class="text_ver text_right wid"><text style="font-size: 34rpx;">USDT</text><text style="font-size: 44rpx;" class="marl">{{toamount()}}</text></view>
		<view class="flex_start f_j_b wid" style="margin-top: 50rpx;">
			<view class="font_mon">闪兑汇率</view>
			<view class="font_mon">
				1:{{rate}}
			</view>
		</view>
		<view class="flex_center f_j_b wid mart xian">
			<view class="font_mon">兑换时间</view>
			<view class="font_mon">{{app._nextday(0)}}</view>
		</view>
		<view class="text_center color_yellow" style="margin-top: 80rpx;" @click="goback">
			<text class="marr">再次兑换</text>|
			<text class="marl">完成闪兑</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount:'',
				rate:'',
			}
		},
		onLoad(e) {
			this.amount = e.amount
			this.rate = e.rate
		},
		methods: {
			goback(){
				uni.navigateBack({})
			},
			toamount(){
				let num = this.app._accMul(this.amount,this.rate)
				return num
			},
		}
	}
</script>

<style>
	page{
		background-color: #1F2031;
	}
	.tel{
		font-size: 40rpx;
		margin-top: -20rpx;
		margin-bottom: 50rpx;
	}
.success_icon{
	width: 208rpx;
	height: 208rpx;
	margin-top: 200rpx;
}
.wid{
	width: 686rpx;
}
.jiantou{
	width: 76rpx;
	height: 70rpx;
}
.xian{
	padding-bottom: 20rpx;
	border-bottom: 2rpx solid #FFFFFF;
}
.jiantoua{
	width: 50rpx;
	height: 40rpx;
}
</style>
