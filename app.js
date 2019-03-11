//app.js
// wx.request({
//   url: 'http://127.0.0.1:3000',
//   data: {
//     sql: "select time,classroom,course,building,school,need_table.ID from  need_table,find_table  where need_table.ID=find_table.reqid and status=0 and examine = 0"
//   },
//   success(res) {

//   }
// })
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    useraccount:null,
    power:1 ,//1:学生权限  2: 教师权限   3:管理员权限
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  },
  mydata:{
    userid:null,
    password:null,
    currentDate:"2019-01-23"//23号之前及23号的监考不出现
  }
})