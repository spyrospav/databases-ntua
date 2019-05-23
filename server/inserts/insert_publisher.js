var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var pubName = 'Papasotiriou';
var estYear = 1985;
var Street = 'Stournari';
var Street_num = 43;
var Postal_code = 17114;
var val = [pubName, estYear, Street, Street_num, Postal_code];

con.connect(function(err){
    if (err) throw err;
    var sql = "INSERT INTO publisher (pubName, estYear, Street, Street_num, Postal_code) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    con.query("SELECT * FROM publisher", function(err, result, fields){
        if (err) throw err;
        console.log(result);
    });
});
