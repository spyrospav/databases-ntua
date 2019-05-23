var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var sql = "INSERT INTO member (MFirst, MLast, Street, Street_num, Postal_code, MBirthdate) VALUES (?, ?, ?, ?, ?, ?)";
var MFirst = 'Katerina';
var MLast = 'Doka';
var Street = 'Aretis';
var Street_num = 37;
var Postal_code = 16675;
var MBirthdate = '1985-12-12';
//var val = MFirst + ", " + MLast + ", " + Street + ", " + Street_num + ", " + Postal_code + ", " + MBirthdate + ")" ;
var val = [MFirst, MLast, Street, Street_num, Postal_code, MBirthdate];

con.connect(function(err){
    if (err) throw err;

    con.query(sql,val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    con.query("SELECT memberID FROM member WHERE MFirst LIKE '" + MFirst + "' AND MLast LIKE '" + MLast + "'", function(err, result, fields){
        if (err) throw err;
        console.log(result);
    });
});
