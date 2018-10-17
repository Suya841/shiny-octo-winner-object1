//用flag判断当前是否登录，如果登录值为2，没有值为1
let flag;

//首页模块 进入首页判断浏览器是否保存cookie
//判断当前是否是登录状态

exports.index = function(req,res){

    if((req.session.sign&&flag==2) || flag==2){
        res.render('index',{state:2});
        flag = 2;
        return;
    }else {
        res.render('index',{state:-1});
        flag = 1
        return;
    }

}

exports.logOut = function(req,res){
    res.render('index',{state:-1});
    flag = 1;
}


exports.cart = function(req,res){


    console.log('index session.sign====='+req.session.sign)

    if( flag == 2){
        res.render('cart',{state:2});
        flag = 2;
        return;
    }
    res.render('cart',{state:-1});
    flag = 1;
    return;

}


exports.categories = function(req,res){


    console.log('index session.sign====='+req.session.sign)

    if(flag == 2){
        console.log(flag);
        res.render('categories',{state:2});
        flag = 2;
        return;
    }
    res.render('categories',{state:-1});
    flag = 1;
    return;

}

exports.checkout = function(req,res){


    if(flag == 2){
        console.log(flag);
        flag = 2;
        res.render('checkout',{state:2});
        return;
    }
    flag = 1;
    res.render('checkout',{state:-1});
    return;

}

exports.contact = function(req,res){


    if(flag == 2){
        console.log(flag);
        res.render('contact',{state:2});
        flag = 2;
        return;
    }
    res.render('contact',{state:-1});
    flag = 1;
    return;

}

exports.product = function(req,res){


    if(flag == 2){
        console.log(flag);
        res.render('product',{state:2});
        flag = 2;
        return;
    }
    res.render('product',{state:-1});
    flag = 1;
    return;

}



//登录判断是否存在cookie
exports.logAndReg=function(req,res){

    res.render('logAndReg',{state:-1})

}


//用户登录模块
exports.login=function(req,res){
    //1,解析客户端提交的数据
    var email  = req.body.email;
    var password  = req.body.password;
    //2,验证用户是否合法
    //(1)引入userService
    var UserService = require('../Service/UserService');
    //(2)创建对象
    var userService = new UserService();
    //(3)对象初始化
    userService.init();
    //(4)验证用户是否合法
       userService.checkUser(email,password,function(result){

        if(result.state==2){
            req.session.sign=true;
            flag=2;
            res.cookie('mail',result.mail,{maxAge:10*1000});
            res.cookie('password',result.password,{maxAge:10*1000});
            var data = JSON.stringify(result);
            res.end(data);
        }
        console.log('login session.sign====='+req.session.sign)
        console.log('login flag====='+flag)
        userService.end();

    },0);


}

//用户注册模块
exports.register = function(req,res) {
    //1,解析客户端提交的数据
    var email = req.body.email;
    var user = req.body.user;
    var password = req.body.password;
    var ConfirmPassword = req.body.ConfirmPassword;
    //2,向业务层要数据
    //(1),引入UserService模块
    var UserService = require('../service/UserService');
    //(2),创建UserService对象
    var userService = new UserService();
    userService.init();
    //(3),插入用户
    userService.insert(email,user,password,ConfirmPassword,function(result) {
        //3,把数据传给view
        res.end(JSON.stringify(result));
        userService.end();
    });

}