# Just Connect
from flask_mysqldb import MySQL
from flask import Flask, request, make_response
import json

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '988991495dD'
app.config['MYSQL_DB'] = 'meumenu'

mysql = MySQL(app)

conn = mysql.connection
