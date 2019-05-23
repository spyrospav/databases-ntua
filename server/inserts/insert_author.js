var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var ABirthdate = '1954-8-15';
var AFirst = 'Adam';
var ALast = 'Webber';
var val = [AFirst, ALast, ABirthdate];

con.connect(function(err){
    if (err) throw err;
    var sql = "INSERT INTO author (AFirst, ALast, ABirthdate) VALUES (?, ?, ?)";
    con.query(sql, val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    con.query("SELECT authID FROM author WHERE AFirst LIKE '" + AFirst + "' AND ALast LIKE '" + ALast + "'", function(err, result, fields){
        if (err) throw err;
        console.log(result[0].authID);
    });

});
