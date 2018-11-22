$(document).ready(function ($) {
    getUser();
});
var token = localStorage.getItem('token');
let Util = new util();

// 初始化用户
function getUser() {

    if (!token) {
        alert("登录超时，请重新登录！");
        location.href = "index.html";
    }

    //let user = JSON.parse(localStorage.user);
   // console.log(user);
    // console.log(user.localCandidateId);
    // $("#userName-main").text(user.username);
     $("#user").text(username);
}

//退出按钮
$("#logout").on('click', function () {
    window.location.href = "index.html";
    localStorage.clear();
});



