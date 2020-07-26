<template>
	<view class="content">
		<view style="height: var(--status-bar-height);"></view>
		<image src="../../static/img/globalsuccess.png" mode="" class="success_icon"></image>
		<view class="color_green tel">共振成功</view>
		<view class="text_ver martt wid"><text style="font-size: 34rpx;">{{fromcoin}}</text><text style="font-size: 44rpx;" class="marl">{{xinxi.from_total}}</text></view>
		<image src="../../static/img/jiantou.png" class="jiantou" style="transform: rotate(90deg);" mode=""></image>
		<view class="text_ver text_right wid"><text style="font-size: 34rpx;">{{tocoin}}</text><text style="font-size: 44rpx;" class="marl">{{xinxi.to_total}}</text></view>
		<view class="flex_start f_j_b wid" style="margin-top: 50rpx;">
			<view class="font_mon">兑换汇率</view>
			<view class="font_mon">
				<block v-for="(item,index) in xinxi.data" :key="index">
					<view class="flex_center">
						<view class="font_mon">{{item.from_amount |　toFixed}}{{fromcoin}}</view>
						<image src="../../static/img/jiantou.png"  class="jiantoua" mode=""></image>
						<view class="font_mon">1 ： {{item.rate}}</view>
					</view>
				</block>
			</view>
		</view>
		<view class="flex_center f_j_b wid mart xian">
			<view class="font_mon">兑换时间</view>
			<view class="font_mon">{{app._nextday(0)}}</view>
		</view>
		<view class="text_center color_yellow" style="margin-top: 80rpx;" @click="goback">
			<text class="marr">再次兑换</text>|
			<text class="marl">完成兑换</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromcoin:'',
				tocoin:'',
				xinxi:'',
			}
		},
		onLoad(e) {
			this.fromcoin = e.fromcoin
			this.tocoin = e.tocoin
			this.xinxi = JSON.parse(e.xinxi)
		},
		methods: {
			goback(){
				uni.navigateBack({})
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
