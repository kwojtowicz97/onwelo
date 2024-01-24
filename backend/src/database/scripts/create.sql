CREATE DATABASE onwelo;

USE onwelo;

CREATE TABLE exchange_rates (
  id INT PRIMARY KEY,
  rate FLOAT,
  price_pln FLOAT,
  table_no VARCHAR(255)
);

CREATE TABLE authors (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE ebooks (
  id INT PRIMARY KEY,
  name INT,
  title VARCHAR(255),
  price_usd FLOAT,
  date DATE,
  exchange_rate INT,
  FOREIGN KEY (exchange_rate) REFERENCES exchange_rates(id)
);

CREATE TABLE ebooks_authors (
  ebook_id INT,
  author_id INT,
  PRIMARY KEY (ebook_id, author_id),
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
