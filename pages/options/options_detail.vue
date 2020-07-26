<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					交割详情
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="money" style="color: #7FEF9D;">{{detail.profit>0?'+' + (Number(detail.profit) +Number(detail.amount)) :'0' | toNonExponential}}</view>
		<view class="">结算数量（NTT）</view>
		<view class="list flex_center f_j_b" style="margin-top: 90rpx;">
			<view class="font_mon">订单号</view>
			<view class="font_mon">{{detail.sn}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">购买时间</view>
			<view class="font_mon">{{detail.created_at}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">开盘时间</view>
			<view class="font_mon">{{getcctime(detail.start)}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">交割时间</view>
			<view class="font_mon">{{getcctime(detail.end)}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">购买类型</view>
			<view class="font_mon" :style="detail.betting_result == 'up'?'color:#7FEF9D':detail.betting_result == 'down'?'color:#E05750':'color:#ffffff'">{{detail.betting_result == 'up'?'涨':detail.betting_result == 'down'?'跌':'平'}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">购买数量</view>
			<view class="font_mon">{{detail.amount | toNonExponential}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">收益率</view>
			<view class="font_mon">{{detail.betting_result == 'balance'?'4':'1.75'}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">开盘价格</view>
			<view class="font_mon">{{detail.open | toNonExponential}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">交割价格</view>
			<view class="font_mon">{{detail.close | toNonExponential}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">跌涨幅</view>
			<view class="font_mon":style="detail.result == '涨'?'color:#7FEF9D':detail.result == '跌'?'color:#E05750':'color:#ffffff'">{{detail.rate*100 | toFixed}}%</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">结算币</view>
			<view class="font_mon">共振{{detail.coin_from_type ==3?'UDST':detail.coin_from_type ==6?'UDST':'NTT'}}</view>
		</view>
		<view class="list flex_center f_j_b">
			<view class="font_mon">状态</view>
			<view class="font_mon">已交割</view>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		data() {
			return {
				detail:'',
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getdetail()
		},
		methods: {
			back(){
				uni.navigateBack({
				})
			},
			getdetail(){
				this.$request({
					url: '/get.option.detail',
					method: 'get',
					data: {
						id:this.id
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.detail = res.data
					// setTimeout(this.getoption, 1e3);
				})
				.catch(err => {
				})
			},
			getcctime(e){
				var cctime = e.substring(0,4) + '-' + e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12)
				return e.substring(0,4) + '-' + e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12) + ':00'
			},
		}
	}
</script>

<style>
.topbox{
	width:750rpx;
	/* height:176rpx; */
	background:linear-gradient(270deg,rgba(239,137,71,1) 0%,rgba(242,171,62,1) 100%);
	border-radius:0px 0px 4rpx 4rpx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
.top_nr{
	position: absolute;
	bottom: 14rpx;
	width: 686rpx;
	left: 32rpx;
}
.top_icon{
	width: 40rpx;
	height: 40rpx;
}
.nr_box{
	width: 750rpx;
	background:rgba(43,45,61,1);
	margin-bottom: 32rpx;
	padding-top: 32rpx;
	padding-left: 32rpx;
	padding-right: 32rpx;
}
.money{
	font-size: 48rpx;
	margin-top: 140rpx;
	
}
.list{
	width: 686rpx;
	height: 72rpx;
}
</style>
