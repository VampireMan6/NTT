<template>
	<view class="content" :class="AlertShow?'nomove':''">
		<!-- v-if="total != 0" -->
		<!-- <view style="height: var(--status-bar-height);"></view> -->
		<!-- <w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading> -->
			<view  v-if="total != 0" class="topbox content"  @tap="open(1, 'top')" :style="AlertShow?'filter: blur(4px);':''">
			 	<view class="topcard_f"></view>
			 	<view class="topcard_t"></view>
			 	<view class="topcard">
			 		<view class="flex_center f_j_b">
						<view class="tc_item">
							<view class="">当级额度<text class="font_big" style="margin-left: 10rpx;">{{detail.amount  | toNonExponential}}</text><text class="font_mon">NTT</text></view>
							<!-- <view class="text_ver"><text class="font_big">{{detail.amount  | toNonExponential}}</text><text class="font_mon">NTT</text></view> -->
						</view>
						<view class="tc_item">
							<view class="">当级汇率<text style="margin-left: 10rpx;">1 : {{detail.rate}}</text></view>
							<!-- <view class="font_big">1 : {{detail.rate}}</view> -->
						</view>
			 			<!-- <view class="text_ver">
			 				<text class="">当级额度</text>
							<text class="font_big text_ver marl">{{detail.amount  | toNonExponential}}</text>
							<text class="marl">NTT</text>
			 			</view>
						<view class=" text_ver">
							<text class="">当前汇率</text>
							<text class="font_big text_ver marl">1：{{detail.rate}}</text>
						</view> -->
			 		</view>
					<view class="pro_lajibox mart" v-if="pro">
						<view class="pro_laji">
							<view class="xian" :style="pro?'transform: translateX(-' + zhi(detail) + '%)':'transform: translateX(-100%)' "></view>
						</view>
						<view class="dian" :style="pro?'transform: translateX(' + zhia(detail) + '%)':'transform: translateX(0%)' ">
							<view class="dian_quan"></view>
						</view>
						<!-- <view class="mart" style="text-align: center;"> -->
						<view class="mart" :style="zhia(detail)<30?'':zhia(detail)>70?'text-align: right;':'text-align: center;'">
							已消耗{{zhiab(detail)}}%,剩余{{detail.surplus}}
						</view>
					</view>
			 	</view>
			</view>
			<view v-if="total != 0" class="coinbox" :style="AlertShow?'filter: blur(4px);':''">
				<image class="coinbox_bg" src="../../static/img/gz_bg.png" mode=""></image>
				<view class="coinbox_nr content">
					<view class="flex_center f_j_b gzcoin_box">
						<view class="flex_center" style="width: 300rpx;">
							<image class="coin_icon" :src="balance.logo" mode=""></image>
							<view class="font_max marl">{{balance.CoinName}}</view>
						</view>
						<image class="jiantou" src="../../static/img/jiantou.png" mode=""></image>
						<view class="flex_center f_j_e" style="width: 300rpx;">
							<view class="font_max">{{tobalance.en_name}}</view>
							<image class="coin_icon marl" :src="tobalance.logo" mode=""></image>
						</view>
					</view>
					<view class="flex_center f_j_b gzinput_box">
						<input type="text" v-model="amount" placeholder="转出数量" class=""/>
						<input type="text" :value="toamount()  | toNonExponential" disabled placeholder="换入数量" class="text_right"/>
					</view>
					<view class="flex_center mart coin_q">
						<view class="">当前可用余额：{{balance.Money  | toNonExponential}} {{balance.CoinName}}，</view>
						<view class="color_red" @click="all">全部兑换</view>
					</view>
					<view class="coin_q shuom">兑换说明：</view>
					<text class="coin_q" style="">{{con}}</text>
				</view>
			</view>
		<view v-if="total != 0" class="bt btn mart font_b" :style="AlertShow?'filter: blur(4px);':''" @click="queren">确认兑换</view>
		<view class="list_box" :style="AlertShow?'filter: blur(4px);':''">
			<view class="list_tel font_max">兑换记录</view>
			<block v-for="(item,index) in gzlist" :key="index">
				<view class="list_item">
					<view class="flex_center f_j_b">
						<view class="font_max" style="width: 300rpx;">{{item.from_amount}} {{getname(item.gz.from_coin_id)}}</view>
						<image class="jiantou" src="../../static/img/jiantou.png" mode=""></image>
						<view class="font_max text_right" style="width: 300rpx;">{{item.to_amount}} {{getname(item.gz.to_coin_id)}}</view>
					</view>
					<view class="flex_center f_j_b martt">
						<view class="">兑换汇率：</view>
						<view class="">1 ： {{item.gz.rate}}</view>
					</view>
					<view class="flex_center f_j_b">
						<view class="">兑换时间：</view>
						<view class="">{{item.updated_at | _formatDate}}</view>
					</view>
				</view>
			</block>
		</view>
		
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<view class="" v-if="AlertClass == 1" @touchmove.prevent>
				<view class="tanchutel">兑换母币</view>
				<scroll-view scroll-y="true" style="width: 686rpx;height: 80vh;" @scrolltolower="getmore">
					<block v-for="(item,index) in list" :key="index">
						<view class="martt ldx infinite ldx-spring-btt-in" :class="index%3 == 1?'tccard_box1':index%3 == 2?'tccard_box2':'topcard'" v-if="item.level!=detail.level">
							<view class="font_max">Lv.{{item.level}}</view>
							<view class="flex_center f_j_b mart">
								<view class="tc_item">
									<view class="text_ver"><text class="font_big">{{item.amount}}</text><text class="font_mon">NTT</text></view>
									<view class="">当级额度</view>
								</view>
								<view class="tc_item">
									<view class="font_big">1 : {{item.rate}}</view>
									<view class="">当级汇率</view>
								</view>
							</view>
						</view>
						<view class="topcard martt ldx infinite ldx-spring-btt-in" :class="index%3 == 1?'tccard_box1':index%3 == 2?'tccard_box2':'topcard'" v-if="item.level==detail.level">
							<view class="flex_center f_j_b">
								<view class="tc_item">
									<view class="text_ver"><text class="font_big">{{item.amount  | toNonExponential}}</text><text class="font_mon">NTT</text></view>
									<view class="">当级额度</view>
								</view>
								<view class="tc_item">
									<view class="font_big">1 : {{item.rate}}</view>
									<view class="">当级汇率</view>
								</view>
								<!-- <view class=" text_ver">
									<text class="">当级额度</text>
									<text class="font_big text_ver marl">{{item.amount}}</text>
									<text class="marl">NTT</text>
								</view>
								<view class=" text_ver">
									<text class="">当前汇率</text>
									<text class="font_big text_ver marl">1：{{item.rate}}</text>
								</view> -->
							</view>
							<view class="pro_lajibox mart">
								<view class="pro_laji">
									<view class="xian" :style="pro?'transform: translateX(-' + zhi(item) + '%)':'transform: translateX(-100%)' "></view>
								</view>
								<view class="dian" :style="pro?'transform: translateX(' + zhia(item) + '%)':'transform: translateX(0%)' ">
									<view class="dian_quan"></view>
									
								</view>
								<view class="mart" :style="zhia(detail)<30?'':zhia(detail)>70?'text-align: right;':'text-align: center;'">
									已消耗{{zhiab(item)}}%,剩余{{item.surplus}}
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
			
			<view class="" v-if="AlertClass == 5">
				<view class="tanchutel1">确认兑换</view>
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">请输入交易密码</view>
					<view class="text_ver martt"><text class="font_mon">{{balance.CoinName}}</text><text class="font_big">{{amount}}</text></view>
					<view class="text_center"><image src="../../static/img/jiantou.png" class="jiantou" style="transform: rotate(90deg);" mode=""></image></view>
					<view class="text_ver text_right"><text class="font_mon">{{tobalance.name}}</text><text class="font_big">{{toamount()}}</text></view>
					<view class="martt int_box flex_center f_j_b">
						<input type="text" password v-model="paypassword" placeholder="请输入交易密码" auto-focus="true"/>
						<view class="int_bt bt"  @click="sure">确定</view>
					</view>
				</view>
			</view>
			
			<view class="" v-if="AlertClass == 0&&hint == 'err'">
				<view class="tanchutel1">哦豁，出错了！</view>
				<view class="err_box">
					<view class="font_max text_center">交易密码错误，请重试</view>
					<view class="flex_center f_j_b btn_box">
						<view class="btn_box_l" @click="goset">忘记密码</view>
						<view class="btn_box_r color_yellow" @click="again">重新输入</view>
					</view>
				</view>
			</view>
			<view class="" v-if="AlertClass == 0&&hint == 'pay'">
				<view class="err_box">
					<view class="font_max text_center">为了您的资金安全，请先设置交易密码</view>
					<view class="flex_center f_j_b btn_box">
						<view class="btn_box_l" @click="close">取消</view>
						<view class="btn_box_r color_yellow" @click="goset">去设置</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo",
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				title: "loading",
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				pro:false,
				detail:'',
				list:'',
				balance:'',
				tobalance:'',
				
				amount:'',
				paypassword:'',
				
				gzlist:'',
				page:2,
				lvmore:'more',
				
				hint:'err',
				
				total:'',
				con:'',
			}
		},
		onLoad() {
			this.getlist()
			this.initdata()
			this.getcon()
		},
		onReady() {
				// this.$refs.loading.open()
			},
		methods: {
			ChangeLoading(){
				// this.$refs.loading.open()
				//this.$refs.loading.close()
			},
			open(Class, Position) {
				this.$nextTick(function() {
					this.AlertClass = Class;
					this.AlertPosition = Position;
					this.$nextTick(function() {
						this.$refs.openAlert.Show();
					});
				});
			},
			close(){
				this.$refs.openAlert.Close();
			},
			sure(){
				if(!this.paypassword){
					_toast('请输入交易密码')
					return
				}
				var params = {
					amount:this.amount,
					pay_password:this.paypassword,
				}
				this.app.showLoadinig()
				this.$request({
					url: 'gz/do',
					method: 'post',
					data:params,
				})
				.then(res => {
					this.app.hideLoading()
					console.log(res)
					if(res.code == 52002){
						this.hint = 'err'
						this.open(0,'center')
						return false
					}
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.getlist()
					this.initdata()
					_toast(res.message)
					this.close()
					this.goresult(res.data)
					this.paypassword = ''
					// this.tcen = 'err'
					// this.open(0,'center')
				})
				.catch(err => {
				})
				// this.open(0,'center')
			},
			again(){
				this.paypassword = ''
				this.open(5,'center')
			},
			goresult(e){
				var xinxi = JSON.stringify(e)
				navigateTo('resonance/resonanec_result?fromcoin='+ this.balance.CoinName + '&tocoin=' + this.tobalance.en_name + '&xinxi=' + xinxi)
			},
			getlist(){
				this.$request({
					url: 'gzlist',
					method: 'get',
					data: {
						page:1,
						count:6,
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.total = res.data.total
					this.detail = res.data.data[0]
					this.list = res.data.data
					this.pro = true
					this.getbalance()
					this.tobalance = this.coininfo.filter(item => {
						return item.id == this.detail.to_coin_id;
					})[0];
				})
				.catch(err => {
				})
			},
			getmore(){
				if (this.lvmore === 'nomore' || this.lvmore === 'loading') {
					return;
				}
				this.lvmore = 'loading';
				this.$request({
					url: 'gzlist',
					method: 'get',
					data: {
						page:this.page,
						count:6,
					}
				})
				.then(res => {
					this.lvmore = 'more';
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.page = this.page+1
					let list = res.data.data
					this.list = this.list.concat(list);
					// concat(list)
					// for(let item of list){
					// 	this.list.unshift(item);
					// }
					if (list.length < 6) {
						this.lvmore = 'nomore';
					}
					
				})
				.catch(err => {
				})
			},
			getbalance(){
				this.$request({
					url: '/get.usercoin.coinbalance',
					method: 'get',
					data: {
						coin_id:this.detail.from_coin_id
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
			getcon(){
				this.$request({
					url: 'gzcontent',
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
					this.con = res.data
				})
				.catch(err => {
				})
			},
			zhi(e){
				let num = this.app._accDiv(e.surplus,e.amount)
				return (Number(num)*100).toFixed(2)
			},
			zhia(e){
				let num = this.app._accDiv(e.surplus,e.amount)
				if((100-Number(num)*100)>95){
					return 95
				}
				return (100-Number(num)*100).toFixed(2)
			},
			zhiab(e){
				let num = this.app._accDiv(e.surplus,e.amount)
				if((100-Number(num)*100)>95){
					 (100-Number(num)*100).toFixed(2)
				}
				return (100-Number(num)*100).toFixed(2)
			},
			toamount(){
				let num = this.app._accMul(this.amount,this.detail.rate)
				return num
			},
			all(){
				this.amount = this.balance.Money
			},
			queren(){
				if(this.userInfo.user.is_paypassword != 1){
					this.hint = 'pay'
					this.open(0, 'center')
					return
				}
				if(this.amount>0){
					this.open(5, 'center')
				}else{
					_toast('请输入数量')
				}
			},
			initdata(){
				this.page = 1
				this.loadingType = 'more'
				this.gzlist = []
				this.getList()
			},
			getList(){
				if (this.loadingType === 'nomore' || this.loadingType === 'loading') {
					return;
				}
				this.loadingType = 'loading';
				let params = {
					page:this.page,
					count:this.count,
				}
				this.$request({
					url: 'gzlogs',
					method: 'get',
					data:params,
				})
				.then(res => {
					this.loadingType = 'more';
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.page = this.page+1
					let gzlist = res.data.data
					this.gzlist = this.gzlist.concat(gzlist);
					if (gzlist.length < this.count) {
						this.loadingType = 'nomore';
					}
				})
				.catch(err => {
				})
			},
			getname(e){
				var name = this.coininfo.filter(item => {
					return item.id == e;
				})[0].en_name;
				return name
			},
			xx(){},
			goset(){
				navigateTo('user/set')
				this.close()
			},
		}
	}
</script>

<style>
@import url("../../common/css/resonance.css");
.nomove{
	height: 100vh;
	overflow: hidden;
}
.content{
	width: 750rpx;
	overflow-x: hidden;
}
</style>
