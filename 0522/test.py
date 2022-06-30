import datetime
from dateutil.relativedelta import relativedelta
_month = 5
start_time = datetime.datetime.now() - relativedelta(months=_month)
end_time = datetime.datetime.now() - relativedelta(months=1)
print(start_time.strftime("%Y-%m"))
print(end_time.strftime("%Y-%m"))


# print('Today: ',datetime.today().strftime('%d/%m/%Y'))
# print('After Month:', date_after_month.strftime('%d/%m/%Y'))