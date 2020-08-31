import tablib
import os
global file_name,dir

# file_name = f"{int(datetime.timestamp(datetime.now()))}_report..xlsx"
file_name = "report.xlsx"
dir = os.path.join(os.getcwd(),"fuprox","reports")
root_file = os.path.join(dir,file_name)
# TEST
headers = ("firstname","lastname")
data = [("Denis", "Wambui"), ("Mark", "Kiruku")]
data_ = tablib.Dataset(*data, headers=headers)
with open(root_file, 'wb') as f:
    f.write(data_.export('xlsx'))
    # send_file(file)
