var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'visualmedia',
    database : 'o2'
});

connection.connect();

/* SELECTING
var sql = 'SELECT * FROM topic';
connection.query(sql, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        for (var i=0; i<rows.length; i++){
            console.log(rows[i].title);
            console.log(rows[i].author);
        }
    }
    
});
*/

/* INSERT
var sql ='INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
var params = ['Supervisor','Watcher','graphittie'];
connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows.insertId);
    }
});
*/

/* UPDATE
var sql ='UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['NPM','leezche', 1];
connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
});
*/

var sql = 'DELETE FROM topic WHERE id=?'
var params = [1];

connection.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
});

connection.end();

//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//  if (err) throw err;
//
//  console.log('The solution is: ', rows[0].solution);
//});
//
//connection.end();

