// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    useraccount:null,
    power:null
  },
  jmp_stu:function(event){
    if (app.globalData.power  == 1)
    wx.navigateTo({
      url: '/pages/user_stu/user_stu',
    })
    else{
      wx.showToast({
        title: '您没有访问权限',
        icon:'none',
        duration: 1000
      })
      
    }
  },
  jmp_tea: function (event) {
    if (app.globalData.power == 2)
      wx.navigateTo({
        url: '/pages/user_teacher/user_teacher',
      })
    else {
      wx.showToast({
        title: '您没有访问权限',
        icon: 'none',
        duration: 1000
      })
    }
  },
  jmp_admin: function (event) {
    if (app.globalData.power == 3)
      wx.navigateTo({
        url: '/pages/user_admin/user_admin',
      })
    else {
      wx.showToast({
        title: '您没有访问权限',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (app.globalData.useraccount == null){
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      this.setData({ useraccount: app.globalData.useraccount}),
        this.setData({ power: app.globalData.power })
      //console.log(power)
     // console.log(app.globalData.power)
      
    }
    
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
    if (app.globalData.useraccount != null){
      this.setData({
      userInfo: app.globalData.userInfo,
    });}
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