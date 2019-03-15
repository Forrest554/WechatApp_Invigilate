// pages/user_teacher/view/view.js
// pages/user_stu/ing/ing.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userid: null,

  },
  lookInfo: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
      // 传递参数id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ userid: app.globalData.useraccount.userid })
    wx.request({
      url: 'https://sxtliujiguolema.xyz',
      data: {
        sql: "select time,classroom,course,building,school,need_table.ID from  need_table,find_table  where need_table.ID=find_table.reqid and status=0 and examine = 1 and issue_id = '" + that.data.userid+"'"
      },
      success(res) {
        // console.log(res)
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
          list.push(obj)
          obj = {}
        }
        that.setData({ list })
        console.log(that.data.list)
      }
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
    this.onLoad();
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