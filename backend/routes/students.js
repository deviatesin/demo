const express = require('express');
const router = express.Router();
const { Student } = require('../models');

// 根据学号查询学生姓名
router.get('/students/name', async (req, res) => {
  try {
    const { studentId } = req.query;
    
    if (!studentId) {
      return res.status(400).json({ error: '请提供学生学号' });
    }
    
    const student = await Student.findOne({ where: { studentId } });
    
    if (!student) {
      return res.status(404).json({ error: '未找到该学生' });
    }
    
    res.json({ studentId: student.studentId, name: student.name });
  } catch (error) {
    console.error('查询学生信息失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;