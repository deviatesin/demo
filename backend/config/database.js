const { Sequelize } = require('sequelize');

// 创建Sequelize实例
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'tcm_exam_system',
  logging: console.log,
  define: {
    timestamps: true,
    underscored: true
  }
});

// 测试数据库连接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

module.exports = {
  sequelize,
  testConnection
};