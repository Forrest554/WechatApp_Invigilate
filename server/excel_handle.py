import xlrd
import pymysql

name = ''
_id = 0

try:
    db = pymysql.connect("localhost","root","12345678","wechat_database" )
except:
    print("could not connect to mysql server")


def insert_deta():
    sheet = open_excel()
    cursor = db.cursor()
    row_num = sheet.nrows
    for i in range(1, row_num):  # 第一行是标题名，对应表中的字段名所以应该从第二行开始，计算机以0开始计数，所以值是1
        row_data = sheet.row_values(i)
        value = (row_data[0],row_data[1],row_data[2],row_data[3])
        print(i)
        sql = "INSERT INTO demo_yangben(xxx,xxxx,xxxx,xxxx)VALUES(%s,%s,%s,%s)"
        cursor.execute(sql, value)  # 执行sql语句
        db.commit()
    cursor.close()  # 关闭连接



data = xlrd.open_workbook("excel_test.xlsx")
table =data.sheets()[0]
nrows = table.nrows  #获取该sheet中的有效行数
#print(nrows)
name = table.row_values(0,1)
_id = table.row_values(1,1)
value =(_id,_id,name,'12345678')
print(value)
    











