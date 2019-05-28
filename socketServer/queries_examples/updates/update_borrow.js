var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var date_of_return = '2019-06-15'
var ISBN = '9878273843'

con.connect(function(err){
    if (err) throw err;
    var sql = "UPDATE borrows SET date_of_return = ? WHERE ?";
    con.query(sql, [date_of_return, ISBN], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
