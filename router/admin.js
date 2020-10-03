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
               res.redirect('/claim?detail/'+id);
             }
           });
         }
       })
     });

     return router;
}
