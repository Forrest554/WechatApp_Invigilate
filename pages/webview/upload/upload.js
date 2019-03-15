// pages/webview/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.setClipboardData({
      data: 'https://sxtliujiguolema.xyz/upload',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data)
          }
        })
      }
    })
    wx.showToast({
      title: '链接已复制到粘贴板，请打开浏览器访问',
      duration: 2000
    })

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