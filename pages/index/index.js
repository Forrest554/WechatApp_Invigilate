// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0, //当前卡片
    colorList: [ //标签颜色
      'olive',
      'yellow',
      'brown',
      'grey',
      'mauve'
    ],
    pictureList: [{
        url: '/pages/image/zjut_flower2.jpg', //图片链接
        name: 'must', //标识，用来定义跳转位置
        title: "监考须知" //显示在图片上的文字
      },
      {
        url: '/pages/image/zjut_flower.jpg',
        name: 'bulletin',
        title: "公告"
      },
      {
        url: '/pages/image/zjut_autumn.jpg',
        name: 'must',
        title: "你所不知道的事儿"
      },
      {
        url: '/pages/image/zjut_snow.jpg',
        name: 'bulletin',
        title: "你瞅这是啥"
      }

    ],
    list_tem: [{}],
    list: [{
      time: "2019-1-1 13:30-15:30", //考试事件
      classroom: "101", //考试教室
      course: "大学物理", //考试科目
      building: "广知楼", //考试楼号
      num: "2/4", //还差人数/总人数
      id: 1 //编号
    }]
  },
  //跳转函数
  readMust: function(e) {
    if (e.currentTarget.id == "must") {
      wx.navigateTo({
        url: '/pages/must/must',
      })
    } else if (e.currentTarget.id == "bulletin") {
      wx.navigateTo({
        url: '/pages/bulletin/bulletin',
      })
    } else if (e.currentTarget.id == "news") {
      wx.navigateTo({
        url: '/pages/news/news',
      })
    }
  },
  lookInfo: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
      // 传递参数id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select * from  need_table"
      },
      success(res) {
        console.log(res)
        let list = that.data.list
        var obj = {}
        for (var i = 0; i < res.data.length; i++) {
          obj.time = res.data[i].time
          obj.calssroom = res.data[i].classroom
          obj.course = res.data[i].course
          obj.building = res.data[i].building
          obj.num = res.data[i].yjs_num
          obj.id = res.data[i].ID
          list.push(obj)
          obj = {}
          console.log(obj)
        }
        that.setData({ list })
        console.log(list)
        console.log(that.data.list)

      }
    })
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

  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
})