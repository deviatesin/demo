// 训练模式页面逻辑
Page({
  data: {
    // 训练分类数据
    trainingCategories: [
      {
        id: 'acupuncture',
        name: '穴训练',
        subcategories: []
      },
      {
        id: 'massage',
        name: '推拿',
        subcategories: []
      },
      {
        id: 'needle',
        name: '毫针、进针与行针',
        subcategories: [
          { id: 'needle_method', name: '进针法' },
          { id: 'manipulation', name: '行针法' },
          { id: 'moxibustion', name: '艾灸法' },
          { id: 'skin_needle', name: '皮肤针' },
          { id: 'three_edge_needle', name: '三棱针' }
        ]
      },
      {
        id: 'cupping',
        name: '拔罐',
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
      // 如果没有子分类，直接跳转到题目页面
      wx.navigateTo({
        url: `/pages/question/question?category1=${encodeURIComponent(category.name)}`
      });
    }
  },

  handleSubcategoryClick(e) {
    // 处理子分类点击
    const categoryName = e.currentTarget.dataset.categoryName;
    const subcategoryName = e.currentTarget.dataset.subcategoryName;
    
    wx.navigateTo({
      url: `/pages/question/question?category1=${encodeURIComponent(categoryName)}&category2=${encodeURIComponent(subcategoryName)}`
    });
  }
});