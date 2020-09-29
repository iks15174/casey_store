const strategy = require('./strategy');

module.exports = function(passport, pool){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    var sql = "SELECT * FROM admin_user where id = ?";
    pool.getConnection(
      function(err, con){
        if(err){
          console.log(err.message);
          next(err);
        }
        else{
          con.query(sql, [id], function(err, result){
            con.release();
            done(err, result[0]);
          })
        }
      })
    })

    strategy(passport, pool);
}
