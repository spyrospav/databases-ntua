var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var title = "tal Signal";

con.connect(function(err){
    if (err) throw err;
    //possible nested query
    var search = 'SELECT b.ISBN, b.title, b.pubName, b.pubYear, au.AFirst, au.ALast '
    + 'FROM author AS au, (SELECT * FROM book WHERE title LIKE ?) AS b, written_by AS wr '
    + "WHERE (b.ISBN = wr.ISBN) AND (au.authID = wr.authID)";
    con.query(search, '%' + title + '%', function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
