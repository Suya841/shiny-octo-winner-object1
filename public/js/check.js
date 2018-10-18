let email = document.getElementById('email');
let user = document.getElementById('user');
let password = document.getElementById('password');
let ConfirmPassword = document.getElementById('ConfirmPassword');
let emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let userCheck = /^[A-Za-z]+$/;
let passwordCheck = /^[\w]{6,14}$/;




email.onchange = function () {
    if (email.value == ""){
        alert("邮箱不能为空");
    } else{
        if (emailCheck.test(email.value)){
            console.log("邮箱输入格式正确");
        }else{
            alert("邮箱格式输入错误");
        }
    }
}

user.onchange = function(){
    if (user.value=="") {
        alert("用户名不能为空");
    }else{
        if(user.value.length>1&&user.value.length<8){
            if (userCheck.test(user.value)){
                console.log("用户名输入正确");
            }else{
                alert("用户名只能使用英文字符")
            }
        }else{
            alert("用户名长度错误")
        }
    }
}

password.onchange = function(){
    if (password.value=="") {
        alert("密码不能为空");
    }else{
        if(password.value.length>5&&password.value.length<15){
            if (passwordCheck.test(password.value)){
                console.log("密码输入正确");
            }else{
                alert("不得使用特殊字符")
            }
        }else{
            alert("密码长度错误")
        }
    }
}


ConfirmPassword.onchange = function () {
    if(password.value == ConfirmPassword.value){
        console.log("密码输入正确");
    }else{
        alert("两次密码输入不一致");
    }
}



