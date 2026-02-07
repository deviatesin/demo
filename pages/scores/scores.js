// 成绩查询页面逻辑

// 导入API服务
import { scoreApi } from '../../services/api';

// 学生成绩操作函数
const studentScoreOperations = {
  // 根据学号和姓名查询成绩
  async searchByStudentInfo(studentId, name) {
    try {
      const scores = await scoreApi.getScoresByStudent(studentId, name);
      return scores;
    } catch (error) {
      console.error('查询成绩失败:', error);
      return [];
    }
  }
};

Page({
  data: {
    studentId: '',
    name: '',
    searchResults: [],
    hasSearched: false
  },

  onLoad() {
    // 页面加载时执行
    console.log('成绩查询页面加载');
  },

  navigateBack() {
    // 返回上一页
    wx.navigateBack();
  },

  handleStudentIdChange(e) {
    // 处理学号输入
    this.setData({
      studentId: e.detail.value
    });
  },

  handleNameChange(e) {
    // 处理姓名输入
    this.setData({
      name: e.detail.value
    });
  },

  async handleSearch() {
    // 处理搜索
    const studentId = this.data.studentId.trim();
    const name = this.data.name.trim();
    
    if (!studentId || !name) {
      wx.showToast({
        title: '请输入学号和姓名',
        icon: 'none'
      });
      return;
    }

    // 显示加载提示
    wx.showLoading({
      title: '查询成绩中...'
    });

    try {
      const results = await studentScoreOperations.searchByStudentInfo(studentId, name);
      this.setData({
        searchResults: results,
        hasSearched: true
      });
    } catch (error) {
      console.error('查询成绩失败:', error);
      wx.showToast({
        title: '查询成绩失败，请重试',
        icon: 'none'
      });
      this.setData({
        searchResults: [],
        hasSearched: true
      });
    } finally {
      wx.hideLoading();
    }
  },

  getScoreColor(score) {
    // 根据分数获取颜色类名
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  },

  getScoreBackground(score) {
    // 根据分数获取背景颜色类名
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  }
});