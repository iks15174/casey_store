const express = require('express');
const router = express.Router();
const isAuthenticated = require('../PassportConfig/isAuthenticated');
const isAuthenticated_override = require('../PassportConfig/isAuthenticated_override');


module.exports = function(pool, store_name, store_schema, tempstore_schema)
{
     router.delete('/claim/delete/:id',isAuthenticated, function(req, res, next){
       var id = req.params.id;
       var sql = "DELETE FROM temstore WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               res.json({
                 deleted : true,
                 logined : true,
               });
             }
           })
         }
       });
     });

     router.get('/claim/update/:id', isAuthenticated_override, function(req, res, next){
       var id = req.params.id;
       var sql = "SELECT * FROM temstore WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               res.render("claim_update.ejs", {rows : rows[0], store_name : store_name});
             }
           });
         }
       })

     });

     router.put('/claim/update/:id', isAuthenticated_override, function(req, res, next){
       var id = req.params.id;
       var title = req.body.title;
       var name = req.body.casey_store;
       var place = req.body.place;
       var time = req.body.time;
       var tel = req.body.tel;
       var description = req.body.description;

       var sql = "UPDATE temstore SET title = ?, name = ?, place = ?, time = ?, tel = ?, description = ? WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [title, name, place, time, tel, description, id], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               res.redirect('/claim/detail/'+id);
             }
           });
         }
       })
     });

     router.get('/store/add', isAuthenticated_override, function(req, res, next){
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           res.render('new_store.ejs');
         }
       })
     });

     router.post('/store/add', isAuthenticated_override, function(req, res, next){
       var name = req.body.name;
       var place = req.body.place;
       var time = req.body.time;
       var tel = req.body.tel;
       var description = req.body.description;

       var sql = "INSERT INTO store (name, place, time, tel, description) VALUES (?, ?, ?, ?, ?);";

       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [name, place, time, tel, description], function(err, result){
             if(err){
               console.log(err);
               con.release();
               next(err);
             }
             else{
               store_name.push({name : name});
               con.release();
               res.redirect('/main');
             }
           })
         }
       })
     })

     router.delete('/store/delete/:name', isAuthenticated, function(req, res, next){
       var name = req.params.name;
       var sql = "DELETE FROM store WHERE name = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [name], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               var idx = -1;
               for(var i = 0; i < store_name.length; i++){
                 if(name === store_name[i].name){
                   idx = i;
                   break;
                 }
               }
               if(idx > -1){
                 store_name.splice(idx, 1);
               }
               res.json({
                 deleted : true,
                 logined : true,
               })
             }
           })
         }
       })
     });

     router.get('/store/update/:id', isAuthenticated_override, function(req, res, next){
       var id = req.params.id;
       var sql = "SELECT * FROM store WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               res.render("store_update.ejs", {rows : rows[0], store_name : store_name});
             }
           });
         }
       })

     });

     router.put('/store/update/:id', isAuthenticated_override, function(req, res, next){
       var id = req.params.id;
       var name = req.body.name;
       var place = req.body.place;
       var time = req.body.time;
       var tel = req.body.tel;
       var description = req.body.description;
       var before_name = req.body.before_name;

       var sql = "UPDATE store SET name = ?, place = ?, time = ?, tel = ?, description = ? WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [name, place, time, tel, description, id], function(err, rows){
             if(err){
               con.release();
               console.log(err);
               next(err);
             }
             else{
               con.release();
               if(before_name !== name){
                 for(var i = 0; i < store_name.length; i++){
                   if(store_name[i].name === before_name){
                     store_name.splice(i, 1, { name : name });
                     break;
                   }
                 }
               }
               res.redirect('/main/detail/'+name);
             }
           });
         }
       })
     });

     return router;
}
