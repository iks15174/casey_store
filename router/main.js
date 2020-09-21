module.exports = function(app, db, store_data, store_schema)
{
     app.get('/',function(req,res){
      res.render('index.ejs', {name : store_data.name})
     });

     app.get('/do_claim/:store',function(req,res){
       var store = req.params.store
       res.send('hello');
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
           console.log(rows);
           res.render('store_detail.ejs', {data : rows});
         }
       })
     });

     app.get('/new/:store',function(req,res){
       res.send('hello');
     });

     app.get('/claim_list/:store',function(req,res){
       res.send('hello');
     })

     app.get('/update/:store/:id',function(req,res){
       res.send('hello');
     });
}
