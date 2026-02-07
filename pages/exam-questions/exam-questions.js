// 考试题目页面逻辑
Page({
  data: {
    examData: {},
    questions: [],
    currentIndex: 0,
    currentQuestion: {}
  },

  onLoad() {
    // 页面加载时执行
    console.log('考试题目页面加载');
    
    // 获取从考试模式页面传递的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('examData', (data) => {
      console.log('接收到考试数据:', data);
      this.setData({
        examData: data.examData,
        questions: data.examData.questions,
        currentQuestion: data.examData.questions[0]
      });
    });
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
  },

  submitExam() {
    // 提交考试
    wx.showModal({
      title: '提交考试',
      content: '确定要提交考试吗？提交后将无法修改。',
      success: (res) => {
        if (res.confirm) {
          // 模拟考试提交成功
          wx.showToast({
            title: '考试提交成功',
            icon: 'success',
            duration: 2000
          });
          
          // 延迟返回首页
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 2000);
        }
      }
    });
  }
});