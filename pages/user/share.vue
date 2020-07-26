<template>
	<!-- <page-loading v-if="!pageLoad"></page-loading> -->
	<view class="content"  v-if="pageLoad">
		<view class="wrapper">
			<scroll-view scroll-x="" style="width: 750rpx;">
				<radio-group @change="onGroupChange">
					<view class="share-wrap">
						<view class="share-item" v-for="(item,index) in shareInfo.posters_background" :key="index">
							<view class="loading">加载中...</view>
							<view class="share-item-detail">
								<label class="check"><radio :value="index" :checked="index == current"/></label>
								<image :src="hbImgs[index]" @tap="previewImage(index)"></image>
							</view>
						</view>
					</view>
				</radio-group>
			</scroll-view>
			<view class="text-wrap">
				<textarea v-model="shareInfo.posters_copywriting"></textarea>
				<view class="copy_box flex_center">
					<view class="copy_bt" @tap="copy">复制文案</view>
					<view class="copy_x" ></view>
				</view>
				<!-- <view class="copy-wrap" @tap="copy">复制文字</view> -->
				<!-- <view class="footer flex-around">
					<view>
						<image src="../../static/img/lj@2x.png"></image>
						<view>分享链接</view>
					</view>
					<view @tap="save">
						<image src="../../static/img/save@2x.png"></image>
						<view>保存图片</view>
					</view>
				</view> -->
				<view class="footer_box flex_center f_j_b">
					<view class="footer_bta flex_center">
						<image class="footer_icon" src="../../static/img/share_hy.png" mode=""></image>
						<view class="">分享好友</view>
					</view>
					<view class="footer_btb flex_center" @tap="save">
						<image class="footer_icon" src="../../static/img/share_tp.png" mode=""></image>
						<view class="color_black">保存图片</view>
					</view>
				</view>
			</view>	
		</view>
		<tki-qrcode ref="qrcode" :val="'https://ntt-h5.fstchain.xyz/?InviteCode=' + userInfo.user.invite_code" :size="300" background="#fff" foreground="#000" pdground="#000" :onval="true" :loadMake="true" :showLoading="false"  :show="false" unit="upx" @result="resultQrCode"></tki-qrcode>
		<block v-for="(item,index) in shareInfo.posters_background" :key="index">
			<canvas :canvas-id="'canvas' + index" class="canvas"></canvas>
		</block>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	import SimpleCanvas from '@/common/js/SimpleCanvas.js';
	import { mapGetters } from "vuex";
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				pageLoad: false,
				current: 0,
				hbImgs: [],
				shareInfo: {},
				qrCodeImageSrc: ''
			}
		},
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		onLoad() {
			this.getData();
		},
		methods: {
			onGroupChange(e) {
				this.current = e.target.value;
			},
			previewImage(index){
				uni.previewImage({
					current: index,
					urls: this.hbImgs
				});
			},
			copy(){
				uni.setClipboardData({
				    data: this.shareInfo.posters_copywriting,
				    success: () => {
						this.app._toast('复制成功');
				    }
				});
			},
			getData(){
				this.$request({
					url: '/get.share',
					data: {},
					method: 'GET'
				}).then(res => {
					console.log(res);
					if(res.code == 200){
						this.shareInfo = res.data;
					}
					this.pageLoad = true;
				}).catch(err => {});
			},
			resultQrCode(qrcode) {
				this.qrCodeImageSrc = qrcode;0
				this.shareInfo.posters_background.forEach((item,index) => {
					this.getImage(item,index);
				});
			},
			getImage(item,index){
				console.log('456')
				let phoneData = uni.getSystemInfoSync();
				let phoneH = phoneData.windowHeight;
				let phoneW = phoneData.windowWidth;
				let canvas = new SimpleCanvas({
					scale: 1,
					canvasId: 'canvas' + index
				}); 
				let top = 0, left = 0;
				if(item.module == 1){
					top = (phoneH / 2 - 70);
					left = ((phoneW - 150) / 2);
				}else{
					top = (phoneH - 150 - 60);
					left = 20;
				}
				canvas.createArtboard({// 创建画板
					id: 'share',
					backgroundColor: '#ffffff',
					width: phoneW,
					height: phoneH
				}).drawImage({
				    id: 'bg',
				    path: item.image,
					top: 0,
				    left: 0,
				    width: phoneW,
					height: phoneH
				}).createCircleRectangle({
				    id: 'ercodeWrap',
				    backgroundColor: '#ffffff',
				    width: 140,
				    height: 140,
					borderRadius: 12,
					left: left,
					top: top
				}).drawImage({
				    id: 'ercode',
				    path: this.qrCodeImageSrc,
				    width: 125,
					height: 125,
					referLayer: {
						id: 'ercodeWrap',
						top: -132,
						left: -132
					}
				}).createCircleRectangle({
				    id: 'textWrap',
				    backgroundColor: 'rgba(0,0,0,0.3)',
				    width: 170,
				    height: 25,
					borderRadius: 12,
					left: 10,
					top: (phoneH - 50)
				}).drawCircleImage({
					id: 'avatar',
					path: '/static/img/lbx.png',
					left: 12,
					d: 20,
					referLayer: {
						id: 'textWrap',
						top: -23
					}
				}).drawWrapText({
					id: 'text',
					fontSize: 12,
					text: '来自'+ this.userInfo.user.nickname +'的推荐',
					lineHeight: 12,
					color: '#ffffff',
					// 位置参照
					referLayer: {
					  id: 'avatar',
					  left: 5,
					  top: -17
					}
				}).draw(() => {
					console.log('aa')
					uni.canvasToTempFilePath({
						canvasId: 'canvas' + index,
						success: (success) => {
							console.log(success);
							this.hbImgs.push(success.tempFilePath);
						},
						fail() {}
					})
				});
			},
			save(){
				uni.saveImageToPhotosAlbum({  //保存图片
					filePath: this.hbImgs[this.current],  
					success: (suc) => {
						this.app._toast('保存成功');
					},
					fail: () => {
						this.app._toast('保存失败');
					}
				})
			},
			back(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style>
	.wrapper{position: relative;z-index: 5;}
	.share-wrap{white-space: nowrap;height: 660upx;}
	.share-item{display: inline-block;width: 360upx;height: 660upx;position: relative;border-radius: 16upx;overflow: hidden;margin-right: 32upx;background-color: #222C44;}
	.share-item-detail{position: absolute;width: 100%;top: 0;left: 0;height: 660upx;z-index: 5;}
	.share-item image{width: 100%;height: 100%;position: relative;z-index: 4;border-radius: 16upx}
	.share-item .check{position: absolute;top: 10upx;right: 10upx;z-index: 9;width: 160upx;height: 160upx;text-align: right;}
	.text-wrap {margin-top: 30upx;}
	.text-wrap textarea{font-size: 28upx;padding: 24upx;border-radius: 12upx;background-color: #192030;width: 100%;height: 200upx;box-sizing: border-box;}
	.copy-wrap{background-color: #677699;border-radius: 50upx;text-align: center;padding: 20upx 0;margin-top: 30upx;width: 686rpx;margin-left: 32rpx;}
	.footer{text-align: center;position: fixed;bottom: 100upx;width: 100%;left: 0;}
	.footer image{width: 100upx;height: 100upx;margin-bottom: 12upx;}
	.canvas{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 0;opacity: 0;}
	.loading{display: flex;justify-content: center;align-items: center;height: 100%;color: #91A8DE;}
	.flex-around{display: flex;align-items: center;justify-content: space-around;}
	
	.copy_box{
		width: 686rpx;
		margin-left: 32rpx;
	}
	.copy_bt{
		width:172rpx;
		height:48rpx;
		background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(216,216,216,1) 100%);
		border-radius:24rpx;
		text-align: center;
		line-height: 48rpx;
		color: #595959;
	}
	.copy_x{
		width:512rpx;
		height:2rpx;
		background:rgba(255,255,255,1);
	}
	.footer_box{
		position: fixed;bottom: 50upx;width: 686rpx;left: 32rpx;
	}
	.footer_bta{
		width:328rpx;
		height:80rpx;
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.5);
		border-radius:4rpx;
		border:2rpx solid rgba(255,255,255,1);
	}
	.footer_btb{
		width:328rpx;
		height:80rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 4rpx 8rpx 0px rgba(0,0,0,0.5);
		border-radius:4rpx;
	}
	.footer_icon{
		width: 44rpx;
		height: 44rpx;
		margin-left: 74rpx;
		margin-right: 10rpx;
	}
</style>
