// APP的更新
import { updateInfo } from "../api/util";

const installWgt = path => {
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
};

const downWgt = downUrl => {
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( downUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) {
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
};

/**
 * 强制更新
 */
export function updateApp() {
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        let wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        updateInfo()
            .then(res => {
                if (res.status !== 1) {
                    return false;
                }
                let data = res.data || {};
                if (!data.ver || data.ver == wgtVer) {
                    return false;
                }
                // 如果不强制更新，就返回
                if(data.MustUpdate == 0) {
                    return false;
                }
                uni.showModal({ //提醒用户更新
                    title: "更新提示",
                    content: data.Tip,
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            let downUrl = "";
                            switch(uni.getSystemInfoSync().platform){
                                case 'android':
                                    downUrl = data.Android;
                                    downWgt(downUrl);
                                    break;
                                case 'ios':
                                    downUrl = data.IOS;
                                    downWgt(downUrl);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                });
            })
            .catch(err => {});
    });
}

/**
 * 检查是否更新
 */
export function checkVersion() {
    plus.nativeUI.showWaiting("检测更新...");
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        let wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        updateInfo()
            .then(res => {
                plus.nativeUI.closeWaiting();
                if (res.status !== 1) {
                    plus.nativeUI.alert("检测更新失败！");
                    return false;
                }
                let data = res.data || {};
                if (!data.ver || data.ver == wgtVer) {
                    plus.nativeUI.alert("无新版本可更新！");
                    return false;
                }
                uni.showModal({ //提醒用户更新
                    title: "更新提示",
                    content: data.Tip,
                    success: (res) => {
                        if (res.confirm) {
                            let downUrl = "";
                            switch(uni.getSystemInfoSync().platform){
                                case 'android':
                                    downUrl = data.Android;
                                    downWgt(downUrl);
                                    break;
                                case 'ios':
                                    downUrl = data.IOS;
                                    downWgt(downUrl);
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            plus.nativeUI.closeWaiting();
                        }
                    }
                });
            })
            .catch(err => {
                plus.nativeUI.alert("检测更新失败！");
                plus.nativeUI.closeWaiting();
            });
    });
}

