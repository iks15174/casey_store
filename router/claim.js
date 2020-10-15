const express = require('express');
const router = express.Router();

module.exports = function(pool, store_name, store_schema, tempstore_schema)
{
     router.get('/do',function(req, res, next){
       var store = req.query.store;
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           var sql = "SELECT * FROM store";
           con.query(sql, [], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               return;
             }
             else{
               con.release();
               res.render('do_claim.ejs', {store : store, store_data : result});
             }
           })
         }
       });
     });

     router.post('/do', function(req, res, next){

       var title = req.body.title;
       var name = req.body.casey_store;
       var place = req.body.place;
       var tel = req.body.tel;
       var description = req.body.description;
       var mon = req.body.mon;
       var tue = req.body.tue;
       var wen = req.body.wen;
       var thu = req.body.thu;
       var fri = req.body.fri;
       var sat = req.body.sat;
       var sun = req.body.sun;


       var sql = `INSERT INTO temstore (title, name, place, tel, description, mon, tue, wen, thu, fri, sat, sun) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           con.query(sql, [title, name, place, tel, description, mon, tue, wen, thu, fri, sat, sun], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.redirect('/claim/list');
             }
           })
         }
       })
     });

     router.get('/list',function(req,res, next){
       var sql = "SELECT id, title, name, date_format(created, \"\%Y-\%m-\%d \%H:\%i:\%S\") AS created FROM temstore ORDER BY created DESC";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err.message);
           next(err);
         }
         else{
           con.query(sql, [], function(err, result){
             if(err){
               console.log(err.message);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.render('claim_list.ejs', {data : result, name : store_name});
             }
           })
         }
       })
     });

     router.get('/detail/:id', function(req, res, next){
       var id = req.params.id;
       var sql = "SELECT * FROM temstore where id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               console.log(err);
               con.release();
               next(err);
             }
             else{
               con.release();
               res.render('claim_detail.ejs', {data : rows[0]});
             }
           })
         }
       })
     });

     return router;
}
