const express = require('express');
const router = express.Router();
const { Question } = require('../models');

// 根据分类获取题目
router.get('/questions', async (req, res) => {
  try {
    const { category1, category2 } = req.query;
    
    // 构建查询条件
    const where = {};
    
    if (category1) {
      where.category1 = category1;
    }
    
    if (category2) {
      where.category2 = category2;
    }
    
    // 查询题目
    const questions = await Question.findAll({ where });
    
    res.json(questions);
  } catch (error) {
    console.error('查询题目失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 获取所有题目
router.get('/questions/all', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.error('查询所有题目失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 根据分类获取随机题目
router.get('/questions/random', async (req, res) => {
  try {
    const { category1, category2, count = 5 } = req.query;
    
    // 构建查询条件
    const where = {};
    
    if (category1) {
      where.category1 = category1;
    }
    
    if (category2) {
      where.category2 = category2;
    }
    
    // 查询题目
    const questions = await Question.findAll({ where });
    
    // 随机排序并取指定数量
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const randomQuestions = shuffled.slice(0, parseInt(count));
    
    res.json(randomQuestions);
  } catch (error) {
    console.error('获取随机题目失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;