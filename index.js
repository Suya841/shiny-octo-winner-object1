//1,引入express
var express = require('express');
var app = express();

//2,设置模板引擎
var path = require('path');
//3,设置视图地址
app.set('views', path.join(__dirname, '/views'));
//4,设置ejs引擎
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

//5,静态文件
app.use(express.static('public'));

//6,引入body-parser模块
var bodyParser = require('body-parser');
//7，创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//引入session模块
var session = require('express-session');
app.use(session({
    secret: '12345',
    name: 'express_11_cookie',
    cookie: {maxAge: 80*1000}
}));

//引入cookie模块
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//1,首页
var indexController=require('./Controllers/IndexController');
app.get('/index',indexController.index);
app.get('/logAndReg', indexController.logAndReg);
app.post('/login',urlencodedParser,indexController.login);
app.post('/register',urlencodedParser,indexController.register);
app.get('/cart', indexController.cart);

app.get('/categories', indexController.categories);

app.get('/checkout',  indexController.checkout);

app.get('/contact',  indexController.contact);

app.get('/product', indexController.product);

app.get('/logOut',indexController.logOut);


app.listen(8888);