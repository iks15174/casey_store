const url = require('url');

module.exports = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    var parseUrl = url.parse(req.url, true);
    var previous = parseUrl.query.previous;
    res.redirect('/login/login?previous=' + previous);
  }
}
