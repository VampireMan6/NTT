<template>
	<view class="content">
		<view class="topbox">
			<view style="height: var(--status-bar-height);margin-bottom: 100rpx;min-height: 40rpx;"></view>
			<view class="flex_center f_j_b top_nr">
				<image class="top_icon" src="../../static/img/leftback.png" mode="" @click="back"></image>
				<view class="font_big">
					公告详情
				</view>
				<view class="top_icon"></view>
			</view>
		</view>
		<view class="" style="height: var(--status-bar-height);margin-top: 100rpx;background-color:#000000;width: 750rpx;min-height: 40rpx;"></view>
		<view class="tel">{{detail.title}}</view>
		<view class="flex_center f_j_b timebox">
			<view class="">NTT官方发布</view>
			<view class="">{{detail.updated_at | _formatDate}}</view>
		</view>
		<view class="con">{{detail.description}}</view>
		<image v-if="detail.thumb" :src="detail.thumb" mode="aspectFill" class="detail_img mart"></image>
		<view class="rich_box">
			<rich-text :nodes="detail.content | richtextlimit"></rich-text>
		</view>
	</view>
</template>

<script>
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	export default {
		data() {
			return {
				id:'',
				detail:'',
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getdetail()
		},
		methods: {
			getdetail(){
				this.$request({
					url: '/get.article.detail',
					method: 'get',
					data: {
						article_id :this.id
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.detail = res.data
				})
				.catch(err => {
				})
			},
			back(){
				uni.navigateBack({
					
				})
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
.tel{width: 686rpx;margin-top: 32rpx;font-size: 34rpx;font-weight: bold;}
.timebox{width: 686rpx;margin-top: 4rpx;}
.con{width: 686rpx;font-size: 28rpx;margin-top: 64rpx;}
.detail_img{
	width: 686rpx;
	height: 384rpx;
}
.rich_box{width: 686rpx;margin-top: 20rpx;}
</style>
