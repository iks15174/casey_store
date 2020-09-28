module.exports = function(app, pool, store_name, store_schema, tempstore_schema)
{
     app.get('/login',function(req, res, next){
       res.render('index.ejs', {name : store_name});
     });
}
