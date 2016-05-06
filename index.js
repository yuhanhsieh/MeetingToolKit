var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var seconds = 0, minutes = 0, hours = 0, t, currentTime;
var timmer = {};
var unlock = true;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/timer.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log(msg);
    if(msg=="start" && unlock) {
      unlock = false;
      timer();
  }else if(msg=="pause") {
      clearTimeout(t);
      io.emit('chat message', currentTime);
      socket.broadcast.emit('chat message', currentTime);
      unlock = true;
    } else if (msg=="clear") {
        clear();
        io.emit('chat message', currentTime);
        socket.broadcast.emit('chat message', currentTime);
    }
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    currentTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":"
      + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":"
      + (seconds > 9 ? seconds : "0" + seconds);
    console.log(currentTime);
    io.emit('chat message', currentTime);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function clear() {
    currentTime = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}
