module.exports = function(app, db, store_data, store_schema, tempstore_schema)
{
     app.get('/',function(req,res){
      res.render('index.ejs', {name : store_data.name})
     });

     app.get('/do_claim',function(req,res){
       var store = req.query.store
       console.log(store);
       res.render('do_claim.ejs', {store : store, store_schema : store_schema, store_data : store_data});
     });

     app.post('/do_claim', function(req, res, next){

       var name = req.body.casey_store;
       var place = req.body.place;
       var time = req.body.time;
       var tel = req.body.tel;
       var description = req.body.description;

       var sql = `INSERT INTO temstore (name, place, time, tel, description) VALUES ("${name}", "${place}", "${time}", "${tel}", "${description}")`;

       db.run(sql, function(err){
         if(err){
           console.log(err.message);
           next(err);
         }
         res.redirect('/claim_list');
       });

     });

     app.get('/detail/:store',function(req, res){
       var store = req.params.store;
       var sql = `SELECT * FROM store WHERE name = "${store}"`;
       db.all(sql,[], (err, rows) => {
         if(err){
           console.log(err.message);
           return;
         }
         else{
           res.render('store_detail.ejs', {data : rows});
         }
       })
     });

     app.get('/claim_list',function(req,res){
       res.send('hello');
     });
}
