# -*- coding: utf-8 -*-
"""
Created on Wed Nov 24 13:34:07 2021

@author: hossa
"""


from datetime import *
from datetime import datetime
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import json

import mysql
from mysql import connector



app = Flask(__name__)
CORS(app)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})


conn = connector.connect(
  host="localhost",
  user="root",
  password="pass",
  database="ece451"
)
cursor = conn.cursor()
cursor2 = conn.cursor()  




@app.route('/loginpat', methods=['POST'])
def patient_login():
  userName=(request.json["username"])
  password=(request.json["password"])
  cursor.execute('SELECT * FROM patients WHERE username=%s AND password=%s;',(userName,password))
  r=cursor.fetchall()
  if (len(r)==0):
      #return "FAILED"
      return jsonify(
        found="false"
        )
  elif (len(r)==1):
      return patientPage(r)

def patientPage(results):
    fname=results[0][0]
    pid=results[0][1]
    phone=results[0][2]
    city=results[0][4]
    country=results[0][5]
    birthYear=results[0][9]
    dose1status=0
    dose1hour=None
    dose1minute=None
    dose1date=None
    
    cursor.execute('SELECT * FROM Doses WHERE pid=%s AND doseNumber=1;',(pid,))
    r=cursor.fetchall()
    if (len(r)==0):
      #return "FAILED"
      dose1status=0
      dose1date=None
    else :
      dose1date=r[len(r)-1][3]
      dose1hour=8+int(r[len(r)-1][4]/60)
      dose1minute=int(r[len(r)-1][4]%60)
      dose1status=r[len(r)-1][5]
      
    dose2date=None
    dose2hour=None
    dose2minute=None
    dose2status=0
    cursor.execute('SELECT * FROM Doses WHERE pid=%s AND doseNumber=2;',(pid,))
    r2=cursor.fetchall()
    if (len(r2)==0):
      #return "FAILED"
      dose2status=0
    else:
      dose2date=r2[len(r2)-1][3]
      dose2hour=8+int(r[len(r)-1][4]/60)
      dose2minute=int(r[len(r)-1][4]%60)
      dose2status=r2[len(r2)-1][5]
     
    return jsonify(
         found=True,
         fname=results[0][0],
         pid=results[0][1],
         phone=results[0][2],
         city=results[0][4],
         country=results[0][5],
         email=results[0][3],
         medicalConditions=results[0][6],
         birthYear=results[0][9],
         dose1status=dose1status,
         dose1hour=dose1hour,
         dose1minute=dose1minute,
         dose1date=dose1date[0:6],
         dose2status=dose2status,
         dose2hour=dose2hour,
         dose2minute=dose2minute,
         dose2date=dose2date
         )



@app.route('/registerp', methods=['POST'])
def paat_reg():
  fname=(request.json["name"])
  pid=(request.json["id"])
  number=(request.json["number"])
  email=(request.json["email"])
  city=(request.json["city"])
  country=(request.json["country"])
  mc=(request.json["medicalConditions"])
  username=(request.json["username"])
  password=(request.json["password"])
  birthyear=(request.json["birthyear"])
  
  cursor.execute('SELECT * FROM patients WHERE username=%s ;',(username,))
  r2=cursor.fetchall()
  if (len(r2)!=0):
      #return "FAILED"
      return jsonify(
          Added=False,
          msg="username already exist"
          )
  try:
      cursor.execute('INSERT INTO patients (fullName,id,phoneNumber,email,city,country,medicalConditions,username,password,birthyear) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',(fname,pid,number,email,city,country,mc,username,password,birthyear))
      conn.commit()
      cursor.execute('SELECT * FROM patients WHERE username=%s ;',(username,))
      r2=cursor.fetchall()
      y=regdose12(r2)
      jss=y.json
      return jsonify(
                  Added=True,
                  email=email,
                  dayToBook=jss['dayToBook'],
                  Hour=jss['Hour'],
                  Minute=jss['Minute'],
                  name=fname,
                  )
  except Exception as e:
              return jsonify(
                  Added=False,
                  msg="user not added"+str(e)
                  )




@app.route('/viewdoses', methods=['GET'])
def dosedata():
      cursor.execute('SELECT * FROM Doses where doseStatus!=%s',("Completed",))
      r=cursor.fetchall()
      dose_data=[]
      for row in r:
          print(row)
          dose_data.append(list(row)) 
      return jsonify(
          incomplete_doses=dose_data         
          )


def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True

@app.route('/loginmed', methods=['POST'])
def med_login():
  username=(request.json["username"])
  password=(request.json["password"])
  cursor.execute('SELECT * FROM MedPersonnel WHERE username=%s AND password=%s ;',(username,password))
  r=cursor.fetchall()
  if (len(r)==0):
      return jsonify(
        found=False
        )
  elif (len(r)==1):
      cursor.execute('SELECT * FROM patients')
      r=cursor.fetchall()
      pat_data=[]
      for row in r:
          print(row)
          pat_data.append(list(row)) 
      cursor.execute('SELECT * FROM Doses where doseStatus!=%s',("Completed",))
      r=cursor.fetchall()
      dose_data=[]
      for row in r:
          print(row)
          dose_data.append(list(row)) 
      return jsonify(
          found=True,
          patients=pat_data,
          incomplete_doses=dose_data         
          )


@app.route('/', methods=['GET'])
def hello_world():
 return "sent from flask"

@app.route('/ab', methods=['GET'])
def helo_world():
 return jsonify(
          found=True,
          ac="aa",
          )


@app.route('/loginadmin', methods=['POST'])
def admin_login():
  username=(request.json["username"])
  password=(request.json["password"])
  cursor.execute('SELECT * FROM Admins WHERE username=%s AND password=%s ;',(username,password))
  r=cursor.fetchall()
  if (len(r)==0):
      #return "FAILED"
      return jsonify(
        found=False
        )
  elif (len(r)==1):
      cursor.execute('SELECT * FROM patients')
      r=cursor.fetchall()
      pat_data=[]
      for row in r:
          print(row)
          pat_data.append(list(row)) 
      cursor.execute('SELECT * FROM MedPersonnel')
      r=cursor.fetchall()
      med_data=[]
      for row in r:
          print(row)
          med_data.append(list(row))
      return jsonify(
          found=True,
          patients=pat_data,
          meds=med_data
          )


@app.route('/confirm', methods=['POST'])
def confirm():
  id=(request.json["id"])
  try:    
      cursor.execute('SELECT doseNumber, pid, pname, doseStatus FROM Doses WHERE id=%s ;',(id,))
      r=cursor.fetchall()
      if (r[0][3]=="Completed"):
          return jsonify(
          Updated=False,
          msg="Already confirmed"
          )
      cursor.execute('UPDATE Doses SET doseStatus=%s WHERE id=%s ;',("Completed",id))
      conn.commit()
      #if dose 1 was just confirmed register for dose 2
      if (r[0][0]==1):
          return regdose12(r)
      return jsonify(
          Updated=True,
          updatedDose=2
          )

  except Exception as e:
      return jsonify(
          Updated=False,
          msg=str(e)
          )


@app.route('/addDose', methods=['POST'])
def dosee():
    
  pid=(request.json["pid"])
  pname=(request.json["pname"])
  doseNumber=(request.json["doseNumber"])
  #pid=10
  #doseNumber=1
  doseStatus="Pending"
  timeToBook=0
  dayToBook=0
  minuteToReserve=0
  
  
  cursor.execute('SELECT doseDay FROM Doses WHERE pid= %s AND doseNumber=%s AND doseStatus!=%s ;',(pid,doseNumber,'Cancelled'))
  r=cursor.fetchall()
  if (len(r)!=0):
      print("not 0! stop already booked")
      return jsonify(
          added=False,
          message="Already booked"
          )
  
  
  datetimeNOW= datetime.now()
  hourNOW=datetimeNOW.hour
  minuteNOW=datetimeNOW.minute
  
  Today=date.today() 
   
  cursor.execute('SELECT doseDay FROM Doses WHERE doseDay>= %s ORDER BY doseDay ASC ;',(Today,))
  r=cursor.fetchall()
  #print("len",r[0][0])
  if (len(r)==0):
      #we should book for Today
      print("len r is 0")
      if (hourNOW>=16):
          #shift is over, reserve tomorrow at 8
          dayToBook=(datetime.now() + timedelta(days=1))
          minuteToReserve=0
          #now check the database for that date and increment minute to reserve by 30
      
      elif (hourNOW<8):
          #shift hasnt started, reserve Today at 8
          dayToBook=Today
          minuteToReserve=0
  
      else:
       dayToBook=Today
       minuteToReserve= (hourNOW-8)*60+minuteNOW
       #if not multiple of 30
       #max minutes between 0 (8 am) and 600 (6 pm)
       #even if we are at 9:30 for example, we need to book it for 10
       minuteToReserve=int (minuteToReserve/30)*30+30
       
       #reserve this time slot
       
  elif (len(r)!=0):
      print("len r ! 0")
      #we can also check all dates to check for available time slots or go directly to the last date
      recentBookedDate=r[len(r)-1][0]
      #converting to date
      #recentBookedDate=datetime.fromisoformat(recentBookedDate)
      print("recent booked",recentBookedDate)
      print("current date", Today)
     
      cursor2 =conn.cursor() 
      cursor2.execute('SELECT doseTime FROM Doses WHERE doseDay= %s ORDER BY doseTime ASC ;',(recentBookedDate,))           
      r2=cursor2.fetchall()
      lastBookedTime=r2[len(r2)-1][0]
     
      #IF recent available date is greater than Today
      if (recentBookedDate>Today):
           print("recent>Today")
           print ("last booked time",lastBookedTime)
           if (lastBookedTime<600):
               dayToBook=recentBookedDate
               minuteToReserve=lastBookedTime+30
           else:
               dayToBook=(recentBookedDate + timedelta(days=1))
               timeToBook=0
               minuteToReserve=0
    
      elif (recentBookedDate==Today):
          print("recent=Today")
          #we should book for Today and we have bookings for Today
          if (hourNOW>16 or lastBookedTime==600):
              print("1st")
              dayToBook=(datetime.now() + timedelta(days=1))
              minuteToReserve=0
          #check if hour <8##
          else:
               print("2nd")
               dayToBook=Today
               minuteToReserve= (hourNOW-8)*60+minuteNOW
               #if not multiple of 30
               #max minutes between 0 (8 am) and 600 (6 pm)
               #even if we are at 9:30 for example, we need to book it for 10
               minuteToReserve=int (minuteToReserve/30)*30+30
               
               cursor2.execute('SELECT doseTime FROM Doses WHERE doseDay= %s AND doseTime >= %s ORDER BY doseTime ASC ;',(recentBookedDate,minuteToReserve))           
               r2=cursor2.fetchall()
               #if current time is greater than last booked time, we reserve next available to current time
               if (lastBookedTime<minuteToReserve):
                   print("last booked time",lastBookedTime)
                   minuteToReserve=minuteToReserve
               #if current time is less than last booked time, we choose last booked time+30
               else:
                   print("last booked timee",lastBookedTime)
                   minuteToReserve=lastBookedTime+30
                 #  for slot in r2:
                #      if (slot)
                #   minuteToReserve=r2[len(r2)-1][0]+30
                   
              
               #lastBookedTime=r2[len(r2)-1][0]
               
  try:
           cursor.execute('INSERT INTO Doses (pid,doseNumber,doseStatus,doseDay,doseTime,pname) values (%s,%s,%s,%s,%s,%s)',(pid,doseNumber,'Pending',dayToBook,minuteToReserve,pname))
           conn.commit()
           print("Dose added")
           print("Hour=",8+int(minuteToReserve/60),
               "Minute=",int(minuteToReserve%60))
           return jsonify (
               added=True,
               dayToBook=dayToBook,
               Hour=8+int(minuteToReserve/60),
               Minute=int(minuteToReserve%60)
               )
  except Exception as e:
              #print('Not inserted data, already inserted')
               print("Dose not added")
               print(e)
               return jsonify (
                      added=False,
                      message="not added try again"+str(e),
                      )
           
@app.route('/searchnumber', methods=['POST'])
def searchNumber():
  number=(request.json["number"])
  cursor.execute('SELECT * FROM patients WHERE phoneNumber=%s;',(number,))
  r=cursor.fetchall()
  if (len(r)==0):
      #return "FAILED"
      return jsonify(
        found="false"
        )
  elif (len(r)==1):
      return patientPage(r)

@app.route('/searchname', methods=['POST'])
def searchName():
  name=(request.json["name"])
  cursor.execute('SELECT * FROM patients WHERE fullName=%s;',(name,))
  r=cursor.fetchall()
  if (len(r)==0):
      #return "FAILED"
      return jsonify(
        found="false"
        )
  elif (len(r)==1):
      return patientPage(r)
            
               
def regdose12(r):
  
  pid=(r[0][1])
  pname=(r[0][2])
  doseNumber=2
  if (isinstance(r[0][0], int)):
      pid=(r[0][1])
      pname=(r[0][2])
      doseNumber=2
  else:
      pid=(r[0][1])
      pname=(r[0][0])
      doseNumber=1
  #pid=10
  #doseNumber=1
  doseStatus="Pending"
  timeToBook=0
  dayToBook=0
  minuteToReserve=0
  
  
  cursor.execute('SELECT doseDay FROM Doses WHERE pid= %s AND doseNumber=%s AND doseStatus!=%s ;',(pid,doseNumber,'Cancelled'))
  r=cursor.fetchall()
  if (len(r)!=0):
      print("not 0! stop already booked")
      return jsonify(
          added=False,
          message="Already booked"
          )
  
  
  datetimeNOW= datetime.now()
  hourNOW=datetimeNOW.hour
  minuteNOW=datetimeNOW.minute
  
  Today=date.today() 
   
  cursor.execute('SELECT doseDay FROM Doses WHERE doseDay>= %s ORDER BY doseDay ASC ;',(Today,))
  r=cursor.fetchall()
  #print("len",r[0][0])
  if (len(r)==0):
      #we should book for Today
      print("len r is 0")
      if (hourNOW>=16):
          #shift is over, reserve tomorrow at 8
          dayToBook=(datetime.now() + timedelta(days=1))
          minuteToReserve=0
          #now check the database for that date and increment minute to reserve by 30
      
      elif (hourNOW<8):
          #shift hasnt started, reserve Today at 8
          dayToBook=Today
          minuteToReserve=0
  
      else:
       dayToBook=Today
       minuteToReserve= (hourNOW-8)*60+minuteNOW
       #if not multiple of 30
       #max minutes between 0 (8 am) and 600 (6 pm)
       #even if we are at 9:30 for example, we need to book it for 10
       minuteToReserve=int (minuteToReserve/30)*30+30
       
       #reserve this time slot
       
  elif (len(r)!=0):
      print("len r ! 0")
      #we can also check all dates to check for available time slots or go directly to the last date
      recentBookedDate=r[len(r)-1][0]
      #converting to date
      #recentBookedDate=datetime.fromisoformat(recentBookedDate)
      print("recent booked",recentBookedDate)
      print("current date", Today)
     
      cursor2 =conn.cursor() 
      cursor2.execute('SELECT doseTime FROM Doses WHERE doseDay= %s ORDER BY doseTime ASC ;',(recentBookedDate,))           
      r2=cursor2.fetchall()
      lastBookedTime=r2[len(r2)-1][0]
     
      #IF recent available date is greater than Today
      if (recentBookedDate>Today):
           print("recent>Today")
           print ("last booked time",lastBookedTime)
           if (lastBookedTime<600):
               dayToBook=recentBookedDate
               minuteToReserve=lastBookedTime+30
           else:
               dayToBook=(recentBookedDate + timedelta(days=1))
               timeToBook=0
               minuteToReserve=0
    
      elif (recentBookedDate==Today):
          print("recent=Today")
          #we should book for Today and we have bookings for Today
          if (hourNOW>16 or lastBookedTime==600):
              print("1st")
              dayToBook=(datetime.now() + timedelta(days=1))
              minuteToReserve=0
          #check if hour <8##
          else:
               print("2nd")
               dayToBook=Today
               minuteToReserve= (hourNOW-8)*60+minuteNOW
               #if not multiple of 30
               #max minutes between 0 (8 am) and 600 (6 pm)
               #even if we are at 9:30 for example, we need to book it for 10
               minuteToReserve=int (minuteToReserve/30)*30+30
               
               cursor2.execute('SELECT doseTime FROM Doses WHERE doseDay= %s AND doseTime >= %s ORDER BY doseTime ASC ;',(recentBookedDate,minuteToReserve))           
               r2=cursor2.fetchall()
               #if current time is greater than last booked time, we reserve next available to current time
               if (lastBookedTime<minuteToReserve):
                   print("last booked time",lastBookedTime)
                   minuteToReserve=minuteToReserve
               #if current time is less than last booked time, we choose last booked time+30
               else:
                   print("last booked timee",lastBookedTime)
                   minuteToReserve=lastBookedTime+30
  try:
           cursor.execute('INSERT INTO Doses (pid,doseNumber,doseStatus,doseDay,doseTime,pname) values (%s,%s,%s,%s,%s,%s)',(pid,doseNumber,'Pending',dayToBook,minuteToReserve,pname))
           conn.commit()
           print("Dose added")
           print("Hour=",8+int(minuteToReserve/60),
               "Minute=",int(minuteToReserve%60))
           return jsonify (
               addedDose2=True,
               dayToBook=dayToBook,
               Hour=8+int(minuteToReserve/60),
               Minute=int(minuteToReserve%60),
               updatedDose=1,
               Updated=True
               )
  except Exception as e:
              #print('Not inserted data, already inserted')
               print("Dose not added")
               print(e)
               return jsonify (
                      addedDose2=False,
                      Updated=False,
                      message="not added try again"+str(e),
                      )
           
               
               
             




if __name__ == '__main__':
  print(__name__)  
  app.debug=True
 
#app.run(host = '192.168.0.107')  
#app.run(host = '0.0.0.0', port = 5000, debug = True, threaded = True)
app.run(host='0.0.0.0',port = 5000)

