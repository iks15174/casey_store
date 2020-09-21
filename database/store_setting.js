const store_schema = require('./store_schema');
const store_data = require('./store_data');

exports.create_table = function(db){
  var db_str = 'CREATE TABLE store (';

  for(var i = 0; i < store_schema.length; i++){
    var colum = store_schema.colum[i];
    var attribute = store_schema.attribute[i];
    if(i==store_schema.length-1){
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
    console.log('Create store table in memory');
    insert_data(db);
  });

};

function insert_data(db){
  for(var i = 0; i < store_data.length; i++){

    var name = store_data.name[i];
    var place = store_data.place[i];
    var tel = store_data.tel[i];
    var time = store_data.time[i];
    var description = store_data.description[i];

    var sql = `INSERT INTO store (name, place, time, tel, description) VALUES ("${name}", "${place}", "${time}", "${tel}", "${description}")`;

    db.run(sql, function(err){
      if(err){
        console.log(err.message);
        return;
      }
      console.log('Insert into store table');
    });

  }

};
