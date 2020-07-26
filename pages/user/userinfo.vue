<template>
	<view class="content">
		<view class="head_iconbox" @click="changeimg">
			<image class="head_icon" src="../../static/img/lbx.png" mode="aspectFill"></image>
			<view class="boxF">
				<view class="boxS">
					<view class="boxT">
						<image class="head" :src="avatar?avatar:'../../static/img/head.png'" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="mart" @click="changeimg">点击修改头像</view>
		
		<view class="flex_center f_j_b nc_boxa">
			<view class="font_mon">昵称：</view>
			<input type="text" class="text_right" v-model="name" placeholder="请输入昵称"/>
			
			<view class="xaina"></view>
			<view class="xian"></view>
		</view>
		<view class="flex_center f_j_b nc_box">
			<view class="font_mon">电话：</view>
			<view class="">{{userInfo.user.mobile}}</view>
		</view>
		<view class="flex_center f_j_b nc_box">
			<view class="font_mon">性别：</view>
			<view class="flex_center xb_box">
				 <radio-group @change="radioChange">
					 <label class="radio" style="margin-right: 50rpx;">
					 	<radio value="1" :checked="sex == 1" style="transform:scale(0.7)" color="#F2AB3E"/><text>男</text>
					 </label>
					 <label class="radio">
					 	<radio value="2" :checked="sex == 2" style="transform:scale(0.7)" color="#F2AB3E"/><text>女</text>
					 </label>
				 </radio-group>
				
				<!-- <image class="xb_icon" :src="sex == 1?'../../static/img/not_selected.png':'../../static/img/not_selected@2x.png'" mode="" @click="sex=1"></image>
				<view class="" @click="sex=1">男</view>
				<image class="xb_icon" @click="sex=2" :src="sex != 1?'../../static/img/not_selected.png':'../../static/img/not_selected@2x.png'" mode=""></image>
				<view class="" @click="sex=2">女</view> -->
			</view>
		</view>
		<view class="flex_center f_j_b nc_box">
			<view class="font_mon">生日：</view>
			<picker mode="date" @change="changedata" :value="birdata">
				<view class="">{{birdata}}</view>
			</picker>
		</view>
		
		
		
		
		<view class="bt_tuichu" @click="loginout">退出登录</view>
	</view>
</template>

<script>
	import { getToken , delToken } from '../../utils/userAuth.js'
	import { navigateTo,loginNavigateTo,_toast,reLaunch,switchTab,jumpWebView } from "../../utils/common"
	import { mapGetters } from "vuex"
	export default {
		computed: {
			...mapGetters({
				userInfo: "userInfo"
			})
		},
		data() {
			return {
				name:'',	
				birdata:'1990-10-10',
				sex:'1',
				avatar:'',
				domain:'',
				toux:'',
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.name = this.userInfo.user.nickname
			this.sex = this.userInfo.user.sex
			this.birdata = this.userInfo.user.birthday || '1990-01-01'
			this.avatar = this.userInfo.user.avatar
		},
		onNavigationBarButtonTap() {
			console.log('1')
			this.baocun()
		},
		methods: {
			loginout(){
				delToken()
				uni.reLaunch({
					url:'/pages/start/start?out=1'
				})
			},
			changedata(e){
				this.birdata = e.target.value
			},
			radioChange(e){
				console.log(e.detail.value)
			},
			changeimg(){
				// return
				uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					this.$request({
						url: '/get.upload.token',
						method: 'get',
						data: {}
					})
					.then(res => {
						if (res.code !== 200) {
							_toast('获取失败');
							return false;
						}
						let token = res.data.token;
						this.domain = res.data.domain;
						console.log(res)
						let upload_url = res.data.upload_url;
						this.app.showLoadinig();
						uni.uploadFile({
							url: upload_url, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'token': token
							},
							success: (uploadFileRes) => {
								this.app.hideLoading();
								if (uploadFileRes.statusCode !== 200) {
									_toast('上传失败');
									return false;
								}
								let data = uploadFileRes.data;
								if (typeof data == "string") {
									data = JSON.parse(data);
								}
								console.log(data)
								this.avatar = this.domain + '/' + data.key;
								this.toux =  data.key;
							},
							fail: (err) => {
								console.log(err, 22222)
							}
						});
					})
					.catch(() => {
				
					});
				}
				});
			},
			baocun(){
				this.$request({
					url: '/post.user.edit',
					method: 'post',
					data: {
						avatar:this.toux,
						nickname:this.name,
						birthday:this.birdata,
						sex:this.sex
					}
				})
				.then(res => {
					console.log(res)
					if (res.code !== 200) {
						_toast(res.message)
						return false
					}
					this.$store.dispatch("setUserInfo");
					_toast(res.message)
				})
				.catch(err => {
				})
			},
		}
	}
</script>

<style>
	@import url("../../common/css/userinfo.css");
.bt_tuichu{
	position: fixed;
	bottom: 40rpx;
	width: 686rpx;
	height: 80rpx;
	border-radius: 4rpx;
	text-align: center;
	line-height: 80rpx;
	background:rgba(43,45,61,1);
	box-shadow:0px 0px 12rpx 0px rgba(0,0,0,0.5);
}
</style>
