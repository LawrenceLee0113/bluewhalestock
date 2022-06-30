from flask import Flask, render_template, request, json, jsonify
import time
app = Flask(__name__)
from flask_cors import CORS
CORS(app, resources={r"/.*": {"origins": ["http://43.254.19.106:8080/","http://bluewhale-stock.tw"]}})
import DBManager as DB

tool = DB.tool()
databases = DB.databases("localhost","bluewhal_yih","r0g{bYg+([jd")
databases.set_databases(["bluewhal_Basedata","bluewhal_NewStock","bluewhal_Revenue","bluewhal_StockPrice"])


@app.route('/')
def index_page():
  return render_template("index.html")
    
@app.route('/get_data_base',methods=['GET', 'POST'])
def get_data_base():
  if request.method == 'GET':
    return jsonify({"message":"get_data_base_api"})
  elif request.method == 'POST':
    account_id = request.form.get('account_id')
    database_name = request.form.get("database_name")
    table_name = request.form.get("table_name")
    column_names = request.form.get("column_names")
    condition = request.form.get("condition")

    now_DB = databases.database(database_name)
    values = now_DB.get_data(table_name,tool.string_to_list(column_names),condition)
    return jsonify({"values":values})

@app.route('/write_data_base',methods=['POST'])
def get_data_base():
  account_id = request.form.get('account_id')
  database_name = request.form.get("database_name")
  table_name = request.form.get("table_name")
  column_names = request.form.get("column_names")
  condition = request.form.get("condition")

  now_DB = databases.database(database_name)
  values = now_DB.get_data(table_name,tool.string_to_list(column_names),condition)
  return jsonify({"values":values})
  
#run server
if __name__ == "__main__":
#   app.run(host='0.0.0.0', port=8080, debug=True,ssl_context='adhoc')
    app.run(host='0.0.0.0', port=8080, debug=True)