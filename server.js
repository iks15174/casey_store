var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
