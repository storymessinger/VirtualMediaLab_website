var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// making the code from jade -> pretty :)
app.locals.pretty = true;

// seeting t use jade
app.set('view engine', 'jade');
app.set('views', './views');

// setting to use the static page
app.use(express.static('public'));
// setting body-parser. Able to use body for post
app.use(bodyParser.urlencoded({
    extended:false
}))


// get post test
app.get('/form', function(req,res){
    
    res.render('form',{
    });
})

// get test
/*app.get('/form_receiver', function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title +','+description);
})*/

// post test
app.post('/form_receiver', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ' '+description);
})

// Router to test out query string
app.get('/topic/:id', function(req, res){
    var topics = [
        'Javascript is ...',
        'Nodejs is',
        'Express is'
    ];
    
    res.render('top',{
        _topics: topics,
        semanticResult:req.params.id
    });
});

// Router to use jade
app.get('/template', function(req,res){
    var time = Date();
    
    // 'Render' the file called temp.** in views folder
    res.render('temp', {time:time, insa:'hello', _title:'Jade'});
});

// Baiic router 
app.get('/', function(req, res){
    res.send('Hello express');
});

// Router that uses static 
app.get('/logo', function(req, res){
    res.send('Hello footer logo, <img src="Logo_footer.svg">');
});

app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i=0; i<25; i++){
        lis = lis + '<li>coding</li>';
    }

    var time = Date();

    var output = `
        <!DOCTYPE html>
        <html>
            <body>
                <ul>
                    ${lis}
                </ul>
                ${time}
            </body>
        </html>
    `;
    res.send(output);
});

app.listen(3000, function(){
    console.log('Connected 3000 port!');

});
