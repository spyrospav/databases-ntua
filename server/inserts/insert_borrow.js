var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var memberID = 1;
var ISBN = '9878273843';
var copyNr = 1;
var date_of_borrowing = '2019-05-23';
var val = [memberID, ISBN, copyNr, date_of_borrowing];

con.connect(function(err){
    if (err) throw err;

    var sql = "INSERT INTO borrows (memberID, ISBN, copyNr, date_of_borrowing) VALUES (?, ?, ?, ?)";
    con.query(sql, val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
