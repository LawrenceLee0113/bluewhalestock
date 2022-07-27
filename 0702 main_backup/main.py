# -*- coding: utf-8 -*-
#flask basic import
from flask import Flask, render_template, request, json, jsonify
#time and time import
import datetime as dt
import mysql.connector
import datetime,time
from dateutil.relativedelta import relativedelta

# google login import
from google.oauth2 import id_token
from google.auth.transport import requests
CLIENT_ID = "1031431154104-h27s49nfml2npup0p0m40iigfcr9qq5g.apps.googleusercontent.com"


#google cors 跨網域API

from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/.*": {"origins": ["http://43.254.19.106:8080/","http://bluewhale-stock.tw", "https://43.254.19.106:8080/", "https://bluewhale-stock.tw"]}})
#DB CRUD method import
import DBManager as DB
tool = DB.tool()
databases = DB.databases("localhost", "bluewhal_yih", "r0g{bYg+([jd")
databases.set_databases(["bluewhal_Basedata", "bluewhal_NewStock",
                        "bluewhal_Revenue", "bluewhal_StockPrice","bluewhal_Client"])
                   
app.config["SQLALCHEMY_POOL_RECYCLE"] = -1
@app.route('/')
def index_page():
    return render_template("index.html")

@app.route('/ping_database')
def ping_database():#網頁載入時 檢查資料庫連接狀況
    try:
        try:
            now_DB = databases.database("bluewhal_Basedata")
            data = now_DB.get_data("basedata",["公司代號"])
            val = "資料庫連接成功！"
        except Exception:
            val = "資料庫連接失敗！"
        return jsonify({"資料庫狀態：":val})
    except Exception:
        return jsonify({"message":"其他"})
@app.route('/get_data_base', methods=['GET', 'POST'])
def get_data_base():#獲取資料庫資料 (database table clumn condition) 搜尋 新資訊
    if request.method == 'POST':
        account_id = request.form.get('account_id')
        database_name = request.form.get("database_name")
        table_name = request.form.get("table_name")
        column_names = request.form.get("column_names")
        condition = request.form.get("condition")
        now_DB = databases.database(database_name)
        values = now_DB.get_data(table_name, tool.string_to_list(column_names), condition)
    for i in range(0, len(values)):
        values[i] = list(values[i])
    for i in range(0, len(values)):
        for j in range(0, len(values[i])):
            try:
                if type(values[i][j]) != type("str"):
                    values[i][j] = values[i][j].decode("UTF-8")
            except Exception:
                print("'"+str(values[i][j])+"'wrong:"+str(type(values[i][j])))
    return jsonify({"values": values})






@app.route('/stock_search', methods=['GET', 'POST'])
def stock_search():#個股資訊頁面
    if request.method == 'GET':
        stock_name = request.args.get('stock_name')
        base_database_name = databases.database("bluewhal_Basedata")
        try:
            values = base_database_name.get_data(
                "basedata", ["天搜尋次數"], f"公司代號 = {stock_name}")
            stock_value = values[0][0]
            print(stock_value)
            retrun_value = int(stock_value) + 1
    
            base_database_name.update_data(
                "basedata", f"天搜尋次數 = {retrun_value}", f"公司代號 = {stock_name}")
            values_a = base_database_name.get_data(
                "basedata", ["天搜尋次數"], f"公司代號 = {stock_name}")
            after_val = values_a[0][0]
            print(after_val)
        except IndexError:
            stock_name = "查無此股票代號"
            after_val = "no data"
        return render_template("stock_search.html", after_val=after_val, stock_name=stock_name)



@app.route('/google_login', methods=['POST'])
def google_login():#後端驗證google token id
    token_id = request.form.get('token_id')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token_id, requests.Request(), CLIENT_ID)
        userid = idinfo['sub']
        now_database = databases.database("bluewhal_Client")
        values = now_database.get_data("client_base",["*"],f"google_id = {userid}")
        if len(values) == 0:sign_up = True
        else:sign_up = False
        
        nowdate = str(dt.date.today())
        if sign_up:
            now_database.insert_data("client_base",
            ["登入方法","google_id","姓名","姓","名","電子郵件","登入次數","註冊時間","上次登入時間"],
            ["google",userid,idinfo["name"],idinfo["family_name"],idinfo["given_name"],idinfo["email"],"1",nowdate,nowdate])
        else:
            user_values = now_database.get_data("client_base",["登入次數"],f"google_id = {userid}")
            login_value = int(user_values[0][0])+1
            now_database.update_data("client_base",f"登入次數 = {login_value},上次登入時間 = {nowdate}",f"google_id = {userid}")
            
        user_email = idinfo["email"]
        user_name = idinfo["name"]
        user_given_name = idinfo["given_name"]
        user_family_name = idinfo["family_name"]
        user_locale = idinfo["locale"]
    except ValueError:
        # Invalid token
        userid = "fail"
        pass
    return jsonify({"message":userid,"user_name":user_name,"user_given_name":user_given_name,"user_family_name":user_family_name})

def decode_values(values):
    for i in range(0, len(values)):
            values[i] = list(values[i])
    for i in range(0, len(values)):
        for j in range(0, len(values[i])):
            try:
                if type(values[i][j]) != type("str"):
                    values[i][j] = values[i][j].decode("UTF-8")
            except Exception:
                print("'"+str(values[i][j])+"'wrong:"+str(type(values[i][j])))
    return values

@app.route('/industry_query', methods=['POST'])
def industry_query():
    account_id = request.form.get('account_id')
    left_nav = request.form.get('left_nav')
    left_small_nav = request.form.get("left_small_nav")
    top_nav_name = request.form.get("top_nav_name")
    mode = request.form.get("mode")
    if mode == "*":
        mode_str = "all_command"
    
    with open("mode_command.json",encoding="utf-8") as f:
        data = json.load(f)
    
    values = []
    
    if left_nav == "INprsB":
        try:
            command = data[left_nav][mode_str]
            command = command.replace("'data_name'",f"'{top_nav_name}'")
            now_database = databases.database("bluewhal_Basedata")
            values = now_database.get_data_by_command(command)
            values = decode_values(values)
        except KeyError:
            command = "key not find"
            values = "key not find"
        finally:
            return jsonify({"values":values})
    elif left_nav == "INrevB":
        try:
            command1 = data[left_nav]["cmd_1"]
            command1 = command1.replace("'data_name'",f"'{top_nav_name}'")
            now_database = databases.database("bluewhal_Revenue")
            values1 = now_database.get_data_by_command(command1)
            values1 = decode_values(values1)
            
            now_database = databases.database("bluewhal_Revenue")
            values3 = values1
            counter = 0
            
            _month = data[left_nav]["_months"]
            start_time = datetime.datetime.now() - relativedelta(months=_month)
            end_time = datetime.datetime.now() - relativedelta(months=1)
            
            start_date = start_time.strftime("%Y-%m")
            end_date = end_time.strftime("%Y-%m")
            print("values3",values3)
            for i in values1:
                command2 = data[left_nav]["cmd_2"]
                command2 = command2.replace("'data_name1'",f"{i[1]}")
                command2 = command2.replace("'data_name2'",start_date)
                command2 = command2.replace("'data_name3'",end_date)
                try:
                    values2 = now_database.get_data_by_command(command2)
                    values2 = decode_values(values2)
                except Exception:
                    values2 = []
                print(command2)
                
                a = _month - len(values2)
                for j in range(a):
                    values2.append(["no_data","no_data","no_data"])
                print("i",i)
                print("values2",values2)
                print("values3-counter",values3[counter])
                for j in range(len(values2)):
                    for o in values2[j]:
                        values3[counter].append(o)
                counter += 1
            print(values3)
        except KeyError:
            command = "key not find"
            values = "key not find"
            print("error")
            values3 = []
        finally:
            return jsonify({"values":values3})   
        
#run server
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5107, debug=True,ssl_context=('server.crt', 'server.key'))