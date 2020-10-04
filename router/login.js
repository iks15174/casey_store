const express = require('express');
const router = express.Router();

module.exports = function(pool, store_name, store_schema, tempstore_schema, passport)
{
     router.get('/login',function(req, res, next){
       var previous = req.query.previous;
       res.render('login.ejs', {previous : previous});
     });

     router.post('/login', function(req, res, next){
       var previous = req.body.previous;
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
             if(previous!=="/" && previous !== undefined){
               res.redirect(previous)
             }
             else{
               res.redirect('/main/');
             }
           }
         })
       }
     )(req, res, next);
   }
 );

 router.get('/logout', function(req, res, next){
   req.logout();
   res.redirect('/main');
 });

 return router;
}
