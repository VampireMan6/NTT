import Vue from 'vue'
import App from './App'
import VueI18n from './components/vue-i18n.js'
Vue.use(VueI18n);
import store from './store'
import $app from './common/js/base.js'
import request from './utils/request.js'
import * as filters from "./filtres";
import LangEn from './static/locales/en.js'
import LangChs from './static/locales/zh-CN.js'
import LangJa from './static/locales/ja_jp.js'
import LangKo from './static/locales/ko_kr.js'
import wLoading from "@/components/w-loading.vue";
import openAlert from '@/components/open-alert/open-alert';
import cmdTransition from '@/components/cmd-transition/cmd-transition.vue';
//加载动画
Vue.component('w-loading',wLoading);
//弹出层
Vue.component('openAlert', openAlert);
//进出效果
Vue.component('cmd-transition', cmdTransition);
// 注册全局实用程序过滤器.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
const i18n = new VueI18n({
	locale: 'zh_cn', //初始化,保证刷新页面也保留
	messages: { 
		'zh_cn': LangChs,
		'en': LangEn,
		'ja_jp':LangJa,
		'ko_kr':LangKo
	}
})
Vue.prototype._i18n = i18n;
Vue.prototype.app = $app;
Vue.prototype.$request = request;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
    ...App
})

app.$mount()
