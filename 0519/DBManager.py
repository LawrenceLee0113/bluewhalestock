import mysql.connector
class DBManager:
    def __init__(self,host,user,password,database):
        self.mysql_connection = mysql.connector.connect(host=host,user=user,password=password,database=database)
        self.database_name = database
    def close_cursor(self):
        self.cursor.close()
    def open_cursor(self):
        self.cursor = self.mysql_connection.cursor()
    def get_data(self,table_name,data_name = ["*"],condition="1"):
        self.open_cursor()
        get_data_str = ",".join(data_name)
        print(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        self.cursor.execute(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        a = self.cursor.fetchall()
        self.close_cursor()
        return a
    def insert_data(self,table_name,columns=[],datas=[]):
        self.open_cursor()
        column_names = ",".join(columns)
        data_names = "\",\"".join(datas)
        sql_str = f"INSERT INTO {table_name} ({column_names}) VALUES (\"{data_names}\")"
        print(sql_str)
        self.cursor.execute(sql_str)
        self.mysql_connection.commit()
        self.close_cursor()
        # UPDATE `base` SET `名字`="lawrencelee" WHERE `名字`="lawlaw"
    def update_data(self,table_name,action="",condition=""):
        self.open_cursor()
        sql_str = f"UPDATE {table_name} SET {action} WHERE {condition}"
        print(sql_str)
        self.cursor.execute(sql_str)
        self.mysql_connection.commit()
        self.close_cursor()
        # DELETE FROM base WHERE `名字`="jacky"
    def delete_data(self,table,condition):
        self.open_cursor()
        sql_str = f"DELETE FROM {table} WHERE {condition}"
        print(sql_str)
        self.cursor.execute(sql_str)
        self.mysql_connection.commit()
        self.close_cursor()
    def get_data_by_command(self,command):
        self.open_cursor()
        self.cursor.execute(command)
        a = self.cursor.fetchall()
        self.close_cursor()
        return a
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
