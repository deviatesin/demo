// pages/exam/exam-questions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取eventChannel
    const eventChannel = this.getOpenerEventChannel();
    
    // 监听examData事件，接收从exam页面传递的数据
    eventChannel.on('examData', (data) => {
      console.log('接收考试数据:', data);
      this.setData({
        examData: data.examData
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})