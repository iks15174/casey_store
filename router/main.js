module.exports = function(app, pool, store_name, store_schema, tempstore_schema)
{
     app.get('/',function(req, res, next){
       res.render('index.ejs', {name : store_name});
     });

     app.get('/detail/:store',function(req, res, next){
       var store = req.params.store;
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           var sql = "SELECT * FROM store WHERE name = ?";
           con.query(sql, [store], function(err, rows){
             if(err){
               console.log(err);
               con.release()
               next(err);
             }
             else{
               res.render('store_detail.ejs',{data : rows});
             }
           })
         }
       });
     });
}
