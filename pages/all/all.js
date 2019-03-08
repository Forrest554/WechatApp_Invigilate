// pages/all/all.js
const citys = {
  '屏峰校区': ['广之楼', '博易楼', '仁和楼'],
  '朝晖校区': ['子良楼', '综合楼']
};
var that
Page({
  /**
   * 页面33
   */
  data: {
    show: false,
    choice:null,
    columns: [
      {
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['屏峰校区'],
        className: 'column2',
        defaultIndex: 2
      }
    ],
      time:null
  },
  pop_show(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  }, onConfirm(event) {
    var that = this;
    //const { picker, value, index } = event.detail;
    console.log(event.detail.value[0], event.detail.value[1])
    //that.data.choice = event.detail.value;
    that.setData({ choice: event.detail.value })
    that.setData({ show: false })
    //-----------------------------------
    //  database
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "SELECT time  FROM need_table WHERE school= '" + that.data.choice[0] + "' and building= '" + that.data.choice[1] + "'"
      },
      success(res) {
        console.log(res.data);
        if (res.data.length == 0) {
          console.log("fail")
        } else {
         that.setData({time:res.data[0].time })
         console.log(that.data.time)
        }
      }
    })
   // console.log(choice)
  },
  // 关键字搜索
  onSearch(){

  },
  onCancel() {
    this.setData({ show: false });
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