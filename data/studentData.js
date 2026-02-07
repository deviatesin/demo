// 学生信息和成绩数据

// 学生信息数据表
export const studentInfo = [
  {
    studentId: '1522023220',
    name: 'hzh'
  },
  {
    studentId: '1522023221',
    name: '张三'
  },
  {
    studentId: '1522023222',
    name: '李四'
  }
];

// 学生成绩数据表
export const studentScores = [
  {
    examTime: '2026.1.15',
    studentId: '1522023220',
    name: 'hzh',
    examSubject: '全科',
    examScore: 99,
    question1: '请描述足三里穴的定位方法',
    question1Score: 20,
    question2: '请演示一指禅推法',
    question2Score: 18,
    question3: '请演示捻转进针法',
    question3Score: 19,
    question4: '请演示温和灸法',
    question4Score: 20,
    question5: '请演示皮肤针叩刺法',
    question5Score: 22
  }
];

// 学生信息操作函数
export const studentInfoOperations = {
  // 根据学号查询学生信息
  getStudentById: (studentId) => {
    return studentInfo.find(student => student.studentId === studentId);
  },
  
  // 添加学生信息
  addStudent: (student) => {
    studentInfo.push(student);
    return student;
  },
  
  // 获取所有学生
  getAllStudents: () => {
    return studentInfo;
  }
};

// 学生成绩操作函数
export const studentScoreOperations = {
  // 添加成绩记录
  addScore: (scoreRecord) => {
    studentScores.push(scoreRecord);
    return scoreRecord;
  },
  
  // 根据学号查询成绩
  getScoresByStudentId: (studentId) => {
    return studentScores.filter(score => score.studentId === studentId);
  },
  
  // 根据学号和姓名查询成绩
  searchByStudentInfo: (studentId, name) => {
    return studentScores.filter(score => 
      score.studentId === studentId && score.name === name
    );
  },
  
  // 获取所有成绩记录
  getAllScores: () => {
    return studentScores;
  }
};