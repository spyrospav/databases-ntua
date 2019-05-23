var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    con.query("SELECT * FROM member", function(err, result, fields){
        if (err) throw err;
        console.log(result);
    });
});
