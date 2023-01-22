# -*- coding: utf-8 -*-
"""
Created on Fri Nov 26 11:27:02 2021

@author: hossa
"""

from flask import Flask
from flask import request, jsonify
from datetime import date
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})

@app.route('/loginpat', methods=['POST'])
def patient_login():
  userName=(request.json["username"])
  password=(request.json["password"])
  if (userName==None):
      #return "FAILED"
      return jsonify(
        found=False
        )
  else:
      return jsonify(
          name="majd",
          city="Beirut")
  
@app.route('/addDose', methods=['POST'])
def dosee():
  pid=(request.json["pid"]) #patient id
  pname=(request.json["name"]) #patient name
  doseNumber=(request.json["doseNumber"])
  return jsonify(
               added=True,
               dayToBook=date.today(),
               Hour=8,
               Minute=120
               )



@app.route('/dummyfunction', methods=['GET'])
def he_world():
 return jsonify(
          found=True,
          ac="aa",
          )

@app.route('/loginmed', methods=['POST'])
def med_login():
   username=(request.json["username"])
   password=(request.json["password"])
   return jsonify(
          found=True,
          patients=[[
            "abdallah maarouf",
            1,
            3145654,
            "abd@gmail.com",
            "Saida",
            "Lebaon",
            "lactose intolerant",
            "am22",
            "abdmaa00",
            2000
        ],
        [
            "aa",
            2,
            70545124,
            "aa@gmail.com",
            "Saida",
            "Lebanon",
            "nut allergy",
            "aaa",
            "aaaa",
            2000
        ]
    ],
          incomplete_doses= [
        [
            1,
            1,
            1,
            "2021-11-25",
            0,
            "Pending"
        ],
        [
            2,
            55,
            1,
            "2021-11-25",
            30,
            "Pending"
        ]]        
          )


@app.route('/', methods=['GET'])
def hello_world():
 return "sent from flask"


if __name__ == '__main__':
  print(__name__)  
  app.debug=True
#app.run(host = '192.168.0.107')  
#app.run(host = '0.0.0.0', port = 5000, debug = True, threaded = True)
app.run(host='0.0.0.0',port = 5000)
