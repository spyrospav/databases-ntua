const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const url = require('url');
const mysql = require('mysql');

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected to DBMS");
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
        const sql = "SELECT COUNT(*) FROM member WHERE memberID = ?";
        con.query(sql, username , function (err, result) {
            if (err) throw err;
            if (result[0]['COUNT(*)'] === 1) {
                console.log('Member successful login');
                socket.emit('SUCCESSFUL_LOGIN')
            }
            else {
                console.log('Member failed login');
                socket.emit('UNSUCCESSFUL_LOGIN')
            }
        });
    })

    socket.on('EMPLOYEE_LOGIN', ({username, password}) => {
        const sql = "SELECT COUNT(*) FROM employee WHERE empID = ?";
        con.query(sql, username , function (err, result) {
            if (err) throw err;
            if (result[0]['COUNT(*)'] === 1) {
                console.log('Employee successful login');
                socket.emit('SUCCESSFUL_LOGIN')
            }
            else {
                console.log('Employee failed login');
                socket.emit('UNSUCCESSFUL_EMP_LOGIN')
            }
        });
    })

    socket.on('SIGNUP_MEMBER', ({mFirst, mLast, street, streetNum, postalCode, MBirthDate, password}) => {
        const sql = "INSERT INTO member (MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES (?, ?, ?, ?, ?, ?)";

        const val = [mFirst, mLast, street, streetNum, postalCode, MBirthDate];
        con.query(sql, val , function (err, result) {
            if (err) throw err;
            console.log('Member inserted');

            con.query("SELECT memberID FROM member ORDER BY memberID DESC LIMIT 1", function (err, result) {
                if (err) throw err;
                socket.emit('SUCCESSFUL_SIGNUP', result[0].memberID);
            });
        });
    });

    socket.on('SEARCH_BOOK'. ({title}) => {
        const sql = "SELECT ISBN FROM book WHERE title LIKE ?";

        con.query(sql, "'%" + title "%'" , function (err, result) {
            if (err) throw err;
            //console.log('Search for ', title);
            console.log(JSON.stringify(result));
            //socket.emit('')
        });
    })

   console.log("connection ok!");
 })
