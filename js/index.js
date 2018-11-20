
console.log(BASE_URL);
var Util =new util();
$.ajax({
    url:"http://www.lywmy.cn:8081/personnelManagement",
    dataType:'JSONP',
    processData: false,
    type:'POST',
    success:function(data){
        alert(data.name);
    },

    error:function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }});
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
    // $.ajax({
    //     url:"http://www.lywmy.cn:8081/personnelManagement",
    //     type:'POST',
    //     dataType:'JSONP',  // 处理Ajax跨域问题
    //     success: function(data){
    //         $('body').append( "Name: " + data );
    //     }
    // });
     Util.postJSON(PersonnelLogin, "/personnelManagement", function (ajaxData) {

         console.log(baseUrl);
         console.log(url);
        if (ajaxData.head.code === "1000") {
            console.log(localStorage);

            localStorage.logged = true;
            localStorage.token = ajaxData.head.token;

            location.href = "main.html";

        } else {
            console.log(ajaxData.head.msg);
            console.log("登录失败");
            $(" #login_password").val('');
            // $.notify({
            //     // options
            //     icon: '../resource/worry.svg',
            //     message: ajaxData.head.zh_msg
            // }, {
            //     // settings
            //     type: "danger"
            // });

        }
    })
}


//登录
$("#login_botton").on("click", function () {
    console.log("00");
    PersonnelLogin.param.id = $("input[name='username']").val();
    PersonnelLogin.param.password = $("input[name='password']").val();
    personnelLogin();
});


//注册账号模态框
// var getUserRegistration = {
//     "head": {
//         "appVerNo": "",
//         "functionNo": "GetUserRegistration",
//         "token": ""
//     },
//     "param": {
//         "name": "",
//         "phone": "",
//         "idNum": "",
//         "email": "",
//     }
// };


// $('#account_regis_btn_send').click(function () {
//     //获取表单中的数据
//     console.log("进入获取注册信息模态框函数");
//     getUserRegistration.param.name = $(" #account_regis_mtk_name").val();
//     getUserRegistration.param.phone = $(" #account_regis_mtk_phone").val();
//     getUserRegistration.param.idNum = $(" #account_regis_mtk_identynum").val();
//     getUserRegistration.param.email = $(" #account_regis_mtk_email").val();
//
//     //传送到后台
//
//     util.postJSON(getUserRegistration, "/UserCenter", function (ajaxData) {
//         if (ajaxData.head.code === "2000") {
//             $.notify({
//                 // options
//                 icon: '../resource/worry.svg',
//                 message: ajaxData.head.zh_msg
//             }, {
//                 // settings
//                 type: "success"
//             });
//         } else {
//             $.notify({
//                 // options
//                 icon: '../resource/worry.svg',
//                 message: ajaxData.head.zh_msg
//             }, {
//                 // settings
//                 type: "danger"
//             });
//         }
//     })
// });
