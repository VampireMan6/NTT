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
				<view class="" v-if="coindetail.usercoin.CoinName!='NTT'">
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;">{{coindetail.usercoin.Money | toNonExponential}}</text>
						<text class="font_mon">{{coindetail.usercoin.CoinName}}</text>
					</view>
					<view class="text_center">可用余额</view>
				</view>
				<view class="" v-if="coindetail.usercoin.CoinName=='NTT'">
					<view class="text_ver text_center">
						<text style="font-size: 48rpx;" v-if="coin_from_type == 1">{{coindetail.usercoin.Money | toNonExponential}}</text>
						<text style="font-size: 48rpx;" v-if="coin_from_type == 2">{{coindetail.usercoin.gz | toNonExponential}}</text>
						<text class="font_mon">{{coindetail.usercoin.CoinName}}</text>
					</view>
					<view class="text_center">{{coin_from_type == 1?'交易所余额':'共振余额'}}</view>
				</view>
		 	</view>
		</view>
		<view class="martt qiehuanbox" :style="AlertShow?'filter: blur(4px);':''" style="margin-top: 48rpx;">
			<image src="../../static/img/transfer1.png" class="qiehuanbg" mode="" :style="isaddress?'z-index: 2':'z-index: 1'"></image>
			<image src="../../static/img/transfer2.png" class="qiehuanbg" mode="" :style="isaddress?'z-index: 1':'z-index: 2'"></image>
			<view class="qiehuannr">
				<view class="flex_start f_j_b">
					<view class="font_max color_black" v-if="isaddress">收款地址</view>
					<view class="font_max" v-if="!isaddress">收款账号</view>
					<view v-if="isaddress">
						<image class="qiehuan_icon" src="../../static/img/transfer_icon1.png" mode=""></image>
						<image class="qiehuan_icon marll" src="../../static/img/transfer_icon2.png" mode="" @click="saoma"></image>
					</view>
					<view v-if="!isaddress">
						<image class="qiehuan_icon" src="../../static/img/transfer_icon3.png" mode=""></image>
					</view>
				</view>
				<view class="int_boxa flex_center" v-if="isaddress">
					<input type="text" v-model="address" placeholder="请输入收款地址" class="color_black" placeholder-style="color:rgba(0,0,0,0.5)"/>
					<view class="xaina" style="background-color: rgba(43,45,61,0.25);"></view>
					<view class="xianb"></view>
				</view>
				<view class="int_box flex_center" v-if="!isaddress">
					<input type="text" v-model="mobile" placeholder="请输入收款账号" placeholder-style="color:rgba(255,255,255,0.7)"/>
					<view class="xaina"></view>
					<view class="xian"></view>
				</view>
				<view class="mart" :class="isaddress?'color_black':''"> </view>
				<view class="qiehuanbt_box flex_center f_j_b">
					<view class="qiehuanbt font_max" @click="cisaddress(true)">转到其他地址</view>
					<view class="qiehuanbt font_max" @click="cisaddress(false)">转给其他用户</view>
				</view>
			</view>
		</view>
		<view class="box hint" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_max">转账金额</view>
			<view class="int_box flex_end f_j_b" style="padding-bottom: 10rpx;height: 100rpx;" @click="tint">
				<input type="number" :value="number" placeholder="0.00" disabled placeholder-style="color:rgba(255,255,255,0.7)" style="font-size: 56rpx;height: 60rpx;"/>
				<view class="">{{coindetail.usercoin.CoinName}}</view>
				<view class="xaina"></view>
				<!-- <view class="xian"></view> -->
			</view>
			<view class="mart"> </view>
		</view>
		<view class="box martt hint" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_max">备注信息</view>
			<view class="int_box flex_center f_j_b mart" >
				<input type="text" v-model="remark" placeholder="备注信息" placeholder-style="color:rgba(255,255,255,0.7)"/>
				<view class="xaina"></view>
				<view class="xian"></view>
			</view>
		</view>
		
		<view class="bt btn martt" :style="AlertShow?'filter: blur(4px);':''" @click="fsure">确认转出</view>
		<view class="box hint martt" :style="AlertShow?'filter: blur(4px);':''" style="margin-top: 46rpx;">
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
		
		<!--弹出窗口  -->
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			<!--  -->
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
						<view class="" v-if="item.usercoin.CoinName != 'NTT'">
							<view class="text_ver text_center">
								<text style="font-size: 48rpx;">{{item.usercoin.Money | toNonExponential}}</text>
								<text class="font_mon">{{item.usercoin.CoinName}}</text>
							</view>
							<view class="text_center">可用余额</view>
						</view>
						<view class="flex_center f_j_b" v-if="item.usercoin.CoinName == 'NTT'">
							<view class="text_center" style="width: 50%;" @click.stop="choosentt(item,2)">
								<view style="font-size: 48rpx;">{{item.usercoin.gz | toNonExponential}}</view>
								<view class="font_mon">共振余额</view>
							</view>
							<view class="text_center" style="width: 50%;" @click.stop="choosentt(item,1)">
								<view style="font-size: 48rpx;">{{item.usercoin.Money | toNonExponential}}</view>
								<view class="font_mon">交易所余额</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			
			<view class="" v-if="AlertClass == 5">
				<view class="tanchutel1">确认转出</view>
				<view class="zhifu_box">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
					<view class="font_max text_center">请输入交易密码</view>
					<view class="text_ver pay_money text_center">
						<text style="font-size: 34rpx;">{{coindetail.usercoin.CoinName}}</text>
						<text style="font-size: 44rpx;" class="marl">{{number}}</text>
					</view>
					<view class="flex_center f_j_b martt">
						<view class="">手续费</view>
						<view class="">{{coindetail.usercoin.CoinName}} {{fee(coindetail) | toNonExponential}}</view>
					</view>
					<view class="flex_center f_j_b mart">
						<view class="">费率</view>
						<view class="">{{feev(coindetail)}}% (最低{{coindetail.usercoin.CoinName}}{{minfee(coindetail) | toNonExponential}})</view>
					</view>
					<view class="martt tcint_box flex_center f_j_b" style="margin-top: 50rpx;">
						<input type="text" password v-model="PayPassword" placeholder="请输入交易密码"/>
						<view class="bt int_bt" @click="sure">确定</view>
					</view>
				</view>
			</view>
			
			<view class="" v-if="AlertClass == 0&&tcen == 'err'">
				<view class="tanchutel1">哦豁，出错了！</view>
				<view class="err_box">
					<view class="font_max text_center">交易密码错误，请重试</view>
					<view class="flex_center f_j_b btn_box">
						<view class="btn_box_l" @click="goset">忘记密码</view>
						<view class="btn_box_r color_yellow" @click="again">重新输入</view>
					</view>
				</view>
			</view>
			
			<view class="" style="margin-bottom: 50rpx;" v-if="AlertClass == 0&&tcen == 'int'">
				<view class="box hint">
					<view class="font_max">转账金额</view>
					<view class="int_box flex_end f_j_b" style="padding-bottom: 10rpx;height: 100rpx;" @click="tint">
						<input type="number" class="text_ver"  v-model="number" placeholder="0.00" placeholder-style="color:rgba(255,255,255,0.7)" style="font-size: 56rpx;height: 60rpx;"/>
						<view class="">{{coindetail.usercoin.CoinName}}</view>
						<view class="xaina"></view>
						<view class="xian"></view>
					</view>
					<view class="mart">提示信息</view>
				</view>
			</view>
			
			
			<view class="" v-if="AlertClass == 0&&tcen == 'hintpaypassword'">
				<view class="tanchutel1">提示！</view>
				<view class="err_box">
					<view class="font_max text_center">为了您的账户安全，请先设置交易密码</view>
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
				showcoin:false,
				Phone:'',
				CoinId:'',
				coindetail:'',
				coinlist:[],
				PayPassword:'',
				payit:false,
				hintpassword:false,
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				isaddress:true,
				
				tcen:'int',
				
				address:'',
				mobile:'',
				remark:'',
				number:'',
				
				coin_from_type:1
			}
		},
		onLoad(e) {
			if(e.CoinId){
				this.CoinId = e.CoinId
			}
			this.initdata()
		},
		methods: {
			xx(){},
			chooseit(e){
				if(e.usercoin.CoinName == 'NTT'){
					return
				}
				this.CoinId = e.usercoin.CoinId
				this.coindetail = e
				this.close()
				this.Money = 0
			},
			choosentt(e,a){
				this.coin_from_type = a
				this.CoinId = e.usercoin.CoinId
				this.coindetail = e
				this.close()
				this.Money = 0
			},
			hint(){
				for(let item of this.coinlist){
					if(item.CoinId == this.CoinId){
						const regex = new RegExp('<img', 'gi');
						let richtext = item.TransferInfo.replace(regex, `<img height='auto' style="max-width: 100%;"`);
						return richtext
					}
				}
			},
			initdata(){
				this.number = ''
				this.getcoin()
			},
			cisaddress(e){
				if(this.isaddress != e){
					this.isaddress = e
					this.address = ''
					this.mobile = ''
					this.number = ''
					this.getcoin()
				}
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
								if(this.isaddress){
									if(coininfo[j].is_withdraw == 1){
										let xinxi = {
											usercoin: list[i],
											allcoin:coininfo[j]
										}
										coinlist.push(xinxi)
									}
								}else{
									if(coininfo[j].is_trans == 1){
										let xinxi = {
											usercoin: list[i],
											allcoin:coininfo[j]
										}
										coinlist.push(xinxi)
									}
								}
								
							}
						}
					}
					console.log(coinlist)
					this.coinlist = coinlist
					this.coindetail = coinlist[0]
					this.CoinId = coinlist[0].usercoin.CoinId
				})
				.catch(err => {
				})
			},
			feev(e){
				if(this.isaddress){
					let num = Number(e.allcoin.withdraw_rate)*100
					return num
				}else{
					let num = Number(e.allcoin.trans_rate)*100
					return num
				}
				
			},
			minfee(e){
				if(this.isaddress){
					let num = Number(e.allcoin.min_withdraw_fee)
					return num
				}else{
					let num = Number(e.allcoin.trans_min_fee)
					return num
				}
			},
			fee(e){
				if(this.isaddress){
					let num = this.app._accMul(e.allcoin.withdraw_rate,this.number)
					if(num< e.allcoin.min_withdraw_fee){
						return e.allcoin.min_withdraw_fee
					}else{
						return num
					}
				}else{
					let num = this.app._accMul(e.allcoin.trans_rate,this.number)
					if(num< e.allcoin.trans_min_fee){
						return e.allcoin.trans_min_fee
					}else{
						return num
					}
				}	
			},
			xx(){},
			gouserinfo(){
				navigateTo('user/set')
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
				if(!this.PayPassword){
					_toast('请输入交易密码')
					return
				}
				if(this.isaddress){
					var params = {
						coin_id:this.CoinId,
						number:this.number,
						address:this.address,
						pay_password:this.PayPassword,
						remark:this.remark,
						coin_from_type:this.coin_from_type,
					}
					var url = '/post.coin.withdraw'
				}else{
					var params = {
						coin_id:this.CoinId,
						number:this.number,
						mobile:this.mobile,
						pay_password:this.PayPassword,
						remark:this.remark,
						coin_from_type:this.coin_from_type,
					}
					var url = '/post.coin.transfer'
				}
				this.app.showLoadinig()
				this.$request({
					url: url,
					method: 'post',
					data:params,
				})
				.then(res => {
					this.app.hideLoading()
					console.log(res)
					if(res.code == 52002){
						this.tcen = 'err'
						this.open(0,'center')
						return false
					}
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.initdata()
					_toast(res.message)
					this.PayPassword = ''
					this.close();
					
					this.goresult();
					// this.tcen = 'err'
					// this.open(0,'center')
				})
				.catch(err => {
				})
			},
			goresult(){
				uni.navigateTo({
					url: ('/pages/wallet/transfer_result?number=' + this.number +'&mobile=' + this.mobile + '&coin=' + this.coindetail.usercoin.CoinName )
				})
			},
			again(){
				this.open(5,'center')
			},
			// goresult(){
			// 	navigateTo('resonance/resonanec_result')
			// },
			tint(){
				this.tcen = 'int'
				this.open(0,'center')
			},
			openxieyi(){
				
			},
			fsure(){
				if(this.userInfo.user.is_paypassword != 1){
					this.tcen = 'hintpaypassword'
					this.open(0, 'center')
					return
				}
				if(this.isaddress){
					if(this.address == ''){
						_toast('请输入地址')
						return
					}
				}else{
					if(this.mobile == ''){
						_toast('请输入收款账号')
						return
					}
				}
				if(this.number == ''){
					_toast('请输入数量')
					return
				}
				this.open(5, 'center')
			},
			goset(){
			 	navigateTo('user/set')
			 	this.close()
			},
			saoma(){
				let that = this
				 uni.scanCode({
				     success: function (res) {
				         console.log('条码内容：' + res.result);
						 that.address = res.result
				     }
				 });
			},
		}
	}
</script>

<style>
@import url("../../common/css/coin.css");
</style>
