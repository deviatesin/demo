const { sequelize } = require('./backend/config/database');
const { Test } = require('./backend/models');

(async () => {
  try {
    // 连接数据库
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 检查"腧穴训练"分类的题目数量
    const count = await Test.count({ where: { '一级目录': '腧穴训练' } });
    console.log('腧穴训练分类的题目数量:', count);

    // 检查所有分类的题目数量
    const allCategories = await Test.findAll({
      attributes: ['一级目录', [sequelize.fn('COUNT', sequelize.col('questionId')), 'count']],
      group: ['一级目录']
    });
    console.log('所有分类的题目数量:');
    allCategories.forEach(category => {
      console.log(`${category.get('一级目录')}: ${category.get('count')}`);
    });

    // 关闭数据库连接
    await sequelize.close();
  } catch (error) {
    console.error('检查数据库失败:', error);
    // 确保关闭数据库连接
    if (sequelize) {
      await sequelize.close();
    }
  }
})();