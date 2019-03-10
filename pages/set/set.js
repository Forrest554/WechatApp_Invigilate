// pages/set/set.js
import Dialog from '../miniprogram_npm/vant-weapp/dialog/dialog';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    infoshow: false,
    infomodishow: false,
    newphone: '',
    oripwd: '',
    oripwd2: '',
    newpwd: '',
    list: [],
    tablename: null
  },
  //infoshow
  infoShow: function(e) {
    var that = this
    that.setData({
      infoshow: true
    })
    if (app.globalData.power == 1) {
      that.setData({
        tablename: "student_table"
      })
    } else if (app.globalData.power == 2) {
      that.setData({
        tablename: "teacher_table"
      })
    } else if (app.globalData.power == 3) {
      that.setData({
        tablename: "admin_table"
      })
    }
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select * from  " + that.data.tablename + " where ID= '" + app.globalData.useraccount.userid + "'"
      },
      success(res) {
        console.log(res)
        let list = that.data.list
        list = [];
        list = res.data[0]
        that.setData({
          list
        })
        console.log(that.data.list)
      }
    })
    that.setData({
      infoshow: true
    })
  },
  infoConfirm: function() {
    this.setData({
      infoshow: false
    })
  },
  //infomodi
  getNewphone: function(e) {
    var that = this
    that.setData({
      newphone: e.detail
    })
  },
  infoModi: function(e) {
    var that = this
    that.setData({
      infomodishow: true
    })
  },
  infomodiClose: function() {
    this.setData({
      infomodishow: false
    })
  },
  infomodiConfirm: function(e) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "update  " + that.data.tablename + " set phone ='" + that.data.newphone + "'where ID= '" + app.globalData.useraccount.userid + "'"
      },
      success(res) {
        console.log(res)
      }
    })

    that.setData({
      infomodishow: false
    })
  },
  //pwd
  pwdModi: function() {
    this.setData({
      show: true
    })
  },
  getori: function(e) {
    var that = this
    that.setData({
      oripwd: e.detail
    })
    //console.log(e.detail);
  },
  getori2: function(e) {
    var that = this
    that.setData({
      oripwd2: e.detail
    })
  },
  getnew: function(e) {
    var that = this
    that.setData({
      newpwd: e.detail
    })
  },
  pwdClose: function() {
    this.setData({
      show: false
    })
  },
  pdwConfirm: function(e) {
    var that = this
    //that.setData({ show: false })
    console.log(that.data.oripwd, that.data.oripwd2)
    if (that.data.oripwd != that.data.oripwd2)
      wx.showToast({
        title: '两次密码不同',
        icon: 'none',
        duration: 2000
      })
    else {
      if (that.data.oripwd != app.globalData.useraccount.password) {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 2000
        })
      } else {
        if (app.globalData.power == 1)
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: "update student_table set pwd =" + "'" + that.data.newpwd + "'" + "where id='" + app.globalData.useraccount.userid + "'"
            },
            success(res) {
              console.log(res.data);
            }
          })
        if (app.globalData.power == 2)
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: "update teacher_table set pwd =" + "'" + that.data.newpwd + "'" + "where id='" + app.globalData.useraccount.userid + "'"
            },
            success(res) {
              console.log(res.data);
            }
          })
        if (app.globalData.power == 3)
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: "update admin_table set pwd =" + "'" + that.data.newpwd + "'" + "where id='" + app.globalData.useraccount.userid + "'"
            },
            success(res) {
              console.log(res.data);
            }
          })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})