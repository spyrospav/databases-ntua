var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

con.connect(function(err){
    if (err) throw err;
    //possible nested query
    var search = 'SELECT * FROM borrows WHERE date_of_return IS NULL ';
    con.query(search, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
