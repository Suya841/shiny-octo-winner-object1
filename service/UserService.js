function UserService(){

    //对象初始化
    this.init=function(){
        //(1)引入UserDao模块
        var UserDao =  require('../Dao/UserDao');
        //(2)获得对象
        this.userDao = new UserDao();
        //(3)对象初始化
        this.userDao.init();
    }

    this.checkUser=function(mail,password,call,state){

        // (1)用户工具类
        var tool=require('../Tools/tool');

        var userPwd =tool.crypto(password);

        this.selectUserByName(mail,function(result){
            var body={
                state:0,
                msg:"hello"
            }

            //1,获得数组的长度
            var length = result.length;

            if(length==0){
                body.state='1';
                body.msg= "邮箱或密码错误。。。"
            }else{
                //2,把密码从数组对象里面取出来
                var buffer = result[0].password;
                //3,判断用户是否合法
                if(userPwd==buffer){
                         body.state=2;
                         body.msg="登录成功！";
                         body.mail = mail;
                         body.password = buffer;
                }else{
                    body.state='1';
                    body.msg= "邮箱或密码错误。。。"
                }
            };

            call(body);
        });

    }



    this.insert = function(mail,user,password,ConfirmPassword,call) {
        var tool=require('../tools/tool');

        var resData = {
            insertId: -1,
            msg: ''
        }

        var newPassword = tool.crypto(password);
        var ConfirmPassword = tool.crypto(ConfirmPassword);

        //1,如何存在就直接返回存在的结果

        var that = this;
        this.checkUser(mail,password,function(result) {
            console.log('insert result====');
            console.log(result);
            if (result.state==2) {
                console.log(result)
                resData.insertId = '0';
                resData.msg = "用户已经存在！"
            } else {

                if(newPassword==ConfirmPassword){
                    let userid;
                    that.userDao.insertUser(mail,user,newPassword,function(data){
                        userid = data.insertId
                        console.log(data.insertId);
                    });
                    resData.insertId = '2';
                    resData.msg = "注册成功";

                    call(resData);

                }else{
                    resData.insertId = '1';
                    resData.msg = "两次输入的密码不一致，请重新输入";
                }

            }



        },-1)
    }

    this.end = function () {
        this.userDao.end();
    }


    this.selectUserByName=function(mail,call){
        //(4)查询密码
        this.userDao.selectUserByName(mail,function(result){
            call(result);
        });
    }

}
module.exports=UserService;