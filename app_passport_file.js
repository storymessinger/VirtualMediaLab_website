var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

/* this app is going to use bodyparser for post*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: '123dfasdf3df3aadfD',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));

// use for passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/count', function (req, res) {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('count :' + req.session.count);
})

    

var users = [
    {
        username: 'egoing',
        password: 'qp0My7BNvunzQ+mRfveNL5Vo21PbwChd6+opJ2AyLlxglS3c1JgvAv3RP1ZSNB7Kw5618BZ2lPCa+tOL7eD6MTXad4aDul+7TTibUKlEh67QUTHuBH3J5GaSEWzmUMkla0Tgvxzo+GbTiDRJ+hAbpuTVV5ZjHLCUfzF5xFoDMsg=',
        salt: 'axmryXo0XnyfyiCUi4zYUNqzVv9xktzWKM/LPd4CXCGbjYUa2fQyPI89DTkR3coJGE+ow5AUEHSb/gg9rowLxQ==',
        displayName: 'Egoing'
    }
];


app.get('/auth/logout', function (req, res) {
//    delete req.session.displayName;
    
    // passport의 login
    req.logout();
    req.session.regenerate(function () {
        res.redirect('/welcome');
    });
})
app.get('/welcome', function (req, res) {
    if (req.user && req.user.displayName) {
        res.send(`
            <h1>Hello, ${req.user.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <p><a href="/auth/login">Please login</a></p>
        <p><a href="/auth/register">Register</a></p>
        `)
    }
});

app.post('/auth/register', function (req, res) {
    hasher({
        password: req.body.password
    }, function (err, pass, salt, hash) {
        var user = {
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName
        };
        users.push(user);
        
        
        // passport의 login
        req.login(user, function(err){
            req.session.save(function(){
                res.redirect('/welcome');
            })
        })
        
//        req.session.displayName = req.body.displayName;
//        req.session.save(function () {
//            res.redirect('/welcome');
//        })

    });
});

// done 이 false가 아니라면 이게 실행
// 맨 처음에 접속시 serialize 시킨다라는 말
passport.serializeUser(function(user, done) {
    //session에 이렇게username으로 저장이 된다. 보통 user.id로 하는게 일반적인듯. 
  done(null, user.username);
});

// done 이 false라면 이게 실행
// serialize 가 되고 사용자가 접속할때마다 이게 호출된다. 즉 현재 deserialize의 id인 username이 적용되는것이다. 
passport.deserializeUser(function(id, done) {
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(user.username === id){
            return done(null, user);
        };
//  User.findById(id, function(err, user) {
//    done(err, user);
  }
});


// Passport를 사용한다는 것은 session을 직접이 아니라 간접제어한다는 이야기!
// 따라서 req.session이 아니라 req.user를 통해서 모두 제어한다. 

passport.use(new LocalStrategy (
    function(username, password, done) {
    var uname = username; 
    var pwd = password; 
    
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(uname === user.username) {
            return hasher({password: pwd, salt:user.salt}, function(err, pass, salt, hash){
                if(hash === user.password){
                    // 로그인에 성공
                    // 여기서 넘기는 user객체가 req.user가 된다.
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }
    }
    done(null, false);
    }
)
);

app.post('/auth/login',
// local 전략을 사용한다
passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/auth/login',
    // 요너석은 사용자에게 인증에 실패했다는 정보를 딱한번 주는방법 (복잡도가 살짝 있다)
    failureFlash: false
})
);

/*
app.post('/auth/login', function(req,res){
    var uname = req.body.username;
    var pwd = req.body.password;
    
//    for (user in users) {
//        console.log(user);
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(uname === user.username) {
            return hasher({password: pwd, salt:user.salt}, function(err, pass, salt, hash){
                if(hash === user.password){
                    req.session.displayName = user.displayName;
                    req.session.save(function(){
                        res.redirect('/welcome');
                    })
                } else {
                    res.send(`No user or incorrect password
                        <p><a href="/auth/login">login</a></p>`)
                }
            });
        }
    }
    res.send(`No user or incorrect password
        <p><a href="/auth/login">login</a></p>`)
});*/

/*        if(uname === user.username && sha256(pwd+user.salt) === user.password){
            req.session.displayName = user.displayName;
            return req.session.save(function(){
                res.redirect('/welcome');
            });
            } 
        }
    res.send(`No user or incorrect password
        <p><a href="/auth/login">login</a></p>`)
});*/

app.get('/auth/register', function (req, res) {
    var output = `
        <h1> Login </h1>
        <form action="/auth/register" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="text" name="displayName" placeholder="displayName">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;

    res.send(output);

})
app.get('/auth/login', function (req, res) {
    var output = `
        <h1> Login </h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
});

app.listen(3003, function () {

    console.log('Connected 3003 port');
})