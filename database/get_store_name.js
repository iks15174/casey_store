exports.getConnection = function(pool){
  return new Promise(function(resolve, reject){
    pool.getConnection(function(err, con){
      if(err){
        console.log(err.message);
        reject(err);
      }
      else{
        resolve(con);
      }
    })
  })
}

exports.getStoreName = function(con, store_name){
  return new Promise(function(resolve, reject){
    var sql = "SELECT name FROM store";
    con.query(sql, [], function(err, rows){
      if(err){
        console.log(err.message);
        con.release();
        reject(err);
      }
      else{
        con.release();
        for(var i = 0; i < rows.length; i ++){
          store_name.push(rows[i]);
        }
        resolve(0);
      }
    })
  })
}
