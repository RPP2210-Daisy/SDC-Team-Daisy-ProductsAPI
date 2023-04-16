require('dotenv').config();

const express = require('express')
const { Client } = require('pg');

const app = express()
const port = process.env.PORT || 3000

const client = new Client({
  user: 'your_database_user',
  host: 'your_database_host',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 'your_database_port',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})