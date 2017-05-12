// require and instantiate express
var express = require('express')
var path = require('path')
var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })
var app = express()
var port = process.env.PORT || 8080

app.get('/', function(req, res){
  // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }]), function (req, res) {
  var result = req.body

  if (req.files['file'] && req.files['file'][0]) {
    result.fileSize = (req.files['file'][0].size / 1024).toFixed(2) + 'KB'
  }
  res.send(result);
});

app.listen(port, function(){
  console.log('Server listening on port 8080')
});