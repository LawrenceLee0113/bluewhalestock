import mysql.connector
class DBManager:
    def __init__(self,connect_info,database):
        self.mysql_connection = mysql.connector.connect(host=connect_info["host"],user=connect_info["user"],password=connect_info["password"],database=database,connection_timeout=3600)
        self.database_name = database
        self.cursor = self.mysql_connection.cursor()
    def get_data_by_command(self,sql_str):
        self.cursor = self.mysql_connection.cursor()
        self.cursor.execute(sql_str)
        a = self.cursor.fetchall()
        self.cursor.close()
        return a
    def get_data(self,table_name,data_name = ["*"],condition="1"):
        get_data_str = ",".join(data_name)
        print(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        self.cursor.execute(f"SELECT {get_data_str} FROM {table_name} WHERE {condition}")
        a = self.cursor.fetchall()
        return a
    def insert_data(self,table_name,columns=[],datas=[]):
        column_names = ",".join(columns)
        data_names = "\",\"".join(datas)
        sql_str = f"INSERT INTO {table_name} ({column_names}) VALUES (\"{data_names}\")"
        print(sql_str)
        self.cursor.execute(sql_str)
        values = self.cursor.fetchone()
        while values:
            print (values)
            values = self.cursor.fetchone()
        self.mysql_connection.commit()
        # UPDATE `base` SET `名字`="lawrencelee" WHERE `名字`="lawlaw"
    def update_data(self,table_name,action="",condition=""):
        sql_str = f"UPDATE {table_name} SET {action} WHERE {condition}"
        print(sql_str)
        self.cursor.execute(sql_str)
        values = self.cursor.fetchone()
        while values:
            print (values)
            values = self.cursor.fetchone()
        self.mysql_connection.commit()
        # DELETE FROM base WHERE `名字`="jacky"
    def delete_data(self,table,condition):
        sql_str = f"DELETE FROM {table} WHERE {condition}"
        print(sql_str)
        self.cursor.execute(sql_str)
        values = self.cursor.fetchone()
        while values:
            print (values)
            values = self.cursor.fetchone()
        self.mysql_connection.commit()