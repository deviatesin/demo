const express = require('express');
const { sequelize, testConnection } = require('./config/database');
const { Student, Question, ExamSession, ExamRecord } = require('./models');
const studentRoutes = require('./routes/students');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api', studentRoutes);
app.use('/api', questionRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 初始化数据库
async function initDatabase() {
  try {
    // 测试数据库连接
    await testConnection();
    
    // 自动同步模型到数据库（开发环境）
    await sequelize.sync({ force: false });
    console.log('数据库同步完成');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

// 启动服务器
app.listen(PORT, async () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  // 初始化数据库
  await initDatabase();
});

module.exports = app;