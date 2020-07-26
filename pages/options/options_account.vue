<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					期权账户
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		
		<view class="list_box" v-if="userbanner" style="background: #F2AB3E;" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b list_box_top">
				<view class="">共振NTT期权账户</view>
				<view class="">{{userbanner.gz.money | toNonExponential}}</view>
			</view>
			<view class="flex_center f_j_b list_box_con">
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.gz.invest | toNonExponential}}</view>
					<view class="">累计投资</view>
				</view>
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.gz.profit | toNonExponential}}</view>
					<view class="">累计盈利</view>
				</view>
			</view>
			<view class="flex_center f_j_b list_box_bot">
				<view class="">共振NTT可闪兑额度</view>
				<view class="">{{userbanner.gz.light_quote | toNonExponential}}</view>
			</view>
		</view>
		
		<view class="list_box" v-if="userbanner" style="background: #547CE2;" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b list_box_top">
				<view class="">外募NTT期权账户</view>
				<view class="">{{userbanner.wallet.money | toNonExponential}}</view>
			</view>
			<view class="flex_center f_j_b list_box_con">
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.wallet.invest | toNonExponential}}</view>
					<view class="">累计投资</view>
				</view>
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.wallet.profit | toNonExponential}}</view>
					<view class="">累计盈利</view>
				</view>
			</view>
			<view class="flex_center f_j_b list_box_bot">
				<view class="">外募NTT可闪兑额度</view>
				<view class="">{{userbanner.wallet.light_quote | toNonExponential}}</view>
			</view>
		</view>
		
		<view class="list_box" v-if="userbanner" style="background: #E05750;" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b list_box_top">
				<view class="">USDT期权账户</view>
				<view class="">{{userbanner.usdt.money | toNonExponential}}</view>
			</view>
			<view class="flex_center f_j_b list_box_con">
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.usdt.invest | toNonExponential}}</view>
					<view class="">累计投资</view>
				</view>
				<view class="text_center" style="width: 50%;">
					<view class="" style="font-size: 48rpx;">{{userbanner.usdt.profit | toNonExponential}}</view>
					<view class="">累计盈利</view>
				</view>
			</view>
			<view class="flex_center f_j_b list_box_bot">
				<!-- <view class="">USDT可闪兑额度</view>
				<view class="">{{userbanner.usdt.light_quote | toNonExponential}}</view> -->
			</view>
		</view>
	
		<view class="bt btn" @click="open(0,'center')">
			提到钱包
		</view>
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<view class="">
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">提到钱包</view>
					<view class="flex_center f_j_b zhifu_int_box">
						<view class="flex_center f_j_b zhifu_int_bz" @click="ccbi">
							<view class="" v-if="coin_from_type == 1">NTT-外募期权</view>
							<view class="" v-if="coin_from_type == 2">NTT-共振期权</view>
							<view class="" v-if="coin_from_type == 3">USDT-期权</view>
							<image src="../../static/img/xmore.png" class="top_more" mode=""></image>
							<view class="bizhong" v-if="cbi" @click.stop="xx">
								<scroll-view scroll-y="true" style="height: 180rpx;">
									<view class="bizhong_item" @click="ccoin_from_type(1)">NTT-外募期权</view>
									<view class="bizhong_item" @click="ccoin_from_type(2)">NTT-共振期权</view>
									<view class="bizhong_item" @click="ccoin_from_type(3)">USDT-期权</view>
								</scroll-view>
							</view>
						</view>
						<view class="zhifu_int_num flex_center">
							<input type="number" v-model="num" placeholder="限额(10-100000)"/>
						</view>
					</view>
					<view class="mart"  v-if="coin_from_type == 1">期权账户余额：{{userbanner.wallet.money | toNonExponential}}</view>
					<view class="mart"  v-if="coin_from_type == 2">期权账户余额：{{userbanner.gz.money | toNonExponential}}</view>
					<view class="mart"  v-if="coin_from_type == 3">期权账户余额：{{userbanner.usdt.money | toNonExponential}}</view>
					<view class="martt tcint_box flex_center f_j_b" style="margin-top: 50rpx;">
						<input type="text" password v-model="PayPassword" placeholder="请输入交易密码"/>
						<view class="bt int_bt" @click="sure">确定</view>
					</view>
				</view>
			</view>
		</openAlert>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		data() {
			return {
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				PayPassword:'',
				coin_from_type:1,
				cbi:false,
				num:'',
				userbanner:'',
			}
		},
		onLoad() {
			this.getoptionuser()
		},
		methods: {
			back(){
				uni.navigateBack({
				})
			},
			xx(){},
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
			ccoin_from_type(e){
				this.coin_from_type = e
				this.cbi = false
			},
			getoptionuser(){
				this.$request({
					url: '/get.option.userinfo',
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
					this.userbanner = res.data
				})
				.catch(err => {
				})
			},
			sure(){
				if(!this.num){
					_toast('请输入数量')
					return
				}
				this.$request({
					url: '/post.option.withdraw',
					method: 'post',
					data: {
						amount :this.num,
						option_withdraw_type:this.coin_from_type,
						pay_password:this.PayPassword,
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					_toast(res.message)
					this.close()
					this.num = ''
					this.PayPassword = ''
					this.getoptionuser()
				})
				.catch(err => {
				})
			},
			ccbi(){
				this.cbi = true
			},
		}
	}
</script>

<style>
.topbox{
	width:750rpx;
	/* height:176rpx; */
	background:linear-gradient(270deg,rgba(239,137,71,1) 0%,rgba(242,171,62,1) 100%);
	border-radius:0px 0px 4rpx 4rpx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
.top_nr{
	position: absolute;
	bottom: 14rpx;
	width: 686rpx;
	left: 32rpx;
}
.top_icon{
	width: 40rpx;
	height: 40rpx;
}
.nr_box{
	width: 750rpx;
	background:rgba(43,45,61,1);
	margin-bottom: 32rpx;
	padding-top: 32rpx;
	padding-left: 32rpx;
	padding-right: 32rpx;
}

.list_box{
	width: 686rpx;
	margin-top: 32rpx;
	box-shadow:0px 0px 12rpx 0px rgba(0,0,0,0.5);
	border-radius:4rpx;
}
.list_box_top{
	width: 686rpx;
	padding: 16rpx;
}
.list_box_con{
	width: 686rpx;
	padding: 32rpx 0;
	background-color: #2B2D3D;
	box-shadow:0px 0px 12rpx 0px rgba(0,0,0,0.5);
}
.list_box_bot{
	width: 686rpx;
	padding: 16rpx;
}
.btn{
	width: 686rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin-top: 150rpx;
	margin-bottom: 50rpx;
}
  .zhifu_box{
  	position: relative;
  	width: 686rpx;
  	padding: 32rpx 20rpx;
  	background-color: #2B2D3D;
  	box-shadow:0px 0px 12rpx 0px rgba(0,0,0,0.5);
  	border-radius:4rpx;
  } 
  .close{
  	width: 38rpx;
  	height: 30rpx;
  	position: absolute;
  	top: 30rpx;
  	right: 30rpx;
  }
  .tcint_box{
  	width: 100%;
  	height: 64rpx;
  	border-radius: 2rpx;
  }
  .tcint_box input{
  	border-left: 2rpx solid #FFFFFF;
  	border-top: 2rpx solid #FFFFFF;
  	border-bottom: 2rpx solid #FFFFFF;
  	height: 60rpx;
  	line-height: 60rpx;
  	padding-left: 20rpx;
  	border-radius: 2rpx;
  }
  .int_bt{
  	width: 126rpx;
  	height: 64rpx;
  	line-height: 64rpx;
  }
  .zhifu_int_box{
  	width: 100%;
  	margin-top: 32rpx;
  }
  .zhifu_int_bz{
  	width: 270rpx;
  	height: 64rpx;
  	padding: 0 16rpx;
  	border: 2rpx solid #FFFFFF;
  	border-radius: 4rpx;
  	position: relative;
  }
  .top_more{
  	width: 28rpx;
  	height: 28rpx;
  }
  .bizhong{
  	position: absolute;
  	width: 100%;
  	top: 64rpx;
  	left: 0;
  	background-color: #2B2D3D;
  	z-index: 900;
  	padding-left: 32rpx;
  }
  .bizhong_item{
  	width: 100%;
  	height: 60rpx;
  	line-height: 60rpx;
  }
  .zhifu_int_num{
  	width: 350rpx;
  	height: 64rpx;
  	padding: 0 16rpx;
  	border: 2rpx solid #FFFFFF;
  	border-radius: 4rpx;
  }
</style>
