
let API_URL = "";
// APP
if (process.env.VUE_APP_PLATFORM === 'app-plus') {
    if (process.env.NODE_ENV === 'development') {
		API_URL ='https://ntt-api.fstchain.xyz'
		// 测试
		// API_URL = "http://192.168.10.243:9501";
		// API_URL = "http://192.168.10.243:13000";
		// API_URL ="http://183.66.226.146:13000"
    } else {
        // 正式
		API_URL ='https://ntt-api.fstchain.xyz'
		// 测试
		// API_URL = "http://192.168.10.243:9501";
		// API_URL = "http://192.168.10.243:13000";
		// API_URL ="http://183.66.226.146:13000"
    }
} else { // H5 模式
    if (process.env.NODE_ENV === 'development') {
       API_URL = "https://ntt-api.fstchain.xyz";
	   // 测试
	   // API_URL = "http://192.168.10.243:9501";
	   // API_URL = "http://192.168.10.243:13000";
	   // API_URL ="http://183.66.226.146:13000"
    } else {
        // 正式
        API_URL = "https://ntt-api.fstchain.xyz";
		// 测试
		// API_URL = "http://192.168.10.243:9501";
		// API_URL = "http://192.168.10.243:13000";
		// API_URL ="http://183.66.226.146:13000"
    }
}

export {
    API_URL,
}
