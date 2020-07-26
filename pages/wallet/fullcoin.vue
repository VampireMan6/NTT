<template>
	<view class="content">
		<view class="topbox content"  @tap="open(1, 'top')" :style="AlertShow?'filter: blur(4px);':''">
		 	<view class="topcard_f"></view>
		 	<view class="topcard_t"></view>
		 	<view class="topcard">
		 		<view class="flex_center f_j_b">
					<view class="flex_center">
						<image :src="coindetail.usercoin.logo" class="top_coin_icon marr" mode=""></image>
						<view class="font_max">{{coindetail.usercoin.CoinName}}</view>
					</view>
					<!-- <view class="flex_center">
						<view class="marr">选择协议</view>
						<image src="../../static/img/xmore.png" class="xmore" mode=""></image>
					</view> -->
				</view>
				<view class="text_ver text_center">
					<text style="font-size: 48rpx;">{{(parseFloat(coindetail.usercoin.gz) + parseFloat(coindetail.usercoin.Money)) | toNonExponential}}</text>
					<text class="font_mon">{{coindetail.usercoin.CoinName}}</text>
				</view>
				<view class="text_center">可用余额</view>
		 	</view>
		</view>
		<view class="box martt content" :style="AlertShow?'filter: blur(4px);':''">
			<view class="text_center address font_max">{{address}}</view>
			<view class="text_center">该地址仅支持{{coindetail.usercoin.CoinName}}币种充值，最低充值数量{{coindetail.allcoin.min_recharge | toNonExponential}}{{coindetail.usercoin.CoinName}}</view>
			<view class="qrcode_box">
				<tki-qrcode ref="qrcode"
							:val="address"
							:size="130"
							background="#fff"
							foreground="#000"
							pdground="#000"
							:onval="true"
							:loadMake="true"
							:show="true"
							@result="resultQrCode"
							unit="px"></tki-qrcode>
			</view>
			<view class="martt" style="margin-bottom: 100rpx;">扫描二维码，进行充值</view>
		</view>
		<view class="bt btn martt" :style="AlertShow?'filter: blur(4px);':''" @click="fuzhi">复制地址</view>
		<view class="box hint martt" :style="AlertShow?'filter: blur(4px);':''">
			<view class="">温馨提示</view>
			<view class="flex_start mart">
				<view class="hint_dian marr"></view>
				<view class="">此转账功能仅适用于本平台用户站内相互转账，一切平台外账户均不享受此功能  </view>
			</view>
			<view class="flex_start mart">
				<view class="hint_dian marr"></view>
				<view class="">此转账功能仅适用于本平台用户站内相互转账，一切平台外账户均不享受此功能  </view>
			</view>
		</view>
		
		<!--  -->
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="" v-if="AlertClass == 1">
				<view class="tanchutel">选择币种</view>
				<block v-for="(item,index) in coinlist" :key="index">
					<view @click="chooseit(item)" class="martt ldx infinite ldx-spring-btt-in" :class="index%3 == 0?'tccard_box1':index%3 == 1?'tccard_box2':'topcard'">
						<view class="flex_center f_j_b">
							<view class="flex_center">
								<image :src="item.usercoin.logo" class="top_coin_icon marr" mode=""></image>
								<view class="font_max">{{item.usercoin.CoinName}}</view>
							</view>
						</view>
						<view class="text_ver text_center">
							<text style="font-size: 48rpx;">{{(parseFloat(item.usercoin.gz) + parseFloat(item.usercoin.Money)) | toNonExponential}}</text>
							<text class="font_mon">{{item.usercoin.CoinName}}</text>
						</view>
						<view class="text_center">可用余额</view>
					</view>
				</block>
				
				<!-- <view class="tccard_box2 martt ldx infinite ldx-spring-btt-in">
					<view class="flex_center f_j_b">
						<view class="flex_center">
							<image src="" class="top_coin_icon marr" mode=""></image>
							<view class="font_max">NTT</view>
						</view>
					</view>
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;">65535</text>
						<text class="font_mon">NTT</text>
					</view>
					<view class="text_center">可用余额</view>
				</view>
				<view class="topcard martt ldx infinite ldx-spring-btt-in" @click="close">
					<view class="flex_center f_j_b">
						<view class="flex_center">
							<image src="" class="top_coin_icon marr" mode=""></image>
							<view class="font_max">NTT</view>
						</view>
					</view>
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;">65535</text>
						<text class="font_mon">NTT</text>
					</view>
					<view class="text_center">可用余额</view>
				</view> -->
			</view>
			
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import tkiQrcode from "../../components/tki-qrcode/tki-qrcode.vue"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		components: {
			tkiQrcode
		},
		computed: {
			...mapGetters({
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				address:'0x157457fada36900c84af6219edf8af5c0x157457fada36900c84af6219edf8af5c',
				showcoin:false,
				CoinId:'',
				coinlist:'',
				coindetail:'',
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
			}
		},
		onLoad(e) {
			
			if(e.CoinId){
				this.CoinId = e.CoinId
			}
			this.initdata()
		},
		beforeCreate() {
			// this.app.showLoadinig()
		},
		methods: {
			resultQrCode(){},
			xx(){},
			chooseit(e){
				this.CoinId = e.usercoin.CoinId
				this.coindetail = e
				this.getsite()
				this.close()
			},
			hint(){
				for(let item of this.coinlist){
					if(item.CoinId == this.CoinId){
						const regex = new RegExp('<img', 'gi');
						let richtext = item.RechargeInfo.replace(regex, `<img height='auto' style="max-width: 100%;"`);
						return richtext
					}
				}
			},
			initdata(){
				this.getcoin()
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
					var coininfo = this.coininfo
					var coinlist = []
					for(var i in list){
						for(var j in coininfo){
							if(list[i].CoinId == coininfo[j].id){
								if(coininfo[j].is_recharge == 1){
									let xinxi = {
										usercoin: list[i],
										allcoin:coininfo[j]
									}
									coinlist.push(xinxi)
								}
							}
						}
					}
					console.log(coinlist)
					this.coinlist = coinlist
					this.coindetail = coinlist[0]
					this.CoinId = coinlist[0].usercoin.CoinId
					this.getsite()
				})
				.catch(err => {
				})
			},
			getsite(){
				let params = {
					coin_id : this.CoinId
				}
				this.$request({
					url: '/get.usercoin.address',
					method: 'get',
					data:params,
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.address = res.data
				})
				.catch(err => {
				})
			},
			fuzhi() {
				uni.setClipboardData({
					data: this.address,
					success: function() {
			
					}
				});
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
				this.open(0,'center')
			},
			again(){
				this.open(5,'center')
			},
			goresult(){
				navigateTo('resonance/resonanec_result')
			},
		}
	}
</script>

<style>
@import url("../../common/css/coin.css");
</style>
