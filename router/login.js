const express = require('express');
const router = express.Router();

module.exports = function(pool, store_name, store_schema, tempstore_schema, passport)
{
     router.get('/login',function(req, res, next){
       var previous = req.query.previous;
       if(req.session.login >= 3) res.redirect('/main/')
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
           if(req.session.login >= 1) req.session.login += 1;
           else req.session.login = 1;
           if(req.session.login >= 3) res.redirect('/main/')
           else res.redirect('/login/login');

         }

         return req.login(user, function(err){
           if(err){
             return next(err);
           }
           else{
             req.session.login = 0;
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
   req.session.login = 0;
   req.logout();
   res.redirect('/main');
 });

 return router;
}
