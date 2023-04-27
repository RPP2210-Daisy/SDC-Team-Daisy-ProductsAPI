require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./dist'));

const db = new Client({
  user: process.env.PSQL_USER,
  host: 'localhost',
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: 5432,
});

db.connect((e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(`Connected to PSQL DB: ${process.env.PSQL_DB}`);
  }
});

app.get('/products/', (req, res) => {
  const query = 'SELECT * FROM aerio.overview LIMIT 5;';
  db.query(query)
    .then((data) => {
      res.send(data.rows);
    });
});

app.get('/products/:product_id', (req, res) => {
  const query = `
  SELECT aerio.overview.*, features_agg.features
  FROM aerio.overview
  JOIN (
    SELECT product_id, json_agg(json_build_object('feature', feature, 'value', value)) AS features
    FROM aerio.features
    WHERE product_id = ${req.params.product_id}
    GROUP BY product_id
  ) AS features_agg ON aerio.overview.product_id = features_agg.product_id;
  `;

  db.query(query)
    .then((data) => {
      data ? res.send(data.rows[0]) : res.sendStatus(201);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const query = `
  WITH styles_agg AS (
    SELECT
      aerio.styles.product_id,
      json_agg(
        json_build_object(
          'id', aerio.styles.id,
          'name', aerio.styles.name,
          'sale_price', aerio.styles.sale_price,
          'original_price', aerio.styles.original_price,
          'default_style', aerio.styles.default_style,
          'photos', (
            SELECT json_agg(json_build_object('url', url, 'thumbnail_url', thumbnail_url))
            FROM aerio.photos
            WHERE aerio.photos.style_id = aerio.styles.id
          ),
          'skus', (
            SELECT json_object_agg(skus.id, json_build_object('size', size, 'quantity', quantity))
            FROM (
              SELECT id, size, quantity
              FROM aerio.skus
              WHERE aerio.skus.style_id = aerio.styles.id
              LIMIT 6
            ) AS skus
          )
        )
      ) AS styles
    FROM aerio.styles
    WHERE aerio.styles.product_id = ${req.params.product_id}
    GROUP BY aerio.styles.product_id
  )
  SELECT
    product_id,
    json_array_elements(styles) AS results
  FROM styles_agg;
  `;

  db.query(query)
    .then((data) => {
      res.send(data.rows[0]);
    });
});

app.listen(port, () => {
  console.log(`SDC-Products listening on port ${port}`);
});

module.exports = app;
