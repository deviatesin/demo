// 题目页面逻辑

// 导入API服务
import { trainingApi } from './api';

Page({
  data: {
    trainingData: null,
    currentQuestion: {},
    currentIndex: 0,
    category1: '',
    category2: '',
    showAnswer: false
  },

  async onLoad(options) {
    // 页面加载时执行
    console.log('题目页面加载', options);
    
    // 获取URL参数
    const category1 = options.category1 || '';
    const category2 = options.category2 || '';
    
    this.setData({
      category1: category1,
      category2: category2
    });
    
    // 显示加载提示
    wx.showLoading({
      title: '加载题目中...'
    });
    
    try {
      // 根据分类加载训练数据
      const trainingData = await trainingApi.getTrainingData(category1, category2);
      console.log('训练数据:', trainingData);
      
      if (trainingData && trainingData.questions && trainingData.questions.length > 0) {
        this.setData({
          trainingData: trainingData,
          currentQuestion: trainingData.questions[0]
        });
      } else {
        wx.showToast({
          title: '未找到相关题目',
          icon: 'none'
        });
        this.setData({
          trainingData: null,
          currentQuestion: {}
        });
      }
    } catch (error) {
      console.error('加载题目失败:', error);
      wx.showToast({
        title: '加载题目失败，请重试',
        icon: 'none'
      });
      this.setData({
        trainingData: null,
        currentQuestion: {}
      });
    } finally {
      wx.hideLoading();
    }
  },

  navigateBack() {
    // 返回上一页
    wx.navigateBack();
  },

  toggleAnswer() {
    // 切换答案显示状态
    this.setData({
      showAnswer: !this.data.showAnswer
    });
  },

  async prevQuestion() {
    // 上一题
    if (this.data.currentIndex > 0) {
      const newIndex = this.data.currentIndex - 1;
      await this.loadQuestionByIndex(newIndex);
    }
  },

  async nextQuestion() {
    // 下一题
    if (this.data.trainingData && this.data.currentIndex < this.data.trainingData.questionCount - 1) {
      const newIndex = this.data.currentIndex + 1;
      await this.loadQuestionByIndex(newIndex);
    }
  },

  async loadQuestionByIndex(index) {
    // 根据索引加载题目
    wx.showLoading({
      title: '加载题目中...'
    });
    
    try {
      const { category1, category2 } = this.data;
      const trainingData = await trainingApi.getTrainingData(category1, category2, index + 1);
      
      if (trainingData && trainingData.questions && trainingData.questions.length > 0) {
        this.setData({
          currentIndex: index,
          currentQuestion: trainingData.questions[0],
          showAnswer: false
        });
      }
    } catch (error) {
      console.error('加载题目失败:', error);
      wx.showToast({
        title: '加载题目失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  }
});