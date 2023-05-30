require('dotenv').config();
const fs = require('fs');
process.env.NEW_RELIC_LICENSE_KEY = fs.readFileSync('/run/secrets/NEW_RELIC_LICENSE_KEY', 'utf8').trim();
require('newrelic');

const express = require('express');
const { Pool } = require('pg');
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./dist'));

const db = new Pool({
  user: fs.readFileSync('/run/secrets/postgres_user', 'utf8').trim(),
  host: process.env.DB_HOST,
  database: 'sdc',
  password: fs.readFileSync('/run/secrets/postgres_password', 'utf8').trim(),
  port: 5432,
});

const redis = new Redis({
  host: 'redis',
  port: 6379,
});

const connectDB = async () => {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error(`Failed to connect, retrying in 10 seconds... \n${err}`);
    setTimeout(connectDB, 10000);
  }
};

connectDB();

app.get('/products', async (req, res) => {
  try {
    const cacheKey = 'aerio.overview';
    let data = await redis.get(cacheKey);
    if (!data) {
      const query = 'SELECT * FROM aerio.overview LIMIT 5;';
      data = await db.query(query);
      await redis.set(cacheKey, JSON.stringify(data));
      res.send(data.rows[0]);
    } else {
      res.send(JSON.parse(data).rows);
    }
  } catch (e) {
    res.status(500).send('Server Error from /products');
  }
});

app.get('/products/:product_id', async (req, res) => {
  try {
    const productID = req.params.product_id;

    const cacheKey = `product_overview_${productID}`;
    let data = await redis.get(cacheKey);

    if (!data) {
      try {
        const query = `
          SELECT aerio.overview.*, features_agg.features
          FROM aerio.overview
          JOIN (
            SELECT product_id, json_agg(json_build_object('feature', feature, 'value', value)) AS features
            FROM aerio.features
            WHERE product_id = $1
            GROUP BY product_id
          ) AS features_agg ON aerio.overview.product_id = features_agg.product_id;
          `;
        data = await db.query(query, [productID]);
        await redis.set(cacheKey, JSON.stringify(data));
      } catch (err) {
        return res.status(500).send('Error querying the database');
      }
    } else {
      data = JSON.parse(data);
    }
    res.send(data.rows[0]);
  } catch (err) {
    res.status(500).send('Error retrieving data from cache');
  }
});

app.get('/products/:product_id/styles', async (req, res) => {
  try {
    const productID = req.params.product_id;

    const cacheKey = `product_${productID}_styles`;
    let data = await redis.get(cacheKey);

    if (!data) {
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
        WHERE aerio.styles.product_id = $1
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
      data = await db.query(query, [productID]);
      await redis.set(cacheKey, JSON.stringify(data));
    } else {
      data = JSON.parse(data);
    }

    res.send(data.rows[0]);
  } catch (e) {
    res.status(500).send('Server Error from /products/:product_id/styles');
  }
});

app.get('/products/:product_id/related', async (req, res) => {
  try {
    const productID = req.params.product_id;

    const cacheKey = `product_${productID}_related`;
    let data = await redis.get(cacheKey);

    if (!data) {
      const query = `
      SELECT ARRAY_AGG(related_product_id)
      FROM aerio.related
      WHERE product_id = $1;
    `;
      data = await db.query(query, productID);
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600);
    } else {
      data = JSON.parse(data);
    }
    res.send(data.rows[0].array_agg);
  } catch (e) {
    res.status(500).send('Server Error from /products/:product_id/related');
  }
});

app.listen(port);

module.exports = app;
