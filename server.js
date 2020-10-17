const express = require('express');
const methodOverride = require('method-override');
const app = express();
const http = require('http');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const store_schema = require('./database/store_schema');
const temstore_schema = require('./database/temstore_schema');
const get_store_name = require('./database/get_store_name');
const getConnection = get_store_name.getConnection;
const getStoreName = get_store_name.getStoreName;
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const store_name = [];
const port = process.env.PORT || 3000;

/*const data = require('./database/database')
const host = data.host;
const user = data.user;
const password = data.password;
const database = data.database;*/

app.set('views', __dirname + '/views');
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : "12%#$HGJ1231*^%&12" || process.env.SESSION_SECRET,
  store : new MySQLStore({
    host : process.env.DATABASE_HOST || host,
    user : process.env.DATABASE_USER || user,
    password : process.env.DATABASE_PASSWORD || password,
    database : process.env.DATABASE_DATABASE|| database,
  })
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
  host : process.env.DATABASE_HOST || host,
  user : process.env.DATABASE_USER || user,
  password : process.env.DATABASE_PASSWORD || password,
  database : process.env.DATABASE_DATABASE || database,
});

const PassportConfig = require('./PassportConfig/serial')(passport, pool);

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

  http.createServer(app, (req, res)=>{
    res.writeHead(301, {
      Location : 'https://' + req.headers['host'] + req.url
    });
    res.end();
  }).listen(port, ()=>{
    console.log('server running on ' + port);
  })
}).catch(function(err){
  console.log(err);
});
