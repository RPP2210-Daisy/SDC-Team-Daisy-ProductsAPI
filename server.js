require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

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
  const query = 'SELECT * from aerio.overview LIMIT 5;';
  db.query(query)
    .then((data) => {
      res.send(data.rows);
    });
});

app.get('/products/:product_id', (req, res) => {
  const query = `
  SELECT aerio.overview.*,
  features_agg.features
  FROM aerio.overview
  JOIN (SELECT product_id, json_object_agg(feature, value) AS features
  FROM aerio.features
  WHERE product_id = 2
  GROUP BY product_id') AS features_agg ON aerio.overview.product_id = features_agg.product_id
  `;
  db.query(query)
    .then((data) => {
      res.send(data.rows);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const query = `
  SELECT aerio.styles.*,
    json_object_agg(size, quantity) AS skus,
    (SELECT json_agg(json_build_object('url', url, 'thumbnail_url', thumbnail_url))
      FROM aerio.photos
      WHERE aerio.photos.style_id = aerio.styles.id) AS photos
  FROM aerio.styles
  JOIN aerio.skus ON aerio.styles.id = aerio.skus.style_id
  WHERE aerio.styles.product_id = 71697
  GROUP BY aerio.styles.id;
`;
  db.query(query)
    .then((data) => {
      res.send(data.rows);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
