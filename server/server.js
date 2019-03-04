//若执行失败，先在命令行敲下如下命令
// npm install express
// npm install mysql
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var node_xlsx = require('node-xlsx');

//挂在express框架
var app = express();
app.use('/views/', express.static('./views/'))
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false })); //解析request中body的urlencoded字符
//数据库信息


var tempdata = {
    ourse: '',
    classname: '',
    class: '',
    classteacher: '',
    time: '',
    school: '',
    foreign: '',
    num: 0,
    building: '',
    classroom: '',
    examnum: '',
    teacher: '',
};

//!!!
//只改database user passowrd
var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'wechat_database',
    user: 'root',
    password: '12345678',
});
//打开数据库连接
connection.connect(function(err) {
    if (err) {
        console.log('连接MySQL错误，请检查！');
    } else {
        console.log('MySQL连接成功！')
    }
});


//配置路由信息
//get请求数据库
app.get('/', function(req, res) {

    //获取请求参数中的sql语句
    var send = req.query.sql;
    console.log(req.query.sql);
    //执行sql语句
    connection.query(send, function(error, results) {
        if (error) {
            console.log(error.message);
            return;
        }
        console.log('s:', results);
        res.json(results);
    })

})
//post请求数据库
app.post('/', function(req, res) {
    //获取请求参数中的sql语句
    var send = req.query.sql;
    console.log(req.query.sql);
    //执行sql语句
    connection.query(send, function(error, results) {
        if (error) {
            console.log(error.message);
            return;
        }
        console.log('s:', results);
        res.json(results);
    })
})
//get请求文件上传
app.get('/upload', function(req, res) {
    res.render('upload.html');
});

//post请求文件处理
app.post('/dealwith', function(req, res) {
    var readPath = __dirname;
    console.log(readPath);
    var form = formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        console.log('开始接收文件')
        if (error) {
            console.log('文件上传失败！');
        } else {
            console.log('文件上传成功！');
            //得到上传文件的路径
            const filepath = files.file.path;
            //console.log(filepath);
            //创建obj对象
            var obj = node_xlsx.parse(filepath);
            //取得第一个excel表的数据
            var excelObj = obj[0].data;
            //遍历每行
            for (var i = 1; i < excelObj.length; i++) {
                //取得每行的数据
                var rdata = excelObj[i];
                //遍历该行的各列信息
                for (var j = 0; j < rdata.length; j++) {
                    console.log(rdata[j] + " ");
                }
                tempdata.course = rdata[0];
                tempdata.classname = rdata[1];
                tempdata.class = rdata[2];
                tempdata.classteacher = rdata[3];
                tempdata.time = rdata[4];
                tempdata.school = rdata[5];
                tempdata.foreign = rdata[6];
                tempdata.num = rdata[7].toFixed(0);
                tempdata.building = rdata[8];
                tempdata.classroom = rdata[9];
                tempdata.examnum = rdata[10];
                tempdata.teacher = rdata[11];
            }
        }
    })
});

//模板表格下载
app.get('/download', function(req, res) {

})

//查看提交信息
app.get('/result', function(req, res) {
    res.render('result.html', {
        exam: tempdata
    })
})

//导出监考信息
app.get('/output', function(req, res) {

})

//关闭数据库命令
//可操作数据库的关闭
app.get('/close', function(req, res) {

    //关闭连接
    connection.end(function(err) {
        if (err) {
            console.log('数据库关闭连接失败！');
        } else {
            console.log('数据库关闭连接成功！')
        }
    })
})

//监听端口
app.listen(3000)