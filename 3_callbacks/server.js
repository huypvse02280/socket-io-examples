/*jshint node: true */

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(4000);

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html', function (err, data) {
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('get-age-in-dog-years', function (data, fn) {
    fn(data.age * 7);
  });
});