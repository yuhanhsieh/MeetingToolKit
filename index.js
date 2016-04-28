var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/timer.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
      setInterval(myTimer, 1000);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

function myTimer() {
    var d = new Date();
    var startTime = moment().format('LTS');
    //var serverTimeString = moment(startTime, );
    console.log(startTime);
    io.emit('chat message', startTime);
}
