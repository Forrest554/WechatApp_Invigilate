# -*- coding: utf-8 -*-
import zhenzismsclient as smsclient
import random
import pymysql
 
# 打开数据库连接
db = pymysql.connect("localhost","root","12345678","wechat_database" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
 
# 使用 execute()  方法执行 SQL 查询 
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")
 
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
id = "201626810708"
name ="梁锦豪"
sql='select * from student where id= "%s" and name="%s"' % (id, name)
print("sql:",sql)
res=cursor.execute(sql)
print("res:",res)
 
cursor.execute(sql) 
 
# 关闭数据库连接
db.close()
if res :
	code = '';
	for num in range(1,5):
	    code = code + str(random.randint(0, 9));
	print(code);
	client = smsclient.ZhenziSmsClient('http://sms_developer.zhenzikj.com','100880', 'c20ca481-2a39-4863-94d3-0fc00d395e79');
	print(client.send('15869182892', '您的验证码为'+code))