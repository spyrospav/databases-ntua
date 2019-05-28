const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const url = require('url');

server.listen(8000, () => console.log("server running..."));

app.get('/', (req, res) => {
  const q = url.parse(req.url);
  res.send("this is a server");
//  res.sendFile(path.join(__dirname,'/../my_app/build','index.html'));
})

//app.use(express.static(path.join(__dirname,'/../my_app/build')));

io.on('connection', function(socket) {
    socket.on('LOGIN', ({username, password}) => {
      if (username === 'buck') {
        socket.emit('SUCCESSFUL_LOGIN')
      }
      else {
        socket.emit('UNSUCCESSFUL_LOGIN')
      }
    })
   console.log("connection ok!");
 })
