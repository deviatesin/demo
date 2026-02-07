Page({
  data: {
    username: '',
    password: '',
    errorMessage: ''
  },

  // 处理账号输入
  handleUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 处理密码输入
  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 处理登录
  handleLogin() {
    const { username, password } = this.data;
    console.log('开始登录，账号:', username, '密码:', password);
    
    // 表单验证
    if (!username) {
      console.log('账号为空');
      this.setData({
        errorMessage: '请输入账号'
      });
      return;
    }
    
    if (!password) {
      console.log('密码为空');
      this.setData({
        errorMessage: '请输入密码'
      });
      return;
    }
    
    // 验证账号密码
    if (username === 'admin' && password === 'admin') {
      console.log('登录成功，设置登录状态');
      // 登录成功，设置登录状态并跳转到考试页面
      wx.setStorageSync('teacherLoggedIn', true);
      console.log('登录状态设置成功，准备跳转');
      wx.switchTab({
        url: '/pages/exam/exam',
        success: function(res) {
          console.log('跳转成功');
        },
        fail: function(res) {
          console.log('跳转失败:', res);
        }
      });
    } else {
      console.log('登录失败，账号或密码错误');
      // 登录失败，显示错误信息
      this.setData({
        errorMessage: '账号或密码错误'
      });
    }
  }
});