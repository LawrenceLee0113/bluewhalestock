from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
class mail():
    def __init__(self,title="this is title",text="this is content"):
        self.sender = "bluewhalestock2021@gmail.com"#你的gmail
        self.sender_key = "vlzmykbversjrnig"##你的應用程式密碼
        self.content = MIMEMultipart()  #建立MIMEMultipart物件
        self.content["subject"] = title  #郵件標題
        self.content["from"] = self.sender  #寄件者
        self.content.attach(MIMEText(text))  #郵件內容
    def send(self,to = None):
        if to == None:
            print("u need type some email")
        else:
            self.content["to"] = to
            with smtplib.SMTP(host="smtp.gmail.com", port="587") as smtp:  # 設定SMTP伺服器
                try:
                    smtp.ehlo()  # 驗證SMTP伺服器
                    smtp.starttls()  # 建立加密傳輸
                    smtp.login(self.sender, self.sender_key)  # 登入寄件者gmail
                    smtp.send_message(self.content)  # 寄送郵件
                    print("Complete!")
                except Exception as e:
                    print("Error message: ", e)
                
            