<<<<<<< HEAD
module.exports = function(app, db)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });

     app.get('/:store',function(req, res){
       var sql = `SELECT * FROM store WHERE name = ${store}`;
=======
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
>>>>>>> 1ae99f4... add store detail file
       db.all(sql,[], (err, rows) => {
         if(err){
           console.log(err.message);
           return;
         }
         else{
<<<<<<< HEAD

=======
           console.log(rows);
           res.render('store_detail.ejs', {data : rows});
>>>>>>> 1ae99f4... add store detail file
         }
       })
     });

<<<<<<< HEAD
     app.get('/new/:store',function(req,res){
       res.send('hello');
     });

     app.post('/new/:store',function(req,res){
=======
     app.get('/claim_list/:store',function(req,res){
>>>>>>> 1ae99f4... add store detail file
       res.send('hello');
     })

     app.get('/update/:store/:id',function(req,res){
       res.send('hello');
     });
}
