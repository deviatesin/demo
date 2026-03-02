// 训练模式页面逻辑
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
    expandedCategory: null // 当前展开的分类
  },

  onLoad() {
    // 页面加载时执行
    console.log('训练模式页面加载');
  },

  navigateBack() {
    // 返回上一页
    wx.navigateBack();
  },

  handleCategoryClick(e) {
    // 处理分类点击
    const category = e.currentTarget.dataset.category;
    
    if (category.subcategories.length > 0) {
      // 如果有子分类，切换展开状态
      this.setData({
        expandedCategory: this.data.expandedCategory === category.id ? null : category.id
      });
    } else {
      // 特殊处理：腧穴训练
      if (category.id === 'acupuncture') {
        // 跳转到穴位列表页面
        wx.navigateTo({
          url: `/pages/acupoint-list/acupoint-list`
        });
      } else {
        // 其他分类跳转到题目页面
        wx.navigateTo({
          url: `/pages/question/question?category1=${encodeURIComponent(category.name)}`
        });
      }
    }
  },

  handleSubcategoryClick(e) {
    // 处理子分类点击
    const categoryName = e.currentTarget.dataset.categoryname;
    const subcategoryName = e.currentTarget.dataset.subcategoryname;
    
    wx.navigateTo({
      url: `/pages/question/question?category1=${encodeURIComponent(categoryName)}&category2=${encodeURIComponent(subcategoryName)}`
    });
  }
});