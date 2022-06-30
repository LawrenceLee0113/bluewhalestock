import decimal
import datetime
import DBManager as DB
from flask_cors import CORS
from flask import Flask, render_template, request, json, jsonify
import json
import time
import datetime as dt
import mysql.connector

# google login import
from google.oauth2 import id_token
from google.auth.transport import requests
CLIENT_ID = "1031431154104-h27s49nfml2npup0p0m40iigfcr9qq5g.apps.googleusercontent.com"

app = Flask(__name__)
CORS(app, resources={r"/.*": {"origins": ["http://43.254.19.106:8080/","http://bluewhale-stock.tw", "https://43.254.19.106:8080/", "https://bluewhale-stock.tw"]}})

tool = DB.tool()
databases = DB.databases("localhost", "bluewhal_yih", "r0g{bYg+([jd")
databases.set_databases(["bluewhal_Basedata", "bluewhal_NewStock",
                        "bluewhal_Revenue", "bluewhal_StockPrice","bluewhal_Client"])

@app.route('/')
def index_page():
    return render_template("index.html")
    
@app.route('/ping_database')
def ping_database():
    try:
        try:
            now_DB = databases.database("bluewhal_Basedata")
            data = now_DB.get_data("basedata",["公司代號"])
            val = "true"
        except Exception:
            # databases = DB.databases("localhost", "bluewhal_yih", "r0g{bYg+([jd")
            # databases.set_databases(["bluewhal_Basedata", "bluewhal_NewStock",
            #                 "bluewhal_Revenue", "bluewhal_StockPrice","bluewhal_Client"])
            val = "fixed"
        return jsonify({"message":val})
    except Exception:
        return jsonify({"message":"false"})
@app.route('/get_data_base', methods=['GET', 'POST'])
def get_data_base():
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
def stock_search():
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
def google_login():
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

@app.route("/industry_query",method=["POST"])
def industry_query():
    account_id = request.form.get('account_id')
    left_nav = request.form.get('left_nav')
    top_nav = request.form.get("top_nav")
    top_nav_name = request.form.get("top_nav_name")
    with open("mode_command.json",encoding="utf-8") as f:
        data = json.load(f)
    try:
        command = data[left_nav][top_nav]
        command = command.replace("'data_name'",f"'{top_nav_name}'")
        now_database = databases.database["bluewhal_Basedata"]
        values = now_database.get_data_by_command(command)
    except KeyError:
        command = "key not find"
    finally:
        return jsonify({"values":values})

#run server
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5107, debug=True,ssl_context=('server.crt', 'server.key'))
