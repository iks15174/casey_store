const express = require('express');
const router = express.Router();
const isAuthenticated = require('../PassportConfig/isAuthenticated');


module.exports = function(pool, store_name, store_schema, tempstore_schema)
{
     router.delete('/claim/delete/:id',isAuthenticated, function(req, res, next){
       var id = req.params.id;
       console.log('here is admin claim delete');
       var sql = "DLETE FROM temstore WHERE id = ?";
       pool.getConnection(function(err, con){
         if(err){
           console.log(err);
           next(err);
         }
         else{
           con.query(sql, [id], function(err, rows){
             if(err){
               con.releas();
               console.log(err);
               next(err);
             }
             else{
               con.releas();
               res.redirect('/claim/list');
             }
           })
         }
       });

     });

     return router;
}
