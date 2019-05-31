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

//----------------------------- LOGINS ----------------------------\\

    socket.on('LOGIN', ({username, password}) => {
        //SQL Query with AGGREGATE FUNCTION COUNT
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
        //SQL Query with AGGREGATE FUNCTION COUNT
        const sql = "SELECT COUNT(*) FROM employee WHERE empID = ?";
        con.query(sql, username , function (err, result) {
            if (err) throw err;
            if (result[0]['COUNT(*)'] === 1) {
                console.log('Employee successful login');
                socket.emit('SUCCESSFUL_LOGIN')
            }
            else {
                console.log('Employee failed login');
                socket.emit('UNSUCCESSFUL_LOGIN')
            }
        });
    })

//-------------------------- FETCHES - SEARCHES -----------------------\\

    socket.on('FETCH_BOOKS', () => {
        //SQL Query with JOIN and ORDER BY and AGGREGATE FUNCTION COUNT()
        const sql = "SELECT B.ISBN, B.title, B.pubYear, B.numPages, B.pubName, B.remaining, COUNT(*), B.total"
        + " AS numOfCopies FROM book as B, copies as C WHERE B.ISBN=C.ISBN GROUP BY B.ISBN ORDER BY title ASC";

        con.query(sql, async function (err, result) {
            if (err) throw err;
            //console.log('Search for ', title);
            const books = JSON.parse(JSON.stringify(result));

            const promises = books.map(book => {
                //SQL Query with JOIN
                const sql2 = "SELECT AFirst, ALast FROM author AS A, written_by as W WHERE W.ISBN LIKE '" + book.ISBN +"' AND A.authID=W.authID";
                return new Promise((resolve, reject) => {
                  let authorsString;
                  con.query(sql2, function (err, result) {
                      if (err) return reject(err);
                      const authors = JSON.parse(JSON.stringify(result));
                      authorsString = authors.reduce((acc, x, index) =>
                        acc + x.AFirst + " " + x.ALast + " ",
                      "");
                      return resolve({...book, author: authorsString});
                  });
                })
            })

            const booksWithAuthors = await Promise.all(promises);
            socket.emit('FETCH_BOOKS', booksWithAuthors);
        });
    })

    socket.on('FETCH_AUTHORS', () => {
        const sql = "SELECT * FROM author";

        con.query(sql, function (err, result) {
            if (err) throw err;
            const authors = JSON.parse(JSON.stringify(result));

            socket.emit('FETCH_AUTHORS', authors)
        });
    })

    socket.on('FETCH_PUBLISHERS', () => {
        const sql = "SELECT * FROM publisher";

        con.query(sql, function (err, result) {
            if (err) throw err;
            const publishers = JSON.parse(JSON.stringify(result));
            console.log(publishers);
            //socket.emit('FETCHED_PUBLISHERS', authors)
        });
    })

    socket.on('FETCH_ACTIVE_BORROWS_MEMBERS', (memberID) => {
        //SQL Query with ORDER BY
        const sql = "SELECT (ISBN, date_of_borrowing, due_date) FROM borrows"
        + "WHERE memberID = ? AND date_of_return IS NULL ORDER BY due_date";

        con.query(sql, [memberID], function (err, result) {
            if (err) throw err;
            const borrows = JSON.parse(JSON.stringify(result));
            console.log(borrows);
            //socket.emit('FETCHED_ACTIVE_BORROWS_MEMBERS', borrows);
        });
    })

    socket.on('FETCH_ACTIVE_BORROWS_EMPLOYEE', () => {
        //SQL Query with ORDER BY
        const sql = "SELECT * FROM borrows WHERE date_of_return IS NULL ORDER BY memberID ASC";

        con.query(sql, function (err, result) {
            if (err) throw err;
            const borrows = JSON.parse(JSON.stringify(result));
            console.log(borrows);
            //socket.emit('FETCHED_ACTIVE_BORROWS_EMPLOYEE', borrows);
        });
    })

//--------------------------- DELETES -------------------------------\\

    socket.on('DELETE_BOOK', ({ISBN}) => {
        const sql = "DELETE FROM book WHERE ISBN = ?";

        con.query(sql, [ISBN], function (err, result) {
            if (err) throw err;
            console.log("Deleted book");
            //socket.emit('DELETED_BOOK');
        });
    })

    socket.on('DELETE_PUBLISHER', ({pubName}) => {
        const sql = "DELETE FROM publisher WHERE pubName = ?";

        con.query(sql, [pubName], function (err, result) {
            if (err) throw err;
            console.log("Deleted publisher");
            //socket.emit('DELETED_BOOK');
        });
    })

    socket.on('DELETE_AUTHOR', ({autID}) => {
        const sql = "DELETE FROM author WHERE authID = ?";

        con.query(sql, [authID], function (err, result) {
            if (err) throw err;
            console.log("Deleted author");
            //socket.emit('DELETED_BOOK');
        });
    })

//---------------------------- SIGNUPS ----------------------------------\\

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

    socket.on('ADD_EMPLOYEE', ({EFirst, ELast, Salary, isPermanent, secondField}) => {
        const sql = "INSERT INTO employee (EFirst, ELast, Salary) VALUES (?, ?, ?)";

        const val = [EFirst, ELast, Salary];
        con.query(sql, val , function (err, result) {
            if (err) throw err;
            console.log('Employee inserted');

            con.query("SELECT empID FROM employee ORDER BY empID DESC LIMIT 1", function (err, result) {
                if (err) throw err;
                if (isPermanent) {
                    var sql = "INSERT INTO permanent_employee (empID, HiringDate) VALUES (?, CURDATE())";
                    var val = [result[0].empID];
                }
                else{
                    var sql = "INSERT INTO temporary_employee (empID, ContractNr) VALUES (?, ?)";
                    var val = [result[0].empID, secondField];
                 }
                con.query(sql, val, function (err, result) {
                    if (err) throw err;
                    socket.emit('SUCCESSFUL_MEMBER_ADD', result[0].empID);
                });
            });
        });
    });

//--------------------------- INSERTS ---------------------------\\

    socket.on('BORROW', ({ISBN, memberID}) => {

    });

    socket.on('INSERT_PUBLISHER', ({pubName, estYear, Street, streetNum, postalCode}) =>{
        var sql = "INSERT INTO publisher (pubName, estYear, Street, Street_num, Postal_code) VALUES (?, ?, ?, ?, ?)";

        var val = [pubName, estYear, Street, streetNum, postalCode];
        con.query(sql, var, function (err, result) {
            if (err) throw err;
            socket.emit('SUCCESSFUL_PUBLISHER_INSERT');
            console.log("Publisher inserted");
        });
    });

   console.log("connection ok!");

 })
