import json
def get_comment(left_nav,top_nav,inner):
    with open("mode_command.json",encoding="utf-8") as f:
        data = json.load(f)
    try:
        command = data[left_nav][top_nav]
        command = command.replace("'data_name'",inner)
    except KeyError:
        command = "key not find"
    finally:
        print(command)
get_comment("INprsB","all_command","all_data_name")

# INprsB ==> 漲跌總攬
# INrevB ==> 營收總攬
# INrepB ==> 營收股價
# INinfB ==> 產業指數
# INpriB ==> 個股股價
# INallB ==> 總量報表
# INPERB ==> 本益總攬
# INdivB ==> 股利總攬