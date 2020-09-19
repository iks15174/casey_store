module.exports = function(app, db)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });

     app.get('/:store',function(req, res){
       var sql = `SELECT * FROM store WHERE name = ${store}`;
       db.all(sql,[], (err, rows) => {
         if(err){
           console.log(err.message);
           return;
         }
         else{

         }
       })
     });

     app.get('/new/:store',function(req,res){
       res.send('hello');
     });

     app.post('/new/:store',function(req,res){
       res.send('hello');
     })

     app.get('/update/:store/:id',function(req,res){
       res.send('hello');
     });
}
