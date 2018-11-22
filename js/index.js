
var Util =new util();

//管理员登陆
let PersonnelLogin = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"personnelLogin"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "id":"",                //类型：Number  必有字段  备注：无
        "password":""                //类型：String  必有字段  备注：无
    }
};

function personnelLogin() {
    console.log("进入登录函数");

     Util.postJSON(PersonnelLogin, "/personnelmanagement", function (ajaxData) {
         localStorage.token = ajaxData.head.token;

        if (ajaxData.head.code === "1000") {
             localStorage.logged = true;
             username = PersonnelLogin.param.id;
             location.href = "main.html";
        } else {
            console.log(ajaxData.head.msg);
            $("#login_password").val(' ');

        }
    })
}

//登录按钮点击事件
$("#login_botton").on("click", function () {
    console.log("触发登录点击按钮事件");
    PersonnelLogin.param.id = parseInt($("input[name='username']").val());
    PersonnelLogin.param.password = $("input[name='password']").val();
    personnelLogin();
});

//注册账号接口
var PersonnelAdd = {
    "head": {                //类型：Object  必有字段  备注：无
        "appVerNo": "1.0.0",                //类型：String  必有字段  备注：无
        "functionNo": "personnelAdd"                //类型：String  必有字段  备注：无
    },
    "param": {                //类型：Object  必有字段  备注：无
        "id": "",                //类型：Number  必有字段  备注：管理员id
        "username": "",                //类型：String  必有字段  备注：管理员姓名
        "password": "",                //类型：String  必有字段  备注：密码
        "birthday": "",                //类型：Number  可有字段  备注：生日
        "age": "",                //类型：Number  可有字段  备注：年龄
        "sex": "",                //类型：String  可有字段  备注：性别
        "telephone": ""                //类型：String  可有字段  备注：手机号
    }
};
//注册账号模态框
var index;
$('#register_botton').click(function () {
    layer.closeAll();
    index = layer.open({
        type:1,
        title:false,
        area:['650px','690px'],
        content: $('#register_motaikuang'),
        closeBtn:0,
        offset: [ $(window).height()-700, ],
        resize:false,
        btnAlign: 'c',
        fixed:false,
        move:false,
        scrollbar: false,
    })
});

$("#register_commit").on("click",function () {
        console.log("确认点击!");
        PersonnelAdd.param.id = parseInt($("input[name='registerId']").val());
        PersonnelAdd.param.username = $("input[name='registerName']").val();
        PersonnelAdd.param.password = $("input[name='registerPassword']").val();
        PersonnelAdd.param.birthday = parseInt($("input[name='registerBirthday']").val());
        PersonnelAdd.param.age = parseInt($("input[name='registerAge']").val());
        PersonnelAdd.param.sex = $("input[name='registerSex']").val();
        PersonnelAdd.param.telephone = $("input[name='registerPhone']").val();
        personnelAdd();
});

$("#register_cancel").on("click",function () {
    layer.close(index);
    var registerClose = document.getElementById("register_motaikuang");
    registerClose.style.cssText = "display: none;";
    console.log(document.getElementById("register_motaikuang"));
});

//注册账号函数
function personnelAdd(){
    console.log("进入注册账号函数");

    Util.postJSON(PersonnelAdd, "/personnelmanagement", function (ajaxData){
        console.log(PersonnelAdd);
        console.log(typeof PersonnelAdd.param.id);
        console.log(typeof PersonnelAdd.param.birthday);
        console.log(typeof PersonnelAdd.param.age);
        console.log(ajaxData);
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            alert(ajaxData.head.msg);
            localStorage.token = ajaxData.head.token;
            var registerClose = document.getElementById("register_motaikuang");
            registerClose.style.cssText = "display: none;";
        }
        else {
            alert(ajaxData.head.msg);
            console.log('注册失败');
           $("input[name='registerPassword']").val("");
        }

    })
}








// ' <div id="register_motaikuang" class="register-motaikuang" style="display: none;">' +
// '           <div class="register-content layui-row" >' +
// '               <div class="register-title">注册账号</div>' +
// '               <div class="register-line ">' +
// '                   <div>ID号码</div>' +
// '                   <input type="text" id="register_id" placeholder="请输入ID号"' +
// '                          name="registerId" autocomplete="new-password">' +
// '               </div>' +
// '               <div class="register-line">' +
// '                   <div>用户名</div>' +
// '                   <input type="text" id="register_name" placeholder="请输入用户名"' +
// '                          name="registerName" autocomplete="new-password">' +
// '               </div>' +
// '               <div class="register-line">' +
// '                   <div>密码</div>' +
// '                   <input type="password" id="register_password" placeholder="请输入密码"' +
// '                          name="registerPassword" autocomplete="new-password">' +
// '               </div>' +
// '               <div class="register-line">' +
// '                   <div>生日</div>' +
// '                   <input type="text" id="register_birthday" placeholder="请输入生日"' +
// '                          name="registerBirthday" autocomplete="new-password"></div>' +
// '               <div class="register-line">' +
// '                   <div>年龄</div>' +
// '                   <input type="text" id="register_age" placeholder="请输入年龄"' +
// '                          name="registerAge" autocomplete="new-password"></div>' +
// '               <div class="register-line">' +
// '                   <div>性别</div>' +
// '                   <input type="text" id="register_sex" placeholder="请输入性别"' +
// '                          name="registerSex" autocomplete="new-password"></div>' +
// '               <div class="register-line">' +
// '                   <div>联系方式</div>' +
// '                   <input type="text" id="register_phone" placeholder="请输入联系方式"' +
// '                          name="registerPhone" autocomplete="new-password"></div>' +
// '               <div class="register-btntwo">' +
// '                   <button class="layui-btn layui-btn-radius layui-btn-primary register-btn"' +
// '                          id="register_commit">' +
// '                       确认</button>' +
// '                   <button class="layui-btn layui-btn-radius layui-btn-primary register-btn"' +
// '                          id="register_cancel">' +
// '                       取消</button>' +
// '               </div>' +
// '           </div>' +
// '       </div>',