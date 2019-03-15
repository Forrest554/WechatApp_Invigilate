// pages/fillin/fillin.js
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    school:[
      '朝晖校区',
      '屏峰校区'
    ],
    building:[
      '子良楼',
      '广知楼',
      '健行楼',
      '博易楼',
      '畅远楼',
      '仁和楼',
      '郁文楼',
      '语林楼',
      '法学楼',
      '计算机大楼',
      '机械大楼',
      '建筑大楼',
      '艺术大楼',
      '信息大楼'
    ],
    time: '12:01',
    date: '2019-03-04',
    schoolindex:0,
    buildingindex:0,
    ifForeign:false
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
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      schoolindex: e.detail.value
    })
  },
  BuildingPickerChange(e) {
    console.log(e);
    this.setData({
      buildingindex: e.detail.value
    })
  },
  switchChange(e){
    console.log(e);
    this.setData({

    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)//.inputDate + ' '+e.detail.value.inputTime);
    wx.request({
      url: 'https://sxtliujiguolema.xyz',
      data: {
        sql: "insert into need_table(course,classname,class_form,class_teacher,time,school,foreign1,yjs_num,building,classroom,stu_num,exam_teacher,issue_id) values ('" + e.detail.value.inputCourse + "','" + e.detail.value.inputClassName + "','" + e.detail.value.inputClassForm + "','" + e.detail.value.inputClassTeacher + "','" + e.detail.value.inputDate + ' ' + e.detail.value.inputTime + "','" + e.detail.value.inputSchool + "'," + e.detail.value.inputIfForeign + "," + parseInt(e.detail.value.inputYjsNum) + ",'" + e.detail.value.inputBuilding + "','" + e.detail.value.inputExamClass + "'," + e.detail.value.inputExamNum + ",'" + e.detail.value.inputExamTeacher + "','issue_id')",
      },
      success(res) {
        console.log("请求成功");
        wx.request({
          url: 'https://sxtliujiguolema.xyz',
          data: {
            sql: "insert into find_table(reqid,hasnum) values (" + res.data.insertId + ",0)"
          },
          success(result) {
            console.log(result);
            if (result.data.insertId != '' && result.data.insertId != 0) {
              wx.showToast({
                title: '提交成功！',
                duration: 1000,
                success() {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              })
            }
          },
          complete() {

          }
        })
        console.log(res);
      },
      fail() {
        wx.showToast({
          title: '输入信息有误，请检查',
        })
        //console.log(this.data.sql);
      }
    })
  }
})