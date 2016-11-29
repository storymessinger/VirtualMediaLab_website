var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

app.locals.pretty=true;

app.set('view engine','pug');
app.set('views', './views_file');

// setting to use the static page
app.use(express.static('public_file'));
// setting body-parser. Able to use body for post
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/upload', function(req,res){
    res.render('upload');
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
