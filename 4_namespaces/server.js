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

var chickens = io.of('/chicken').on('connection', function (chicken) {
  chicken.on('do-action', function (data) {
    console.log(data);  
      chicken.emit(data.action, ((data.action === 'jump') ? 'Weeee!' : 'cluck-cluck-cluck'));
  });
});

var dogs = io.of('/dog').on('connection', function (dog) {
  dog.on('do-action', function (data) {
      dog.emit(data.action, ((data.action === 'jump') ? 'Wooohoo!' : 'Bow-wow!'));
  });
});