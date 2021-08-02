#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import psycopg2
import backoff

from pandas import read_sql, Period
from os import path

from psycopg2.pool import ThreadedConnectionPool as ConnPool
from psycopg2.sql import SQL
from psycopg2.extensions import register_adapter, AsIs, QuotedString
from psycopg2.extras import Json, register_default_json, register_default_jsonb

import numpy as np


# Register Psycopg2 adapters for numpy datatypes
typs = ['int8', 'int16', 'int32', 'int64',
		'float16', 'float32', 'float64', 'float128']
for typ in typs:
	try: register_adapter(np.__getattribute__(typ), AsIs)
	except: pass

# Register Psycopg2 adapter for pandas Period
register_adapter(Period, lambda x: QuotedString(str(x)))

# Register Psycopg2 adapter for json, jsonb
register_adapter(dict, Json)
register_default_json()
register_default_jsonb()


class DatabaseDAO(ConnPool):
	"""
	A class for database queries based on pyscopg2.pool.

	Inherits from pyscopg2.pool.ThreadedConnectionPool, this class is used in a multithreaded environment.
	i.e., the connection pool created using this class can be shared between multiple threads.

	See usage examples in:
	http://bookstack.delfos.im/books/biblioteca-delfos/page/classe-databasedao---acesso-ao-banco-de-dados

	Attributes
	----------
	- nconn [int]: Number of connections. Default: 1.
	- autocommit [Bool]: Auto commit changes (I guess). Default: True.
	- DEBUG [Bool]: Print query info and row count. Default: True.
	- client_tag [str]: Client tag, if wanted. Default: 'not_tagged'.
	- client_id []: Client id, if wanted. Default: None.
	- retries [int]: Number of max retries, if wanted. When default there is no limit. Default: None.

	Methods
	-------
	- read_query(query, params=None, index_col=None): Read SQL query or database table into a DataFrame.
	- execute_query(query, params=None):
	- get_version(): Returns version of SQL.
	"""

	def __init__(self, nconn=1, autocommit=True, DEBUG=True, client_tag='not_tagged',
				 client_id=None, retries=None, **kwargs):
		"""Initialize the class and super-class."""

		if 'application_name' not in kwargs:
			kwargs['application_name'] = 'DatabaseDAO'

		super().__init__(nconn, nconn, **kwargs)

		self.kwargs = kwargs
		self.client_tag = client_tag
		self.client_id = client_id
		self.nconn = nconn
		self.DEBUG = DEBUG
		self.autocommit = autocommit
		self.retries = retries

		if autocommit:
			for conn in self._pool:
				conn.autocommit = True

	def read_query(self, query, params=None, index_col=None):
		"""
		Read SQL query or database table into a DataFrame.

		Parameters
		----------
		- query [str or Object]: str or SQLAlchemy Selectable (select or text object) SQL query to be executed or a table name.
		- params [list, tuple or dict]: List of parameters to pass to execute method.
		The syntax used to pass parameters is database driver dependent. Default: None.
		- index_col [str or list of str]: Column(s) to set as index(MultiIndex). Default: None

		Returns
		-------
		- data [Dataframe]: DataFrame or Iterator[DataFrame] of query data.
		"""
		def _internal(self, query, **args):
			data = None

			try:
				conn = self.getconn()
				if self.DEBUG:
					with conn.cursor() as curr:
						query = curr.mogrify(query, params)
						print(query.decode('utf-8', 'ignore'))
					data = read_sql(query, conn, index_col=index_col)
				else:
					data = read_sql(query, conn, params=params, index_col=index_col)

			except Exception as error:
				print(error)
				raise error

			finally:
				self.putconn(conn)

			return data

		if self.retries:
			@backoff.on_exception(backoff.expo, psycopg2.OperationalError, max_tries=self.retries)
			def _retry_internal(self, query, **args):
				return _internal(self, query, **args)

			return _internal(self, query, params=None, index_col=None)

		else:
			return _internal(self, query, params=None, index_col=None)

	def execute_query(self, query, params=None):
		"""
		Execute query with parameters.

		Parameters
		----------
		- query [str]: query string to cursor execute.
		- params []: params  to cursor execute. Default: None.

		Returns
		-------
		- rowcount [int]: Number of rows on cursor after execute query.
		"""
		def _internal(self, query, **args):
			try:
				conn = self.getconn()
				with conn.cursor() as curr:
					if self.DEBUG:
						query = curr.mogrify(query, params)
						print(query.decode('utf-8', 'ignore'))
						curr.execute(query)
					else:
						curr.execute(query, params)
					rowcount = curr.rowcount
					if self.DEBUG:
						print('\nROWCOUNT: ' + str(rowcount) + '\n')

			except Exception as error:
				print(error)
				raise error

			finally:
				self.putconn(conn)

			return rowcount

		if self.retries:
			@backoff.on_exception(backoff.expo, psycopg2.OperationalError, max_tries=self.retries)
			def _retry_internal(self, query, **args):
				return _internal(self, query, **args)

			return _internal(self, query, params=None, index_col=None)

		else:
			return _internal(self, query, params=None, index_col=None)

	def get_version(self):
		"""
		Returns version of SQL.

		Returns
		-------
		- [int]: version of SQL."""
		query = SQL("SELECT version()")
		return self.read_query(query).version[0]
