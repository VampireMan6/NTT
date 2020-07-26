<template>
	<view class="content">
		<view class="bg"><image :src="shareInfo.background" mode="aspectFill"></image></view>
		<view class="invite-wrap">
			<view class=" title">面对面邀请</view>
			<view class="code" @tap="copy">
				<text class="color_black">{{userInfo.user.invite_code}}</text>
				<text class="color_black">复制</text>
			</view>
			<view class="qrcode">
				<tki-qrcode ref="qrcode"
					:val="'https://ntt-h5.fstchain.xyz/?InviteCode='+userInfo.user.invite_code"
					:size="270"
					background="#fff"
					foreground="#000"
					pdground="#000"
					:onval="true"
					:loadMake="true"
					:show="true"
					:showLoading="false"
					unit="upx">
				</tki-qrcode>
			</view>
			<button @click="goInvite" class="bt">邀请好友</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import { _toast } from "../../utils/common"
	export default {
		components: {
			tkiQrcode
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		data() {
			return {
				shareInfo: {}
			}
		},
		onLoad(){
			this.app.showLoadinig();
			this.getShare();
		},
		methods: {
			goInvite(){
				if(this.shareInfo.posters_background && this.shareInfo.posters_background.length){
					uni.setStorageSync('shareinfo',this.shareInfo);
					uni.navigateTo({
						url: `share`
					});
				}
			},
			getShare(){
				this.$request({
					url: '/get.share',
					method: 'get',
					data: {},
				})
				.then(res => {
					console.log(res);
					if(res.code == 200) {
						this.shareInfo = res.data;
					}
					this.app.hideLoading();
				})
				.catch(err => {})
			},
			copy(){
				uni.setClipboardData({
				    data: this.userInfo.user.invite_code,
				    success: () => {
				       _toast('复制成功');
				    }
				});
			}
		}
	}
</script>

<style>
	page,.content{height: 100%;}
	.content .bg,.content .bg image{width: 100%;height: 100%;}
	.invite-wrap{background-color: rgba(43,45,61,0.3);position: absolute;border-radius: 16upx;padding: 30upx 60upx;text-align: center;top: 50%;transform: translateY(-62%);box-shadow:0px 0px 64px 2px rgba(242,171,62,0.38);
border-radius:16px;
border:2px solid rgba(242,171,62,0.21);}
	.invite-wrap .title{font-size: 36upx;color: #F2AB3E;}
	.invite-wrap .qrcode{width: 290upx;margin: 40upx auto; height: 290rpx;padding: 10rpx;background-color: #FFFFFF;}
	.invite-wrap button{width: 440upx;}
	.invite-wrap .code{background-color: #E8E8E8;border-radius: 8upx;width: 250upx;margin: 20upx auto 0;font-size: 32upx;padding: 8upx;}
	.invite-wrap .code .color_red{margin-left: 14upx;}
</style>
