# WechatApp_Invigilate
最近做了一个监考报名系统，分享一下。
## 项目摘要
本项目从高校考试监考需求出发，为教师、学生等人员设计一个微信小程序，以解决监考人员变动的问题。
## 项目背景
   工大校内各项考试需要多名监考人员，除了作为主监考人员的老师，还需要多个学生辅助监考。
   一门考试的主监考人是教授该门课的教师。学生的课程成绩包括平时成绩与期末笔试成绩。平时成绩各
部分占比由课程小组规定，期末试卷由小组统一批改出分。
	 学校期末考试周期间，学生在不影响自己考试的情况下，可以报名监考其他课程，完成后可以获得相应工
时或报酬。
   目前工大还未出现这类小程序或应用。
## 需求分析
1.	教师目标：上传监考需求、查看监考报名进度。
2.	监考学生目标：查看可报名监考情况、报名监考，考前收到提醒短信。
3. 管理者目标：上传监考需求、审核教师上传的监考需求、发布监考招募、查看监考报名进度、导出监考汇总情况、修改已报名监考。

--------
# 代码简介

## 小程序
第三方包、接口：
1.	npm 前端第三方包 Vant组件库  https://github.com/youzan/vant-weapp
2.	color ui 组件库 https://github.com/weilanwl/ColorUI
3.	SDK：http://smsow.zhenzikj.com/doc/sdk.html 用于短信模块的API
## 后台
用mysql建立了数据库 node.js连接数据库以及处理excel python脚本定时更新数据库和发送短信
### 服务器搭建 和 server.js
（这一段我也不知道在讲啥）
微信小程序后台服务器主要是使用node.js搭建而成。通过express框架构建起基本的web服务器，mysql模块连接MySQL数据库，body-parser模块负责解析发来的post请求，formidable模块和node-xlsx模块配合处理上传的excel文件和导出的excel文件，fs模块处理文件，path模块处理路径问题，art-template模块负责对静态页面进行渲染。
1.	通过mysql模块连接MySQL数据库
使用 npm install mysql 命令下载mysql模块。这是技术大牛开发的针对MySQL数据库的模块，可以对MySQL数据库进行连接、执行sql语句等操作。在服务端启动的时候执行连接数据库代码：
```
var connection = mysql.createConnection({config};
```
创建数据库连接，config为配置文件，包括数据库地址，端口，数据库名称，用户，密码等。具体执行sql语句代码为：
```
	connection.query(sql, function(error, results) {
	     if (error) {
	         return;
	     }
	     res.json(results);
	}

```
其中sql为要执行的sql语句，回调函数有两个参数，一个是error，用于展示错误信息；另一个是results，用于展示执行结果。
2.	node-xlsx模块处理excel文件
在使用node-xlsx处理excel文件时，要先创建对象：
```
var obj = node_xlsx.parse(filepath)；
```
其中，filepath为excel文件路径，node_xlsx模块的parse方法会自动将excel解析成为对象，通过对象的data元素即可获取到excel的信息，data元素类型为数组，因为一般excel表格只有一张表，所以这里仅从obj.data[0] 里获取excel表格中的信息。
3.	express处理get和post请求
使用express框架的原因是：这个框架搭建简单，逻辑清晰，操作方便。在使用express框架前，先挂载express框架 ：
```
var app = express();
```
然后挂载一系列的服务：
```
	app.use('/views/', express.static('./views/'));
	app.engine('html', require('express-art-template'));
	app.use(bodyParser.urlencoded({ extended: false }));
```
包括开放目录，引用模板引擎，加载post请求体解析等等。
	处理post和get请求：app.get(url,callback()),例如关闭数据库连接的get请求：
```
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

```
通过判断监听端口发过来的请求路径选择对应的方法处理请求，如果请求路径是/close，则执行方法：connection.end(callback()),通过回调函数处理请求。
4.	art-template渲染静态页面
模板引擎是art-template,使用express框架时，还要额外下载express适配版的模块 express-art-template，下载方法为：npm install express-art-template ,使用模板引擎可以方便地渲染静态页面，降低模块耦合度，利于合作开发。
先挂载模板引擎：在3中已讲关于挂载模板引擎的方法，这里不再赘述。
模板引擎的使用十分简单，只需要使用render方法，将要渲染的页面和数据传入即可。例如：
```
	app.get('/result', function(req, res) {
	    res.render('result.html', {
	        exam: tempdata
	    })
	})

```
这里处理请求路径为/result的get请求，然后将要渲染的页面result.html渲染后转发出去。res.render方法负责渲染并转发，其中，result.html为被渲染页面，exam：tempdata分别为目标数据和渲染数据。

#### update.py
在服务器上每天定时执行update.py文件，将当天的监考报名撤销，执行该python脚本可通过sudo crontab -e命令定时执行。
例如，我们取当天时间为1月23日，那么通过该脚本可以使23号的监考撤走如下所示。
![blockchain](https://github.com/Forrest554/WechatApp_Invigilate/blob/master/image_show/update_p.png?raw=true)
![blockchain](https://github.com/Forrest554/WechatApp_Invigilate/blob/master/image_show/update.png?raw=true)
#### postinfo.py
服务器每天定时执行postinfo.py文件，给第二天监考的同学发送提醒短信，该python脚本可通过sudo crontab -e命令定时执行。
首先通过pymysql包连接数据库并且查询明日考试的同学的电话号码，
在生成相应的message，再调用榛子云API，通过zhenzismsclient.py 文件调用发送短信。如下所示。

```
msg = ""+name+"同学您好，您所报名的"+course+"监考将于"+time+"(明天)开始，地点为:"+school+"-"+classroom+",请按时到场并参加监考，谢谢合作！"
print(msg)

client = smsclient.ZhenziSmsClient('http://sms_developer.zhenzikj.com','100880', 'c20ca481-2a39-4863-94d3-0fc00d395e79');
print(client.send(phone, msg))
```
例如，我们取当天时间为1月23日，那么通过该脚本可以使参加24号的监考同学收到短信。
![blockchain](https://github.com/Forrest554/WechatApp_Invigilate/blob/master/image_show/info.png?raw=true)
