module.exports = function(app, pool)
{
     app.get('/search_list',function(req, res, next){
       var name = req.query.name;
       var sql;
       if(name === "ALL"){
        sql = `SELECT * FROM temstore ORDER BY created DESC`;
       }
       else{
         sql = `SELECT * FROM temstore WHERE name = "${name}" ORDER BY created DESC`;
       }
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [], function(err, rows){
             if(err){
               console.log(err);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.send(rows);
             }
           })
         }
       })

     });
}
