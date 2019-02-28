// pages/login/login.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    password:null
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

  },
  //按钮事件
  loginbtnclick:function(){
    app.globalData.useraccount = {userid:this.data.userid,password:this.data.password}
    //提交服务器并且返回
    //................
    wx.switchTab({
      url: '../user/user',
    })
      
  },
  //输入框赋值
  idInput:function(event){
    this.setData({ userid: event.detail.value})
  },
  pwInput:function(event){
    this.setData({ password: event.detail.value })
  }
})