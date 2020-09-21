const temstore_schema = require('./temstore_schema');
exports.create_table = function(db){
  var db_str = 'CREATE TABLE temstore (';

  for(var i = 0; i < temstore_schema.length; i++){
    var colum = temstore_schema.colum[i];
    var attribute = temstore_schema.attribute[i];
    if(i==temstore_schema.length-1){
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
    console.log('Create temstore table in memory');
  });

};
