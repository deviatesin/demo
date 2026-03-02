// 腧穴列表页面逻辑

// 导入API服务
import { acupointApi } from '../training/api';

Page({
  data: {
    acupoints: [],
    loading: false,
    error: ''
  },

  onLoad() {
    // 页面加载时执行
    console.log('腧穴列表页面加载');
    this.loadAcupoints();
  },

  navigateBack() {
    // 返回上一页
    wx.navigateBack();
  },

  async loadAcupoints() {
    // 加载穴位数据
    this.setData({
      loading: true,
      error: ''
    });
    
    try {
      const acupoints = await acupointApi.getAllAcupoints();
      console.log('穴位数据:', acupoints);
      
      this.setData({
        acupoints: acupoints,
        loading: false
      });
    } catch (error) {
      console.error('加载穴位数据失败:', error);
      this.setData({
        error: '加载穴位数据失败，请重试',
        loading: false
      });
    }
  }
});