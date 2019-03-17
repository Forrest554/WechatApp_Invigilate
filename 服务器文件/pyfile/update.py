import xlrd
import pymysql
'''
数据库的更新，将当天的报名撤下，使status = 1  
'''

currentDate = "2019-01-23"
finddate0 =  currentDate +" 8:15-10:15"
finddate1 =  currentDate +" 13:30-15:30"
try:
    db = pymysql.connect("localhost","root","12345678","wechat_database" )
except:
    print("could not connect to mysql server")

cursor = db.cursor()
sql = "UPDATE find_table SET status = 1 WHERE reqid = any\
       (SELECT need_table.ID FROM need_table WHERE time = \
        '%s' OR time = '%s')"  %(finddate0,finddate1)
print(sql)
cursor.execute(sql)  # 执行sql语句
db.commit()

# sql2 = "select * from student_table"
# cursor.execute(sql2)
# data = cursor.fetchall()
# print(data)
cursor.close()  # 关闭连接











