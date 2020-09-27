const crypto = require('crypto');
const user_info = require("./user_info");
const database = require("./database");
const mysql = require('mysql');
const hash_iter = 108236;

const connection = mysql.createConnection({
  host : database.host,
  user : database.user,
  password : database.password,
  database : database.database,
});

connection.connect(function(err){
  if(err){
    console.log(err.message);
    return;
  }
  console.log('heroku mysql connected');
});

var create_user  = function(){
      crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(user_info.password, buf.toString('base64'), hash_iter, 64, 'sha512', (err, key) => {
        var insert_sql = "INSERT INTO admin_user (id, password, salt) VALUES(?, ?, ?)";
        connection.query(insert_sql,[user_info.id, key.toString('base64'), buf.toString('base64')], function(err){
          if(err){
            console.log(err.message);
            return;
          }
          else{
            console.log('success_fully insert admin user into database');
          }
      })
    })
  })
}

create_user();
