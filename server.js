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

app.get('/', (req, res) => {
  const d1 = new Date();
  const query = db.query('SELECT * FROM aerio.overview WHERE product_id = 71697;')
    .then((data) => {
      console.log(data.rows);
      const d2 = new Date();
      const diff = (d2.getTime() - d1.getTime());
      console.log(diff);
    });
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
