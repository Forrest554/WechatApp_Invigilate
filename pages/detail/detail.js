var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 需求表id
    id: null,
    // 学生信息存储
    student: [
      '123456',
      '123456',
      '123456'
    ],
    change: true, //控制修改报名情况
    show: true, //控制报名情况的查看
    dataDetail: null,
    percent: 0.1,
    apply: false, //报名及取消报名 true 为已报名 false为未报名
    student_power: false, //是否为学生 true 为学生，显示按钮；false不是学生，不显示报名按钮
    applyable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.globalData.power == 1)
      that.setData({
        show: false,
        student_power: true
      })
    if (app.globalData.power == 3)
      that.setData({
        change: false
      })
    that.setData({
      id: options.id
    })

    wx.request({
      url: 'https://sxtliujiguolema.xyz/',
      data: {
        sql: "select * from find_table,need_table,teacher_table where find_table.reqid = need_table.id and need_table.exam_teacher = teacher_table.name and find_table.reqid = " + that.data.id
      },
      success(res) {
        var stu = [];
        stu.push(res.data[0].stu_id0);
        stu.push(res.data[0].stu_id1);
        stu.push(res.data[0].stu_id2);
        stu.push(res.data[0].stu_id3);
        var tempapply = false;
        for (var i = 0; i < stu.length; i++) {
          if (app.globalData.useraccount.userid == stu[i]) {
            tempapply = true;
          }
        }
        var tempapplyable = false;
        if (res.data[0].yjs_num <= res.data[0].hasnum) {
          tempapplyable = true
        }
        that.setData({
          dataDetail: res.data[0],
          student: stu,
          percent: (res.data[0].hasnum / res.data[0].yjs_num) * 100,
          applyable: tempapplyable,
          apply: tempapply
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

  },
  cancelChange() {
    if (app.globalData.power == 3){
      var that = this;
      wx.showToast({
        title: '正在取消',
        duration: 1000,
      })
      var it = { id: that.data.id }
      that.onLoad(it);
    }else{
      wx.showToast({
        title: '您没有权限',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  saveChange() {
    if(app.globalData.power==3)
    {
    var that = this;
    var num = 0;
    for (var i = 0; i < that.data.student.length; i++) {
      if (that.data.student[i] != '' && that.data.student != null) {
        num += 1;
      }
    }
    console.log(num);
    wx.request({
      url: 'https://sxtliujiguolema.xyz/',
      data: {
        sql: "update find_table SET stu_id0= '" + that.data.student[0] + "',stu_id1='" + that.data.student[1] + "',stu_id2='" + that.data.student[2] + "',stu_id3='" + that.data.student[3] + "',hasnum= " + num + " where reqid =" + that.data.id
      },
      success(res) {
        console.log(res);
        wx.showToast({
          title: '修改成功！',
          duration: 1000,
          success() {
            var it = {id:that.data.id}
            that.onLoad(it)
          }
        })
      }
    })
  }
  else{
      wx.showToast({
        title: '您没有权限',
        icon: 'none',
        duration: 2000
      })
  }
  },
  inputstu0(e) {
    var that = this;
    var stu = that.data.student;
    stu[0] = e.detail.value;
    that.setData({
      student: stu
    })
  },
  inputstu1(e) {
    var that = this;
    var stu = that.data.student;
    stu[1] = e.detail.value;
    that.setData({
      student: stu
    })
  },
  inputstu2(e) {
    var that = this;
    var stu = that.data.student;
    stu[2] = e.detail.value;
    that.setData({
      student: stu
    })
  },
  inputstu3(e) {
    var that = this;
    var stu = that.data.student;
    stu[3] = e.detail.value;
    that.setData({
      student: stu
    })
  },
  student_apply(e) {
    var that = this;
    var stu_app = that.data.apply;
    if (that.data.dataDetail.hasnum == that.data.dataDetail.yjs_num && (stu_app==false))    {
      wx.showToast({
        title: '报名人数已满',
        icon: 'none',
        duration: 2000
      })
    }else{
      stu_app = !stu_app;
      that.setData({
        apply: stu_app
      })
      if (stu_app) {
        console.log("发送报名请求");
        var location = 0
        for (var i = 0; i < that.data.student.length; i++) {
          if (that.data.student[i] == null || that.data.student[i] == "") {
            location = i;
            break;
          }
        }
        wx.request({
          url: 'https://sxtliujiguolema.xyz/',
          data: {
            sql: "update find_table SET hasnum=hasnum+1, stu_id" + location + " ='" + app.globalData.useraccount.userid + "' where reqid=" + that.data.id
          },
          success(res) {
            console.log(res);
            wx.showToast({
              title: '报名成功',
              icon: 'scuess'
            })
          }
        })
      } else {
        console.log("发送取消报名请求")
        var tempstuid = 0;
        for (var i = 0; i < that.data.student.length; i++) {
          if (that.data.student[i] == app.globalData.useraccount.userid) {
            tempstuid = i;
          }
        }
        wx.request({
          url: 'https://sxtliujiguolema.xyz/',
          data: {
            sql: "update find_table SET hasnum=hasnum-1,stu_id" + tempstuid + " ='' where reqid=" + that.data.id
          },
          success(res) {
            //console.log(res);
            wx.showToast({
              title: '取消报名成功',
              icon: 'success'
            })
          }
        })

      }
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})