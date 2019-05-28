const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const url = require('url');
const mysql = require('mysql');

const    con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

server.listen(8000, () => console.log("server running..."));

app.get('/', (req, res) => {
  const q = url.parse(req.url);
  res.send("this is a server");
//  res.sendFile(path.join(__dirname,'/../my_app/build','index.html'));
})

//app.use(express.static(path.join(__dirname,'/../my_app/build')));

io.on('connection', function(socket) {
    socket.on('LOGIN', ({username, password}) => {

    con.connect(function(err){
        if (err) throw err;

        var sql = "SELECT COUNT(*) FROM member WHERE memberID = ?";
        con.query(sql, username , function (err, result) {
            if (err) throw err;
            console.log(result[0]['COUNT(*)']);

            if (result[0]['COUNT(*)'] === 1) {
                socket.emit('SUCCESSFUL_LOGIN')
            }
            else {
                socket.emit('UNSUCCESSFUL_LOGIN')
            }

            console.log(result);
        });
    });
    })
   console.log("connection ok!");
 })
