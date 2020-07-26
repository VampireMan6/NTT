<template>
	<view class="content">
		<view style="height: var(--status-bar-height);min-height: 40rpx;"></view>
		<view class="userbox" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b">
				<view class="flex_center f_j_b">
					<view class="head_iconbox">
						<image class="head_icon" src="../../static/img/lbx.png" mode="aspectFill"></image>
						<view class="boxF">
							<view class="boxS">
								<view class="boxT">
									<image class="head" :src="userInfo.user.avatar?userInfo.user.avatar:'../../static/img/head.png'" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="font_max marl">{{userInfo.user.nickname?userInfo.user.nickname: userInfo.user.username}}</view>
				</view>
				<image class="set" src="../../static/img/set.png" mode="" @click="gouserinfo"></image>
			</view>
			<view class="flex_center f_j_b">
				<view class="user_item" @tap="open(0, 'center')">
					<view class="item_num">{{ntt_num}}</view>
					<view class="opacity">NTT总额</view>
				</view>
				<view class="user_item">
					<view class="item_num">000</view>
					<view class="opacity">累计收益</view>
				</view>
				<!-- <view class="user_item">
					<view class="item_num">000</view>
					<view class="opacity">团队人数</view>
				</view> -->
			</view>
		</view>
		<view class="allmoney_box content" :style="AlertShow?'filter: blur(4px);':''" @click="gowallet">
			<view class="opacity">资产总折合（USDT）</view>
			<view class="font_b" style="font-size: 54rpx;">{{balance.usdt_sum | toNonExponential}}</view>
			<view class="opacity">≈{{balance.cny_sum | toNonExponential}} CNY</view>
		</view>
		<view class="flex_center f_j_b list_box" :style="AlertShow?'filter: blur(4px);':''">
			<view class="list_item flex_center flex_j_a" @click="gofullcoin"><image class="me_item_icon" src="../../static/img/me_zr.png" mode=""></image><text class="opacity">转入</text></view>
			<view class="list_item flex_center flex_j_a" @click="gotransfer"><image class="me_item_icon" src="../../static/img/me_zc.png" mode=""></image><text class="opacity">转出</text></view>
			<view class="list_item flex_center flex_j_a" @click="gobill"><image class="me_item_icon" src="../../static/img/me_zd.png" mode=""></image><text class="opacity">账单</text></view>
			<view class="list_item flex_center flex_j_a" @click="goconvert"><image class="me_item_icon" src="../../static/img/me_sd.png" mode=""></image><text class="opacity">闪兑</text></view>
		</view>
		<view class="allmoney_box content" :style="AlertShow?'filter: blur(4px);':''" @click="goteam">
			<view class="">团队</view>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="goshare">
			<view class="font_mon">分享应用</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b"  @click="goset" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_mon">安全设置</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="goquestion">
			<view class="font_mon">常见问答</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="goabout">
			<view class="font_mon">关于我们</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		<view class="list_m flex_center f_j_b" :style="AlertShow?'filter: blur(4px);':''" @click="checkUpdate">
			<view class="font_mon">检查更新</view>
			<image class="more" src="../../static/img/right.png" mode=""></image>
		</view>
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="content" v-if="AlertClass == 0">
				<!-- <view class="ntt_tcbox ntt_tc">
					<view class="" style="font-size: 76rpx;">0000.00000000</view>
					<view class="font_mon">NTT总数量</view>
				</view> -->
				<view class="flex_center f_j_b ntt_tc_box">
					<view class="ntt_tc ntt_tc_boxa" :class="boxa?'boxa_a':boxb?'':''" @click="cboxa">
						<view class="flex_center" :style="boxa?'width:100%;':''">
							<view class="text_center" v-if="!boxa">
								<view class="text_ver"><text style="font-size: 43rpx;">{{parseFloat(ntt_money.Money)+ parseFloat(ntt_money.gz) | toFixed}}</text><text style="font-size: 28rpx;">NTT</text></view>
								<view class="font_mon">NTT总额</view>
							</view>
							<view class="text_center" style="width:50%;" v-show="boxa">
								<view class="text_ver"><text style="font-size: 43rpx;">{{ntt_money.gz | toFixed}}</text><text style="font-size: 28rpx;">NTT</text></view>
								<view class="font_mon">共振获得</view>
							</view>
							<view class="text_center" style="width:50%;" v-show="boxa">
								<view class="text_ver"><text style="font-size: 43rpx;">{{ntt_money.Money | toFixed}}</text><text style="font-size: 28rpx;">NTT</text></view>
								<view class="font_mon">外部转入</view>
							</view>
						</view>
					</view>
					<view class="ntt_tc ntt_tc_boxb" :class="boxa?'boxa_b':boxb?'boxb_b':''" @click="cboxb">
						<view class="text_ver"><text style="font-size: 43rpx;">{{ntt_money.LockMoney | toFixed}}</text><text style="font-size: 28rpx;">NTT</text></view>
						<view class="font_mon">已锁定</view>
					</view>
					<view class="ntt_tc ntt_tc_boxc" :class="boxa?'boxa_c':boxb?'boxb_c':''" @click="cboxc">
						<view class="text_ver"><text style="font-size: 43rpx;">{{ntt_money.light_quote | toFixed}}</text><text style="font-size: 28rpx;">NTT</text></view>
						<view class="font_mon">可闪兑账户</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		onShow() {
			this.$store.dispatch("setUserInfo");
			this.getbalance()
			this.getcoin()
		},
		data() {
			return {
				allmoney:'',
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				dong:false,
				balance:'',
				
				boxa:false,
				boxb:false,
				boxc:false,
				
				ntt_money:'',
				ntt_num:'',
			}
		},
		methods: {
			goset(){
				navigateTo('user/set')
			},
			gofullcoin(){
				navigateTo('wallet/fullcoin')
			},
			gotransfer(){
				navigateTo('wallet/transfer')
			},
			gobill(){
				navigateTo('wallet/bill')
			},
			goshare(){
				navigateTo('user/share_first')
			},
			goindex(){
				reLaunch('index/index')
			},
			gouserinfo(){
				navigateTo('user/userinfo')
			},
			goabout(){
				navigateTo('user/about')
			},
			gowallet(){
				navigateTo('wallet/wallet')
			},
			goquestion(){
				navigateTo('user/question')
			},
			goteam(){
				navigateTo('team/team')
			},
			goconvert(){
				_toast('敬请期待')
				// navigateTo('convert/convert')
			},
			checkUpdate(){
				let self = this;
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					self.$request({
						url: 'update',
						method: 'get',
						data:{
							version: wgtinfo.version,
							device:uni.getSystemInfoSync().platform,
						}
					})
					.then(res => {
						console.log(res)
						if(res.data.update){
							self.app._install(res.data);
						}else{
							_toast('已经是最新版本了')
						}
					})
					.catch(err => {
					})
				})
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
			getbalance(){
				this.$request({
					url: 'user/coins',
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
			cboxa(){
				this.boxa = true
				this.boxb = false
				this.boxc = false
			},
			cboxb(){
				this.boxa = false
				this.boxb = true
				this.boxc = false
			},
			cboxc(){
				this.boxa = false
				this.boxb = false
				this.boxc = true
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
					this.ntt_num = (Number(this.ntt_money.Money) +Number(this.ntt_money.gz)).toFixed(2) 
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/user.css");
</style>
