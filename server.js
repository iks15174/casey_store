const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const store_data = require('./database/store_data');
const store_schema = require('./database/store_schema');
const temstore_schema = require('./database/temstore_schema');

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

const create_store_table = require('./database/store_setting').create_table(db);
const create_temstore_table = require('./database/temstore_setting').create_table(db);


const router = require('./router/main')(app, db, store_data, store_schema, temstore_schema);

app.use(function (err, req, res, next) {            
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
