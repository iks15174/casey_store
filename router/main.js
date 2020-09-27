module.exports = function(app, pool, store_data, store_schema, tempstore_schema)
{
     app.get('/',function(req,res, next){
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           var sql = "SELECT * FROM store"
           con.query(sql,[], function(err,result){
             if(err){
               console.log(err.message);
               con.release();
               next(err);
             }
             else{
               con.release();
               var name = [];
               for(var i = 0; i < result.length; i ++){
                 name.push(result[i].name);
               }
               res.render('index.ejs', {name : name});
               return;
             }
           })
         }
       })
     });

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

     app.get('/detail/:store',function(req, res, next){
       var store = req.params.store;
       var sql = `SELECT * FROM store WHERE name = "${store}"`;
       db.all(sql,[], (err, rows) => {
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           res.render('store_detail.ejs', {data : rows});
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
               res.render('claim_list.ejs', {data : result, name : store_data.name});
             }
           })
         }
       })
     });

     app.get('/claim_detail/:id', function(req, res, next){
       var id = req.params.id;
       var sql = `SELECT * FROM temstore where id = ${id}`;
       db.all(sql, [], function(err, rows){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           res.render('claim_detail.ejs', {data : rows[0]});
         }
       })
     });

     //handle ajax request
     app.get('/search_list',function(req, res, next){
       console.log('get ajax request');
       var name = req.query.name;
       var sql;
       if(name === "ALL"){
        sql = `SELECT * FROM temstore ORDER BY created DESC`;
       }
       else{
         sql = `SELECT * FROM temstore WHERE name = "${name}" ORDER BY created DESC`;
       }

       db.all(sql, [], function(err, rows){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           res.send(rows);
         }
       })

     });

     app.use(function(req, res, next){
       res.status(404).send({
         status : 404,
         error : 'Not Found'
       });
       next(error);
     });
}
