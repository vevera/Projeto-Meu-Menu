# Rewrite Database
from DatabaseDAO import DatabaseDAO

CONNECTION = {
    'host': 'localhost',
    'port': 5432,
    'database': 'postgres',
    'user': 'postgres',
    'password': 'CBeHf*n8ew4E'
}

conn = DatabaseDAO(**CONNECTION)
conn.DEBUG = False

conn.execute_query('SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = %s', ['meumenu'])
conn.execute_query('DROP DATABASE meumenu;')
conn.execute_query('CREATE DATABASE meumenu;')

CONNECTION = {
    'host': 'localhost',
    'port': 5432,
    'database': 'meumenu',
    'user': 'postgres',
    'password': 'CBeHf*n8ew4E'
}

conn = DatabaseDAO(**CONNECTION)
conn.DEBUG = False

with open('structure.sql') as f:
    sql = f.read()
    conn.execute_query(sql)

conn.DEBUG = True