require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// const pgp = require('pg-promise')
// const db = pgp('postgres://username:password@host:port/database')

// db.one('SELECT $1 AS value', 123)
//   .then((data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch((error) => {
//     console.log('ERROR:', error)
//   })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})