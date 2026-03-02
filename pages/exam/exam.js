// 考试模式页面逻辑

// 导入API服务
import { studentApi, questionApi } from './api';

// 题库操作函数
const questionBankOperations = {
  // 从后端获取题目
  async getAllQuestions() {
    try {
      const questions = await questionApi.getAllQuestions();
      return questions;
    } catch (error) {
      console.error('获取题目失败:', error);
      return [];
    }
  },
  
  // 根据目录搜索题目
  async searchByCategory(category1, category2 = null) {
    try {
      const questions = await questionApi.getQuestionsByCategory(category1, category2);
      return questions;
    } catch (error) {
      console.error('根据分类获取题目失败:', error);
      return [];
    }
  },
  
  // 获取随机题目
  async getRandomQuestions(category1, category2 = null, count = 1) {
    try {
      const questions = await questionApi.getRandomQuestions(category1, category2, count);
      return questions;
    } catch (error) {
      console.error('获取随机题目失败:', error);
      return [];
    }
  },
  
  // 获取专项考试题目
  async getSpecializedExamQuestions(category1, category2 = null, count = 5) {
    try {
      const questions = await questionApi.getSpecializedExamQuestions(category1, category2, count);
      return questions;
    } catch (error) {
      console.error('获取专项考试题目失败:', error);
      return [];
    }
  }
};

// 学生信息操作函数
const studentInfoOperations = {
  // 根据学号查询学生信息
  async getStudentById(studentId) {
    try {
      // 使用复杂查询条件，符合用户提供的代码示例
      const filter = {
        where: {
          $and: [
            {
              studentId: {
                $eq: studentId, // 推荐传入studentId数据标识进行操作
              },
            },
          ]
        }
      };
      
      const student = await studentApi.getStudentByFilter(filter);
      return student;
    } catch (error) {
      console.error('获取学生信息失败:', error);
      return null;
    }
  }
};

Page({
  data: {
    // 训练分类数据
    trainingCategories: [
      {
        id: 'needle',
        name: '毫针、进针与行针',
        subcategories: [
          { id: 'needle_method', name: '进针法' },
          { id: 'manipulation', name: '行针法' },
          { id: 'reinforcing_reducing', name: '补泻手法' },
          { id: 'abnormal_handling', name: '异常情况处理' }
        ]
      },
      {
        id: 'moxibustion',
        name: '艾灸法',
        subcategories: []
      },
      {
        id: 'skin_needle',
        name: '皮肤针',
        subcategories: []
      },
      {
        id: 'three_edge_needle',
        name: '三棱针',
        subcategories: []
      },
      {
        id: 'massage',
        name: '推拿法',
        subcategories: [
          { id: 'rolling', name: '㨰法' },
          { id: 'kneading', name: '揉法' },
          { id: 'pressing', name: '按法' },
          { id: 'pushing', name: '推法' },
          { id: 'grasping', name: '拿法' },
          { id: 'spine_pinching', name: '捏脊法' }
        ]
      },
      {
        id: 'cupping',
        name: '拔罐法',
        subcategories: []
      },
      {
        id: 'acupuncture',
        name: '腧穴训练',
        subcategories: []
      }
    ],
    
    // 页面状态
    selectedMode: null, // 选择的考试模式
    showCategorySelection: false, // 是否显示分类选择
    showStudentForm: false, // 是否显示学生表单
    showConfirmation: false, // 是否显示确认信息
    expandedCategory: null, // 当前展开的分类
    selectedCategory: null, // 选择的分类
    selectedSubcategory: null, // 选择的子分类
    studentId: '', // 学生学号
    questionCount: 5, // 题目数量
    examDuration: 30, // 考试时长（分钟）
    examData: null // 考试数据
  },

  onLoad() {
    // 页面加载时执行
    console.log('考试模式页面加载');
    
    // 检查登录状态
    const teacherLoggedIn = wx.getStorageSync('teacherLoggedIn');
    console.log('登录状态检查:', teacherLoggedIn);
    if (!teacherLoggedIn) {
      // 未登录，跳转到登录页面
      console.log('未登录，跳转到登录页面');
      wx.redirectTo({
        url: '/pages/teacher-login/teacher-login'
      });
    } else {
      console.log('已登录，进入考试页面');
    }
  },

  

  handleModeSelect(e) {
    // 处理考试模式选择
    const mode = e.currentTarget.dataset.mode;
    this.setData({
      selectedMode: mode
    });
    
    if (mode === 'specialized') {
      this.setData({
        showCategorySelection: true
      });
    } else {
      this.setData({
        showStudentForm: true
      });
    }
  },

  cancelCategorySelection() {
    // 取消分类选择
    this.setData({
      showCategorySelection: false,
      selectedMode: null
    });
  },

  handleCategorySelect(e) {
    // 处理分类选择
    const category = e.currentTarget.dataset.category;
    
    if (category.subcategories.length > 0) {
      // 如果有子分类，切换展开状态
      this.setData({
        expandedCategory: this.data.expandedCategory === category.id ? null : category.id
      });
    } else {
      // 如果没有子分类，直接设置选择的分类并显示学生表单
      this.setData({
        selectedCategory: category,
        showCategorySelection: false,
        showStudentForm: true
      });
    }
  },

  handleSubcategorySelect(e) {
    // 处理子分类选择
    const subcategory = e.currentTarget.dataset.subcategory;
    
    this.setData({
      selectedSubcategory: subcategory,
      showCategorySelection: false,
      showStudentForm: true
    });
  },

  backToPrevious() {
    // 返回选择考试类型界面
    this.setData({
      showStudentForm: false,
      showCategorySelection: false,
      showConfirmation: false,
      selectedMode: null,
      selectedCategory: null,
      selectedSubcategory: null
    });
  },

  handleStudentIdChange(e) {
    // 处理学生学号输入
    this.setData({
      studentId: e.detail.value
    });
  },

  handleQuestionCountChange(e) {
    // 处理题目数量输入
    const value = e.detail.value;
    if (value === '') {
      // 允许输入为空
      this.setData({
        questionCount: ''
      });
    } else {
      // 转换为整数，如果转换失败则使用默认值 5
      const count = parseInt(value) || 5;
      this.setData({
        questionCount: count
      });
    }
  },

  handleExamDurationChange(e) {
    // 处理考试时长输入
    const value = e.detail.value;
    if (value === '') {
      // 允许输入为空
      this.setData({
        examDuration: ''
      });
    } else {
      // 转换为整数，如果转换失败则使用默认值 30
      const duration = parseInt(value) || 30;
      this.setData({
        examDuration: duration
      });
    }
  },

  async handleStudentFormSubmit() {
    // 处理学生表单提交
    const studentId = this.data.studentId.trim();
    
    if (!studentId) {
      wx.showToast({
        title: '请输入学生学号',
        icon: 'none'
      });
      return;
    }
    
    // 验证题目数量
    if (this.data.selectedMode === 'specialized') {
      const questionCount = this.data.questionCount;
      if (questionCount === '' || isNaN(questionCount) || questionCount < 1 || questionCount > 20) {
        wx.showToast({
          title: '请输入有效的题目数量（1-20）',
          icon: 'none'
        });
        return;
      }
    }

    // 验证考试时长
    const examDuration = this.data.examDuration;
    if (examDuration === '' || isNaN(examDuration) || examDuration < 5 || examDuration > 120) {
      wx.showToast({
        title: '请输入有效的考试时长（5-120分钟）',
        icon: 'none'
      });
      return;
    }

    // 显示加载提示
    wx.showLoading({
      title: '获取学生信息...'
    });

    try {
      const student = await studentInfoOperations.getStudentById(studentId);
      if (!student) {
        wx.showToast({
          title: '未找到该学号对应的学生信息',
          icon: 'none'
        });
        return;
      }

      // 准备考试数据
      const getSubjectName = () => {
        if (this.data.selectedMode === 'specialized') {
          if (this.data.selectedSubcategory && this.data.selectedSubcategory.name) {
            return this.data.selectedSubcategory.name;
          }
          if (this.data.selectedCategory && this.data.selectedCategory.name) {
            return this.data.selectedCategory.name;
          }
          return '未知科目';
        }
        return '全科';
      };

      const data = {
        studentId: student.studentId,
        studentName: student.name,
        examType: this.data.selectedMode,
        subject: getSubjectName(),
        questionCount: this.data.selectedMode === 'specialized' ? this.data.questionCount : 5,
        examDuration: this.data.examDuration
      };

      this.setData({
        examData: data,
        showStudentForm: false,
        showConfirmation: true
      });
    } catch (error) {
      console.error('处理学生表单提交失败:', error);
      wx.showToast({
        title: '获取学生信息失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  resetForm() {
    // 重置表单
    this.setData({
      selectedMode: null,
      showCategorySelection: false,
      showStudentForm: false,
      showConfirmation: false,
      selectedCategory: null,
      selectedSubcategory: null,
      studentId: '',
      questionCount: 5,
      examDuration: 30,
      examData: null
    });
  },

  backToStudentForm() {
    // 返回学生表单
    this.setData({
      showConfirmation: false,
      showStudentForm: true
    });
  },

  async handleConfirmation() {
    // 处理确认开始考试
    const examData = this.data.examData;
    if (!examData) return;

    // 显示加载提示
    wx.showLoading({
      title: '生成考试题目...'
    });

    try {
      let questions = [];

      if (examData.examType === 'specialized') {
        // 专项考试：从指定分类中抽取题目
        const category1 = this.data.selectedCategory ? this.data.selectedCategory.name : '';
        const category2 = this.data.selectedSubcategory ? this.data.selectedSubcategory.name : null;
        
        if (!category1) {
          wx.showToast({
            title: '考试分类信息不完整，请重新选择',
            icon: 'none'
          });
          return;
        }
        
        // 使用新的专项考试接口获取题目
        questions = await questionBankOperations.getSpecializedExamQuestions(category1, category2, examData.questionCount);
        
        if (questions.length === 0) {
          wx.showToast({
            title: '该分类下没有可用题目，请选择其他分类',
            icon: 'none'
          });
          return;
        }
      } else {
        // 模拟考试：按照五种规则之一抽取题目
        const ruleIndex = Math.floor(Math.random() * 5); // 随机选择一种规则
        
        switch (ruleIndex) {
          case 0: // 4个毫针题目+1个推拿手法
            questions = [
              ...(await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 4)),
              ...(await questionBankOperations.getRandomQuestions('推拿法', null, 1))
            ];
            break;
          case 1: // 4个毫针题目+1种进针法+1种行针法
            const needleQuestions = await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 2);
            questions = [
              ...(await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 4)),
              ...needleQuestions.filter(q => 
                q.category2 === '进针法' || q.category2 === '行针法'
              )
            ];
            break;
          case 2: // 4个毫针题目+1种灸法
            const moxibustionQuestions = await questionBankOperations.getRandomQuestions('艾灸法', null, 1);
            questions = [
              ...(await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 4)),
              ...moxibustionQuestions
            ];
            break;
          case 3: // 4个毫针题目+1种皮肤针
            const skinNeedleQuestions = await questionBankOperations.getRandomQuestions('皮肤针', null, 1);
            questions = [
              ...(await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 4)),
              ...skinNeedleQuestions
            ];
            break;
          case 4: // 4个毫针题目+1种三棱针
            const threeEdgeNeedleQuestions = await questionBankOperations.getRandomQuestions('三棱针', null, 1);
            questions = [
              ...(await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 4)),
              ...threeEdgeNeedleQuestions
            ];
            break;
          default:
            questions = await questionBankOperations.getRandomQuestions('毫针、进针与行针', null, 5);
        }
      }

      if (questions.length === 0) {
        wx.showToast({
          title: '无法生成考试题目，请重试',
          icon: 'none'
        });
        return;
      }

      // 跳转到考试题目页面
      wx.navigateTo({
        url: `/pages/exam/exam-questions`,
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('examData', {
            examData: {
              ...examData,
              questions: questions
            }
          });
        }
      });
    } catch (error) {
      console.error('生成考试题目失败:', error);
      wx.showToast({
        title: '生成考试题目失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  }
});