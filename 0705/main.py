from flask import Flask, render_template, request, json, jsonify
import time

app = Flask(__name__)



@app.route('/')
def index_page():
    return render_template("candlestick-brush.html")
@app.route('/get_data')
def get_data():
    with open("static/data/stock-DJI.json") as file:
        data = json.load(file)
    return jsonify(data["data"])
#run server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)