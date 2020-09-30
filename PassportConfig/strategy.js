const LocalStrategy = require('passport-local').Strategy;
const hash_iter = 108236;
const crypto = require('crypto');

module.exports = function(passport, pool){
  passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pwd'
  },
  function(username, password, done) {
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
            crypto.pbkdf2(password, result[0].salt, hash_iter, 64, 'sha512', (err, key) => {
              if(key.toString('base64') === result[0].password){
                return done(null, result[0]);
              }
              else{
                return done(null, false, { message: 'Incorrect password.' });
              }
            });
          })
        }
      })
    }
  ));
}
