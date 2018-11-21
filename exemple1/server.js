var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var slide = 0;
var active = 0;

io.on('connection', function(socket) {
  print('connected\n');
  active++;
  socket.on('slide', (msg) => { io.emit('aslide', slide)});
  socket.on('adslide', (msg) => {console.log('adsl'); slide++});
  socket.on('rslide', (msg) => slide = (slide -1 == -1) ? slide : slide -1);
  socket.on('disconnect', (msg) => {active--; print('disconnect\n');});
  socket.on('getAc', (msg) => {socket.emit('aAc', active)})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function print(msg) {process.stdout.write(msg)}
