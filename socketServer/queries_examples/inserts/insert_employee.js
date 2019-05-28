var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "back34!",
    database : "library"
});

var sql = "INSERT INTO employee (EFirst, ELast, Salary) VALUES (?, ?, ?)";
var EFirst = 'Makis';
var ELast = 'Dimakis';
var Salary = 10000;
var val = [EFirst, ELast, Salary];

var HiringDate = '2019-05-22';
var ContrantNr = 324;

con.connect(function(err){
    if (err) throw err;

    con.query(sql,val, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    con.query("SELECT empID FROM employee WHERE EFirst LIKE '" + EFirst + "' AND ELast LIKE '" + ELast + "'", function(err, result, fields){
        if (err) throw err;
        console.log(result[0].empID);

        var temp = 1;

        if (temp == 1){
            var val2 = [result[0].empID, ContrantNr];
            var sql2 = "INSERT INTO temporary_employee (empID, ContrantNr) VALUES (?, ?)";
            con.query(sql2,val2, function (err, result2) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }

        else{
            var val3 = [result[0].empID, HiringDate];
            var sql3 = "INSERT INTO permanent_employee (empID, HiringDate) VALUES (?, ?)";
            con.query(sql3,val3, function (err, result3) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
});
