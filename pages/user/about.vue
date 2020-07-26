<template>
	<view>
		<view class="richbox">
			<rich-text :nodes="list | richtextlimit"></rich-text>
		</view>
	</view>
</template>

<script>
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	export default {
		data() {
			return {
				list: '',
			}
		},
		onLoad() {
			this.getlist()
		},
		methods: {
			getlist(){
				this.$request({
					url: '/get.aboutus',
					method: 'get',
					data:{},
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.list = res.data
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
		color: #FFFFFF;
		font-weight: bold;
		font-size: 36rpx;
	}
	.box_list{
		width: 750rpx;
		padding: 10rpx 20rpx;
		border-bottom: 2rpx solid #f5f5f5;
		height: 80rpx;
	}
	.answer{
		width: 750rpx;
		padding: 20rpx;
	}
	.richbox{
		width: 750rpx;
		padding: 20rpx;
	}
</style>
