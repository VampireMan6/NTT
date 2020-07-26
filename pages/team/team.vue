<template>
	<view class="content">
		<!-- <view style="height: var(--status-bar-height);min-height: 40rpx;"></view> -->
		<view class="userbox">
			<view class="flex_center f_j_b">
				<view class="flex_center">
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
					<view class="marl">
						<view class="font_max">{{userInfo.user.nickname?userInfo.user.nickname: userInfo.user.username}}</view>
						<view class="">
							<block v-for="(item,index) in 6" :key="index">
								<image src="../../static/img/star.png" class="xingxing" mode="" v-if="index<info.level"></image>
							</block>
							
						</view>
					</view>
				</view>
				<view class="yqbox">
					<view class="btn" @click="goshare">邀请好友</view>
					<view class="">{{info.level_str}}</view>
				</view>
			</view>
			<view class="pro_lajibox mart" >
				<view class="pro_laji">
					<view class="xian" :style="true?'transform: translateX(-' + jindua(info.level_rate) + '%)':'transform: translateX(-100%)' "></view>
				</view>
				<view class="dian" :style="true?'transform: translateX(' + jindub(info.level_rate) + '%)':'transform: translateX(0%)' ">
					<view class="dian_quan"></view>
				</view>
			</view>
		</view>
		
		<view class="allmoney_box content">
			<view class="opacity">总动态收益（USDT）</view>
			<view class="font_b" style="font-size: 54rpx;">{{Number(info.dynamic_profit_amount_usdt) + Number(info.diamonds_profit_amount_usdt) | toNonExponential}}</view>
			<view class="opacity">≈{{(Number(info.dynamic_profit_amount_usdt) + Number(info.diamonds_profit_amount_usdt))*7 | toFixed}} CNY</view>
		</view>
		<view class="flex_center f_j_b list_box">
			<view class="list_item content f_j_a" >
				<view class="text_center">
					<view class="" style="font-size: 48rpx;">{{info.team_numbers}}</view>
					<view class="opacity">我的团队</view>
				</view>
			</view>
			<view class="list_item content f_j_a" >
				<view class="text_center">
					<view class="" style="font-size: 48rpx;">{{info.dynamic_profit_amount_usdt | toNonExponential}}</view>
					<view class="opacity">团队奖励</view>
				</view>
			</view>
		</view>
		<view class="list_boxa content">
			<view class="flex_center f_j_b list_boxa_tel">
				<view class="font_max list_boxa_telitem" @click="cxz(1)" :style="xz == 1?'color:#F2AB3E':''">我的直推</view>
				<view class="font_max list_boxa_telitem" @click="cxz(2)" :style="xz == 2?'color:#F2AB3E':''">我的粉丝</view>
				<view class="listxian" :style="xz == 1?'transform: translateX(0rpx);':'transform: translateX(343rpx);'"></view>
			</view>
			<block v-for="(item,index) in list" :key="index">
				<view class="list_boxa_item flex_center f_j_b">
					<view class="flex_center">
						<image :src="item.avatar?item.avatar:'../../static/img/head.png'" class="list_head" mode=""></image>
						<view class="marl">
							<view class="font_mon">{{item.nickname?item.nickname:'匿名用户'}}</view>
							<view class="font_min">lv.{{item.level}}</view>
						</view>
					</view>
					<view class="text_right">
						<view class="font_mon">{{item.devote}}</view>
						<view class="font_min">贡献值(USDT)</view>
					</view>
				</view>
			</block>
		</view>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	import loadMore from '../../components/uni-load-more.vue'
	export default {
		components: {
			loadMore
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		data() {
			return {
				list:'',
				xz:1,
				info:'',
				page:1,
				count: 20,
				loadingType: "more",
			}
		},
		onLoad() {
			this.initdata()
			this.getinfo()
		},
		onReachBottom(){
			this.getList();
		},
		methods: {
			cxz(e){
				this.xz = e 
				this.initdata()
			},
			getinfo(){
				this.$request({
					url: '/get.user.myteam',
					method: 'get',
					data: {}
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
			initdata(){
				this.page = 1
				this.loadingType = 'more'
				this.list = []
				this.getList()
			},
			getList(){
				if (this.loadingType === 'nomore' || this.loadingType === 'loading') {
					return;
				}
				this.loadingType = 'loading';
				if(this.xz == 1){
					var url = '/get.user.invite'
				}else{
					var url = '/get.user.team'
				}
				this.$request({
					url: url,
					method: 'get',
					data: {
						page :this.page,
						count:this.count,
					}
				})
				.then(res => {
					this.loadingType = 'more';
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.page = this.page+1
					let list = res.data.data.data
					this.list = this.list.concat(list);
					if (list.length < this.count) {
						this.loadingType = 'nomore';
					}
				})
				.catch(err => {
				})
			},
			goshare(){
				navigateTo('user/share_first')
			},
			jindua(e){
				var num = (1-e)*100
				return num
			},
			jindub(e){
				var num = e*100
				if(num>95){
					return 95
				}else{
					return num
				}
				
			},
		}
	}
</script>

<style>
@import url("../../common/css/team.css");
</style>
