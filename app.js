const express = require('express')
const app = express()
const port = 3001
const path = require('path');
var createError = require('http-errors');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'datadb',
  password: '12345',
  port: 5432
})

const serverRoutes = require('./routes/server')(pool);



app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', serverRoutes);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res) => {
  res.status(404).send('ROUTE TIDAK ADA');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})