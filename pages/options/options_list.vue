<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="tabs_box flex_center">
					<view class="tabs_k" :style="'transform: translateX('+ tabs_k + 'rpx)'"></view>
					<view class="flex_center tabs_x_box">
						<view class="tabs_x" @click="caccount(0)">购买期权</view>
						<view class="tabs_x" @click="caccount(1)">等待交割</view>
						<view class="tabs_x" @click="caccount(3)">交割记录</view>
					</view>
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="list_box flex_center f_j_b" style="margin-top: 30rpx;">
			<view class="botacc_item">
				<view class="font_mon">{{userbanner.invest | toNonExponential}}</view>
				<view class="">累计投资</view>
			</view>
			<view class="botacc_itema">
				<view class="font_mon">{{userbanner.profit | toNonExponential}}</view>
				<view class="">累计盈利</view>
			</view>
			<view class="botacc_item">
				<view class="font_mon">{{userbanner.light_quote | toNonExponential}}</view>
				<view class="">可转闪兑</view>
			</view>
		</view>
		<view class="" v-show="account == 0" >
			<block v-for="(item,index) in list">
				<view class="flex_center f_j_b widbox" v-if="getfptime(item)>0">
					<view class="wida">{{item.option_coin}} {{item.option_type == '1'?'1':'5'}}M {{getcctime(item.end)}}</view>
					<view class="widb">即将封盘</view>
					<view class="flex_center widc">
						<image src="../../static/img/time.png" class="time" mode=""></image>
						<view class="">
							<uni-countdown class=""
								:show-day="false" 
								:hour="0" 
								:minute="0" 
								:second="getfptime(item)" :reset="false" splitor-color="#ffffff" background-color="#2B2D3D" @timeup="timeUp">
							</uni-countdown>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="" v-show="account == 1">
			<block v-for="(item,index) in list" v-if="getjgtime(item)>0">
				<view class="flex_center f_j_b widbox">
					<view class="wida">当前场 {{item.option_coin}} {{item.option_type == '1'?'1':'5'}}M {{getcctime(item.end)}}</view>
					<view class="widb">等待交割</view>
					<view class="flex_center widc">
						<image src="../../static/img/time.png" class="time" mode=""></image>
						<view class="">
							<uni-countdown class=""
								:show-day="false" 
								:hour="0" 
								:minute="0" 
								:second="getjgtime(item)" :reset="false" splitor-color="#ffffff" background-color="#2B2D3D" @timeup="timeUp">
							</uni-countdown>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="" v-show="account == 3" >
			<block v-for="(item,index) in list">
				<view class="list_box">
					<view class="flex_center f_j_b ">
						<view class="list_box_item">{{item.option_coin}} {{item.option_type == '1'?'1':'5'}}M {{getcctime(item.end)}}</view>
					</view>
					<view class="flex_center f_j_b " style="margin-top: 16rpx;">
						<view class="list_box_item">投资数量：{{item.amount | toNonExponential}} {{item.coin_from_type==3?'USDT':'NTT'}}</view>
						<view class="list_box_item">投资时间：{{item.created_at | FormatDate}}</view>
					</view>
					<view class="flex_center f_j_b" style="margin-top: 16rpx;">
						<view class="list_box_item">投资方向：<text :style="item.betting_result != 'up'?'color:#E05750':'color:#7FEF9D'">{{item.betting_result == 'up'?'涨':item.betting_result == 'balance'?'平':'跌'}}</text></view>
						<view class="list_box_item">交割结果：{{Number(item.profit)<=0?'0': (Number(item.amount)+Number(item.profit))  | toNonExponential}} {{item.coin_from_type==3?'USDT':'NTT'}}</view>
					</view>
				</view>
			</block>
		</view>
		
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	import loadMore from '../../components/uni-load-more.vue'
	export default {
		components: {
			uniCountdown,
			loadMore
		},
		data() {
			return {
				list:'',
				userbanner:'',
				account:'0',
				logstatus : 1,
				page: 1,
				count: 20,
				loadingType: "more",
				
				tabs_k:0,
			}
		},
		onLoad() {
			this.initdata()
			this.getoptionuser()
		},
		onReachBottom(){
			this.getlogs();
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
			initdata(){
				this.page = 1
				this.loadingType = 'more'
				this.list = []
				this.getlogs()
			},
			getlogs(){
				if (this.loadingType === 'nomore' || this.loadingType === 'loading') {
					return;
				}
				this.loadingType = 'loading';
				
				console.log(this.logstatus)
				this.$request({
					url: '/get.option.logs',
					method: 'get',
					data: {
						status:this.logstatus,
						count:20,
						page:1
					}
				})
				.then(res => {
					this.loadingType = 'more';
					console.log(res)
					if (res.code !== 200&& res.code!==10004) {
						_toast(res.message)
						return false
					}
					if(res.code===10004){
						this.list = []
						return
					}
					// this.list = res.data.data
					this.page = this.page+1
					let list = res.data.data
					this.list = this.list.concat(list);
					if (list.length < this.count) {
						this.loadingType = 'nomore';
					}
				})
				.catch(err => {
				})
			},
			getoptionuser(){
				this.$request({
					url: '/get.option.userinfo',
					method: 'get',
					data: {}
				})
				.then(res => {
					// console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.userbanner = res.data
				})
				.catch(err => {
				})
			},
			caccount(e){
				if(e == 0){
					this.logstatus = 1
					this.tabs_k = 0
					this.initdata()
					this.account = e
				}else if(e == 1){
					this.logstatus = 1
					this.tabs_k = 160
					this.initdata()
					this.account = e
				}else{
					this.logstatus = 2
					this.tabs_k = 320
					this.initdata()
					this.account = e
				}
			},
			timeUp(){
				this.initdata()
			},
			getfptime(e){
				var cctime = e.end.substring(0,4) + '/' + e.end.substring(4,6) + '/' + e.end.substring(6,8) + ' ' + e.end.substring(8,10) + ':' + e.end.substring(10,12) + ':' + '00'
			
				var fptime = new Date(cctime)
				
				var fptiime = (fptime.getTime())/1000
				var time = new Date().getTime()/1000
				
				if(e.option_type == 1){
					if(( parseFloat(fptiime) -parseFloat(time)  - 20) >0){
						return parseFloat(fptiime) -parseFloat(time) - 20
					}else{
						return 0
						// return false
					}
				}else{
					if((parseFloat(fptiime) -parseFloat(time)  - 30) >0){
						return parseFloat(fptiime) -parseFloat(time)  - 30
					}else{
						return 0
						// return false
					}
				}
			},
			getjgtime(e){
				var cctime = e.end.substring(0,4) + '/' + e.end.substring(4,6) + '/' + e.end.substring(6,8) + ' ' + e.end.substring(8,10) + ':' + e.end.substring(10,12) + ':' + '00'
			
				var fptiime = new Date(cctime).getTime()/1000
				var time = new Date().getTime()/1000
				if(e.option_type == 1){
					if((fptiime - time ) >0&&(fptiime - time ) <20){
						return fptiime - time
					}else{
						return 0
						// return false
					}
				}else{
					if((fptiime - time) >0&&(fptiime - time ) <30){
						return fptiime - time
					}else{
						return 0
						// return false
					}
				}
			},
			getcctime(e){
				var cctime = e.substring(0,4) + '-' + e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12)
				return e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12)
			},
		}
	}
</script>

<style>
@import url("../../common/css/options_list");
</style>
