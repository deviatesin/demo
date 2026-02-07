// 题目页面逻辑

// 导入API服务
import { questionApi } from '../../services/api';

// 题库操作函数
const questionBankOperations = {
  // 根据目录搜索题目
  async searchByCategory(category1, category2 = null) {
    try {
      const questions = await questionApi.getQuestionsByCategory(category1, category2);
      return questions;
    } catch (error) {
      console.error('根据分类获取题目失败:', error);
      return [];
    }
  },
  
  // 获取所有题目
  async getAllQuestions() {
    try {
      const questions = await questionApi.getAllQuestions();
      return questions;
    } catch (error) {
      console.error('获取题目失败:', error);
      return [];
    }
  }
};

Page({
  data: {
    questions: [],
    currentIndex: 0,
    currentQuestion: {},
    category1: '',
    category2: ''
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
      // 根据分类加载题目
      const questions = await questionBankOperations.searchByCategory(category1, category2);
      
      if (questions.length > 0) {
        this.setData({
          questions: questions,
          currentQuestion: questions[0]
        });
      } else {
        // 如果没有找到题目，显示所有题目
        const allQuestions = await questionBankOperations.getAllQuestions();
        if (allQuestions.length > 0) {
          this.setData({
            questions: allQuestions,
            currentQuestion: allQuestions[0]
          });
        } else {
          this.setData({
            questions: [],
            currentQuestion: {}
          });
        }
      }
    } catch (error) {
      console.error('加载题目失败:', error);
      wx.showToast({
        title: '加载题目失败，请重试',
        icon: 'none'
      });
      this.setData({
        questions: [],
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

  prevQuestion() {
    // 上一题
    if (this.data.currentIndex > 0) {
      const newIndex = this.data.currentIndex - 1;
      this.setData({
        currentIndex: newIndex,
        currentQuestion: this.data.questions[newIndex]
      });
    }
  },

  nextQuestion() {
    // 下一题
    if (this.data.currentIndex < this.data.questions.length - 1) {
      const newIndex = this.data.currentIndex + 1;
      this.setData({
        currentIndex: newIndex,
        currentQuestion: this.data.questions[newIndex]
      });
    }
  }
});