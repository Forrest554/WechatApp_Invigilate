// pages/user_admin/wait/wait.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    checekValues:null,
  },
  chooseall:function(e)
  {
    var that = this
    // console.log(that.data.list)
   let list = that.data.list
    for (var i = 0; i < that.data.list.length;i++)
        list[i].checked =true

    that.setData({list})
  },
  checkboxChange:function(e)
  {
    var that = this
    // console.log(e.detail.value)
    let checekValues = that.data.checekValues
    checekValues = e.detail.value
    that.setData({ checekValues})
    console.log(that.data.checekValues)
  },
  submit: function (e) {
    var that = this
    console.log(that.data.checekValues)
    if (that.data.checekValues==null) //全选 直接 确定
    {
      for (var i = 0; i < that.data.list.length; i++)
      wx.request({
        url: 'https://sxtliujiguolema.xyz',
        data: {
          sql: "update find_table set examine = 1 where reqid="+that.data.list[i].id
        },
        success(res) {
          console.log(res)
        }
      })
    }
    else if (that.data.checekValues != null)
    {
      for (var i = 0; i < that.data.checekValues.length; i++)
        wx.request({
          url: 'https://sxtliujiguolema.xyz',
          data: {
            sql: "update find_table set examine = 1 where reqid=" + that.data.checekValues[i]
          },
          success(res) {
            console.log(res)
          }
        })
    }
    var options
    that.onLoad(options);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //that.setData({ userid: app.globalData.useraccount.userid })
    wx.request({
      url: 'https://sxtliujiguolema.xyz',
      data: {
        sql: "select need_table.ID,time,classroom,course,building,school,need_table.ID from  need_table,find_table  where need_table.ID=find_table.reqid and status=0 and examine = 0"
      },
      success(res) {
         console.log(res)
        let list = that.data.list
        list = []
        var obj = {}
        for (var i = 0; i < res.data.length; i++) {
          obj.num = i + 1
          obj.time = res.data[i].time
          obj.classroom = res.data[i].classroom
          obj.course = res.data[i].course
          obj.school = res.data[i].school
          obj.id = res.data[i].ID
          obj.checked = false
          list.push(obj)
          obj = {}
        }
        that.setData({ list })
        console.log(that.data.list)
      }
    })

  },
  lookInfo: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
      // 传递参数id
    })
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