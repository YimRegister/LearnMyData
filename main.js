var http = require('http');
var fs = require('fs');
var express = require('express'), bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended:true
}));

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');

});
app.use('/css',express.static(__dirname + '/css'))
app.use('/scss',express.static(__dirname + '/scss'))
app.use('/img',express.static(__dirname + '/img'))
app.use('/node_modules',express.static(__dirname + '/node_modules'))
app.use('/vendor',express.static(__dirname + '/vendor'))
app.get('/task.js', function(req,res){
  res.sendFile(__dirname + '/task.js');
});

//need to get data and write to file
app.post('/submit',function(req,res){
  console.log(req.body);
  res.redirect('/')
  let data = JSON.stringify(req.body);
  fs.appendFile('data.json','\n'+data, (err)=> {console.log("limons");});

});

app.listen(process.env.PORT || 3000);
