var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var ISBN = '9878273843';
var shelf = '13A';
var additional_copies = 4;
var current_number_copies;

con.connect(function(err){
    if (err) throw err;

    var sql = "SELECT max(copyNr) as R FROM copies WHERE ISBN LIKE ?";

    con.query(sql, [ISBN], function (err, result) {
        if (err) throw err;
        console.log(result);

        current_number_copies = result[0].R;
        console.log(current_number_copies);

        var sql2 = "INSERT INTO copies (ISBN, copyNr, shelf) VALUES (?, ?, ?)";
        var i;

        for (i=current_number_copies+1; i<=current_number_copies+additional_copies; i++){
            var val = [ISBN, i, shelf];
            con.query(sql2, val, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }

    });
});
