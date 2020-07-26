<template>
	<view class="content">
		<view style="height: var(--status-bar-height);min-height: 40rpx;"></view>
		<view class="logo_box flex_center">
			<image class="logo" src="../../static/img/logo.png" mode=""></image>
			<view class="">
				<image class="ntt" src="../../static/img/startntt.png" mode=""></image>
				<view class="">最强共识-为极致而生</view>
			</view>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular class="swiper_box">
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item>
					<image class="index_bg" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="tel font_max font_b">币种行情</view>
		<view class="hq_box">
			<view class="flex_center f_j_b hq_tel">
				<view class="font_mon wd1">交易量</view>
				<view class="font_mon wd2 text_center">价格</view>
				<view class="font_mon wd3 text_right">24H涨跌</view>
			</view>
			<block v-for="(item,index) in coinmarket" :key="index">
				<view class="flex_center f_j_b hq_item">
					<view class="wd1 flex_center">
						<image :src="item.logo" mode="" class="coin_icon"></image>
						<view class="">
							<view class="font_b">{{item.en_name}}</view>
							<view class="font_min">${{item.vol_usd | toFixed}}</view>
						</view>
					</view>
					<view class="font_mon wd2 text_right">
						<view class="font_min">${{item.price_usd | toFixed}}</view>
						<view class="font_min">¥{{parseFloat(item.price_usd)*7 | toFixed}}</view>
					</view>
					<view class="wd3 text_right flex_center f_j_e">
						<view class="hq_zd font_min" :class="Number(item.change_percent)>=0?'isdwn':'isup'">{{Number(item.change_percent)>0?'+':''}}{{item.change_percent | toFixed}}%</view>
					</view>
				</view>
			</block>
		</view>
		<view class="flex_center f_j_b ntt_tc_box" style="margin-bottom: 30rpx;">
			<view class="ntt_tc ntt_tc_boxa" :class="boxa?'boxa_a':boxb?'':''" @click="cboxa">
					<view class="text_center flex_center" v-show="!boxa">
						<image src="../../static/img/index_gz.png" mode="" class="ntt_tc_icon"></image>
						<text class="font_mon marl">共振</text>
					</view>
					<view class="showboxa flex_center f_j_b" v-show="boxa">
						<view class="">
							<view class="flex_center">
								<image src="../../static/img/index_gz.png" mode="" class="ntt_tc_icon"></image>
								<text class="font_mon marl">共振</text>
							</view>
							<view class="" style="margin-left: 50rpx;">用USDT按照规则兑换成平台货币</view>
						</view>
						<view class="showbt">立即参与</view>
					</view>
			</view>
			<view class="ntt_tc ntt_tc_boxb" :class="boxa?'boxa_b':boxb?'boxb_b':''" @click="cboxb">
				<view class="text_center flex_center" v-show="!boxb">
					<image src="../../static/img/index_qq.png" mode="" class="ntt_tc_icon"></image>
					<text class="font_mon marl">期权</text>
				</view>
				<view class="showboxa flex_center f_j_b" v-show="boxb">
					<view class="">
						<view class="flex_center">
							<image src="../../static/img/index_qq.png" mode="" class="ntt_tc_icon"></image>
							<text class="font_mon marl">期权</text>
						</view>
						<view class="" style="margin-left: 50rpx;">根据自己对市场的判断，购买涨跌</view>
					</view>
					<view class="showbt">立即参与</view>
				</view>
			</view>
			<view class="ntt_tc ntt_tc_boxc" :class="boxa?'boxa_c':boxb?'boxb_c':''" @click="cboxc">
				<view class="text_center flex_center" v-show="!boxc">
					<image src="../../static/img/index_lc.png" mode="" class="ntt_tc_icon"></image>
					<text class="font_mon marl">理财</text>
				</view>
				<view class="content" v-show="boxc">
					<view class="text_center flex_center">
						<image src="../../static/img/index_lc.png" mode="" class="ntt_tc_icon"></image>
						<text class="font_mon marl">理财</text>
					</view>
					<view class="" style="margin-top: 50rpx; width: 80%;">用户购买理财产品，并逐步获得收益，邀请好友可获得动态收益</view>
					<view class="showbt" style="margin-top: 20rpx;">立即参与</view>
				</view>
			</view>
		</view>
		<!-- <image class="index_list" style="margin-top: -100rpx;" src="../../static/img/index_a.png" mode="" @click="goresonance"></image>
		<image class="index_list" src="../../static/img/index_b.png" mode="" @click="hint"></image>
		<image class="index_list" src="../../static/img/index_c.png" mode="" @click="hint"></image> -->
		
	</view>
</template>

<script>
	import { getToken , delToken } from '../../utils/userAuth.js'
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		data() {
			return {
				boxa:true,
				boxb:false,
				boxc:false,
				coinmarket:[],
				banner:[],
			}
		},
		onLoad() {
		},
		onShow(){
			this.getcoinkline()
			this.getbanner()
		},
		methods: {
			goresonance(){
				navigateTo('resonance/resonance')
			},
			loginout(){
				delToken()
				uni.reLaunch({
					url:'/pages/start/start'
				})
			},
			gome(){
				reLaunch('user/user')
			},
			hint(){
				_toast('即将开放')
			},
			cboxa(){
				if(this.boxa){
					navigateTo('resonance/resonance')
				}
				this.boxa = true
				this.boxb = false
				this.boxc = false
			},
			cboxb(){
				if(this.boxb){
					// this.hint()
					// return
					navigateTo('options/options')
				}
				this.boxa = false
				this.boxb = true
				this.boxc = false
			},
			cboxc(){
				if(this.boxc){
					this.hint()
					return
					navigateTo('manage/manage')
				}
				this.boxa = false
				this.boxb = false
				this.boxc = true
				
			},
			getcoinkline(){
				this.$request({
					url: '/get.coin.market',
					method: 'get',
					data: {
						count:20,
						page:1
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.coinmarket = res.data.data
				})
				.catch(err => {
				})
			},
			getbanner(){
				this.$request({
					url: 'banner',
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
					this.banner = res.data
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
	@import url("../../common/css/index.css");
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
