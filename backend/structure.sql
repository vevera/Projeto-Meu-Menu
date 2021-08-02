CREATE TABLE store (
	id serial PRIMARY KEY,
	name text NOT NULL,
	phone text NOT NULL,
	email text UNIQUE NOT NULL,
	password text NOT NULL,
	specialtys text[] NOT NULL,
	adress_country text NOT NULL,
	adress_city text NOT NULL,
	adress_borough text NOT NULL,
	adress_street text NOT NULL
);


CREATE TABLE schedule (
	id serial PRIMARY KEY,
	store_id integer NOT NULL,
	dow_start integer NOT NULL,
	dow_end integer NOT NULL,
	opens_at interval NOT NULL,
	closes_at interval NOT NULL,

	CHECK (closes_at > opens_at),
	CHECK (dow_end >= dow_start),
	CHECK (opens_at BETWEEN interval '0 hour' AND interval '24 hour'),
	CHECK (closes_at BETWEEN interval '0 hour' AND interval '24 hour'),

	FOREIGN KEY (store_id)
		REFERENCES store (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE category (
	id serial PRIMARY KEY,
	name text UNIQUE NOT NULL,
	description text NOT NULL,
	store_id integer NOT NULL,

	FOREIGN KEY (store_id)
		REFERENCES store (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE product (
	id serial PRIMARY KEY,
	name text UNIQUE NOT NULL,
	description text,
	price double precision NOT NULL,
	photo bytea,
	category_id integer NOT NULL,

	FOREIGN KEY (category_id)
		REFERENCES category (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


CREATE TABLE client (
	id serial PRIMARY KEY,
	name text NOT NULL,
	phone text NOT NULL,
	email text UNIQUE NOT NULL,
	password text NOT NULL
);


CREATE TABLE request (
	id serial PRIMARY KEY,
	client_id integer NOT NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),

	FOREIGN KEY (client_id)
		REFERENCES client (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE request_product (
	request_id integer NOT NULL,
	product_id integer NOT NULL,
	quantity integer NOT NULL,
	price_per_unit double precision,

	FOREIGN KEY (request_id)
		REFERENCES request (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,

	FOREIGN KEY (product_id)
		REFERENCES product (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);