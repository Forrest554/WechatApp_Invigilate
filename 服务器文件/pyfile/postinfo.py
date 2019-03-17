# -*- coding: utf-8 -*-
import zhenzismsclient as smsclient
import random
import pymysql
import sys
import io

def setup_io():
    sys.stdout = sys.__stdout__ = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8', line_buffering=True)
    sys.stderr = sys.__stderr__ = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8', line_buffering=True)
setup_io()
 

currentDate = "2019-01-23"

currentDate = currentDate[0:9]+str(int(currentDate[9])+1)
# print(currentDate)
finddate0 =  currentDate +" 8:15-10:15"
finddate1 =  currentDate +" 13:30-15:30"
# 打开数据库连接
db = pymysql.connect("localhost","root","123456","wechat_database" )
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
name = ""
course=""
time=""
school=""
classroom=""
sql1='SELECT reqid,hasnum,stu_id0,stu_id1,stu_id2,stu_id3 \
	FROM find_table,need_table WHERE find_table.reqid = need_table.ID \
	AND status = 0 AND examine = 1 AND (time = "%s" OR time ="%s" )'  %(finddate0,finddate1)
# print("sql:",sql1)
cursor.execute(sql1) 
data = cursor.fetchall()
print(data)
# print(len(data))
for i in range(len(data)):
	# print(data[i][0])
	for j in range(data[i][1]):
		# print(data[i][j+2])
		need_ID = data[i][0]
		stu_id = data[i][j+2]
		sql2 = 'SELECT phone,name FROM student_table WHERE id =%s' %(stu_id)
		cursor.execute(sql2)
		pn = cursor.fetchone()
		phone = pn[0]
		name = pn[1]
		sql3 = 'SELECT course,time,school,classroom \
				FROM need_table,find_table \
				WHERE need_table.ID = find_table.reqid \
				AND need_table.ID = %s' %(need_ID)
		cursor.execute(sql3)
		info = cursor.fetchone()
		course=info[0]
		time=info[1]
		school=info[2]
		classroom=info[3]

		msg = ""+name+"同学您好，您所报名的"+course+"监考将于"+time+"(明天)开始，地点为:"+school+"-"+classroom+",请按时到场并参加监考，谢谢合作！"
		print(msg)
		
		#client = smsclient.ZhenziSmsClient('http://sms_developer.zhenzikj.com','100880', 'c20ca481-2a39-4863-94d3-0fc00d395e79');
		#print(client.send(phone, msg))

# 关闭数据库连接
db.close()
'''
#验证码
if res :
	code = '';
	for num in range(1,5):
	    code = code + str(random.randint(0, 9));
	print(code);
	client = smsclient.ZhenziSmsClient('http://sms_developer.zhenzikj.com','100880', 'c20ca481-2a39-4863-94d3-0fc00d395e79');
	print(client.send('15869182892', '您的验证码为'+code))
'''