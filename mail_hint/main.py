# 每天偵測data => 寄送gmail
import mail as mail
# import DBManager as DBM
# import json

# def decode_values(values):
#     for i in range(0, len(values)):
#             values[i] = list(values[i])
#     for i in range(0, len(values)):
#         for j in range(0, len(values[i])):
#             try:
#                 if type(values[i][j]) == type(1):
#                     values[i][j] = str(values[i][j])
#                 if type(values[i][j]) == type(None):
#                     values[i][j] = str(values[i][j])
#             except Exception:
#                 print("'"+str(values[i][j])+"'wrong:"+str(type(values[i][j])))
#     return values
# def read_json():
#     with open("data.json","r") as file:
#         return json.load(file)
# def write_json(data):
#     with open("data.json","w") as file:
#         json.dump(data, file)

# newStock_DB = DBM.DBManager("localhost", "bluewhal_yih", "r0g{bYg+([jd","bluewhal_NewStock")

# data = read_json()
# stock_nums = data["otc_db"]["last_day_values"]
# condition = ""
# for i in stock_nums:
#     condition += f'`公司代號` = "{i}" OR '
# condition = condition[:-3]
# command = f'SELECT `公司代號`,`公司名稱`,`董事會通過日期`,`排序`,`備註` FROM `newstock_otc` WHERE ({condition}) AND `董事會通過日期` = "未定"'

# print(command)
# values = newStock_DB.get_data_by_command(command)
# values = decode_values(values)
# print("values",values)

# content = ""
# for i in values:
#     content += ",".join(i)+"\n"
# print(content)




# # ----------------------------------------------------------------
# values = newStock_DB.get_data_by_command('SELECT `公司代號` FROM `newstock_otc` WHERE `董事會通過日期` = "未定"')
# values = decode_values(values)

# data = read_json()
# for i in values:
#     for j in i:
#         data["otc_db"]["last_day_values"].append(j)
# write_json(data)


tos = ["bluewhalestock2021@gmail.com"]
for to in tos:
    this_mail = mail.mail("以下為傳送測試內容","傳送gmail on cpanel")
    this_mail.send(to)
