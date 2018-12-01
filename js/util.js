var BASE_URL = "http://www.lywmy.cn:8081"; //远程测试地址;
var baseAppVerNo = "1.0.0";
var username;
var util = function () {
     var postJSON = function (json, baseUrl, callback) {
          json.head.appVerNo = baseAppVerNo;
        json.head.token = localStorage.token;
        var url = BASE_URL + baseUrl;
        var data = JSON.stringify(json);
        return jQuery.ajax({
            'type': 'POST',
            'url': url,
            'contentType': 'application/json',
            'data': data,
            'dataType': 'json',
            'success': callback,
            'error': function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status, XMLHttpRequest.readyState, textStatus);
            }
        });
    };
    this.postJSON = postJSON;
};
//
// /*退出系统 */
// $("#logout").on("click", function () {
//     var data = {};
//     var html = template("logoutsystem", data);
//     layer.open({
//         type: 1,
//         resize: false,
//         scrollbar: false,
//         skin: 'window',
//         title: "退出",
//         content: html,
//         area: ['300px', 'auto']
//     })
//     $("#confirmlogout").on('click', function () {
//         localStorage.clear();
//         top.location.href = "login.html";
//     })
// })