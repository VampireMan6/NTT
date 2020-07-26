<template>
	<view class="content">
		<view class="topbox flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''">
			<view class="top_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{info.all_amount |　toNonExponential}} </text>
					<!-- <text class="font_max marl">万</text> -->
				</view>
				<view class="">全网投资总额</view>
			</view>
			<view class="top_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{info.all_capital_flow_amount　|　toNonExponential}} </text>
					<!-- <text class="font_max marl">万</text> -->
				</view>
				<view class="">全网投资流水</view>
			</view>
		</view>
		<view class="top_bot flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_mon">当前收益率：{{info.financing_profit_rate*100}}%</view>
			<view class="font_mon">满仓收益率：{{info.financing_profit_rate_max*100}}%</view>
		</view>
		<view class="tel" :style="AlertShow?'filter: blur(4px);':''">我的收益</view>
		<view class="shouyibox flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''">
			<view class="shouyibox_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{info.capital_flow_amount　|　toNonExponential}} </text>
					<!-- <text class="font_max marl">万</text> -->
				</view>
				<view class="">总流水</view>
			</view>
			<view class="shouyibox_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{info.profit_amount　|　toNonExponential}} </text>
					<!-- <text class="font_max marl">万</text> -->
				</view>
				<view class="">总收益</view>
			</view>
		</view>
		<view class="tel" :style="AlertShow?'filter: blur(4px);':''">我的投资</view>
		<block v-for="(item,index) in logs" :key="index">
			<view class="list_box" :style="AlertShow?'filter: blur(4px);':''">
				<view class="font_mon">投资编号：{{item.sn}}</view>
				<view class="flex_center martt f_j_b">
					<view class="list_jindu">
						<cmd-progress :percent="item.phase_rate*100" type="circle" :width="48" stroke-color="#F2AB3E"></cmd-progress>
						<view class="list_jinduhint">收益中</view>
					</view>
					<view class="list_sybox">
						<view class="">累计收益：{{item.profit_amount}} NTT</view>
						<view style="margin-top: 16rpx;">投资数量：{{item.amount}} NTT</view>
						<view style="margin-top: 16rpx;">投资时间：{{item.created_at | FormatDate}}</view>
					</view>
					<view class="list_bt" @click="godetail(item.id)">详情</view>
				</view>
			</view>
		</block>
		
		<view class="bt btn" @click="liji" :style="AlertShow?'filter: blur(4px);':''">立即投资</view>
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="" v-if="AlertClass == 0&&hint == 'fu'">
				<!-- <view class="tanchutel1"></view> -->
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_mon text_center">立即投资</view>
					<!-- <view class="text_center">
						{{closetime}}
					</view> -->
					<view class="flex_center f_j_b zhifu_int_box">
						<view class="flex_center f_j_b zhifu_int_bz" @click="ccbi">
							<view class="" v-if="coin_from_type == 1">NTT-钱包</view>
							<view class="" v-if="coin_from_type == 2">NTT-共振</view>
							<view class="" v-if="coin_from_type == 3">NTT-钱包期权</view>
							<view class="" v-if="coin_from_type == 4">NTT-共振期权</view>
							<image src="../../static/img/xmore.png" class="top_more" mode=""></image>
							<view class="bizhong" v-if="cbi" @click.stop="xx">
								<scroll-view scroll-y="true" style="height: 180rpx;">
									<view class="bizhong_item" @click="ccoin_from_type(1)">NTT-钱包</view>
									<view class="bizhong_item" @click="ccoin_from_type(2)">NTT-共振</view>
									<view class="bizhong_item" @click="ccoin_from_type(3)">NTT-钱包期权</view>
									<view class="bizhong_item" @click="ccoin_from_type(4)">NTT-共振期权</view>
								</scroll-view>
							</view>
						</view>
						<view class="zhifu_int_num flex_center">
							<input type="number" v-model="num" placeholder="请输入数量"/>
						</view>
					</view>
					<view class="martt int_box flex_center f_j_b">
						<input type="number" password v-model="password" placeholder="请输入交易密码" auto-focus="true"/>
						<view class="bt int_bt" @click="sure">确定</view>
					</view>
					<view class="flex_center f_j_b mart">
						<view class="" v-if="coin_from_type == 1">可用余额{{ntt_money.Money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 2">可用余额{{ntt_money.gz | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 3">可用余额{{userbanner.wallet.money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 4">可用余额{{userbanner.gz.money | toNonExponential}}NTT</view>
						<view class="">预计收益{{yuji(num)}}NTT</view>
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
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		components: {
			cmdProgress
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo",
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				num:'',
				password:'',
				ntt_money:'',
				hint:'fu',
				userbanner:'',
				cbi:false,
				coin_from_type:1,
				info:'',
				logs:'',
			}
		},
		onLoad() {
			this.getcoin()
			this.getoptionuser()
			this.getinfo()
			this.getlogs()
		},
		methods: {
			close(){
				this.num = ''
				this.password = ''
				this.$refs.openAlert.Close();
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
			liji(){
				if(this.userInfo.user.is_paypassword != 1){
					this.hint = 'pay'
					this.open(0, 'center')
					return
				}
				this.open(0, 'center')
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
					this.ntt_money = list.filter(item => {
						return item.CoinName == 'NTT';
					})[0];
				})
				.catch(err => {
				})
			},
			yuji(e){
				if(e){
					return ((parseFloat(e)*parseFloat(this.info.financing_profit_rate)).toFixed(4))
				}else{
					return 0
				}
			},
			goset(){
				navigateTo('user/set')
				this.close()
			},
			again(){
				this.hint = 'fu'
			},
			sure(){
				this.$request({
					url: '/post.financing',
					method: 'post',
					data: {
						amount :this.num,
						coin_from_type:this.coin_from_type,
						pay_password :this.password
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.getcoin()
					this.getoptionuser()
					this.getinfo()
					this.getlogs()
					this.close()
					navigateTo('manage/manage_result?num=' + this.num + '&rate=' + this.info.financing_profit_rate)
				})
				.catch(err => {
				})
				
			},
			godetail(e){
				navigateTo('manage/manage_detail?id=' + e)
			},
			getoptionuser(){
				this.$request({
					url: '/get.option.userinfo',
					method: 'get',
					data: {
						// status:this.logstatus,
						// count:20,
						// page:1
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.userbanner = res.data
				})
				.catch(err => {
				})
			},
			ccbi(){
				this.cbi = true
			},
			ccoin_from_type(e){
				this.coin_from_type = e
				this.cbi = false
			},
			xx(){},
			getinfo(){
				this.$request({
					url: '/get.financing',
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
					this.info = res.data
				})
				.catch(err => {
				})
			},
			getlogs(){
				this.$request({
					url: '/get.financing.logs',
					method: 'get',
					data: {
						page:1,
						count:50,
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.logs = res.data.data
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/manage.css");
</style>
