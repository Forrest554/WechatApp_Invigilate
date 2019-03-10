// pages/all/all.js
const citys = {
  '屏峰校区': ['广知楼', '博易楼', '仁和楼'],
  '朝晖校区': ['子良楼', '综合楼']
};
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
var that
Page({
  /**
   * 页面33
   */
  data: {
    time_set: false,
    show: false,
    choice: null,
    columns: [{
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['屏峰校区'],
        className: 'column2',
        defaultIndex: 2
      }
    ],
    years,
    year: date.getFullYear(),
    months,
    month: '',
    days,
    day: '',
    hours: ["8:15-10:15", "13:30-15:30"],
    hour: '',
    value: [9999, 0, 22],
    time: '',
    inputSearch: "",
    list: [],
    cardCur: 0, //当前卡片
    colorList: [ //标签颜色
      'olive',
      'yellow',
      'brown',
      'grey',
      'mauve'
    ],
  },
  lookInfo: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
      // 传递参数id
    })
  },
  tabChange() {
    this.setData({
      list: null
    })
  },
  //地点搜索的弹出窗函数
  pop_show() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
  onConfirm(event) {
    var that = this;
    console.log(event.detail.value[0], event.detail.value[1])
    that.setData({
      choice: event.detail.value
    })
    that.setData({
      show: false
    })
    var that = this
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select time,classroom,course,building,yjs_num,need_table.ID,hasnum from  need_table,find_table where need_table.ID = find_table.reqid and status=0 and examine = 1 and school= '" + that.data.choice[0] + "' and building= '" + that.data.choice[1] + "'"
      },
      success(res) {
        //console.log(res)
        let list = that.data.list
        list = [];
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
        that.setData({
          list
        })
      }
    })
  },
  //时间搜索函数
  timeset_Change() {
    if (this.data.time_set == true)
      this.setData({
        time_set: false
      })
    else this.setData({
      time_set: true
    })
  },
  timesure(e) {
    var that = this
    that.setData({
      time_set: false
    })
    let time = that.data.time
    time = null
    if (that.data.month < 10 && that.data.day < 10)
      time = "" + that.data.year + "-0" + that.data.month + "-0" + that.data.day + " " + that.data.hour
    else if (that.data.month < 10 && that.data.day >= 10)
      time = "" + that.data.year + "-0" + that.data.month + "-" + that.data.day + " " + that.data.hour
    else if (that.data.month >= 10 && that.data.day < 10)
      time = "" + that.data.year + "-" + that.data.month + "-0" + that.data.day + " " + that.data.hour
    else if (that.data.month > 10 && that.data.day > 10)
      time = "" + that.data.year + "-" + that.data.month + "-" + that.data.day + " " + that.data.hour
    that.setData({
      time
    })
    // console.log(time)
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select time,classroom,course,building,yjs_num,need_table.ID,hasnum from  need_table,find_table where need_table.ID = find_table.reqid and status=0 and examine = 1 and time= '" + that.data.time + "'"
      },
      success(res) {
        //console.log(res)
        let list = that.data.list
        list = [];
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
        that.setData({
          list
        })
      }
    })

  },
  timecancel() {
    this.setData({
      time_set: false
    })
  },
  timeChoose(e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]]
    })
  },
  //科目搜索
  inputChange(e) {
    var that = this
    that.setData({
      inputSearch: e.detail.value
    })
    //console.log(e.detail.value)
  },
  deal(input) {
    var len = input.length;
    var string = "%";
    for (var i = 0; i < len; i++) {
      string += input[i] + '%';
    }
    return string;
  },
  onSearch(e) {
    var that = this;
    //console.log(that.data.inputSearch);
    var str = that.deal(that.data.inputSearch);
    //console.log(str);
    wx.request({
      url: 'http://127.0.0.1:3000',
      data: {
        sql: "select time,classroom,course,building,yjs_num,need_table.ID,hasnum from  need_table,find_table where need_table.ID = find_table.reqid and status=0 and examine = 1 and course like '" + str + "'"
      },
      success(res) {
        //console.log(res)
        let list = that.data.list
        list = [];
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
        that.setData({
          list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
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