<template>
	<view class="qiun-columns content">
		<view class="topbox" :style="AlertShow?'filter: blur(4px);':''">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<view class="flex_center" style="">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="goback"></image>
				</view>
				<view class="tabs_box flex_center">
					<view class="tabs_k" :style="'transform: translateX('+ tabs_k + 'rpx)'"></view>
					<view class="flex_center tabs_x_box">
						<view class="tabs_x font_mon" @click="ctabs(0)" :style="tabs_k == 0?'':'color:#595959'">BTC/USDT</view>
						<view class="tabs_x font_mon" @click="ctabs(240)" :style="tabs_k != 0?'':'color:#595959'">ETH/USDT</view>
					</view>
				</view>
				<view class="" @click="gooptions_account">
					<image class="top_icon" src="../../static/img/menu.png" mode=""></image>
				</view>
				
			</view>
			<view class="flex_center f_j_b top_xcc">
				<view class="flex_center" @click="csession">
					<view class="font_max">{{tabs_k == 0?'BTC':'ETH'}}.{{way == 0?'5':'1'}}M场次</view>
					<image src="../../static/img/jiaohuan.png" class="top_more marl" mode=""></image>
				</view>
				<view class="" :style="zhangfu(coin_option)>0?'color:#7FEF9D':'color:#E05750'">
					<text style="font-size: 42rpx;">{{coin_option.close | toFixed}}</text>
					<text class="marl">{{zhangfu(coin_option)}}%</text>
				</view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 170rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		
		<!--  -->
		<view class="kline">
			<!-- <web-view src="hybrid/html/kline.html"></web-view> -->
		</view>
		
		<view class="flex_center f_j_b acc_box " :class="platform == 'ios'?'top_ios':'top_and'" :style="AlertShow?'filter: blur(4px);':''">
			<view class="font_mon acc_item" :class="account == '0'?'acc_xz':''" @click="caccount('0')">购买期权</view>
			<view class="font_mon acc_item" :class="account == '1'?'acc_xz':''" @click="caccount('1')">等待交割</view>
			<view class="font_mon acc_item" :class="account == '2'?'acc_xz':''" @click="caccount('2')">我的交割</view>
			<view class="font_mon acc_item" :class="account == '3'?'acc_xz':''" @click="caccount('3')">交割记录</view>
		</view>
		<view class="acc_box_mart" v-if="account == 0" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b gmqq_list" style="background: #1F2031;">
				<view class="gmqq_w1">当前场：{{changci}}</view>
				<view class="gmqq_w2">即将交割</view>
				<view class="gmqq_w3 flex_center">
					<image src="../../static/img/time.png" class="time" mode=""></image>
					{{closetime}}
				</view>
			</view>
			<view class="flex_center f_j_b gmqq_list">
				<view class="gmqq_w1">下一场：{{changci_buy}}</view>
				<view class="gmqq_w2"><image src="../../static/img/gmz.png" class="gmz" mode=""></image></view>
				<view class="gmqq_w3 flex_center">
					<image src="../../static/img/time.png" class="time" mode=""></image>
					{{closetime}}
				</view>
			</view>
			<!-- <view class="gmqq_jindubox flex_center f_j_b">
				<view class="gmqq_jinduboxa flex_center f_j_b" style="width: 50%;">
					<view class="marl">50%</view>
					<view class="gmqq_jinduboxb" style="width: 20%;">
						30%
					</view>
				</view>
				<view class="marr">30% </view>
			</view> -->
			<view class="flex_center f_j_b gmqq_box">
				<view class="botbt_a font_max" @click="maidwn">买跌</view>
				<view class="botbt_b font_max" @click="maipin">买平</view>
				<view class="botbt_c font_max" @click="maiup">买涨</view>
			</view>
		</view>
		<view class="acc_box_mart" v-if="account == 1" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b record_tel">
				<view class="wid1">期权</view>
				<view class="wid2">方向</view>
				<view class="wid3">购买数量</view>	
			</view>
			<block v-for="(item,index) in list">
				<view class="flex_center f_j_b record_list" v-if="item.option_coin == showcoin">
					<view class="wid1">{{item.option_coin}} {{item.option_type == '1'?'1':'5'}}M {{getcctime(item.start)}}</view>
					<view class="wid2" :style="item.betting_result == 'up'?'color:#7FEF9D':item.betting_result == 'balance'?'color:#ffffff':'color:#E05750'">{{item.betting_result == 'up'?'涨':item.betting_result == 'balance'?'平':'跌'}}</view>
					<view class="flex_center wid3 f_j_e">
						<view class="">{{item.amount | toNonExponential}} {{item.coin_from_type==3?'USDT':item.coin_from_type==6?'USDT':'NTT'}}</view>
					</view>
				</view>
			</block>
		</view>
		<view class="content acc_box_mart" v-if="account == 2" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b record_tel">
				<view class="wid1">期权</view>
				<view class="wid2">方向</view>
				<view class="wid3">结算数量</view>
			</view>
			<block v-for="(item,index) in list">
				<view class="flex_center f_j_b record_list" v-if="item.option_coin == showcoin" @click="gooptions_detail(item)">
					<view class="wid1">{{item.option_coin}} {{item.option_type == '1'?'1':'5'}}M {{getcctime(item.start)}}</view>
					<view class="wid2" :style="item.betting_result == 'up'?'color:#7FEF9D':item.betting_result == 'balance'?'color:#ffffff':'color:#E05750'">{{item.betting_result == 'up'?'涨':item.betting_result == 'balance'?'平':'跌'}}</view>
					<view class="flex_center wid3 f_j_e">
						<view :style="Number(item.profit) <= 0?'color:#E05750':'color:#7FEF9D'">{{Number(item.profit)<=0?'-'+item.amount : '+' + (Number(item.amount)+Number(item.profit))  | toNonExponential}} {{item.coin_from_type==3?'USDT':item.coin_from_type==6?'USDT':'NTT'}}</view>
						<image src="../../static/img/right.png" class="rightmore" mode=""></image>
					</view>
				</view>
			</block>
		</view>
		<view class="acc_box_mart" v-if="account == 3" :style="AlertShow?'filter: blur(4px);':''">
			<view class="flex_center f_j_b record_tel">
				<view class="wid2">期权</view>
				<view class="wid4">交割结果</view>
				<view class="wid5">交割时间</view>
			</view>
			<block v-for="(item,index) in openlist">
				<view class="flex_center f_j_b record_list">
					<view class="wid2">{{tabs_k == 0?'BTC':'ETH'}}.{{way == 0?'5':'1'}}M</view>
					<view class="wid4" :style="item.result == '涨'?'color:#7FEF9D':item.result == '平'?'color:#ffffff':'color:#E05750'">{{ item.rate*100 | toFixed}}%{{item.result}}</view>
					<view class="flex_center wid5 f_j_e">
						<view class="">{{item.id | _formatDate}}</view>
					</view>
				</view>
			</block>
			
			<!-- <view class="seeacc">更多记录</view> -->
		</view>
		<view class="" style="height: 150rpx"></view>
		
		
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="" v-if="AlertShow">
				<!-- <view class="tanchutel1"></view> -->
				<view class="zhifu_box">
					<view class="zhifu_tel flex_center f_j_b">
						<view class="" style="font-size: 36rpx;">
							购买（{{tabs_k == 0?'BTC':'ETH'}}.{{way == 0?'5':'1'}}M）期权	{{betting_result == 'up'?'涨':betting_result == 'balance'?'平':'跌'}}
						</view>
						<view class="" @click="close">取消</view>
					</view>
					<view class="flex_center f_j_b zhifu_time">
						<view class="flex_center">
							<view class="">{{changci_buy}}</view>
							<image src="../../static/img/gmz.png" class="gmz marll" mode=""></image>
						</view>
						<view class="">{{closetime}}</view>
					</view>
					<view class="font_mon" style="margin-left: 32rpx;margin-top: 32rpx;">涨幅选择</view>
					<view class="zhifu_zfbox flex_center f_j_b"  @click="cczf">
						<view class="flex_center">
							<image src="../../static/img/rise.png" v-if="betting_result == 'up'" class="zhifu_zficon" mode=""></image>
							<image src="../../static/img/pin.png" v-if="betting_result == 'balance'" style="width: 32rpx;height: 16rpx;" mode=""></image>
							<image src="../../static/img/die.png" v-if="betting_result == 'down'" class="zhifu_zficon" mode=""></image>
							<view class="" :style="betting_result == 'up'?'color:#547CE2':betting_result == 'balance'?'color:#ffffff':'color:#E05750'">看{{betting_result == 'up'?'涨':betting_result == 'balance'?'平':'跌'}}</view>
						</view>
						<image src="../../static/img/xmore.png" class="top_more" mode=""></image>
						<view class="bizhong" v-if="czf" @click.stop="xx">
							<view class="bizhong_item" @click="cbetting_result('up')">看涨</view>
							<view class="bizhong_item" @click="cbetting_result('balance')">看平</view>
							<view class="bizhong_item" @click="cbetting_result('down')">看跌</view>
						</view>
					</view>
					<view class="font_mon" style="margin-left: 32rpx;margin-top: 32rpx;">购买数量</view>
					<view class="flex_center f_j_b zhifu_int_box">
						<view class="flex_center f_j_b zhifu_int_bz" @click="ccbi">
							<view class="" v-if="coin_from_type == 1">NTT-钱包</view>
							<view class="" v-if="coin_from_type == 2">NTT-共振</view>
							<view class="" v-if="coin_from_type == 3">USDT-钱包</view>
							<view class="" v-if="coin_from_type == 4">NTT-钱包期权</view>
							<view class="" v-if="coin_from_type == 5">NTT-共振期权</view>
							<view class="" v-if="coin_from_type == 6">USDT-期权</view>
							<image src="../../static/img/xmore.png" class="top_more" mode=""></image>
							<view class="bizhong" v-if="cbi" @click.stop="xx">
								<scroll-view scroll-y="true" style="height: 180rpx;">
									<view class="bizhong_item" @click="ccoin_from_type(1)">NTT-钱包</view>
									<view class="bizhong_item" @click="ccoin_from_type(2)">NTT-共振</view>
									<view class="bizhong_item" @click="ccoin_from_type(3)">USDT-钱包</view>
									<view class="bizhong_item" @click="ccoin_from_type(4)">NTT-钱包期权</view>
									<view class="bizhong_item" @click="ccoin_from_type(5)">NTT-共振期权</view>
									<view class="bizhong_item" @click="ccoin_from_type(6)">USDT-期权</view>
								</scroll-view>
							</view>
						</view>
						<view class="zhifu_int_num flex_center">
							<input type="number" v-model="num" placeholder="请输入数量" @blur="pagescr"/>
						</view>
					</view>
					<view class="flex_center f_j_b zhifu_yuji_box">
						<view class="" v-if="coin_from_type == 1">可用余额{{ntt_money.Money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 2">可用余额{{ntt_money.gz | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 3">可用余额{{usdt_money.Money | toNonExponential}}USDT</view>
						<view class="" v-if="coin_from_type == 4">可用余额{{userbanner.wallet.money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 5">可用余额{{userbanner.gz.money | toNonExponential}}NTT</view>
						<view class="" v-if="coin_from_type == 6">可用余额{{userbanner.usdt.money | toNonExponential}}USDT</view>
						<view class="">预计收益{{yuji(num)}}{{coin_from_type == '3'?'USDT':coin_from_type == '6'?'USDT':'NTT'}}</view>
					</view>
					<view class="zhifu_sure bt" @click="sure">确定</view>
				</view>
			</view>
			
			<!-- <view class="" v-if="AlertClass == 0&&hint == 'err'">
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
			</view> -->
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
    import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	export default {
		components: {
			uniCountdown
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo",
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				tabs_k:0,
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				way:0,
				account:0,
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				num:'',
				kinfo:'',
				btc:'',
				eth:'',
				
				closetime:'',
				changci_buy:'',
				closetime_buy:'',
				changci:'',
				overshijain:'',
				betting_result:'up',
				ntt_money:'',
				usdt_money:'',
				cbi:false,
				czf:false,
				coin_from_type:1,
				
				list:[],
				openlist:[],
				logstatus : 1,
				userbanner:'',
				
				tradeName:'btc',
				market:{
					Id:2,
					CoinFixed:6
				},
				
				coin_option:'',
				ccmin:5,
				platform:'',
				
				timeout_kline:'',
				
				logs:{
					page:1,
					count:20,
					more:true
				},
				opensult:{
					page:1,
					count:20,
					more:true
				},
				showcoin : 'BTC'
			}
		},
		watch: {
			'AlertShow': function(nValue) {
				var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
				var wv = currentWebview.children()[0];
				if (nValue) {
					wv.hide();
				} else {
					wv.show();
					this.pagescr()
				}
			},
		},
		onLoad() {
			
			this.getoptionuser()
			// this.getlogs()
			this.gettime()
			// this.getopensult()
			this.getcoin()
			// this.getoption()
			this.kline()
		},
		onShow() {
			// this.getoptionuser()
			// // this.getlogs()
			// // this.getopensult()
			// this.getcoin()
			// this.gettime()
			this.timeout_kline = setInterval(() => {
				this.getoption()
			}, 1000);
		},
		onHide() {
			clearInterval(this.overshijain)
			clearInterval(this.timeout_kline)
		},
		onUnload(){
			clearInterval(this.overshijain)
			clearInterval(this.timeout_kline)
		},
		onReachBottom(){
			// this.getList();
			if(this.account == 1 || this.account == 2){
				this.getlogs()
			}else if(this.account == 3){
				this.getopensult()
			}
		},
		methods: {
			kline(){
				//
				var self =this;
				const res = uni.getSystemInfoSync();
				var h=res.statusBarHeight+110;
				if(res.platform=='android'){
					this.platform = 'android'
					h=res.statusBarHeight+50+38;
				}else{
					this.platform = 'ios'
					h=res.statusBarHeight+50+34;
				};
				var wv = plus.webview.getWebviewById("webview-btckline");
				if (!wv) {
					wv = plus.webview.create("/hybrid/html/kline.html?market=" + self.market.Id + "&fixed=" + self.market.CoinFixed, "webview-btckline", {
						'plusrequire': "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
						'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
						'top':  h+'px', //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值	
						'height':'426px',
						'animationOptimization': 'none',
						'popGesture': 'hide',
						'userSelect': 'true',
						"softinputMode": "adjustResize",
						'render': 'always',
						'plusrequire': 'ahead'
					})
					wv.evalJS("init('" + self.tradeName + "',"+self.market.Id+","+self.market.CoinFixed+")");
					var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
					currentWebview.append(wv);
				}
			},
			getoption(){
				if(this.tabs_k == 0){
					var coin ='btc'
				}else{
					var coin ='eth'
				}
				this.$request({
					url: '/get.option.kline',
					method: 'get',
					data: {
						coin:coin
					}
				})
				.then(res => {
					// console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.coin_option = res.data
				    // setTimeout(this.getoption, 1e3);
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
			initlogs(){
				this.list = []
				this.logs = {
					page:1,
					count:20,
					more:true
				}
				console.log('c')
				this.getlogs()
			},
			getlogs(){
				console.log('d')
				if(!this.logs.more){
					return
				}
				this.logs.more = false;
				this.$request({
					url: '/get.option.logs',
					method: 'get',
					data: {
						status:this.logstatus,
						count:20,
						page:this.logs.page
					}
				})
				.then(res => {
					this.logs.more = true;
					// console.log(res)
					if (res.code !== 200&& res.code!==10004) {
						_toast(res.message)
						return false
					}
					if(res.code===10004){
						return
					}
					this.logs.page = this.logs.page+1
					let list = res.data.data
					this.list = this.list.concat(list);
					if (list.length < this.logs.count) {
						this.logs.more = false;
					}
				})
				.catch(err => {
				})
			},
			initopensult(){
				this.openlist = []
				this.opensult = {
					page:1,
					count:20,
					more:true
				}
				this.getopensult()
			},
			getopensult(){
				if(!this.opensult.more){
					return
				}
				this.opensult.more = false;
				if(this.tabs_k == 0){
					var coin ='btc'
				}else{
					var coin ='eth'
				}
				if(this.way == 0){
					var option_type = '2'
				}else{
					var option_type = '1'
				}
				this.$request({
					url: '/get.option.openresult',
					method: 'get',
					data: {
						coin:coin,
						count:this.opensult.count,
						page:this.opensult.page,
						option_type:option_type,
					}
				})
				.then(res => {
					this.opensult.more = true;
					// console.log(res)
					if (res.code !== 200&& res.code!==10004) {
						_toast(res.message)
						return false
					}
					if(res.code===10004){
						return
					}
					this.opensult.page = this.opensult.page+1
					let list = res.data.data
					this.openlist = this.openlist.concat(list);
					if (list.length < this.opensult.count) {
						this.opensult.more = false;
					}
				})
				.catch(err => {
				})
			},
			
			formatDate(inputTime){
			    var date = new Date(parseInt(inputTime * 1000));
			    var y = date.getFullYear();
			    var m = date.getMonth() + 1;
			    m = m < 10 ? ('0' + m) : m;
			    var d = date.getDate();
			    d = d < 10 ? ('0' + d) : d;
			    var h = date.getHours();
			    h = h < 10 ? ('0' + h) : h;
			    var minute = date.getMinutes();
			    var second = date.getSeconds();
			    minute = minute < 10 ? ('0' + minute) : minute;
			    second = second < 10 ? ('0' + second) : second;
			    return y + '/' + m + '/' + d +' ' + h + ':' + minute + ':' + second;
			},
			
			goback(){
				uni.navigateBack({
					
				})
			},
			ctabs(e){
				if(this.tabs_k != e){
					this.tabs_k = e
					if(e == 0){
						this.tradeName = 'btc'
						this.showcoin = 'BTC'
					}else{
						this.tradeName = 'eth'
						this.showcoin = 'ETH'
					}
					if(this.account == 1||this.account == 2){
						this.initlogs()
					}else if(this.account == 3){
						this.initopensult()
					}
					let self = this
					var wv = plus.webview.getWebviewById("webview-btckline");
					
					wv.evalJS("init('" + self.tradeName + "',"+self.market.Id+","+self.market.CoinFixed+")");
					// wv.evalJS("delbars()");
				}
			},
			cmincc(e){
				if(this.ccmin == 5){
					this.ccmin = 1
				}else{
					this.ccmin = 5
				}
			},
			csession(){
				clearInterval(this.overshijain)
				if(this.way == 0){
					this.way = 1
					this.gettime()
				}else{
					this.way = 0
					this.gettime()
				}
				if(this.account == 1||this.account == 2){
					this.initlogs()
				}else if(this.account == 3){
					this.initopensult()
				}
			},
			caccount(e){
				if(e === '1'){
					this.logstatus = 1
					// this.getlogs()
					console.log('a')
					this.initlogs()
				}else if(e === '2'){
					this.logstatus = 2
					// this.getlogs()
					console.log('b')
					this.initlogs()
				}else if(e === '3'){
					this.initopensult()
					// this.getopensult()
				}
				this.account = e
			},
			timeUp(){
				// this.getlogs()
			},
			maiup(){
				this.betting_result = 'up'
				this.open(3,'bottom')
			},
			maipin(){
				this.betting_result = 'balance'
				this.open(3,'bottom')
			},
			maidwn(){
				this.betting_result = 'down'
				this.open(3,'bottom')
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
				this.num = ''
				this.$refs.openAlert.Close();
				// clearInterval(this.overshijain)
			},
			zhangfu(e){
				if(e){
					var num = parseFloat(e.close) - parseFloat(e.open)
					var numa = this.app._accDiv(num,e.open)
					var numb= parseFloat(numa)*100
					if(numb){
						if(num>0){
							return '+' + numb.toFixed(2)
						}else{
							return numb.toFixed(2)
						}
					}else{
						return 0
					}
				}else{
					return 0
				}
			},
			gettime(){
				if(this.way == 0){
					var m = 5
					var s = 30
				}else{
					var m = 1
					var s = 20
				}
				// var d = Date.now() + (s*1000) - (m*60*1000)
				// var d_buy = Date.now() + (s*1000) 
				// var d = Date.now() + (s*1000)
				// var d_buy = Date.now() + (s*1000) + (m*60*1000)
				var d = Date.now()
				var d_buy = Date.now() + (m*60*1000)
				d -= d%(60*1000)
				d_buy -= d_buy%(60*1000)
				var min = this.getmin(d)
				var min_buy = this.getmin(d_buy)
				var time = m - parseFloat(min)%m
				var time_buy = m - parseFloat(min_buy)%m
				var changcis = d + time*60*1000
				var changcis_buy = d_buy + time_buy*60*1000
				var changci = this.getshowchangci(changcis- (m*60*1000))
				var changci_buy = this.getshowchangci(changcis_buy- (m*60*1000))
				this.changci = changci
				this.changci_buy = changci_buy
				// var over = changcis - (Date.now() + (s*1000))
				// var over_buy = changcis_buy - (Date.now() + (s*1000))
				var over = changcis - (Date.now())
				var over_buy = changcis_buy - (Date.now())
				this.closetime = this.setovertime(over)
				this.closetime_buy = this.setovertime(over_buy)
				this.overshijain = setInterval(() => {
					if(over>1000){
						over -= 1000
						over_buy -= 1000
						this.closetime = this.setovertime(over)
						this.closetime_buy = this.setovertime(over_buy)
					}else{
						clearInterval(this.overshijain)
						this.close()
						this.gettime()
					}
				}, 1000);
			},
			getmin(e){
				var date = new Date(parseInt(e));
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return minute
			},
			getshowchangci(inputTime){
			    var date = new Date(parseInt(inputTime));
			    var y = date.getFullYear();
			    var m = date.getMonth() + 1;
			    m = m < 10 ? ('0' + m) : m;
			    var d = date.getDate();
			    d = d < 10 ? ('0' + d) : d;
			    var h = date.getHours();
			    h = h < 10 ? ('0' + h) : h;
			    var minute = date.getMinutes();
			    var second = date.getSeconds();
			    minute = minute < 10 ? ('0' + minute) : minute;
			    second = second < 10 ? ('0' + second) : second;
			    return y + '-' + m + '-' + d +' ' + h + ':' + minute;
			},
			setovertime(inputTime){
				var date = new Date(parseInt(inputTime));
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return  minute + ':' + second;
			},
			xx(){},
			ccoin_from_type(e){
				this.coin_from_type = e
				this.cbi = false
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
					this.usdt_money = list.filter(item => {
						return item.CoinName == 'USDT';
					})[0];
				})
				.catch(err => {
				})
			},
			yuji(e){
				if(e){
					if(this.betting_result == 'balance'){
						return ((parseFloat(e)*4).toFixed(4))
					}else{
						return ((parseFloat(e)*1.75).toFixed(4))
					}
				}else{
					return 0
				}
				
			},
			sure(){
				if(!this.num){
					_toast('请输入数量')
					return
				}
				if(this.coin_from_type == '-1'){
					_toast('请选择投入币种')
					return
				}
				if(this.way == 0){
					var option_type = '2'
				}else{
					var option_type = '1'
				}
				if(this.tabs_k == 0){
					var option_coin = 'BTC'
				}else{
					var option_coin = 'ETH'
				}
				this.$request({
					url: '/post.option',
					method: 'post',
					data: {
						amount :this.num,
						coin_from_type:this.coin_from_type,
						betting_result:this.betting_result,
						option_type:option_type,
						option_coin:option_coin
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
					this.getlogs()
					this.getoptionuser()
					this.getcoin()
				})
				.catch(err => {
				})
			},
			getcctime(e){
				var cctime = e.substring(0,4) + '-' + e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12)
				return e.substring(4,6) + '-' + e.substring(6,8) + ' ' + e.substring(8,10) + ':' + e.substring(10,12)
			},
			getfptime(e){
				var cctime = e.end.substring(0,4) + '-' + e.end.substring(4,6) + '-' + e.end.substring(6,8) + ' ' + e.end.substring(8,10) + ':' + e.end.substring(10,12) + ':' + '00'
				console.log(cctime)
				var fptiime = new Date(cctime).getTime()/1000
				var time = new Date().getTime()/1000
				console.log(time)
				if(e.option_type == 1){
					if((fptiime - time - 20) >0){
						return fptiime - time - 20
					}else{
						return 0
						// return false
					}
				}else{
					if((fptiime - time - 30) >0){
						return fptiime - time - 30
					}else{
						return 0
						// return false
					}
				}
			},
			getjgtime(e){
				var cctime = e.end.substring(0,4) + '-' + e.end.substring(4,6) + '-' + e.end.substring(6,8) + ' ' + e.end.substring(8,10) + ':' + e.end.substring(10,12) + ':' + '00'
			
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
			geticon(){
				if(this.tabs_k == 0){
					var icon = this.coininfo.filter(item => {
						return item.en_name == 'NTT';
					})[0].logo;
					return icon
				}else{
					var icon = this.coininfo.filter(item => {
						return item.en_name == 'ETH';
					})[0].logo;
					return icon
				}
			},
			gooptions_list(){
				navigateTo('options/options_list')
			},
			cbetting_result(e){
				this.betting_result = e
				this.czf = false
			},
			gooptions_account(){
				navigateTo('options/options_account')
			},
			gooptions_detail(e){
				navigateTo('options/options_detail?id='+ e.id)
			},
			ccbi(){
				this.cbi = true
			},
			cczf(){
				this.czf = true
			},
			pagescr(){
				console.log('aa')
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
		}
	}
</script>

<style>
	@import url("../../common/css/options.css");
	page{
		background-color: #2B2D3D;
	}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #2B2D3D;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #2B2D3D;
	}
	.kline{
		width: 750rpx;
		height: 426px;
		/* background-color: red; */
	}
	
	.top_ios{
		/* top: 1090rpx; */
	}
	.top_and{
		/* top: 1020rpx; */
	}
</style>
