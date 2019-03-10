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
    list: []
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
        sql: "select time,classroom,course,building,yjs_num,need_table.ID,hasnum from  need_table,find_table  where need_table.ID=find_table.reqid and status=0 and examine = 1 "
      },
      success(res) {
        console.log(res)
        let list = that.data.list
        list = []
        var obj = {}
        for (var i = 0; i < res.data.length; i++) {
          obj.time = res.data[i].time
          obj.classroom = res.data[i].classroom
          obj.course = res.data[i].course
          obj.building = res.data[i].building
          obj.num = res.data[i].yjs_num
          obj.id = res.data[i].ID
          obj.hasnum = res.data[i].hasnum
          list.push(obj)
          obj = {}
        }
        that.setData({ list })
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
    this.onLoad();
    // var that = this
    // wx.request({
    //   url: 'http://127.0.0.1:3000',
    //   data: {
    //     sql: "select time,classroom,course,building,yjs_num,need_table.ID,hasnum from  need_table,find_table  where need_table.ID=find_table.reqid"
    //   },
    //   success(res) {
    //     //console.log(res)
    //     let list = that.data.list
    //     list = []
    //     var obj = {}
    //     for (var i = 0; i < res.data.length; i++) {
    //       obj.time = res.data[i].time
    //       obj.classroom = res.data[i].classroom
    //       obj.course = res.data[i].course
    //       obj.building = res.data[i].building
    //       obj.num = res.data[i].yjs_num
    //       obj.id = res.data[i].ID
    //       obj.hasnum = res.data[i].hasnum
    //       list.push(obj)
    //       obj = {}
    //       //console.log(obj)
    //     }
    //     that.setData({ list })
    //     //console.log(list)
    //     //console.log(that.data.list)

    //   }
    // })
    // //wx.showNavigationBarLoading();
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