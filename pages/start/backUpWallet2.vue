<template>
	<view class="cointaner column b-b">
		<view class="flex j-center">
			<view style="width: 8upx;height: 8rpx;border-radius: 100%;background-color: #FFFFFF;"></view>
			<view class="m-l-5 f-12">密码用于保护私钥和交易授权，强度非常重要</view>
		</view>
		<view class="w-100 f-center" style="margin: 10rpx 0;">
			<view style="font-size: 36rpx;color: #595959;">确认你的钱包助记词</view>
		</view>
		<view style="color: #8C8C8C;margin-bottom: 30rpx;">请按顺序点击助记词，以确认你的备份助记词</view>
		<!-- 填写助记词区域 -->
		<view class="b-b f-w" style="margin-bottom: 40rpx; height: 260rpx;background-color: #FFFFFF;padding: 16rpx;">
			<view style="" class="item b-b j-center" v-for="(item,i) in dataListSure" :key="i" @tap="selectSure(i)">
				{{item}}
			</view>
		</view>
		<view class="f-w" style="margin-bottom: 28rpx;height: 260rpx">
			<view style="" class="item2 b-b" v-for="(item,i) in dataList" :key="i" @tap="selectlist(i)">
				{{item}}
			</view>
		</view>
		<!-- 确认 -->
		<view class="b-b column">
			<view style="height: 96rpx;background-color: #2d2c3f;margin-bottom: 48rpx;border-radius: 8rpx;" class="f-center j-center w-100" 
			@tap="sure">确认</view>
		</view>
	</view>
</template>

<script>
	import { navigateTo,loginNavigateTo,_toast,reLaunch } from "../../utils/common"
	export default {
		onLoad() {
			let index = uni.getStorageSync('backUpWalletList');
			this.dataList = index;
			this.copyList = JSON.parse(JSON.stringify(this.dataList));
			this.dataList.sort(function(){
				return .5 - Math.random()
			});
			console.log(this.copyList)
		},
		data() {
			return {
				dataList: [],
				dataListSure: [],
				copyList: [],
			}
		},
		methods: {
			backUpWallet() {
				uni.navigateTo({
					url: '/pages/start/backUpWallet2'
				})
			},
			sure() {
				if(this.dataListSure.join(",") == this.copyList.join(",")) {
					this.beifen();
				}else {
					_toast('助记词不正确，请重新输入');
				}
			},
			beifen() {
				this.$request({
					url: 'user/mnemonic/confirm',
					method: 'POST',
					data: {
						mnemonic: this.copyList.join(",")
					}
				})
				.then(res => {
					console.log(res)
					if (res.code == 200) {
						// _toast('助记词备注成功');
						// setTimeout(()=> {
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	})
						// },1000)
					}
				})
				.catch(err => {
				})
			},
			selectlist(i) {//助记词选择
				this.dataListSure.push(this.dataList[i]);
				this.dataList.splice(i,1);
			},
			selectSure(i) {//助记词从选
				this.dataList.push(this.dataListSure[i]);
				this.dataListSure.splice(i,1);
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/com.css");
	view {
		display: flex;
		font-size: 28rpx;
	}
	.cointaner {
		padding: 24rpx 32rpx;
	}
	.m-l-5 {
		margin-left: 10rpx;
	}
	.f-24 {
		font-size: 48rpx;
	}
	.item {
		height: 52rpx;
		padding: 0rpx 20rpx;
		border-radius: 4rpx;
		color: #256AC3;
		border: 2upx solid #256AC3;
		background-color: #cddaed;
		margin: 0 10px 28rpx 0;
	}
	.item2 {
		padding: 0 20rpx;
		height: 52rpx;
		border-radius: 4rpx;
		color: #FFFFFF;
		border: 2upx solid #ffffff;
		margin: 0 10px 28rpx 0;
	}
</style>
