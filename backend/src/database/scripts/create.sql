CREATE DATABASE onwelo;

USE onwelo;

CREATE TABLE exchange_rates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rate FLOAT,
  date DATE,
  table_no VARCHAR(255)
);

CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  apple_id BIGINT,
  name VARCHAR(255)
);

CREATE TABLE ebooks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  apple_id BIGINT,
  artist_id BIGINT,
  title VARCHAR(255),
  currency VARCHAR(255),
  price_usd FLOAT,
  price_pln FLOAT,
  relase_date DATE,
  exchange_rate_id INT,
  FOREIGN KEY (exchange_rate_id) REFERENCES exchange_rates(id),
  FOREIGN KEY (artist_id) REFERENCES authors(id)
);
