const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const store_data = require('./database/store_data');
const store_schema = require('./database/store_schema');

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const db = new sqlite3.Database(':memory:', (err) => {
  if(err){
    console.error(err.message);
    return;
  }
  console.log('Sqlite3 database connected to memory')
});

const create_table = require('./database/setting').create_table(db);

const router = require('./router/main')(app, db, store_data, store_schema);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
