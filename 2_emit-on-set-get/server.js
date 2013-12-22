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

  // On
  socket.on('msg', function (data) {
    console.log('message received at', data);

    // Get
    socket.get('sent', function (err, lastMessageSent) {

      // Emit
      socket.emit('msg-received', {
        sent: data.sent,
        lastMessageSent: lastMessageSent
      });

    });

    // Set
    socket.set('sent', data.sent);

  });
});