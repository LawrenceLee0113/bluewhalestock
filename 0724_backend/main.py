#flask basic import
import DBManager as DB
from flask import Flask, render_template, request, json, jsonify
#time and time import
import datetime as dt
import mysql.connector
import datetime
import time
from dateutil.relativedelta import relativedelta



#google cors 跨網域API

from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/.*": {"origins": ["http://43.254.19.106:8080/",
     "http://bluewhale-stock.tw", "https://43.254.19.106:8080/", "https://bluewhale-stock.tw"]}})
#DB CRUD method import


COMMAND_SETTING = {}
with open("mode_command.json", encoding="utf-8") as f:
    COMMAND_SETTING = json.load(f)

CONNECT_INFO = {

    "host": "localhost",
    "user": "bluewhal_yih",
    "password": "r0g{bYg+([jd"
}


@app.route('/')
def index_page():
    return render_template("index.html")


def decode_values(values):
    for i in range(0, len(values)):
        values[i] = list(values[i])
    for i in range(0, len(values)):
        for j in range(0, len(values[i])):
            try:
                if type(values[i][j]) != type("str"):
                    values[i][j] = values[i][j].decode("UTF-8")
            except Exception:
                pass
                # print("'"+str(values[i][j])+"'wrong:"+str(type(values[i][j])))
    return values

# ------------------------

@app.route('/simple', methods=['POST'])
def simple():  # 獲取資料庫資料 (database table clumn condition) 搜尋 新資訊
    if request.method == 'POST':
        account_id = request.form.get('account_id')
        leftNavID = request.form.get("leftNavID")
        middleNavID = request.form.get("middleNavID")
        topNavID = request.form.get("topNavID")
        dataMode = int(request.form.get("dataMode"))

        commandDict = COMMAND_SETTING[leftNavID][middleNavID][dataMode]
        now_DB = DB.DBManager(CONNECT_INFO, commandDict["database"])
        values = now_DB.get_data_by_command(commandDict["command"])

    return jsonify({"values": values})



@app.route('/industry_query', methods=['POST'])
def industry_query():
    account_id = request.form.get('account_id')
    left_nav = request.form.get('left_nav')
    left_small_nav = request.form.get("left_small_nav")
    top_nav_name = request.form.get("top_nav_name")
    mode = request.form.get("mode")
    if mode == "*":
        mode_str = "all_command"

    with open("mode_command.json", encoding="utf-8") as f:
        data = json.load(f)

    values = []

    info = []

    if left_nav == "JhangDieZongLan":
        try:
            command = data[left_nav][mode_str]
            command = command.replace("'data_name'", f"'{top_nav_name}'")
            print(command)
            now_database = DB.DBManager(CONNECT_INFO, "bluewhal_Basedata")
            values = now_database.get_data_by_command(command)
            values = decode_values(values)
            print(values)
        except KeyError:
            command = "key not find"
            values = "key not find"
        finally:
            return jsonify({"values": values})
    elif left_nav == "YingShouZongLan":
        values3 = []
        try:
            command1 = data[left_nav]["cmd_1"]
            command1 = command1.replace("'data_name'", f"'{top_nav_name}'")
            now_database = DB.DBManager(CONNECT_INFO, "bluewhal_Basedata")
            values1 = now_database.get_data_by_command(command1)
            values1 = decode_values(values1)

            print(values1)


            _month = data[left_nav]["_months"]
            start_time = datetime.datetime.now() - relativedelta(months=_month)
            end_time = datetime.datetime.now() - relativedelta(months=1)

            start_date = start_time.strftime("%Y-%m")
            end_date = end_time.strftime("%Y-%m")

            month_info = []
            for j in range(_month):
                month_str = (end_time-relativedelta(months=j)
                                ).strftime("%Y-%m")
                month_info.append(str(month_str))

            info = {
                "month_info":month_info,
                "stock_info":values1
            }



            now_database = DB.DBManager(CONNECT_INFO, "bluewhal_Revenue")


            values = {}
            for i in values1:
                command2 = data[left_nav]["cmd_2"]
                command2 = command2.replace("'data_name1'", f"{i[1]}")
                command2 = command2.replace("'data_name2'", start_date)
                command2 = command2.replace("'data_name3'", end_date)
                print(command2)
                try:
                    values2 = now_database.get_data_by_command(command2)
                    values2 = decode_values(values2)
                except Exception:
                    values2 = []

                print("values2", values2)
                
                values[i[1]] = values2
        except KeyError:
            command = "key not find"
            values = "key not find"
            print("error")
            values3 = []
        finally:
            return jsonify({"values": values,"info":info})
    elif left_nav == "QuanZhiGeGu":
        try:
            dataname = data[left_nav][left_small_nav]
            command = data[left_nav][mode_str]
            command = command.replace("'data_name'", f"{dataname}")
            now_DB = DB.DBManager(CONNECT_INFO, "bluewhal_Basedata")
            info = now_DB.get_data_by_command(command)
            info = decode_values(info)
            print(info)

            values = {

            }

            for i in info:
                dataname = f"`{i[0]}`"
                command = data[left_nav]["cmd_2"]
                command = command.replace("'data_name'", f"{dataname}")
                print(command)
                now_DB = DB.DBManager(CONNECT_INFO, "bluewhal_StockPrice")
                values2 = now_DB.get_data_by_command(command)
                values2 = decode_values(values2)
                values[i[0]] = values2
                print(values2)

        except KeyError:
            command = "key not find"
            values = "key not find"
        finally:
            return jsonify({"values": values, "info": info})
    elif left_nav == "GeGuGuJia":
        try:
            command = data[left_nav][mode_str]
            command = command.replace("'data_name'", f"'{top_nav_name}'")
            now_DB = DB.DBManager(CONNECT_INFO, "bluewhal_Basedata")
            info = now_DB.get_data_by_command(command)
            info = decode_values(info)
            print(info)

            values = {


            }

            for i in info:
                dataname = f"`{i[0]}`"
                command = data[left_nav]["cmd_2"]
                command = command.replace("'data_name'", f"{dataname}")
                print(command)
                now_DB = DB.DBManager(CONNECT_INFO, "bluewhal_StockPrice")
                values2 = now_DB.get_data_by_command(command)
                values2 = decode_values(values2)
                values[i[0]] = values2
                print(values2)

        except KeyError:
            command = "key not find"
            values = "key not find"
            info = "no info"
        finally:
            return jsonify({"values": values, "info": info})



@app.route('/stock_data', methods=['POST'])
def stock_data():#個股資訊頁面
    if request.method == 'POST':
        stock_num = request.form.get('stock_num')
        base_database_name = DB.DBManager(CONNECT_INFO,"bluewhal_Basedata")
        try:
            values = base_database_name.get_data(
                "basedata", ["天搜尋次數","公司代號","公司簡稱","公司名稱","住址","網址","成立日期","上市日期","市值","實收資本額","總共搜尋次數"], f"公司代號 = {stock_num}")
            stock_day_search_amount = values[0][0]
            print(stock_day_search_amount)
            retrun_stock_day_search_amount = int(stock_day_search_amount) + 1
    
            base_database_name.update_data(
                "basedata", f"天搜尋次數 = {retrun_stock_day_search_amount}", f"公司代號 = {stock_num}")

            now_DB = DB.DBManager(CONNECT_INFO, "bluewhal_StockPrice")

            k_link_data = now_DB.get_data_by_command(f"SELECT `日期`,`開盤價`,`收盤價`,`最低價`,`最高價`,`成交量` FROM `{stock_num}` WHERE 1")
            k_link_data = decode_values(k_link_data)

            output = {
                "stock_info": values,
                "k_link_data": k_link_data
            }

        except IndexError:
            output = {
                "stock_info": "",
                "k_link_data": ""
            }
        return jsonify(output)
@app.route('/stock_search', methods=['POST'])
def stock_search():#關鍵字搜尋
    if request.method == 'POST':
        search_mode = request.form.get('search_mode')
        search_keyword = request.form.get('search_keyword')

        with open("mode_command.json", encoding="utf-8") as f:
            data = json.load(f)

        if search_mode == "name":
            command = data["stock_search"]["search_by_name"]
            command = command.replace("'data_name'", f"'{search_keyword}'")
        elif search_mode == "num":
            command = data["stock_search"]["search_by_num"]
            command = command.replace("'data_name'", f"'{search_keyword}'")
            
        now_DB = DB.DBManager(CONNECT_INFO,"bluewhal_Basedata")
        values = now_DB.get_data_by_command(command)
        values = decode_values(values)
        return jsonify({"values": values})

#run server
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5107, debug=True)
