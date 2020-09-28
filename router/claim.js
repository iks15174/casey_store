module.exports = function(app, pool, store_name, store_schema, tempstore_schema)
{
     app.get('/do_claim',function(req, res, next){
       var store = req.query.store;
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           var sql = "SELECT * FROM store";
           con.query(sql, [], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               return;
             }
             else{
               con.release();
               res.render('do_claim.ejs', {store : store, temstore_schema : store_schema, store_data : result});
             }
           })
         }
       });
     });

     app.post('/do_claim', function(req, res, next){

       var title = req.body.title;
       var name = req.body.casey_store;
       var place = req.body.place;
       var time = req.body.time;
       var tel = req.body.tel;
       var description = req.body.description;
       var sql = `INSERT INTO temstore (title, name, place, time, tel, description) VALUES (?, ?, ?, ?, ?, ?);`;

       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           con.query(sql, [title, name, place, time, tel, description], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.redirect('/claim_list');
             }
           })
         }
       })
     });

     app.get('/claim_list',function(req,res, next){
       var sql = "SELECT * FROM temstore ORDER BY created DESC";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           con.query(sql, [], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.render('claim_list.ejs', {data : result, name : store_name});
             }
           })
         }
       })
     });

     app.get('/claim_detail/:id', function(req, res, next){
       var id = req.params.id;
       var sql = "SELECT * FROM temstore where id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               console.log(err);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.render('claim_detail.ejs', {data : rows[0]});
             }
           })
         }
       })
     });
}
