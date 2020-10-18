module.exports = function(app, pool)
{
     app.get('/search_list',function(req, res, next){
       var name = req.query.name;
       var sql;
       if(name === "ALL"){
        sql = `SELECT id, title, date_format(created, \"\%Y-\%m-\%d \%H:\%i:\%S\") AS created FROM temstore ORDER BY created DESC`;
       }
       else{
         sql = `SELECT id, title, date_format(created, \"\%Y-\%m-\%d \%H:\%i:\%S\") AS created FROM temstore WHERE name = "${name}" ORDER BY created DESC`;
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
