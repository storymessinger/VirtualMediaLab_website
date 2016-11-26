var express = require('express');
var app = express();
// making the code from jade -> pretty :)
app.locals.pretty = true;

// seeting t use jade
app.set('view engine', 'jade');
app.set('views', './views');

// setting to use the static page
app.use(express.static('public'));

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
