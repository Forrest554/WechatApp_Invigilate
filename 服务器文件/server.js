//若执行失败，先在命令行敲下如下命令
// npm install express
// npm install mysql
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var node_xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path')

//挂在express框架
var app = express();
app.use('/views/', express.static('./views/'))
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false })); //解析request中body的urlencoded字符
//数据库信息


var tempdata = {
    course: '', //课程
    classname: '', //教学班名称
    class_form: '', //班级组成
    class_teacher: '', //任课老师
    time: '', //考试日期
    school: '', //校区
    foreign1: '', //是否监考留学生
    yjs_num: 0, //研究生人数
    building: '', //楼号
    classroom: '', //教室
    stu_num: 0, //考生人数
    exam_teacher: '', //监考教师
    issue_id: '' //发布者id
};


//!!!
//只改database user passowrd
var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'wechat_database',
    user: 'root',
    password: '123456',
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
app.get('/lookforupload',function(req,res){
	res.render('lookforupload.html');
})
//post请求文件处理
app.post('/dealwith', function(req, res) {
    //清空临时数据
    for (var item in tempdata) {
        item = '';
    }
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
                tempdata.class_form = rdata[2];
                tempdata.class_teacher = rdata[3];
                tempdata.time = rdata[4];
                tempdata.school = rdata[5];
                tempdata.foreign1 = rdata[6];
                tempdata.yjs_num = rdata[7];
                tempdata.building = rdata[8];
                tempdata.classroom = rdata[9];
                tempdata.stu_num = rdata[10];
                tempdata.exam_teacher = rdata[11];
                tempdata.issue_id = rdata[12];
                var inssql = "insert into need_table(course,classname,class_form,class_teacher,time,school,foreign1,yjs_num,building,classroom,stu_num,exam_teacher,issue_id) values ('" + rdata[0] + "','" + rdata[1] + "','" + rdata[2] + "','" + rdata[3] + "','" + rdata[4] + "','" + rdata[5] + "','" + rdata[6] + "'," + rdata[7] + ",'" + rdata[8] + "','" + rdata[9] + "'," + rdata[10] + ",'" + rdata[11] + "','" + rdata[12] + "');"
                console.log(inssql);
                connection.query(inssql, function(error, results) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    //console.log('s:', results);
                    console.log(results.insertId);
                    var updatesql = "insert into find_table(reqid,hasnum) values("+results.insertId+",0)";
                    connection.query(updatesql,function(updateerr,updateres){
                        if(updateerr){
                            console.log(updateerr.message);
                            return;
                        }
                        console.log("插入find_table成功，id为："+updateres.insertId);
                    })
                })
            }

            //发送网页
            res.render('result.html', {
                exam: tempdata
            })
        }
    })
});

//模板表格下载
app.get('/download', function(req, res) {
    // fs.readFile("/model.xlsx", function(err, data) {
    //     res.set({
    //         'Content-Type': 'application/force-download', //告诉浏览器这是一个二进制文件
    //         'Content-Disposition': 'attachment; filename=model.xlsx' //告诉浏览器这是一个附件要下载xlsx
    //     });
    //     res.end(data)
    // })
    var f = '/model.xlsx'
    res.sendFile(__dirname + f);
})

//查看提交信息
app.get('/result', function(req, res) {
    res.render('result.html', {
        exam: tempdata
    })
})

//导出监考信息
app.get('/output', function(req, res) {
    //查询数据
    var sql = 'select * from need_table,find_table where need_table.id = find_table.reqid';
    //var sql = 'select * from studentinfo'
    connection.query(sql, function(error, results) {
        if (error) {
            console.log(error.message);
            res.end("error in database , call the administrator")
            return;
        }
        var datas = [];
        //console.log(results)
        //遍历查询到的数据，存入datas
        //results.foreach(function(row))
        var header = ['编号', '课程', '教学班', '班级组成', '任课教师', '日期', '校区', '是否监考留学生', '研究生人数', '楼号', '教室', '考试人数', '监考教师', ' ', '编号', '已招募学生数', '是否过期', '学生1学号', '学生2学号', '学生3学号', '学生4学号', '是否审核通过'];
        datas.push(header);
        for (var i = 0; i < results.length; i++) {
            var newRow = [];
            for (var key in results[i]) {
                var row = results[i];
                newRow.push(row[key]);
            }
            datas.push(newRow);
        }
        //建立表格，将datas放入
        var buffer = node_xlsx.build([{
            name: "所有监考信息",
            data: datas
        }])
        //写文件
       // fs.writeFile("output.xlsx", buffer, 'binary', function(err) {
       //     if (err) {
       //         console.log("错误发生在创建xlsx文件");
       //         res.end("error in create output.xlsx , call the administrator")
       //         return;
       //     }
       // })

	fs.writeFileSync("output.xlsx",buffer,{'flag':'w'});

        //文件下载处理模块
	var options = {
		root:__dirname+'/',
		dotfiles:'deny',
		headers:{
			'x-timestamp':Date.now(),
			'x-sent':true
		}
	};
        res.sendFile('output.xlsx',options,function(err){
		if(err){
			console.log(err.message);
		}else{
			console.log("sent:output.xlsx");
		}
	});
    })
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
