var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var memberID = 1005;
//var ISBN = '9781840221732';
var ISBN = '9789603307';
var cont = false;
var cont2 = false;

con.connect(function(err){
    if (err) throw err;

    const sql = "SELECT remaining FROM book WHERE ISBN LIKE ?";
    con.query(sql, [ISBN], function (err, result) {
        if (err) throw err;

        console.log(result[0].remaining);
        cont = true;
        if (result[0].remaining === 0) console.log("NO COPIES LEFT"); //socket.emit('NO_COPIES_LEFT');
        else {
            if (cont){
            const sql = "SELECT max(copyNr) as COPY FROM copies WHERE ISBN LIKE ? AND available = true";

            con.query(sql, [ISBN], function (err, result) {
                if (err) throw err;

                const copy_ = JSON.parse(JSON.stringify(result));
                console.log(copy_.COPY);
                cont2 = true;
                const sql = "INSERT INTO borrows (memberID, ISBN, copyNr, date_of_borrowing) VALUES (?, ?, ?, CURDATE())";
                if (cont2){
                con.query(sql, [memberID, ISBN, copy_.COPY], function (err, result) {
                    console.log([memberID, ISBN, copy_.COPY]);
                    if (err) throw err;
                    const borrow = JSON.parse(JSON.stringify(result));
                    console.log(borrow);

                    //socket.emit('BORROW_DONE');
                });
            }
            });
        }
        }
    });
});
