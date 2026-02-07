// 题库数据和操作函数

// 模拟题库数据
export const questionBank = [
  {
    questionId: '001',
    question: '请描述足三里穴的定位方法',
    category1: '穴训练',
    category2: null,
    scoringCriteria: '定位准确，描述清晰',
    answer: '足三里位于小腿前外侧，当犊鼻下3寸，距胫骨前缘一横指处'
  },
  {
    questionId: '002',
    question: '请描述合谷穴的定位方法',
    category1: '穴训练',
    category2: null,
    scoringCriteria: '定位准确，描述清晰',
    answer: '合谷位于手背，第1、2掌骨间，当第二掌骨桡侧的中点处'
  },
  {
    questionId: '003',
    question: '请描述内关穴的定位方法',
    category1: '穴训练',
    category2: null,
    scoringCriteria: '定位准确，描述清晰',
    answer: '内关位于前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间'
  },
  {
    questionId: '004',
    question: '请描述百会穴的定位方法',
    category1: '穴训练',
    category2: null,
    scoringCriteria: '定位准确，描述清晰',
    answer: '百会位于头部，当前发际正中直上5寸，或两耳尖连线的中点处'
  },
  {
    questionId: '005',
    question: '请演示一指禅推法',
    category1: '推拿',
    category2: null,
    scoringCriteria: '手法正确，动作规范',
    answer: '用拇指指端、螺纹面或偏峰着力，通过腕部的摆动和拇指关节的屈伸活动'
  },
  {
    questionId: '006',
    question: '请演示捻转进针法',
    category1: '毫针、进针与行针',
    category2: '进针法',
    scoringCriteria: '进针角度正确，手法熟练',
    answer: '右手拇、食、中指持针，针尖抵于腧穴表面，利用指力及腕力，使针进入穴位内'
  },
  {
    questionId: '007',
    question: '请演示提插行针法',
    category1: '毫针、进针与行针',
    category2: '行针法',
    scoringCriteria: '提插幅度均匀，频率适中',
    answer: '将针刺入腧穴一定深度后，上提下插反复地做上下纵向运动'
  },
  {
    questionId: '008',
    question: '请演示温和灸法',
    category1: '毫针、进针与行针',
    category2: '艾灸法',
    scoringCriteria: '艾条距离适中，温度适宜',
    answer: '将艾条的一端点燃，对准应灸的腧穴部位，约距皮肤2-3cm进行熏烤'
  },
  {
    questionId: '009',
    question: '请演示皮肤针叩刺法',
    category1: '毫针、进针与行针',
    category2: '皮肤针',
    scoringCriteria: '叩刺力度均匀，节奏稳定',
    answer: '运用灵活的腕力，垂直叩刺在皮肤上，然后立即弹起，如此反复进行'
  },
  {
    questionId: '010',
    question: '请演示三棱针点刺法',
    category1: '毫针、进针与行针',
    category2: '三棱针',
    scoringCriteria: '点刺准确，出血适量',
    answer: '用三棱针对准腧穴或反应点，快速刺入，迅速出针，挤出少量血液'
  }
];

// 题库操作函数
export const questionBankOperations = {
  // 根据目录搜索题目
  searchByCategory: (category1, category2 = null) => {
    return questionBank.filter(q => {
      if (category2) {
        return q.category1 === category1 && q.category2 === category2;
      }
      return q.category1 === category1;
    });
  },
  
  // 根据题目ID获取题目
  getQuestionById: (questionId) => {
    return questionBank.find(q => q.questionId === questionId);
  },
  
  // 添加新题目
  addQuestion: (question) => {
    questionBank.push(question);
    return question;
  },
  
  // 获取所有题目
  getAllQuestions: () => {
    return questionBank;
  },
  
  // 获取随机题目
  getRandomQuestions: (category, count = 1) => {
    const categoryQuestions = questionBank.filter(q => q.category1 === category);
    
    if (categoryQuestions.length === 0) {
      return [];
    }
    
    if (count >= categoryQuestions.length) {
      return [...categoryQuestions];
    }
    
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};