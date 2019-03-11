// pages/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainID: null, //主键
    id: null, //reqid
    done: false,
    showbutton:true,
    useraccount: null,
    hasnum: null,
    detail: [],
    stu_id0: null,
    stu_id1: null,
    stu_id2: null,
    stu_id3: null
  },
  comfirm: function() {
    var that = this
    that.setData({
      done: true
    })
    that.setData({
      stu_id: null
    })
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select stu_id0,stu_id1,stu_id2,stu_id3 from find_table where reqid = " + that.data.id + ''
      },
      success(res) {
        //console.log(res)
        that.setData({
          stu_id0: res.data[0].stu_id0
        })
        that.setData({
          stu_id1: res.data[0].stu_id1
        })
        that.setData({
          stu_id2: res.data[0].stu_id2
        })
        that.setData({
          stu_id3: res.data[0].stu_id3
        })
        if (that.data.stu_id0 == null || that.data.stu_id0 == "") {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum +1, stu_id0                        ="' + that.data.useraccount.userid + '" where                            reqid= ' + that.data.id + ""
            },
            success(res) { //console.log(res)
            }
          })
        } else if (that.data.stu_id1 == null || that.data.stu_id1 == "") {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum +1,                        stu_id1 ="' + that.data.useraccount.userid + '"                        where reqid= ' + that.data.id + ""
            },
            success(res) {
              //console.log(res)
            }
          })
        } else if (that.data.stu_id2 == null || that.data.stu_id2 == "") {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum +1,                        stu_id2 ="' + that.data.useraccount.userid + '"                        where reqid= ' + that.data.id + ""
            },
            success(res) {
              console.log(res)
            }
          })
        } else {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum +1,                        stu_id3 ="' + that.data.useraccount.userid + '"                        where reqid= ' + that.data.id + ""
            },
            success(res) {
              console.log(res)
            }
          })
        }
      }
    })
  },
  cancel: function() {
    var that = this
    that.setData({
      done: false
    })
    that.setData({
      stu_id: null
    })
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select stu_id0,stu_id1,stu_id2,stu_id3 from find_table where reqid = " + that.data.id + ''
      },
      success(res) {
      //  console.log(res)
        that.setData({
          stu_id0: res.data[0].stu_id0
        })
        that.setData({
          stu_id1: res.data[0].stu_id1
        })
        that.setData({
          stu_id2: res.data[0].stu_id2
        })
        that.setData({
          stu_id3: res.data[0].stu_id3
        })
        if (that.data.stu_id0 == that.data.useraccount.userid) {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum -1, stu_id0                        =null  where reqid= ' + that.data.id + ""
            },
            success(res) { //console.log(res)
            }
          })
        } else if (that.data.stu_id1 == that.data.useraccount.userid) {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum -1, stu_id1                        =null  where reqid= ' + that.data.id + ""
            },
            success(res) {
             // console.log(res)
            }
          })
        } else if (that.data.stu_id2 == that.data.useraccount.userid) {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
               sql: 'update find_table set hasnum = hasnum -1, stu_id2                       =null  where reqid= ' + that.data.id + ""
            },
            success(res) {
              //console.log(res)
            }
          })
        } else if(that.data.stu_id3 == that.data.useraccount.userid) {
          wx.request({
            url: 'http://127.0.0.1:3000',
            data: {
              sql: 'update find_table set hasnum = hasnum -1, stu_id3                       =null  where reqid= ' + that.data.id + ""
            },
            success(res) {
             // console.log(res)
            }
          })
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (app.globalData.power == 2 || app.globalData.power == 3)
      that.setData({ showbutton:false})
    //   console.log(options.id);
    that.setData({
      id: options.id
    })
    //获取数据
    that.setData({
      useraccount: app.globalData.useraccount
    })
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select * from need_table where ID = " + that.data.id + ''
      },
      success(res) {
        that.setData({
          detail: res.data[0]
        })
      }
    })
    //改变show的值
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select stu_id0,stu_id1,stu_id2,stu_id3 from find_table where reqid = " + that.data.id + ''
      },
      success(res) {
        if (res.data[0].stu_id0 != that.data.useraccount.userid && res.data[0].stu_id1 != that.data.useraccount.userid && res.data[0].stu_id2 != that.data.useraccount.userid && res.data[0].stu_id3 != that.data.useraccount.userid)
          that.setData({
            done: false
          })
        else that.setData({
          done: true
        })
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

  }
})