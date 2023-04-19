CREATE SCHEMA IF NOT EXISTS aerio;

CREATE TABLE IF NOT EXISTS aerio.overview (
  product_id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS aerio.features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES aerio.overview(product_id),
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS aerio.styles (
 id SERIAL PRIMARY KEY,
 product_id INTEGER REFERENCES aerio.overview(product_id),
 name VARCHAR(255) NOT NULL,
 sale_price INTEGER,
 original_price INTEGER,
 default_style INTEGER,
 photos photo_info[5],
 skus sku_info
);

CREATE TABLE IF NOT EXISTS aerio.skus (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  size VARCHAR(255),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS aerio.photos (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  url TEXT,
  thumbnail_url TEXT
);

