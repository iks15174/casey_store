module.exports = function(app, pool, store_name, store_schema, tempstore_schema, passport)
{
     app.get('/login',function(req, res, next){
       res.render('login.ejs');
     });

     app.post('/login', function(req, res, next){
       passport.authenticate('local', function(err, user, info){
         if(err){
           console.log(err);
           return next(err);
         }

         if(!user){
           return res.status(403).json({
             info,
             result: '로그인 실패'
           });
         }

         return req.login(user, function(err){
           if(err){
             return next(err);
           }
           else{
             res.redirect('/');
           }
         })
       }
     )
   }
 );

}
