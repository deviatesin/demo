-- 数据库创建语句
CREATE DATABASE IF NOT EXISTS tcm_exam_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用创建的数据库
USE tcm_exam_system;

-- 删除现有的表（如果存在）
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS exam_records;
DROP TABLE IF EXISTS exam_sessions;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS students;
SET FOREIGN_KEY_CHECKS = 1;

-- 学生信息表
CREATE TABLE IF NOT EXISTS students (
  studentId VARCHAR(20) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 题目表
CREATE TABLE IF NOT EXISTS questions (
  questionId VARCHAR(20) NOT NULL PRIMARY KEY,
  question LONGTEXT NOT NULL,
  category1 VARCHAR(50) NOT NULL,
  category2 VARCHAR(50),
  scoringCriteria LONGTEXT NOT NULL,
  answer LONGTEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 考试会话表
CREATE TABLE IF NOT EXISTS exam_sessions (
  sessionId VARCHAR(36) NOT NULL PRIMARY KEY,
  studentId VARCHAR(20) NOT NULL,
  examType VARCHAR(20) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  questionCount INTEGER NOT NULL,
  mode VARCHAR(20) NOT NULL,
  totalScore INTEGER,
  examTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (studentId) REFERENCES students(studentId),
  INDEX idx_student_id (studentId),
  INDEX idx_exam_time (examTime),
  INDEX idx_mode (mode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 考试记录表
CREATE TABLE IF NOT EXISTS exam_records (
  recordId VARCHAR(36) NOT NULL PRIMARY KEY,
  sessionId VARCHAR(36) NOT NULL,
  questionId VARCHAR(20) NOT NULL,
  questionContent LONGTEXT NOT NULL,
  operation1Score INTEGER,
  operation2Score INTEGER,
  operation3Score INTEGER,
  operation4Score INTEGER,
  operation5Score INTEGER,
  questionScore INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sessionId) REFERENCES exam_sessions(sessionId),
  FOREIGN KEY (questionId) REFERENCES questions(questionId),
  INDEX idx_session_id (sessionId),
  INDEX idx_question_id (questionId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入测试数据
-- 学生信息
INSERT INTO students (studentId, name) VALUES
('2021001', '张三'),
('2021002', '李四'),
('2021003', '王五') ON DUPLICATE KEY UPDATE name = VALUES(name);

-- 题目信息
INSERT INTO questions (questionId, question, category1, category2, scoringCriteria, answer) VALUES
('Q001', '请描述中医四诊法的内容', '基础理论', '诊断学', '1. 能正确描述四诊法的名称（1分）\n2. 能详细解释每种诊法的内容（各2分）\n3. 能说明四诊合参的重要性（1分）', '中医四诊法包括望、闻、问、切四种诊断方法。望诊是通过观察患者的神色、形态、舌苔等外部表现来判断病情；闻诊是通过听声音和嗅气味来了解病情；问诊是通过询问患者的症状、病史等信息来掌握病情；切诊是通过触摸患者的脉搏来判断病情。四诊合参是中医诊断的基本原则，通过综合分析四种诊法获得的信息，才能做出准确的诊断。') ON DUPLICATE KEY UPDATE question = VALUES(question), category1 = VALUES(category1), category2 = VALUES(category2), scoringCriteria = VALUES(scoringCriteria), answer = VALUES(answer);