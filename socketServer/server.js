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
    password : "password",
    database : "library",
    timezone : "UTC"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected to DBMS");
});

server.listen(8000, () => console.log("server running..."));

app.get('/', (req, res) => {
  const q = url.parse(req.url);
//  res.send("this is a server");
  //res.sendFile(path.join(__dirname,'/../my_app/build','index.html'));
})

//app.use(express.static(path.join(__dirname,'/../my_app/build')));

io.on('connection', function(socket) {

//----------------------------- LOGINS ----------------------------\\

    socket.on('LOGIN', ({username, password}) => {
        //SQL Query with AGGREGATE FUNCTION COUNT ********************************
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
        //SQL Query with AGGREGATE FUNCTION COUNT *********************************
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
        const sql = "SELECT * FROM book_view ORDER BY title ASC";
        //const sql = "SELECT B.ISBN, B.title, B.pubYear, B.numPages, B.pubName, B.remaining, COUNT(*)"
        //+ " AS numOfCopies FROM book as B, copies as C WHERE B.ISBN=C.ISBN GROUP BY B.ISBN ORDER BY title ASC";

        con.query(sql, async function (err, result) {
            if (err) {socket.emit("ERROR_FETCH")}
            else {
            const books = JSON.parse(JSON.stringify(result));

            const promises = books.map(book => {
                //SQL Query with JOIN ************************************************
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
        }
        });
    })

    socket.on('SEARCH_BOOKS', (title) => {
        //SQL Query with ORDER BY **************************************
        const sql = "SELECT DISTINCT * FROM book_view WHERE title LIKE '%" + title + "%' ORDER BY title ASC";

        con.query(sql, async function (err, result) {
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else{
            console.log('Search for', title);
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
            socket.emit('SEARCH_BOOKS', booksWithAuthors);
        }
        });
    })

    socket.on('SEARCH_CATEGORY', (category) => {
        //Nested SQL query **************************************************
        //And JOIN **********************************************************
        const sql = "SELECT * FROM book_view as B, (SELECT ISBN FROM belongs_to WHERE categoryName LIKE ?) AS C "+
        " WHERE C.ISBN = B.ISBN ORDER BY B.title ASC";

        con.query(sql, [category], async function (err, result) {
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else{
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
            socket.emit('SEARCH_BOOKS', booksWithAuthors);
        }
        });
    });

    socket.on('FETCH_AUTHORS', () => {
        const sql = "SELECT * FROM author ORDER BY ALast ASC";

        con.query(sql, function (err, result) {
            if (err) throw err;

            const authors = JSON.parse(JSON.stringify(result));
            const authorsFixDate = authors.map(author => ({
              authID: author.authID,
              AFirst: author.AFirst,
              ALast: author.ALast,
              ABirthdate: (author.ABirthdate) ? author.ABirthdate.substr(0,10) : undefined
            }))

            socket.emit('FETCH_AUTHORS', authorsFixDate)
        });
    })

    socket.on('FETCH_PUBLISHERS', () => {
        const sql = "SELECT * FROM publisher ORDER BY pubName ASC";

        con.query(sql, function (err, result) {
            if (err) throw err;
            const publishers = JSON.parse(JSON.stringify(result));
            socket.emit('FETCH_PUBLISHERS', publishers)
        });
    })

    socket.on('FETCH_ACTIVE_BORROWS_MEMBERS', (memberID) => {
        //SQL Query with ORDER BY ********************************************
        const sql = "SELECT ISBN, date_of_borrowing, due_date FROM borrows"
        + " WHERE memberID = ? AND date_of_return IS NULL ORDER BY due_date ASC";

        con.query(sql, [memberID], function (err, result) {
            if (err) throw err;
            const borrows = JSON.parse(JSON.stringify(result));
            //socket.emit('FETCHED_ACTIVE_BORROWS_MEMBERS', borrows);
            const borrowsFixDate = borrows.map(borrows => ({
              ISBN: borrows.ISBN,
              date_of_borrowing: borrows.date_of_borrowing.substr(0,10),
              due_date: borrows.due_date.substr(0,10),
            }))
            socket.emit('FETCH_ACTIVE_BORROWS_MEMBERS', borrowsFixDate);
        });
    })

    socket.on('FETCH_ACTIVE_BORROWS_EMPLOYEE', () => {
        //SQL Query with ORDER BY ********************************************
        const sql = "SELECT * FROM borrows WHERE date_of_return IS NULL ORDER BY memberID ASC";

        con.query(sql, function (err, result) {
            if (err) throw err;
            const borrows = JSON.parse(JSON.stringify(result));
            const borrowsFixDate = borrows.map(borrow => ({
              memberID: borrow.memberID,
              ISBN: borrow.ISBN,
              copyNr: borrow.copyNr,
              date_of_borrowing: borrow.date_of_borrowing.substr(0,10),
              due_date: borrow.due_date.substr(0,10),
            }))
            socket.emit('FETCH_ACTIVE_BORROWS_EMPLOYEE', borrowsFixDate);
        });
    })

    socket.on('FETCH_MEMBER', (memberID) => {
        //SQL Query with ORDER BY ********************************************
        const sql = "SELECT MFirst, MLast, Street, Street_num, Postal_code, MBirthdate FROM member_view WHERE memberID = ?";

        con.query(sql, [memberID], function (err, result) {
            if (err) throw err;
            const member = JSON.parse(JSON.stringify(result));
            const memberFixDate = member.map(member => ({
              MFirst: member.MFirst,
              MLast: member.MLast,
              Street: member.Street,
              Street_num: member.Street_num,
              Postal_code: member.Postal_code,
              MBirthdate: member.MBirthdate.substr(0,10)
            }))
            socket.emit('FETCH_MEMBER', memberFixDate[0]);
        });
    })

    socket.on('FETCH_REMINDERS', (memberID) => {
        //SQL Query with ORDER BY ********************************************
        const sql = "SELECT * FROM reminder WHERE memberID = ? ORDER BY date_of_reminder DESC";

        con.query(sql, [memberID], function (err, result) {
            if (err) throw err;
            const reminder = JSON.parse(JSON.stringify(result));
            const reminderFixDate = reminder.map(reminder => ({
              memberID : reminder.memberID,
              ISBN: reminder.ISBN,
              copyNr: reminder.copyNr,
              empID: reminder.empID,
              date_of_borrowing: reminder.date_of_borrowing.substr(0,10),
              date_of_reminder: reminder.date_of_reminder.substr(0,10)
            }))
            socket.emit('FETCH_REMINDERS', reminderFixDate);
        });
    })

    socket.on('FETCH_TOP_PUBLISHERS', () => {
        const sql = "SELECT pubName, COUNT(*) AS bookNum FROM book GROUP BY pubName ORDER BY count(*) DESC";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(JSON.parse(JSON.stringify(result)));
            console.log("Fetch top publishers");
            socket.emit('SUCCESSFUL_FETCH_TOP_PUBLISHERS', JSON.parse(JSON.stringify(result)));
        });
    })

    socket.on('FETCH_TOP_BORROWERS', () => {
        const sql = "SELECT memberID, COUNT(*) as borrowNum FROM borrows GROUP BY memberID HAVING count(*)>0 ORDER BY count(*) DESC";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(JSON.parse(JSON.stringify(result)));
            console.log("Fetch top borrowers");
            socket.emit('SUCCESSFUL_FETCH_TOP_BORROWERS', JSON.parse(JSON.stringify(result)));
        });
    })

//--------------------------- DELETES -------------------------------\\

    socket.on('DELETE_BOOK', (ISBN) => {
        const sql = "DELETE FROM book WHERE ISBN LIKE ?";

        con.query(sql, [ISBN], function (err, result) {
            if (err) throw err;
            console.log("Deleted book");
            socket.emit('SUCCESSFUL_DELETE_BOOK');
        });
    })

    socket.on('DELETE_PUBLISHER', (pubName) => {
        const sql = "DELETE FROM publisher WHERE pubName = ?";

        con.query(sql, [pubName], function (err, result) {
            if (err) throw err;
            console.log("Deleted publisher");
            socket.emit('SUCCESSFUL_DELETE_PUBLISHER');
        });
    })

    socket.on('DELETE_AUTHOR', (authID) => {
        const sql = "DELETE FROM author WHERE authID = ?";

        con.query(sql, [authID], function (err, result) {
            if (err) throw err;
            console.log("Deleted author");
            socket.emit('SUCCESSFUL_DELETE_AUTHOR');
        });
    })

//---------------------------- SIGNUPS ----------------------------------\\

    socket.on('SIGNUP_MEMBER', ({mFirst, mLast, street, streetNum, postalCode, MBirthDate, password}) => {
        const sql = "INSERT INTO member (MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES (?, ?, ?, ?, ?, ?)";

        const val = [mFirst, mLast, street, streetNum, postalCode, MBirthDate];
        con.query(sql, val , function (err, result) {
            if (err) {console.log("Invalid input"); socket.emit("ERROR_INPUT")}
            else {
                console.log('Member inserted');

                con.query("SELECT memberID FROM member ORDER BY memberID DESC LIMIT 1", function (err, result) {
                    if (err) throw err;
                    socket.emit('SUCCESSFUL_SIGNUP', result[0].memberID);
                });
            }
        });
    });

    socket.on('ADD_EMPLOYEE', ({EFirst, ELast, Salary, isPermanent}) => {
        const sql = "INSERT INTO employee (EFirst, ELast, Salary) VALUES (?, ?, ?)";

        const val = [EFirst, ELast, Salary];
        con.query(sql, val , function (err, result) {
            if (err) {socket.emit("ERROR_INPUT")}
            else {
            console.log('Employee inserted');

            con.query("SELECT empID FROM employee ORDER BY empID DESC LIMIT 1", function (err, result) {
                if (err) throw err;
                const id = result[0].empID;
                if (isPermanent) {
                    var sql = "INSERT INTO permanent_employee (empID, HiringDate) VALUES (?, CURDATE())";
                }
                else{
                    var sql = "INSERT INTO temporary_employee (empID) VALUES (?)";
                 }
                 var val = [result[0].empID];
                con.query(sql, val, function (err, result) {
                    if (err) throw err;
                    socket.emit('SUCCESSFUL_ADD_EMPLOYEE', id);
                });
            });
        }
        });
    });

//--------------------------- INSERTS ---------------------------\\

    socket.on('BORROW_BOOK', ({ISBN, memberID}) => {
        var sql = "SELECT max(copyNr) as M FROM copies WHERE ISBN LIKE ? AND AVAILABLE = true"

        con.query(sql, [ISBN], function (err, result) {
            if (err) throw err;
            const copyNr = JSON.parse(JSON.stringify(result));
            var sql = "INSERT INTO borrows (ISBN, copyNr, memberID, date_of_borrowing) VALUES (?, ?, ?, CURDATE())";
            con.query(sql, [ISBN, copyNr[0].M, memberID], function (err, result) {
                if (err) {
                  socket.emit("UNSUCCESSFUL_BORROW");
                }
                else {
                    socket.emit("SUCCESSFUL_BORROW");
                }
            });
        });
    });

    socket.on('INSERT_PUBLISHER', ({pubName, estYear, Street, Street_num, Postal_code}) =>{
        var sql = "INSERT INTO publisher (pubName, estYear, Street, Street_num, Postal_code) VALUES (?, ?, ?, ?, ?)";

        var val = [pubName, estYear, Street, Street_num, Postal_code];
        con.query(sql, val, function (err, result) {
            if (err) {
              socket.emit("ERROR_INPUT");
            }
            else {
              socket.emit('SUCCESSFUL_INSERT_PUBLISHER');
              console.log("Publisher inserted");
          }
        });
    });

    socket.on('INSERT_AUTHOR', ({AFirst, ALast, ABirthdate}) =>{
        var sql = "INSERT INTO author (AFirst, ALast, ABirthdate) VALUES (?, ?, ?)";

        var val = [AFirst, ALast, ABirthdate];
        con.query(sql, val, function (err, result) {
            if (err) {
              socket.emit("ERROR_INPUT");
            }
            else {
              socket.emit('SUCCESSFUL_INSERT_AUTHOR');
              console.log("Author inserted");
            }
        });
    });

    socket.on('INSERT_BOOK', ({ISBN, title, pubName, pubYear, numPages, AFirst, ALast, numOfCopies, shelf}) =>{
        var sql = "INSERT INTO book (ISBN, title, pubName, pubYear, numPages) VALUES (?, ?, ?, ?, ?)"

        var val = [ISBN, title, pubName, pubYear, numPages];
        con.query(sql, val, function (err, result){
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else {
            console.log("Book inserted");

            for (var i = 1; i <= numOfCopies; i++){
                con.query("INSERT INTO copies (ISBN, copyNr, shelf) VALUES (?, ?, ?)", [ISBN, i, shelf], function (err, result){
                    if (err){
                        console.log("insert copies error");
                        socket.emit("ERROR_INPUT")
                    }
                    console.log("Copy inserted");
                });
            }

            con.query("SELECT authID FROM author WHERE AFirst LIKE ? AND ALast LIKE ?", [AFirst, ALast], function (err, result){
                if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
                else{
                    const auID = JSON.parse(JSON.stringify(result));

                    if (auID.length > 0){
                        con.query("INSERT INTO written_by (ISBN, authID) VALUES (?, ?)", [ISBN, result[0].authID], function (err, result){
                            if (err) {console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
                            else{
                                console.log("Written by inserted");
                                socket.emit("SUCCESSFUL_INSERT_BOOK");
                            }
                        })
                    }

                    else if (auID.length == 0){
                        con.query("INSERT INTO author (AFIrst, ALast) VALUES (?, ?)", [AFirst, ALast], function (err, reuslt){
                            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
                            else{
                                console.log("Author inserted");

                                con.query("SELECT authID as M FROM author ORDER BY authID DESC LIMIT 1", function (err, result){
                                    con.query("INSERT INTO written_by (ISBN, authID) VALUES (?, ?)", [ISBN, result[0].M], function (err, result){
                                        if (err) throw err;
                                        console.log("Written by inserted");
                                        })
                                })
                                socket.emit('SUCCESSFUL_INSERT_BOOK');
                            }
                        });
                    }
                }
            });
        }
        });
    });

    socket.on('SENT_REMINDER', ({memberID, ISBN, copyNr, date_of_borrowing, empID}) =>{
        var sql = "INSERT INTO reminder (memberID, ISBN, copyNr, date_of_borrowing, empID, date_of_reminder)"
        + "VALUES (?, ?, ?, ?, ?, CURDATE())";

        var val = [memberID, ISBN, copyNr, date_of_borrowing, empID];
        con.query(sql, val, function (err, result) {
            if (err) { console.log("Can't send the same reminder twice a day"); socket.emit("ERROR_REMINDER");}
            else{
                socket.emit('SUCCESSFUL_SENT_REMINDER');
                console.log("New Reminder");
            }
        });
    });

//--------------------------- UPDATES ---------------------------\\

    socket.on('UPDATE_PUBLISHER', ({pubName, estYear, Street, Street_num, Postal_code}) =>{
        var val = [pubName, estYear, Street, Street_num, Postal_code, pubName];
        var sql = "UPDATE publisher"
        + " SET pubName = ?, estYear = ?, Street = ?, Street_num = ?, Postal_code = ? WHERE pubName LIKE ?";

        con.query(sql, val, function (err, result) {
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else{
                socket.emit('SUCCESSFUL_UPDATE_PUBLISHER');
                console.log("Publisher updated");
            }
        });
    });

    socket.on('UPDATE_AUTHOR', ({authID, AFirst, ALast, ABirthdate}) =>{
        var sql = "UPDATE author"
        + " SET AFirst = ?, ALast = ?, ABirthdate = ? WHERE authID = ?";
        const fixedBirthdate = ABirthdate //+ "T22:00:00.000Z";
        var val = [AFirst, ALast, fixedBirthdate, authID];
        con.query(sql, val, function (err, result) {
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else{
                socket.emit('SUCCESSFUL_UPDATE_AUTHOR');
                console.log("Author updated");
            }
        });
    });

    socket.on('UPDATE_BOOK', ({ISBN, title, pubYear, numPages, pubName}) =>{
        var sql = "UPDATE book SET title = ?, pubYear = ?, numPages = ?, pubName = ? WHERE ISBN LIKE ?";
        console.log(pubYear);
        var val = [title, pubYear, numPages, pubName, ISBN];
        con.query(sql, val, function (err, result) {
            if (err) { console.log("Error, probably greek characters"); socket.emit("ERROR_INPUT");}
            else{
                socket.emit('SUCCESSFUL_UPDATE_BOOK');
                console.log("Book updated");
            }
        });
    });

    socket.on('UPDATE_MEMBER', ({memberID, MFirst, MLast, Street, Street_num, Postal_code, MBirthdate}) =>{
        var sql = "UPDATE member_view"
        + " SET MFirst = ?, MLast = ?, Street = ?, Street_num = ?, Postal_code = ?, MBirthdate = ?  WHERE memberID = ?";

        var val = [MFirst, MLast, Street, Street_num, Postal_code, MBirthdate, memberID];
        con.query(sql, val, function (err, result) {
            if (err) {
                console.log("Error, probably greek characters or invalid date / number");
                socket.emit('UNSUCCESSFUL_UPDATE_MEMBER');
            }
            else {
                socket.emit('SUCCESSFUL_UPDATE_MEMBER');
                console.log("Member updated");
            }
        });
    });

    socket.on('RETURN_BOOK', ({memberID, ISBN, copyNr, date_of_borrowing}) =>{
        var sql = "UPDATE borrows"
        + " SET date_of_return = CURDATE() WHERE memberID = ? AND ISBN LIKE ? AND copyNr = ? AND date_of_borrowing LIKE ?";

        var val = [memberID, ISBN, copyNr, date_of_borrowing];
        con.query(sql, val, function (err, result) {
            if (err) { console.log("Unknown error"); socket.emit("ERROR_INPUT");}
            else{
                socket.emit('SUCCESSFUL_RETURN_BOOK');
                console.log("Book returned");
            }
        });
    });

   console.log("connection ok!");

 })
