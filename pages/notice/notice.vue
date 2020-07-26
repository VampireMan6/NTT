<template>
	<view class="content">
		<view style="height: var(--status-bar-height);min-height: 40rpx;"></view>
		<view class="logo_box flex_center">
			<image class="logo" src="../../static/img/logo.png" mode=""></image>
			<view class="">
				<image class="ntt" src="../../static/img/startntt.png" mode=""></image>
				<view class="">最强共识-为极致而生</view>
			</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<view class="flex_start f_j_b list_box" @click="godetail(item.id)">
				<view class="content list_box_left">
					<view class="quan"></view>
					<view class="xian" :class="index == 0?'xbg':'xbga'"></view>
				</view>
				<view class="list_box_right">
					<view class="list_tel">{{item.title}}</view>
					<view class="flex_center f_j_b mart">
						<view class="">NTT官方发布</view>
						<view class="">{{item.updated_at | _formatDate}}</view>
					</view>
					<view class="list_con">
						{{item.description}}
					</view>
					<image v-if="item.thumb" :src="item.thumb" mode="aspectFill" class="list_img mart"></image>
				</view>
			</view>
		</block>
		
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	import loadMore from '../../components/uni-load-more.vue'
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				page: 1,
				count:20,
				loadingType: "more",
				list:[]
			}
		},
		onShow() {
			this.initdata()
		},
		onReachBottom(){
			this.getList();
		},
		methods: {
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
					page:this.page,
					count:this.count,
					category_ids:'4'
				}
				this.$request({
					url: 'article',
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
					let list = res.data.data
					this.list = this.list.concat(list);
					if (list.length < this.count) {
						this.loadingType = 'nomore';
					}
				})
				.catch(err => {
				})
			},
			godetail(e){
				navigateTo('notice/notice_detail?id=' + e)
			}
		}
	}
</script>

<style>
	@import url("../../common/css/notice.css");
</style>
