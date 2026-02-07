const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 学生信息表模型
const Student = sequelize.define('Student', {
  studentId: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'students',
  timestamps: true,
  underscored: false
});

// 题目表模型
const Question = sequelize.define('Question', {
  questionId: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  question: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  category1: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  category2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  scoringCriteria: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  }
}, {
  tableName: 'questions',
  timestamps: true,
  underscored: false
});

// 考试会话表模型
const ExamSession = sequelize.define('ExamSession', {
  sessionId: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  studentId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: Student,
      key: 'studentId'
    }
  },
  examType: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  questionCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mode: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  examTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'exam_sessions',
  timestamps: true,
  underscored: false,
  indexes: [
    { name: 'idx_student_id', fields: ['studentId'] },
    { name: 'idx_exam_time', fields: ['examTime'] },
    { name: 'idx_mode', fields: ['mode'] }
  ]
});

// 考试记录表模型
const ExamRecord = sequelize.define('ExamRecord', {
  recordId: {
    type: DataTypes.STRING(36),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  sessionId: {
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: ExamSession,
      key: 'sessionId'
    }
  },
  questionId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: Question,
      key: 'questionId'
    }
  },
  questionContent: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  operation1Score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  operation2Score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  operation3Score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  operation4Score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  operation5Score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  questionScore: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'exam_records',
  timestamps: true,
  underscored: false,
  indexes: [
    { name: 'idx_session_id', fields: ['sessionId'] },
    { name: 'idx_question_id', fields: ['questionId'] }
  ]
});

// 定义关联关系
ExamSession.belongsTo(Student, { foreignKey: 'studentId' });
ExamRecord.belongsTo(ExamSession, { foreignKey: 'sessionId' });
ExamRecord.belongsTo(Question, { foreignKey: 'questionId' });

module.exports = {
  Student,
  Question,
  ExamSession,
  ExamRecord
};