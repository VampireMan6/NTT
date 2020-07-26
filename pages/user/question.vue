<template>
	<view class="content">
		<block v-for="(item,index) in list" :key="index">
			<view class="flex_center f_j_b box_list" @click="xu(index)">
				<view class="question">{{ item.title}}</view>
				<i class="iconfont icon-enter-copy" :style="index == show?'transform:rotate(180deg);':''"></i>
			</view>
			<view class="answer" v-if="index == show">
				<view class="">
					aasdfasf
				</view>
				<rich-text :nodes="item.content | richtextlimit"></rich-text>
			</view>
		</block>
	</view>
</template>

<script>
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	export default {
		data() {
			return {
				show: -1,
				list: [],
			}
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			xu(e){
				if(e == this.show){
					this.show = -1
				}else{
					this.show = e
				}
			},
			getlist(){
				let params = {
					category_ids :'2',
					page:1,
					count:50,
				}
				this.$request({
					url: '/get.article',
					method: 'get',
					data:params,
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					let list = res.data.data
					this.list = this.list.concat(list);
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
.box{
		width: 750rpx;
		height: 300rpx;
		position: relative;
		
	}
	.box image{
		width: 750rpx;
		height: 300rpx;
		position: absolute;
		top: 0;
		z-index: 1;
	}
	.box view{
		text-align: center;
		position: relative;
		z-index: 10;
		margin-top: 120rpx;
		color: #2D2C3F;
		font-weight: bold;
		font-size: 36rpx;
	}
	.box_list{
		width: 686rpx;
		padding: 10rpx 20rpx;
		border-bottom: 2rpx solid #2D2C3F;
		height: 80rpx;
	}
	.answer{
		width: 686rpx;
		padding: 20rpx;
		background-color: #2B2D3D;
	}
</style>
