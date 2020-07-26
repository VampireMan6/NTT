<template>
	<view class="content">
		<view class="top_box">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					投资详情
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="topbox flex_center f_j_b"  :style="AlertShow?'filter: blur(4px);':''">
			<view class="top_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{detail.capital_flow_amount}} </text>
				</view>
				<view class="">投资流水（NTT）</view>
			</view>
			<view class="top_item">
				<view class="text_ver">
					<text style="font-size: 56rpx;">{{detail.profit_amount}} </text>
				</view>
				<view class="">累计收益（NTT）</view>
			</view>
		</view>
		<view class="tel"  :style="AlertShow?'filter: blur(4px);':''">投资详情</view>
		<view class="list_box"  :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b ">
				<view class="list_box_item">投资编号：{{detail.sn}}</view>
				<view class="list_box_item">投资时间：{{detail.created_at | FormatDate}}</view>
			</view>
			<view class="flex_center f_j_b" style="margin-top: 16rpx;">
				<view class="list_box_item">投资数量：{{detail.amount}} NTT</view>
				<view class="list_box_item">复投次数：{{detail.replay_time}}</view>
			</view>
			<view class="flex_center f_j_b" style="margin-top: 16rpx;height: 48rpx;">
				<view class="list_box_item flex_center">
					<view class="">自动复投：</view>
					<view class="list_quan" @click="isfutou(1)">
						<view class="list_dian" v-if="detail.is_auto_replay == 1"></view>
					</view>
					<view style="margin-left: 8rpx;">是</view>
					<view class="list_quan" style="margin-left: 32rpx;"  @click="isfutou(0)">
						<view class="list_dian" v-if="detail.is_auto_replay == 0"></view>
					</view>
					<view style="margin-left: 8rpx;">否</view>
				</view>
				<view class="list_box_item" v-if="detail.is_auto_replay == 1">复投数量：{{detail.amount}} NTT</view>
				<view class="list_bt bt" v-if="detail.is_auto_replay == 0&&detail.is_can_replay == 1" @click="futou">复投</view>
			</view>
		</view>
		<view class="tel"  :style="AlertShow?'filter: blur(4px);':''">投资记录</view>
		<block v-for="(item,index) in detail.logs" :key="index">
			<view class="list_box"  :style="AlertShow?'filter: blur(4px);':''">
				<view class="font_mon">第{{item.times}}期</view>
				<view class="flex_center f_j_b " style="margin-top: 16rpx;">
					<view class="list_box_item">投资数量：{{item.amount}} NTT</view>
					<view class="list_box_item">预计收益：{{shouyi(item)}} NTT</view>
				</view>
				<view class="flex_center f_j_b" style="margin-top: 16rpx;">
					<view class="list_box_item">收益比率：{{item.rate*100}}%</view>
					<view class="list_box_item">投资时间：{{item.invest_time | _formatDatea}}</view>
				</view>
				<view class="pro_lajibox martt" v-if="pro">
					<view class="pro_laji">
						<view class="xian" :style="pro?'transform: translateX(-' + jindu(item) + '%)':'transform: translateX(-100%)' "></view>
					</view>
					<view class="dian" :style="pro?'transform: translateX(' + jindua(item) + '%)':'transform: translateX(0%)' ">
						<view class="dian_quan"></view>
					</view>
					<!-- <view class="mart" style="text-align: center;"> -->
					<view class="mart" :style="jindua(item)<30?'':jindu(item)>70?'text-align: right;':'text-align: center;'">
						已收回{{item.income_rate*100}}%
					</view>
				</view>
			</view>
		</block>
		
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="">
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_mon text_center">立即投资</view>
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
					<view class="flex_center f_j_b mart" v-if="AlertShow">
						<view class="" v-if="coin_from_type == 1">可用余额{{ntt_money.Money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 2">可用余额{{ntt_money.gz | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 3">可用余额{{userbanner.wallet.money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 4">可用余额{{userbanner.gz.money | toNonExponential}}NTT</view>
						<view class="">预计收益{{yuji(num)}}NTT</view>
					</view>
				</view>
			</view>
			
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
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
				cbi:false,
				pro:true,
				id:'',
				ntt_money:'',
				userbanner:'',
				num:'',
				password:'',
				coin_from_type:1,
				detail:'',
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getdetail()
			this.getcoin()
			this.getoptionuser()
		},
		methods: {
			back(){
				uni.navigateBack({
					
				})
			},
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
			getdetail(){
				this.$request({
					url: '/get.financing.detail',
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
					this.coin_from_type = res.data.coin_from_type
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
					this.ntt_money = list.filter(item => {
						return item.CoinName == 'NTT';
					})[0];
				})
				.catch(err => {
				})
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
				return
				this.cbi = true
			},
			ccoin_from_type(e){
				this.coin_from_type = e
				this.cbi = false
			},
			xx(){},
			yuji(e){
				if(e){
					return (parseFloat(e)*1.75.toFixed(4))
				}else{
					return 0
				}
			},
			futou(){
				this.open(0,'center')
			},
			shouyi(e){
			    return parseFloat(e.amount) + this.app._accMul(e.amount,e.rate)
			},
			jindu(e){
				return 100 - e.progress_bar*100
			},
			jindua(e){
				var num = e.progress_bar*100
				if(num>95){
					return 95
				}else{
					return e.progress_bar*100
				}
			},
			sure(){
				this.$request({
					url: '/post.financing.replay',
					method: 'post',
					data: {
						id:this.id,
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
					_toast(res.message)
					this.getcoin()
					this.getoptionuser()
					this.getdetail()
					this.close()
				})
				.catch(err => {
				})
			},
			isfutou(e){
				if(e == this.detail.is_auto_replay){
					return
				}
				this.$request({
					url: '/post.financing.autoreplay',
					method: 'post',
					data: {
						id:this.id,
						is_auto_replay:e
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.getdetail()
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/manage_detail");
</style>
