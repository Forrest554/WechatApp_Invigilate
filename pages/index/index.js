Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: '1',
    lata:null,
    imgUrls: [
      '/pages/image/zjut_flower.jpg',
      '/pages/image/zjut_flower2.jpg',
      '/pages/image/zjut_autumn.jpg',
      '/pages/image/zjut_snow.jpg'
    ] 
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
      
    });
    console.log(event.detail);
    console.log(activeNames);
  },
    
    /*
    if (event.detail == 0) wx.redirectTo({
      url: '../index/index',
    })
    if (event.detail == 1) wx.redirectTo({
      url: '../all/all',
    })
    if (event.detail == 2) wx.redirectTo({
      url: '../user/user',
    })*/
  
  request:function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: 'select * from student',
      },
      success(res) {
        console.log(res.data);
        that.setData({
          lati: res.data
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})