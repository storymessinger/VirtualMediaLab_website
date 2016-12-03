var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
var fs = require('fs');

app.locals.pretty=true;

app.set('view engine','pug');
app.set('views', './views_file');

// setting to use the static page
app.use('/user', express.static('uploads/'));
// setting body-parser. Able to use body for post
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/upload',function(req,res){
    res.render('upload');
});

app.post('/upload',upload.single('userfile'), function(req,res){
    res.send('Uploaded : '+req.file.filename);
});

app.get(['/topic','/topic/:id'], function(req,res){
    fs.readdir('data',function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id && (id != 'new')){
            // if you have the id value
            fs.readFile('data/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{
                    topics: files,
                    title: id,
                    body: data
                });
            });

        } else if(id && (id == 'new')){
            res.render('new', {
                topics: files
            });
        } else {
            // if you do NOT have id value
            res.render('view',{
                topics : files,
                title : 'Welcome',
                body : 'Welcome stranger :)'

            });
        }
    });
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } 
        res.redirect('/topic/'+title);
    });
});

app.listen(3000, function(){
    console.log("Connected, 3000 port :)");
});
