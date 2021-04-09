#!/usr/bin/python
"""User Verification - verifies that the Bank Ops user is still an employee in Mineraltree. 
If they are not, write sql to lock their access"""

import csv
import codecs
import re
import mysql.connector
import os
import traceback
import time
import logging
import beautifultable
import sys
from mysql.connector import Error, errorcode

dbUser = "xx"
dbPass = "XXXXXX"
dbHost = "127.0.0.1"
dbName = "oak_payment"  
port = "3313"
command = "select id from company limit 1;"

def connectToSqlDb(dbUser,dbPass,dbName,dbHost):
  try:
    logging.info("Connecting to " + dbHost + " ...")
    cnx = mysql.connector.connect(user=dbUser,password=dbPass,host=dbHost,database=dbName, port=port)
    cursor = cnx.cursor()
    return cursor, cnx
  except mysql.connector.Error as error:
    print("error")
cursor, cnx = connectToSqlDb(dbUser,dbPass,dbName,dbHost)

def runCommand(cnx, cursor, command):
  cursor.execute(command)
  result = cursor.fetchone()
  print(result)
#execution
connectToSqlDb(dbUser,dbPass,dbName,dbHost)
runCommand(cnx, cursor, command)