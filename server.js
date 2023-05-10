require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');
const queryRedis = require('./queryRedis');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./dist'));

const db = new Pool({
  user: process.env.PSQL_USER,
  host: 'localhost',
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: 5432,
});

const redis = new createClient();

db.connect((e) => {
  if (e) {
    console.log(e);
  } else {
    console.log(`Connected to PSQL DB: ${process.env.PSQL_DB}`);
  }
});

app.get('/products/', async (req, res) => {
  try {
    const query = 'SELECT * FROM aerio.overview LIMIT 5;';
    const data = queryRedis(query, db, redis);

    res.send(data.rows);
  } catch (e) {
    res.status(500).send('Server Error from /products');
  }
});

app.get('/products/:product_id', async (req, res) => {
  try {
    let productID;
    typeof req.params.product_id === 'string' ? productID = 71697 : productID = req.params.product_id;

    const query = `
      SELECT aerio.overview.*, features_agg.features
      FROM aerio.overview
      JOIN (
        SELECT product_id, json_agg(json_build_object('feature', feature, 'value', value)) AS features
        FROM aerio.features
        WHERE product_id = ${productID}
        GROUP BY product_id
      ) AS features_agg ON aerio.overview.product_id = features_agg.product_id;
      `;
    const data = await db.query(query);
    res.send(data.rows[0]);
  } catch (e) {
    res.status(500).send('Server Error from /products/:product_id');
  }
});

app.get('/products/:product_id/styles', async (req, res) => {
  try {
    let productID;
    typeof req.params.product_id === 'string' ? productID = 71697 : productID = req.params.product_id;

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
      WHERE aerio.styles.product_id = ${productID}
      GROUP BY aerio.styles.product_id
    ),
    results_array AS (
      SELECT
        product_id,
        json_array_elements(styles) AS result
      FROM styles_agg
    )
    SELECT
      product_id,
      json_agg(result) AS results
    FROM results_array
    GROUP BY product_id;
    `;

    const data = await db.query(query);
    res.send(data.rows[0]);
  } catch (e) {
    res.status(500).send('Server Error from /products/:product_id/styles');
  }
});

app.get('/products/:product_id/related', async (req, res) => {
  try {
    let productID;
    typeof req.params.product_id === 'string' ? productID = 71697 : productID = req.params.product_id;

    const query = `
    SELECT ARRAY_AGG(related_product_id)
    FROM aerio.related
    WHERE product_id = ${productID};
  `;
    const data = await db.query(query);
    res.send(data.rows[0].array_agg);
  } catch (e) {
    res.status(500).send('Server Error from /products/:product_id/related');
  }
});

app.listen(port, () => {
  console.log(`SDC-Products listening on port ${port}`);
});

module.exports = app;
