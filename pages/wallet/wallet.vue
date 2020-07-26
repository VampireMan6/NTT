<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					数字钱包
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="allmoney_box content">
			<view class="opacity">资产总折合（USDT）</view>
			<view class="font_b" style="font-size: 54rpx;">{{balance.usdt_sum | toNonExponential}}</view>
			<view class="opacity">≈{{balance.cny_sum | toNonExponential}} CNY</view>
		</view>
		
		<view class="coin_list">
			<block v-for="(item,index) in coinlist" :key="index">
				<view class="list_item_box content">
					<view class="zd_box flex_center f_j_a" v-if="index == open"  @click.stop="open = -1">
						<image class="xmore" src="../../static/img/xmore.png" mode=""></image>
						<view class="">折叠</view>
					</view>
					<view class="f_box" @click="copen(item,index)">
						<view class="flex_center">
							<image class="coin_icon" :src="item.logo" mode=""></image>
							<view class="font_big marl">{{item.CoinName}}</view>
						</view>
						<view class="f_money">{{parseFloat(item.Money) + parseFloat(item.gz)}}</view>
					</view>
					<view class="t_box" :class="index == open?'t_box_fz':'t_box_fb'" v-if="item.CoinName == 'NTT'">
						<view style="display:flex;flex-direction: row;justify-content: space-between">
							<view class="subCardView">
							<view class="t_money">{{parseFloat(item.gz)}}</view>
								<view class="flex_center">
									<view class="font_mon">共振账户</view>
								</view>
							</view>
							<view class="subCardView">
								<view class="t_money">{{parseFloat(item.Money)}}</view>
								<view class="flex_center">
									<view class="font_mon">外部转入账户</view>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="t_box" :class="index == open?'t_box_fz':'t_box_sb'" v-if="item.yw_qx">
						<view class="flex_center">
							<view class="font_mon">期权账户</view>
						</view>
						<view class="t_money">{{item.yw_qx.toFixed(4)}}</view>
					</view>
					<view class="t_box" :class="index == open?'t_box_fz':'t_box_tb'" v-if="item.Money">
						<view class="flex_center">
							<view class="font_mon">可闪兑账户</view>
						</view>
						<view class="t_money">{{parseInt(item.Money)}}</view>
					</view> -->
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo",
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				balance:'',
				coinlist:'',
				open:-1
			}
		},
		onLoad() {
			this.initdata()
		},
		
		methods: {
			initdata(){
				this.getbalance()
				this.getcoin()
			},
			copen(a,b){
				if(this.open == b){
					this.open = -1
				}else{
					if(a.CoinName == 'NTT'){
						this.open = b
					}
				}
			},
			back(){
				uni.navigateBack({
					
				})
			},
			getbalance(){
				this.$request({
					url: '/get.usercoin.assets',
					method: 'get',
					data: {
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.balance = res.data
				})
				.catch(err => {
				})
			},
			getcoin(){
				this.$request({
					url: '/get.usercoin.balance',
					method: 'get',
					data: {}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					let list = res.data
					this.coinlist = list
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/wallet.css");
.subCardView {
	display: flex;
	flex-direction:column;
	align-items: center;
}
</style>
