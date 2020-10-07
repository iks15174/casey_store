const express = require('express');
const methodOverride = require('method-override');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const database = require('./config/database');
const store_schema = require('./database/store_schema');
const temstore_schema = require('./database/temstore_schema');
const get_store_name = require('./database/get_store_name');
const getConnection = get_store_name.getConnection;
const getStoreName = get_store_name.getStoreName;
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const store_name = [];
const port = 3000 || process.env.PORT;

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : "12%#$HGJ1231*^%&12" || process.env.SESSION_SECRET, //need to change env variable
  cookie :{
    httpOnly : true,
    secure : true,
    sameSite : true,
    maxAge : 600000
  },
}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});



const pool = mysql.createPool({
  connectionLimit : 8,
  host : process.env.DATABASE_HOST /*|| database.host*/,
  user : process.env.DATABASE_USER /*|| database.user*/,
  password : process.env.DATABASE_PASSWORD /*|| database.password*/,
  database : process.env.DATABASE_DATABASE /*|| database.database*/,
});

const PassportConfig = require('./PassportConfig/serial')(passport, pool);
//const create_store_table = require('./database/store_setting').create_table(db);
//const create_temstore_table = require('./database/temstore_setting').create_table(db);

getConnection(pool).then(function(con){
  return getStoreName(con, store_name);
}).catch(function(err){
  console.log(err);
}).then(function(status){
  const main = require('./router/main')(pool, store_name, store_schema, temstore_schema);
  const claim = require('./router/claim')(pool, store_name, store_schema, temstore_schema);
  const login = require('./router/login')(pool, store_name, store_schema, temstore_schema, passport);
  const ajax = require('./router/ajax')(app, pool);
  const admin = require('./router/admin')(pool, store_name, store_schema, temstore_schema);

  app.use('/', main);
  app.use('/main', main);
  app.use('/claim', claim);
  app.use('/login', login);
  app.use('/admin', admin)

  app.use(function(req, res, next){
    res.status(404).send({
      status : 404,
      error : 'Not Found'
    });
  });

  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      },
    });
  });

  var server = app.listen(process.env.PORT, function(){
      console.log("Express server has started on port 3000")
  });
}).catch(function(err){
  console.log(err);
});
