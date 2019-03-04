// pages/test/test.js
//index.js
var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp();
Page({
  data: {
    name: '梁锦豪',
    phone: '15869182892',
    time: '2019/3/3',
    course: '高等数学',
    school: '浙江工业大学',
    class: '广B312'
  },
  onLoad: function () {

  },



  //获取短信验证码
  getCode(e) {
    var that = this;
    console.log('获取验证码');
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '100880', 'c20ca481-2a39-4863-94d3-0fc00d395e79');
    zhenzisms.client.send(function (res) {
      console.log(res.data);
    },
      that.data.phone, that.data.name + '同学您好，您所报考的' + that.data.course + '将于' + that.data.time + '，即两天后开始考试，地点为' + that.data.school + '-' + that.data.class+'，请您准时到场，并携带好证件。'
    );

  },

  //保存
  save(e) {
    console.log('姓名: ' + this.data.name);
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code);

    //省略提交过程
  }
})