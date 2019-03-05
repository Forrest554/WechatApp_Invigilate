// pages/all/all.js
var that
var list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0],
    multiArray: [['屏峰校区', '朝晖校区'], ['广之楼', '博易楼','仁和楼']],
    objectMultiArray:
      [
        { "regid": "10", "parid": "1", "regname": "屏峰校区", "regtype": "1", "ageid": "0" }, 
        { "regid": "11", "parid": "1", "regname": "朝晖校区", "regtype": "1", "ageid": "0" },
         { "regid": "3", "parid": "10", "regname": "广之楼", "regtype": "2", "ageid": "0" },
        { "regid": "4", "parid": "10", "regname": "博易楼", "regtype": "2", "ageid": "0" },
        { "regid": "5", "parid": "10", "regname": "仁和楼", "regtype": "2", "ageid": "0" },
        { "regid": "6", "parid": "11", "regname": "子良楼", "regtype": "2", "ageid": "0" },
        { "regid": "7", "parid": "11", "regname": "综合楼", "regtype": "2", "ageid": "0" }
        ]

  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[values[0]]);
  },
  bindMultiPickerChange: function (e) {
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
  },
  bindMultiPickerColumnChange: function (e) {
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            list.push(that.data.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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