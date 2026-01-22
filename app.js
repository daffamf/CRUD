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

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/server')(pool);

app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs')

app.use('/', indexRouter);
app.use('/server/index', apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
