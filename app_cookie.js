var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser('123kdfAdf@341DFa111a'));

var products = {
    1:{title: 'The history of web 1'},
    2:{title: 'The next web'},
    3:{title: 'Opentutorials'}
}

app.get('/products', function(req, res){
    var output = ``;
    for( var name in products) {
        console.log(products[name].title);
        output += `
            <li>
                <a href="/cart/${name}">${products[name].title} </a>
            </li>
            `
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
})
/* after the user clicks the product, it is redirected to /cart/:id
The value of id is determined by the 고유번호 the product is given at the start
if there is already some cookie, it is added to the variable 'cart'
if 넘겨받은 product had no number at all, it is given 0.
and than it is add +1
Than this infomation 'cart' is cookie-burned
than the site is redirected to /cart
*/

app.get('/cart/:id', function(req, res){
    var id = req.params.id;
    if(req.signedCookies.cart){
        var cart = req.signedCookies.cart;
    } else {
        var cart = {};
    }
    if(!cart[id]){
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart, {signed: true});
    res.redirect('/cart');
});

/* This is the information given by cookies.cart 
cart = 
    1:2,
    2:1
}
*/

app.get('/cart', function(req, res){
    var cart = req.signedCookies.cart;
    if (!cart) {
        res.rend('Empty!');
    } else {
        var output = '';
        for(var id in cart){
            output += `<li>${products[id].title} (${cart[id]})</li>`
        }
     
    } 
    
    res.send(`<h1>Cart</h1>
            <ul>${output}</ul>
            <a href="/products">Products List</a>`);
});


app.get('/count', function(req,res){
    if (req.signedCookies.count){
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }
    res.cookie('count', count+1, {signed: true});
    res.send('count: ' + req.signedCookies.count);
});


app.listen(3003, function(){
    
    console.log('Connected 3003 port');
})