<template>
	<view>
		<view class="content" v-if="detail.bill_type_id == 1">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						提现明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.money | toNonExponential}}</view>
				<view class="font_mon">{{detail.status_name}}</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">手续费</view>
					<view class="font_mon text_right">{{detail.other_info.Fee}}</view>
				</view>
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">手续费率</view>
					<view class="font_max text_right">{{}}</view>
				</view> -->
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">发起时间</view>
					<view class="font_mon text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单编号</view>
					<view class="font_mon text_right">{{detail.bill_sn}}</view>
				</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">收款地址</view>
					<view class="font_max text_right">{{detail.other_info.Address}}</view>
				</view>
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">转出地址</view>
					<view class="font_max text_right">0.10%0x157457fada3…</view>
				</view> -->
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<view class="font_max text_right">{{detail.Hash}}</view>
				</view>
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.remark}}</view>
				</view> -->
			</view>
			<!-- <view class="nr_box content">
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">往来记录</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">联系客服</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="content" v-if="detail.bill_type_id == 2">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						充值明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.money | toNonExponential}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">充值时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单编号</view>
					<view class="font_mon text_right">{{detail.bill_sn}}</view>
				</view>
			</view>
			<view class="nr_box content">

				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">转入地址</view>
					<view class="font_max text_right">{{detail.other_info.Address}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<view class="font_max text_right">{{detail.other_info.Hash}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.remark}}</view>
				</view>
			</view>
			<!-- <view class="nr_box content">
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">往来记录</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">联系客服</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="content" v-if="detail.bill_type_id == 3">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						转账明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.money | toNonExponential}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">手续费</view>
					<view class="font_mon text_right">0</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">收款账户</view>
					<view class="font_max text_right">139****3521</view>
				</view>
			</view>
			<view class="nr_box content">
				<!-- 				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">转出地址</view>
					<view class="font_max text_right">0.10%0x157457fada3…</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易Hash</view>
					<view class="font_max text_right">0XEDSQWWWWQ9892…</view>
				</view> -->
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.remark}}</view>
				</view>
			</view>
			<!-- <view class="nr_box content">
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">往来记录</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">联系客服</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		<view class="content" v-if="detail.bill_type_id == 4">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						共振明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.money | toNonExponential}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">共振时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单编号</view>
					<view class="font_mon text_right">{{detail.bill_sn}}</view>
				</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.remark}}</view>
				</view>
			</view>
			<!-- <view class="nr_box content">
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">往来记录</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
				<view class="flex_center f_j_b list">
					<view class="font_max" style="opacity: 0.65;">联系客服</view>
					<view class="">
						<image src="../../static/img/right.png" class="more" mode=""></image>
					</view>
				</view>
			</view> -->
		</view>
		
		<view class="content" v-if="detail.bill_type_id != 3&&detail.bill_type_id != 1&&detail.bill_type_id != 2&&detail.bill_type_id != 4">
			<view class="topbox">
				<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
				<view class="flex_center f_j_b top_nr">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
					<view class="font_big">
						明细
					</view>
					<view class="top_icon"></view>
				</view>
			</view>
			<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
			<view class="nr_box content" style="padding: 96rpx 0;">
				<view class="flex_center">
					<image class="coin_icon" :src="detail.logo" mode=""></image>
					<view class="font_b" style="font-size: 48rpx;margin-left:16rpx;">{{detail.coin_name}}</view>
				</view>
				<view class="font_b" style="font-size: 64rpx;">{{detail.money | toNonExponential}}</view>
				<view class="font_mon">交易成功</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">交易时间</view>
					<view class="font_max text_right">{{detail.created_at}}</view>
				</view>
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单编号</view>
					<view class="font_mon text_right">{{detail.bill_sn}}</view>
				</view>
			</view>
			<view class="nr_box content">
				<view class="flex_start f_j_b list">
					<view class="font_max" style="opacity: 0.65;">账单分类</view>
					<view class="font_max text_right">{{detail.remark}}</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="nr_box content">
			<view class="flex_center f_j_b list">
				<view class="font_max" style="opacity: 0.65;">往来记录</view>
				<view class="">
					<image src="../../static/img/right.png" class="more" mode=""></image>
				</view>
			</view>
			<view class="flex_center f_j_b list" @click="gokefu">
				<view class="font_max" style="opacity: 0.65;">联系客服</view>
				<view class="">
					<image src="../../static/img/right.png" class="more" mode=""></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		navigateTo,
		loginNavigateTo,
		_toast,
		reLaunch
	} from "../../utils/common"
	export default {
		data() {
			return {
				id: '',
				detail: ''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getdetail()
		},
		methods: {
			back() {
				uni.navigateBack({

				})
			},
			getdetail() {
				this.$request({
						url: 'coins/logs/detail',
						method: 'get',
						data: {
							bill_id: this.id
						}
					})
					.then(res => {
						console.log(res)
						if (res.code !== 200) {
							_toast(res.message)
							return false
						}
						this.detail = res.data
					})
					.catch(err => {})
			},
			gokefu(){
				navigateTo('user/kefu')
			},
		}
	}
</script>

<style>
	@import url("../../common/css/bill_detail.css");
</style>
