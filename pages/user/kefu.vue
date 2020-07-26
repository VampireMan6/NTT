<template>
	<view class="content">
		<view class="flex_center f_j_b box" @click="fuzhi(kefu.WeiXin)">
			<view class="font_mon">{{$t('user.wekefu')}}</view>
			<view class="font_mon">{{$t('user.wekefuno')}}:{{kefu.WeiXin}}</view>
		</view>
	</view>
</template>

<script>
	import {navigateTo, loginNavigateTo, _toast, reLaunch} from "../../utils/common"
	export default {
		data() {
			return {
				kefu:'',
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('tabBar.kefu')
			});
			this.getkefu()
		},
		methods: {
			getkefu(){
				this.$request({
					url: '/contact-info',
					method: 'get',
					data: {},
				})
				.then(res => {
					console.log(res)
					if (res.status !== 1) {
						_toast(res.message)
						return false
					}
					this.kefu = res.data
				})
				.catch(err => {
				})
			},
			fuzhi(e) {
				uni.setClipboardData({
					data: e,
					success: function() {
			
					}
				});
			},
		}
	}
</script>

<style>
page{background-color: #f9f9f9;}
.code{width: 320rpx;height: 320rpx;margin-top: 50rpx;}
.box{width: 750rpx;padding: 30rpx;background-color: #FFFFFF;margin-top: 100rpx;}
</style>
