var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var title = "the";

con.connect(function(err){
    if (err) throw err;

    var search = "SELECT * FROM book_view WHERE title LIKE ? ORDER BY title ASC";
    con.query(search, '%' + title + '%', function (err, result) {
        if (err) throw err;
        console.log(JSON.parse((JSON.stringify(result))));
    });
});
