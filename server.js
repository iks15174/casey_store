const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
<<<<<<< HEAD
const table_schema = require('./table_schema');
const db;
const router = require('./router/main')(app, db);
=======
const store_data = require('./database/store_data');
const store_schema = require('./database/store_schema');
>>>>>>> 1ae99f4... add store detail file

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

<<<<<<< HEAD

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
    db = new sqlite3.Database(':memory:', (err) => {
      if(err){
        console.error(err.message);
        return;
      }
      console.log('Sqlite3 database connected to memory')
    });
    var db_str = 'CREATE TABLE store (';
    for(var i = 0; i < table_schema.length; i++){
      var colum = table_schema.colum[i];
      var attribute = table_schema.attribute[i];
      if(i==table_schema.length-1){
        db_str = db_str + ' ' + colum + ' ' + attribute + ')';
      }
      else{
        db_str = db_str + ' ' + colum + ' ' + attribute + ',';
      }
    }

    db.run(db_str, function(err){
      if(err){
        console.log(err.message);
        return;
      }
      console.log('Create Store table in memory');
    });

})

var temp_insert_function = function(){

}
=======
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
>>>>>>> 1ae99f4... add store detail file
