var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var ISBN = '9878273843';
var title = 'Modern Programming Languages';
var pubYear = 2003;
var numPages = 543;
var pubName = 'Simmetria';
var val = [ISBN, title, pubYear, numPages, pubName];

var number_of_copies = 3;
var shelf = '13A';

con.connect(function(err){
    if (err) throw err;

    var sql = "INSERT INTO book (ISBN, title, pubYear, numPages, pubName) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    var i;
    for (i=1; i<=number_of_copies; i++){
        var val2 = [ISBN, i, shelf];
        var sql2 = "INSERT INTO copies (ISBN, copyNr, shelf) VALUES (?, ?, ?)";
        con.query(sql2, val2, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
});
