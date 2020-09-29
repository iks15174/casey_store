const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport, pool){
  passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pwd'
  },
  function(username, password, done) {
    console.log("here is local auth Strategy");
    var sql = "SELECT * FROM admin_user where id = ?";
    pool.getConnection(
      function(err, con){
        if(err){
          console.log(err.message);
          next(err);
        }
        else{
          con.query(sql, [username], function(err, result){
            con.release();
            if(err){
              return done(err);
            }
            if(!result[0]){
              return done(null, false, { message: 'Incorrect username.' });
            }
            if(result[0].pwd !== password){
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          })
        }
      })
    }
  ));
}
