// 如果是下载 SDK 的方式，改成 const { init } = require('./wxCloudClientSDK.umd.js')
const { init } = require("@cloudbase/wx-cloud-client-sdk");

App({
  onLaunch() {
    // 小程序启动时执行
    console.log('小程序启动');
    
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: "cloud1-9gfehy5g6bc87355", // 当前的云开发环境 ID
        traceUser: true,
      });
      
      // 初始化云开发客户端
      this.client = init(wx.cloud);
      this.models = this.client.models; // 或者也可以直接从 wx.cloud.models 上获取，这种方式的类型提示会弱一些
    }
  },
  
  onShow() {
    // 小程序显示时执行
    console.log('小程序显示');
  },
  
  onHide() {
    // 小程序隐藏时执行
    console.log('小程序隐藏');
  },
  
  globalData: {
    // 全局数据
    userInfo: null,
    currentExam: null,
    currentScore: null
  }
})