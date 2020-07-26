<script>
	export default {
		onLaunch: function() {
			if(uni.getStorageSync('token')){
				this.$store.dispatch('setUserInfo')
				this.$store.dispatch('setCoinInfo')
			}
			let self = this;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				self.$request({
					url: 'update',
					method: 'get',
					data:{
						version: wgtinfo.version,
						device:uni.getSystemInfoSync().platform,
					}
				})
				.then(res => {
					if(res.data.must){
						self.app._install(res.data);
					}
				})
				.catch(err => {
				})
			});
			// #endif
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	@import url("common/css/iconfont.css");
	@import url('/components/transition-min/transition.min.css');
	@import './common/css/qiun.css';
	@import url("common/css/base.css");
	/*每个页面公共css */
	page{
			background: #1F2031;
			width: 100%;
			min-height: 100vh;
		}
</style>
