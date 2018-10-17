function UserDao() {

    //(1)引入MySQL模块
    var mysql = require('mysql');

    //对象初始化 链接数据库
    this.init = function () {
        //(2)创建一个connection
        this.connection = mysql.createConnection({
            host: 'localhost',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: '322822',          //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'express'          //数据库里面的数据
        });
        //(3),连接
        this.connection.connect();
    }



    //查询数据库中的内容 判断是否存在用户
    this.selectUserByName = function (mail, call) {
        //(4),编写sql语句
        var userGetSql = "SELECT * from user where email ='" + mail + "'";
//4,进行查询操作
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */
        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });
    }

        //数据插入
        this.insertUser = function (email, user, password, call) {
            //(1)执行插入
            var sqlInsert = 'INSERT INTO user(email,user,password) VALUES(?,?,?)';
            var paramsInsert = [email, user, password];

            this.connection.query(sqlInsert, paramsInsert, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
                    }
            console.log('dao insert=====' + result);
                console.log(result);
            call(result);
        });
            //5,连接结束

    }

    this.end = function () {
        this.connection.end();
    }



}


module.exports=UserDao;