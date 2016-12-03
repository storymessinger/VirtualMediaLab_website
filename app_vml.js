var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// expressjs 에서 다양한 파일 업로드를 다루기위한 mutler 
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if(파일의 형식이 이미지면)
        // 어디에다가 넣고 cb( );
        // else if (파일의 형식이 텍스트면)
        // 어디에다가 넣고 cb();
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        //if 만약 이미 파일이 존재한다면...등의 조건 가능
        cb(null, file.originalname);
    }
});
var upload = multer({ storage : _storage });

// BASIC mysql connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'visualmedia',
    database : 'vml'
});
connection.connect();

// database vml
// table students
// id-PRIMARY, name, description, interest, email

// Makes pretty html for pug files 
app.locals.pretty=true;

// Using pug as an view engine
app.set('view engine','pug');
    //Going to use this directory for views file
app.set('views', './views_vml');

// setting to use the static page
app.use('/user', express.static('uploads/'));
// setting body-parser. Able to use body for post
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get(['/student','/student/:id'], function(req,res){
    var sql = 'SELECT id, name FROM students';
    connection.query(sql, function(err, rows, fields){
        var id = req.params.id;
        if(id && (id != 'add')){
            var sql = 'SELECT * FROM students WHERE id=?';
            connection.query(sql, [id], function(err, rows_2, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view',{
                        topics: rows,
                        topic:rows_2[0],
                    });
                }
            })
            
        } else if(id && (id == 'add')) {
            var sql = 'SELECT id, name FROM students';
            res.render('add',{
                topics: rows,
            });
        } else {
            res.render('view',{
                topics: rows,
            });
        }
    });
});

app.get(['/student/:id/delete'], function (req, res) {
    var sql = 'SELECT id, name FROM students';
    connection.query(sql, function (err, rows, fields) {
        var sql = 'SELECT * FROM students WHERE id=?';
        var id = req.params.id;
        connection.query(sql, [id], function (err, student) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                if (student.length === 0) {
                    console.log('There is no id.');
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('delete', {
                        topics: rows,
                        topic: student[0]
                    })

                }
            }
        })
    })
})

app.get(['/student/:id/edit'], function (req, res) {

    var sql = 'SELECT id, name FROM students';
    connection.query(sql, function (err, rows, fields) {

        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM students WHERE id=?';
            connection.query(sql, [id], function (err, rows_2, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('edit', {
                        topics: rows_2,
                        topic: rows_2[0],
                    });
                }
            })

        } else {
            console.log("THERE IS NO ID");
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/student/add', function (req, res) {
    var sql = 'INSERT INTO students (name, description, interest, email) VALUES (?,?,?,?)';

    var name = req.body.name;
    var description = req.body.description;
    var interest = req.body.interest;
    var email = req.body.email;

    connection.query(sql, [name, description, interest, email], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/student/' + result.insertId);
        }

    })
});

app.post('/student/:id/edit', function (req, res) {
    var sql = 'UPDATE students SET name=?, description=?, interest=?, email=? WHERE id=?';

    var name = req.body.name;
    var description = req.body.description;
    var interest = req.body.interest;
    var email = req.body.email;
    var id = req.params.id;
    
    connection.query(sql, [name, description, interest, email, id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/student/' + id);
        }

    })
});

app.post('/student/:id/delete', function (req, res) {
    var id = req.params.id;
    var sql = 'DELETE FROM students WHERE id=?';
    connection.query(sql, [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/student');
        }
    })
})


app.listen(3000, function(){
    console.log("Connected, 3000 port :)");
});