import mysql.connector
class DBManager:
    def __init__(self,host,user,password,database):
        self.mysql_connection = mysql.connector.connect(host=host,user=user,password=password,database=database)
        self.cursor = self.mysql_connection.cursor()
        self.database_name = database
    def get_data(self,table_name,data_name = ["*"],condition="1"):
        get_data_str = ",".join(data_name)
        print(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        self.cursor.execute(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        a = self.cursor.fetchall()
        return a
    def insert_data(self,table_name,columns=[],data_name=[]):
        print("{colums}")
        # self.cursor.execute(f"INSERT INTO {table_name} ()")
class tool:
    def __init__(self):
        print("creat tool")
    def string_to_list(self,string,c = ","):
        return list(string.split(c))

class databases:
    def __init__(self,host,user,password):
        self.host = host
        self.user = user
        self.password = password
    def set_databases(self,database_names):
        self.databases_dic={}
        for database_name in database_names:
            nowDB = DBManager(host=self.host,user=self.user,password=self.password,database=database_name)
            self.databases_dic[database_name] = nowDB
    def database(self,database_name):
        return self.databases_dic[database_name]
