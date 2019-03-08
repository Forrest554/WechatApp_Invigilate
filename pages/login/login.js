// pages/login/login.js
import Toast from '../miniprogram_npm/vant-weapp/toast/toast';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    password:null,
    useraccount:null,
    show: false
  },
  onClose() {
    this.setData({ show: false });
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
    // 
    //useraccount = { userid: this.data.userid, password: this.data.password }
    // console.log(app.globalData.useraccount.userid, app.globalData.useraccount.password)
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "SELECT id ,pwd FROM student_table WHERE id= '" + that.data.userid + "' and pwd= '" + that.data.password + "' union SELECT id , pwd FROM teacher_table where id= '" + that.data.userid + "' and pwd= '" + that.data.password + "' union SELECT id ,pwd FROM admin_table where id= '" + that.data.userid + "' and pwd= '" + that.data.password + "'"},
      success(res) {
        console.log(res.data);
        if(res.data.length==0){
          console.log("fail")
          Toast.fail('账号或密码错误!');
         // that.setData({show:true})
        }else{
          app.globalData.useraccount = { 
            userid: res.data[0].id,
            password: res.data[0].pwd };
          //  console.log(app.globalData.useraccount.userid);
          if (res.data[0].id[0] == 'a') app.globalData.power = 3;
          if (res.data[0].id[0] == 'T') app.globalData.power = 2;
        //  console.log(app.globalData.power);
          wx.switchTab({
            url: '../user/user',
          })
        }
      }
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