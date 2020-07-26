<template>
	<view class="content">
		<view style="height: var(--status-bar-height);"></view>
		<image src="../../static/img/globalsuccess.png" mode="" class="success_icon"></image>
		<view class="color_green tel">投资成功</view>
		
		<view class="text_ver">
			<text style="font-size: 34rpx;">NTT</text>
			<text style="font-size: 44rpx;">{{num}}</text>
		</view>
		
		<view class="flex_start f_j_b wid" style="margin-top: 50rpx;">
			<view class="font_mon">收益利率</view>
			<view class="font_mon">{{rate*100}}%</view>
		</view>
		<view class="flex_center f_j_b wid mart xian">
			<view class="font_mon">兑换时间</view>
			<view class="font_mon">{{app._nextday(0)}}</view>
		</view>
		<view class="text_center color_yellow" style="margin-top: 80rpx;" >
			<text class="marr" @click="goback">再次投资</text>|
			<text class="marl" @click="goindex">返回首页</text>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		data() {
			return {
				fromcoin:'',
				tocoin:'',
				xinxi:'',
				num:'',
				rate:'',
			}
		},
		onLoad(e) {
			this.num = e.num
			this.rate = e.rate
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
.jiantoua{
	width: 50rpx;
	height: 40rpx;
}
</style>
