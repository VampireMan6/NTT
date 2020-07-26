<template>
	<view class="content">
		<view style="height: var(--status-bar-height);"></view>
		<image src="../../static/img/globalsuccess.png" mode="" class="success_icon"></image>
		<view class="color_green tel">转账成功</view>
		<view class="text_ver martt wid text_center">
			<text style="font-size: 34rpx;">{{coin}}</text>
			<text style="font-size: 44rpx;" class="marl">{{number}}</text>
		</view>
		<view class="flex_center f_j_b wid" style="margin-top: 50rpx;">
			<view class="font_mon">收款账户</view>
			<view class="font_mon">{{mobile}}</view>
		</view>
		<view class="flex_center f_j_b wid mart">
			<view class="font_mon">手续费</view>
			<view class="font_mon">{{coin}} 0.01</view>
		</view>
		<view class="flex_center f_j_b wid mart">
			<view class="font_mon">费率</view>
			<view class="font_mon">0.10% (最低{{coin}}0.10)</view>
		</view>
		<view class="flex_center f_j_b wid mart xian">
			<view class="font_mon">转账时间</view>
			<view class="font_mon">{{app._nextday(0)}}</view>
		</view>
		<view class="text_center color_yellow" style="margin-top: 80rpx;">
			<text class="marr" @click="goback">再次转账</text>|
			<text class="marl" @click="goindex">回到首页</text>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		onLoad(e) {
			this.coin = e.coin;
			this.number = e.number;
			this.mobile = e.mobile;
		},
		data() {
			return {
				coin: "",
				number: "",
				mobile: "",
				
			}
		},
		methods: {
			goback(){
				uni.navigateBack({})
			},
			goindex(){
				reLaunch('index/index')
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
</style>
