CREATE SCHEMA IF NOT EXISTS aerio;

CREATE TABLE IF NOT EXISTS aerio.overview (
  product_id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price DECIMAL(6,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

CREATE TYPE feature_type AS (
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS aerio.individual_product (
  product_id INTEGER REFERENCES aerio.overview(product_id),
  name VARCHAR(255) REFERENCES aerio.overview(name),
  slogan VARCHAR(255) REFERENCES aerio.overview(slogan),
  description VARCHAR(255) REFERENCES aerio.overview(description),
  category VARCHAR(255) REFERENCES aerio.overview(category),
  default_price INTEGER,
  created_at TIMESTAMP REFERENCES aerio.overview(created_at),
  updated_at TIMESTAMP REFERENCES aerio.overview(updated_at),
  features feature_type[],
  CONSTRAINT fk_individual_product_product_id
    FOREIGN KEY (product_id)
    REFERENCES aerio.overview(product_id)
 );

CREATE TYPE photo_info AS (
  thumbnail_url VARCHAR(255),
  url VARCHAR(255)
);

CREATE TYPE sku_info AS (
  quantity INTEGER,
  size VARCHAR(255)
);

 CREATE TABLE IF NOT EXISTS aerio.styles (
  product_id INTEGER REFERENCES aerio.overview(product_id),
  style_id INTEGER,
  name VARCHAR(255) NOT NULL,
  original_price INTEGER REFERENCES aerio.overview(default_price),
  sale_price INTEGER,
  photos photo_info[5],
  skus sku_info,
  CONSTRAINT fk_styles_product_id
    FOREIGN KEY (product_id)
    REFERENCES aerio.overview(product_id)
 );