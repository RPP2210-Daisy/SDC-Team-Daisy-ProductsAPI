CREATE SCHEMA overviewSchema;

CREATE TABLE overviewSchema.overview (
  id: SERIAL PRIMARY KEY,
  campus: hr-rpp
  name: VARCHAR(255) NOT NULL,
  slogan: VARCHAR(255) NOT NULL,
  description: VARCHAR(255) NOT NULL,
  category: VARCHAR(255) NOT NULL,
  default_price: INTEGER,
  created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP,,
 );

 CREATE TABLE overviewSchema.individualProduct (
  all of items from overviewSchema
  features: [
    feature: VARCHAR(255) NOT NULL,
    value: VARCHAR(255) NOT NULL,
  ],
 );

 CREATE TABLE overviewSchema.styles (
  product_id = foreign key from overviewSchema
  results: [
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default?: Boolean,
    photos: [
      {
        thumbnail_url: String,
        url: String,
      },
    ],
    skus: {
    "2580526": {
        quantity: Number,
        "size": "XS"
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

 CREATE TABLE overviewSchema.relatedProducts (
  [
    Number
  ]
 );