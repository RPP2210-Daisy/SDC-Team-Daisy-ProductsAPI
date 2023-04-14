CREATE SCHEMA IF NOT EXISTS overviewSchema;

CREATE TABLE IF NOT EXISTS overviewSchema.overview (
  product_id PRIMARY KEY,
  campus VARCHAR(255) DEFAULT 'hr-rpp',
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE IF NOT EXISTS overviewSchema.individualProduct (
  product_id INTEGER REFERENCES overview(product_id),
  campus VARCHAR(255) DEFAULT 'hr-rpp',
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  features: [
    {
      feature: VARCHAR(255) NOT NULL,
      value: VARCHAR(255) NOT NULL,
    }
  ] DEFAULT '{}',
 );

 CREATE TABLE IF NOT EXISTS overviewSchema.styles (
  product_id INTEGER REFERENCES overview(product_id),
  results [
    style_id INTEGER,
    name VARCHAR(255) NOT NULL,
    original_price INTEGER,
    sale_price INTEGER,
    default? BOOLEAN,
    photos [
      {
        thumbnail_url VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
      },
    ],
    //?
    skus: {
    NUMBER {
        quantity INTEGER,
        size VARCHAR(255) NOT NULL,
      },


    "2580527": {
        "quantity": 16,
        "size": "S"
      },
    "2580528": {
        "quantity": 17,
        "size": "M"
      },
    "2580529": {
        "quantity": 10,
        "size": "L"
      },
    "2580530": {
        "quantity": 15,
        "size": "XL"
      },
    "2580531": {
        "quantity": 4,
        "size": "XL"
      }
    }
  ]
 );

 CREATE TABLE IF NOT EXISTS overviewSchema.relatedProducts (
  product_id INTEGER REFERENCES overview(product_id),
  related_products INTEGER[]
 );