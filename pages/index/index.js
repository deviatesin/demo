// 主页页面逻辑
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    // 页面加载时执行
    console.log('主页加载');
  },

  handleNavigation(e) {
    // 处理导航
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    });
  }
});