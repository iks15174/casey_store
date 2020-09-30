const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const database = require('./config/database');
const store_schema = require('./database/store_schema');
const temstore_schema = require('./database/temstore_schema');
const get_store_name = require('./database/get_store_name');
const getConnection = get_store_name.getConnection;
const getStoreName = get_store_name.getStoreName;
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const store_name = [];

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : "12%#$HGJ1231*^%&12", //need to change env variable
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});



const pool = mysql.createPool({
  connectionLimit : 8,
  host : database.host,
  user : database.user,
  password : database.password,
  database : database.database,
});

const PassportConfig = require('./PassportConfig/serial')(passport, pool);
//const create_store_table = require('./database/store_setting').create_table(db);
//const create_temstore_table = require('./database/temstore_setting').create_table(db);

getConnection(pool).then(function(con){
  return getStoreName(con, store_name);
}).catch(function(err){
  next(err);
}).then(function(status){
  const main = require('./router/main')(app, pool, store_name, store_schema, temstore_schema);
  const claim = require('./router/claim')(app, pool, store_name, store_schema, temstore_schema);
  const login = require('./router/login')(app, pool, store_name, store_schema, temstore_schema, passport);
  const ajax = require('./router/ajax')(app, pool);

  app.use(function(req, res, next){
    res.status(404).send({
      status : 404,
      error : 'Not Found'
    });
    next(error);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      },
    });
  });

  var server = app.listen(3000, function(){
      console.log("Express server has started on port 3000")
  });
}).catch(function(err){
  next(err);
});
