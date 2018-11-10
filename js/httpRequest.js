jQuery.support.cors = true;
var BASE_URL = "http://192.168.100.100:8080/"
var SUCCESS_CODE = "true";
var FAILURE_CODE = "false";

var Util = function () {
    var postJSON = function (json, moduleUrl, callback) {
        var url = BASE_URL + moduleUrl;
        var data = JSON.stringify(json);
        return jQuery.ajax({
            //这些是发送给后台的数据
            type: "POST",
            url: url,
            contentType: "application/json;",
            data: data,
            cache: false,
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(
                    XMLHttpRequest.status,
                    XMLHttpRequest.readyState,
                    textStatus
                );
            }
        });
    };
    var postJSONurl = function (json, moduleUrl, callback) {
        // json.head.appVerNo = APP_VER_NO;
        // json.head.functionNo = functionNo;
        var url = BASE_URL + moduleUrl;
        var data = JSON.stringify(json);
        return jQuery.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: data,
            dataType: "json",
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(
                    XMLHttpRequest.status,
                    XMLHttpRequest.readyState,
                    textStatus
                );
            }
        });
    };

    var purePOST = function (json, moduleUrl) {
        var url = BASE_URL + moduleUrl;
        var data = JSON.stringify(json);
        return jQuery.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: data,
            dataType: "json"
        });
    };
    //API导出
    this.postJSON = postJSON;
    this.postJSONurl = postJSONurl;
    this.purePOST = purePOST;
};

//获取当前浏览器可见区域高度
var clientHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
clientHeight *= 0.75;

//监听窗口高度变化
function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight,
        newHeight;
    (function run() {
        newHeight = elm.clientHeight;
        if(lastHeight != newHeight) callback();
        lastHeight = newHeight;

        if(elm.onElementHeightChangeTimer)
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}
//高度调整
onElementHeightChange(document.body, function () {
    clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    clientHeight *= 0.75;
});