<template>
	<view class="content" >
		<view class="topbox" :style="AlertShow?'filter: blur(4px);':''">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<view class="flex_center" style="">
					<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="goback"></image>
				</view>
				<view class="tabs_box flex_center">
					<view class="tabs_k" :style="'transform: translateX('+ tabs_k + 'rpx)'"></view>
					<view class="flex_center tabs_x_box">
						<view class="tabs_x" @click="all">全部账单</view>
						<view class="tabs_x" @click="listin">转入</view>
						<view class="tabs_x" @click="listout">转出</view>
					</view>
				</view>
				<image class="top_icon" src="../../static/img/menu.png" mode="" @tap="open(7, 'right')"></image>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 120rpx;background-color:#000000;min-height: 40rpx;width: 750rpx;" :style="AlertShow?'filter: blur(4px);':''"></view>
		<view class="list_box content" :style="AlertShow?'filter: blur(4px);':''" @touchstart="start" @touchend="end">
			<block v-for="(item,index) in list" :key="index">
				<view class="list_item flex_center f_j_b slide_bot_in" :style="'animation-delay:' + index*0.05 + 's'" @click="godetail(item.id)">
					<view class="flex_center">
						<image class="coin_icon" :src="item.logo" mode=""></image>
						<view class="">
							<view class="font_mon">{{item.remark}} {{item.coin_name}}</view>
							<view class="font_min">{{item.updated_at}}</view>
						</view>
					</view>
					<view class="font_big" :class="Number(item.money)>0?'color_red':''">{{item.money | toNonExponential}}</view>
				</view>
			</block>
		</view>
		<load-more :status="loadingType"></load-more>
		<openAlert ref="openAlert" :AlertClass="AlertClass" :AlertPosition="AlertPosition" :AlertShow.sync="AlertShow">
			
			<view class="content sizer sizer_move">
				<view class="flex_center f_j_e" style="width: 100%;">
					<image src="../../static/img/colse.png" class="close" mode="" @click="close"></image>
				</view>
				<view class="search_box flex_center f_j_b">
					<input type="text" v-model="keyword" placeholder="输入收款账户/金额搜索转账记录"/>
					<image src="../../static/img/search.png" class="search" mode=""></image>
				</view>
				<view class="sizer_tel font_max font_b">交易币种</view>
				<view class="flex_center sizer_list">
					<view class="sizer_item" :class="coin_id == '-1'?'sizer_item_y':'sizer_item_n'" @click="ccoin_id('-1')">全部</view>
					<block v-for="(item,index) in coininfo">
						<view class="sizer_item" :class="coin_id == item.id?'sizer_item_y':'sizer_item_n'" @click="ccoin_id(item.id)">{{item.en_name}}</view>
					</block>
				</view>
				<view class="sizer_tel font_max font_b">账单类型</view>
				<view class="flex_center sizer_list">
					<view class="sizer_item" :class="type_id == '-1'?'sizer_item_y':'sizer_item_n'"@click="ctype_id('-1')">全部</view>
					<block v-for="(item,index) in screen" :key="index">
						<view class="sizer_item" :class="type_id == item.id?'sizer_item_y':'sizer_item_n'" @click="ctype_id(item.id)">{{item.name}}</view>
					</block>
				</view>
				<view class="sizer_tel font_max font_b">交易时间</view>
				<view class="sizer_section flex_center f_j_b">
					<view class="sizer_secbox">
						<picker mode="date" @change="changedata" id="begin">
							<view>{{beginData?beginData:'开始时间'}}</view>
						</picker>
					</view>
					<view class="heng"></view>
					<view class="sizer_secbox">
						<picker mode="date" @change="changedata" id="end">
							<view>{{endData?endData:'结束时间'}}</view>
						</picker>
					</view>
				</view>
				<view class="sizer_tel font_max font_b">交易金额</view>
				<view class="sizer_section flex_center f_j_b">
					<view class="sizer_secbox flex_center">
						<input type="number" v-model="number_min" placeholder="最小金额"/>
					</view>
					<view class="heng"></view>
					<view class="sizer_secbox flex_center">
						<input type="number" v-model="number_max" placeholder="最大金额"/>
					</view>
				</view>
				<view class="sizer_bt_box flex_center f_j_b">
					<view class="bta" @click="reset">重置</view>
					<view class="btb" @click="sure">确定</view>
				</view>
			</view>
			
		</openAlert>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	import loadMore from '../../components/uni-load-more.vue'
	export default {
		components: {
			loadMore
		},
		computed: {
			...mapGetters({
				coininfo: "coininfo"
			})
		},
		data() {
			return {
				startData:{
					clientX:0,
					clientY:0
				},
				tabs_k:0,
				list:[],
				
				AlertClass: 0,
				AlertPosition: '',
				AlertShow:false,
				
				beginData:'',
				endData:'',
				
				page: 1,
				count: 20,
				loadingType: "more",
				type:0,
				screen:'',
				coin_id:'-1',
				type_id:'-1',
				number_min:'',
				number_max:'',
				keyword:'',
			}
		},
		onLoad() {
			this.initdata()
			this.getscreen()
		},
		onReachBottom(){
			this.getList();
		},
		methods: {
			getscreen(){
				this.$request({
					url: 'coins/logs/types',
					method: 'get',
					data: {}
				})
				.then(res => {
					this.app.hideLoading()
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.screen = res.data.list
				})
				.catch(err => {
				})
			},
			reset(){
				this.beginData = ''
				this.endData = ''
				this.coin_id = '-1'
				this.type_id = '-1'
				this.number_max = ''
				this.number_min = ''
				this.keyword = ''
			},
			start(e){
			    this.startData.clientX=e.changedTouches[0].clientX;
			    this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
			    // console.log(e)
			    const subX=e.changedTouches[0].clientX-this.startData.clientX;
			    const subY=e.changedTouches[0].clientY - this.startData.clientY;
			    if(subY>50 || subY<-50){
			        // console.log('上下滑')
			    }else{
			        if(subX>100){
			            // console.log('右滑')
						if(this.tabs_k==320){
							this.listin();
						} else if(this.tabs_k==160){
							 this.all();
						}
			        }else if(subX<-100){
			            // console.log('左滑')
						if(this.tabs_k==0){
							this.listin();
						} else if(this.tabs_k==160){
							 this.listout();
						}
			        }else{
			            // console.log('无效')
			        }
			    }
			},
			all(){
				this.tabs_k = 0
				this.type = 0
				this.initdata()
				// this.list = 5
			},
			listin(){
				this.tabs_k = 160
				this.type = 1
				this.initdata()
			},
			listout(){
				this.tabs_k = 320
				this.type = 2
				this.initdata()
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
			changedata(e){
				console.log(e)
				if(e.target.id == 'begin'){
					this.beginData = e.target.value
				}else{
					this.endData = e.target.value
				}
			},
			godetail(e){
				navigateTo('wallet/bill_detail?id=' + e)
			},
			initdata(){
				this.page = 1
				this.loadingType = 'more'
				this.list = []
				this.getList()
			},
			getList() {
				if (this.loadingType === 'nomore' || this.loadingType === 'loading') {
					return;
				}
				this.loadingType = 'loading';
				let params = {
					coin_id :this.coin_id,
					type_id:this.type_id,
					type:this.type,
					page:this.page,
					count:this.count,
					number_min:this.number_min,
					number_max:this.number_max,
					start_time:this.beginData,
					end_time:this.endData,
					keyword:this.keyword,
				}
				this.$request({
					url: 'coins/logs',
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
					let list = res.data.list
					this.list = this.list.concat(list);
					if (list.length < this.count) {
						this.loadingType = 'nomore';
					}
				})
				.catch(err => {
				})
			},
			ctype_id(e){
				this.type_id = e
			},
			ccoin_id(e){
				this.coin_id = e
			},
			sure(){
				this.initdata()
				this.close()
			},
			goback(){
				uni.navigateBack({
					
				})
			},
		}
	}
</script>

<style>
@import url("../../common/css/bill.css");
</style>
