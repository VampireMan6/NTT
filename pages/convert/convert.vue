<template>
	<view class="content" :class="AlertShow?'nomove':''">
		<!-- <view style="height: var(--status-bar-height);"></view> -->
		<!-- <w-loading text="加载中.." mask="true" click="false" ref="loading"></w-loading> -->
			<view class="topbox content"  @tap="open(1, 'top')" :style="AlertShow?'filter: blur(4px);':''">
			 	<view class="topcard_f"></view>
			 	<view class="topcard_t"></view>
			 	<view class="topcard">
			 		<view class="flex_center f_j_b">
						<view class="tc_item">
							<view class="text_ver" v-if="coin_type == 1"><text class="font_big">{{info.wallet | toNonExponential}}</text><text class="font_mon">NTT</text></view>
							<view class="text_ver" v-if="coin_type == 2"><text class="font_big">{{info.gz | toNonExponential}}</text><text class="font_mon">NTT</text></view>
							<view class="">余额</view>
						</view>
						<view class="tc_item">
							<view class="font_big">1 : {{info.rate}}</view>
							<view class="">闪兑汇率</view>
						</view>
			 		</view>
					<view class="font_max text_center martt">{{coin_type == 1?'钱包':'共振'}}NTT</view>
			 	</view>
			</view>
			<view class="coinbox" :style="AlertShow?'filter: blur(4px);':''">
				<image class="coinbox_bg" src="../../static/img/gz_bg.png" mode=""></image>
				<view class="coinbox_nr content">
					<view class="flex_center f_j_b gzcoin_box">
						<view class="flex_center" style="width: 300rpx;">
							<image class="coin_icon" :src="getlogo('NTT')" mode=""></image>
							<view class="font_max marl">NTT</view>
						</view>
						<image class="jiantou" src="../../static/img/jiantou.png" mode=""></image>
						<view class="flex_center f_j_e" style="width: 300rpx;">
							<view class="font_max">USDT</view>
							<image class="coin_icon marl" :src="getlogo('USDT')" mode=""></image>
						</view>
					</view>
					<view class="flex_center f_j_b gzinput_box">
						<input type="text" v-model="amount" placeholder="转出数量" class=""/>
						<input type="text" :value="toamount()  | toNonExponential" disabled placeholder="转入数量" class="text_right"/>
					</view>
					<view class="flex_center mart coin_q">
						<view class="" v-if="coin_type == 1">当前可用闪兑额度：{{info.light_quote_wallet  | toNonExponential}} NTT，</view>
						<view class="" v-if="coin_type == 2">当前可用闪兑额度：{{info.light_quote_gz  | toNonExponential}} NTT，</view>
						<view class="color_red" @click="all">全部兑换</view>
					</view>
					<view class="coin_q shuom">闪兑说明：</view>
					<text  class="coin_q">{{info.content}}</text>
				</view>
			</view>
		<view class="bt btn mart font_b" :style="AlertShow?'filter: blur(4px);':''" @click="queren">确认闪兑</view>
		<view class="list_box" :style="AlertShow?'filter: blur(4px);':''">
			<view class="list_tel font_max">闪兑记录</view>
			<block v-for="(item,index) in gzlist" :key="index">
				<view class="list_item">
					<view class="flex_center f_j_b">
						<view class="font_max" style="width: 300rpx;">{{item.from | toNonExponential}}NTT</view>
						<image class="jiantou" src="../../static/img/jiantou.png" mode=""></image>
						<view class="font_max text_right" style="width: 300rpx;">{{item.to | toNonExponential}}USDT</view>
					</view>
					<view class="flex_center f_j_b martt">
						<view class="">兑换汇率：</view>
						<view class="">1 ： {{item.rate}}</view>
					</view>
					<view class="flex_center f_j_b">
						<view class="">兑换时间：</view>
						<view class="">{{item.updated_at}}</view>
					</view>
				</view>
			</block>
		</view>
		
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<view class="" v-if="AlertClass == 1" @touchmove.prevent>
				<view class="tanchutel">选择币种</view>
				<!-- <block v-for="(item,index) in list" :key="index"> :class="index%3 == 1?'tccard_box1':index%3 == 2?'tccard_box2':'topcard'"-->
					<view class="martt ldx infinite ldx-spring-btt-in tccard_box1" @click="ccoin_type(1)">
						<!-- <view class="font_max">Lv.{{item.level}}</view> -->
						<view class="flex_center f_j_b mart">
							<view class="tc_item">
								<view class="text_ver"><text class="font_big">{{info.wallet  | toNonExponential}}</text><text class="font_mon">NTT</text></view>
								<view class="">余额</view>
							</view>
							<view class="tc_item">
								<view class="font_big">1 : {{info.rate}}</view>
								<view class="">闪兑汇率</view>
							</view>
						</view>
						<view class="font_max text_center martt">钱包NTT</view>
					</view>
					<view class="martt ldx infinite ldx-spring-btt-in tccard_box2" @click="ccoin_type(2)">
						<!-- <view class="font_max">Lv.{{item.level}}</view> -->
						<view class="flex_center f_j_b mart">
							<view class="tc_item">
								<view class="text_ver"><text class="font_big">{{info.gz | toNonExponential}}</text><text class="font_mon">NTT</text></view>
								<view class="">余额</view>
							</view>
							<view class="tc_item">
								<view class="font_big">1 : {{info.rate}}</view>
								<view class="">闪兑汇率</view>
							</view>
						</view>
						<view class="font_max text_center martt">共振NTT</view>
					</view>
				<!-- </block> -->
			</view>
			
			<view class="" v-if="AlertClass == 5">
				<view class="tanchutel1">确认闪兑</view>
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">请输入交易密码</view>
					<view class="text_ver martt"><text class="font_mon">NTT</text><text class="font_big">{{amount}}</text></view>
					<view class="text_center"><image src="../../static/img/jiantou.png" class="jiantou" style="transform: rotate(90deg);" mode=""></image></view>
					<view class="text_ver text_right"><text class="font_mon">USDT</text><text class="font_big">{{toamount()}}</text></view>
					<view class="martt int_box flex_center f_j_b">
						<input type="text" password v-model="paypassword" placeholder="请输入交易密码" auto-focus="true"/>
						<view class="bt int_bt" @click="sure">确定</view>
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
				info:'',
				coin_type:1
			}
		},
		onLoad() {
			// this.getlist()
			this.initdata()
			this.getinfo()
		},
		onReady() {
				// this.$refs.loading.open()
			},
		methods: {
			ChangeLoading(){
				// this.$refs.loading.open()
				//this.$refs.loading.close()
			},
			ccoin_type(e){
				this.coin_type = e
				this.amount = ''
				this.close()
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
					coin_type:this.coin_type
				}
				this.app.showLoadinig()
				this.$request({
					url: '/post.exchanging',
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
					this.getinfo()
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
				navigateTo('convert/convert_result?amount=' + this.amount + '&rate=' + this.info.rate)
			},
			getinfo(){
				this.$request({
					url: '/get.exchange',
					method: 'get',
					data:{},
				})
				.then(res => {
					this.loadingType = 'more';
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.info = res.data
				})
				.catch(err => {
				})
			},
			
			toamount(){
				let num = this.app._accMul(this.amount,this.info.rate)
				return num
			},
			all(){
				if(this.coin_type == 1){
					if(parseInt(this.info.wallet) <parseInt(this.info.light_quote_wallet)){
						this.amount = parseInt(this.info.wallet)
					}else{
						this.amount = parseInt(this.info.light_quote_wallet)
					}
				}else{
					if(parseInt(this.info.gz) <parseInt(this.info.light_quote_gz)){
						this.amount = parseInt(this.info.gz)
					}else{
						this.amount = parseInt(this.info.light_quote_gz)
					}
				}
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
					url: '/get.exchange.logs',
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
				// var name = this.coininfo.filter(item => {
				// 	return item.id == e;
				// })[0].en_name;
				return name
			},
			xx(){},
			goset(){
				navigateTo('user/set')
				this.close()
			},
			getlogo(e){
				// console.log(this.coininfo)
				return this.coininfo.filter(item => {
					return item.en_name == e;
				})[0].logo
			},
		}
	}
</script>

<style>
@import url("../../common/css/convert.css");
.nomove{
	height: 100vh;
	overflow: hidden;
}
.content{
	width: 750rpx;
	overflow-x: hidden;
}
</style>
