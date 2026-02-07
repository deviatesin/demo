// API服务封装 - 调用后端接口

// 后端服务基础URL
const BASE_URL = 'http://120.26.23.30:3000/api';

// 封装HTTP请求函数
const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(res.data.error || '请求失败'));
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};

// 学生相关API
export const studentApi = {
  // 获取所有学生
  getAllStudents: async () => {
    try {
      // 这里可以添加获取所有学生的接口调用
      // 目前后端未实现此接口，暂时返回空数组
      return [];
    } catch (error) {
      console.error('获取学生列表失败:', error);
      throw error;
    }
  },
  
  // 根据学号获取学生
  getStudentById: async (studentId) => {
    try {
      const res = await request(`/students/name?studentId=${studentId}`);
      return res;
    } catch (error) {
      console.error('获取学生信息失败:', error);
      throw error;
    }
  },
  
  // 根据复杂条件查询学生
  getStudentByFilter: async (filter) => {
    try {
      // 从复杂条件中提取studentId
      let studentId = '';
      if (filter && filter.where && filter.where.$and) {
        for (const condition of filter.where.$and) {
          if (condition.studentId && condition.studentId.$eq) {
            studentId = condition.studentId.$eq;
            break;
          }
        }
      }
      
      if (studentId) {
        const res = await request(`/students/name?studentId=${studentId}`);
        return res;
      }
      return null;
    } catch (error) {
      console.error('根据条件查询学生失败:', error);
      throw error;
    }
  }
};

// 题目相关API
export const questionApi = {
  // 获取所有题目
  getAllQuestions: async () => {
    try {
      const res = await request('/questions/all');
      return res;
    } catch (error) {
      console.error('获取题目列表失败:', error);
      throw error;
    }
  },
  
  // 根据分类获取题目
  getQuestionsByCategory: async (category1, category2 = null) => {
    try {
      let url = `/questions?category1=${encodeURIComponent(category1)}`;
      if (category2) {
        url += `&category2=${encodeURIComponent(category2)}`;
      }
      const res = await request(url);
      return res;
    } catch (error) {
      console.error('根据分类获取题目失败:', error);
      throw error;
    }
  }
};

// 成绩相关API
export const scoreApi = {
  // 获取所有成绩
  getAllScores: async () => {
    try {
      // 这里可以添加获取所有成绩的接口调用
      // 目前后端未实现此接口，暂时返回空数组
      return [];
    } catch (error) {
      console.error('获取成绩列表失败:', error);
      throw error;
    }
  },
  
  // 根据学号和姓名获取成绩
  getScoresByStudent: async (studentId, name) => {
    try {
      // 这里可以添加根据学号和姓名获取成绩的接口调用
      // 目前后端未实现此接口，暂时返回空数组
      return [];
    } catch (error) {
      console.error('获取学生成绩失败:', error);
      throw error;
    }
  }
};

// 健康检查API
export const healthApi = {
  // 检查服务状态
  checkHealth: async () => {
    try {
      // 调用后端健康检查接口
      const res = await request('/../health');
      return res;
    } catch (error) {
      console.error('健康检查失败:', error);
      throw error;
    }
  }
};