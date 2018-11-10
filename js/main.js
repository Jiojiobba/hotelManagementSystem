layui.use(['jquery', 'layer', 'element'], function(){
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer;
    /*导航栏点击跳转页面*/


});
window.onresize = function () {
    resizeFrameHeight();
};

//导航栏切换效果
function resizeFrameHeight(){
    var ifm = document.getElementById("mainiframe");
    ifm.height = document.documentElement.clientHeight - 50;
}

// $(".menu li").on('click', function () {
//
//     var out_a = $(this).children("a");
//     var out_dl = $(this).children("dl");
//     var out_dl_dd = $(out_dl).children("dd");
//     var out_dl_dd_a = $(out_dl_dd).children("a");
//
//     console.log(localStorage);
//     switch ($(out_a).text()) {
//         case "客房类型管理":
//             console.log($(out_dl_dd).children("a").text());
//             console.log(localStorage.enrolState);
//
//             switch ($(out_dl_dd).children("a").text()) {
//                 case "类型管理":
//                     console.log('111');
//                     $("#mainiframe").attr('src', './roomTypeManage.html');
//                     break;
//                 case "客房管理":
//                     $("#mainiframe").attr('src', './roomTypeManage.html');
//                     break;
//             }
//             break;
//
//         case "客户管理":
//             console.log("客房管理");
//             $("#mainiframe").attr('src', './roomManage.html');
//             break;
//         case "客户预订":
//             console.log("客户预订");
//             $("#mainiframe").attr('src', './userBook.html');
//             break;
//         case "客户查询":
//             console.log("客户查询");
//             $("#mainiframe").attr('src', './userRearch.html');
//             break;
//         case "客户入住":
//             console.log("客户入住");
//             $("#mainiframe").attr('src', './userCheckin.html');
//             break;
//         case "订单查询":
//             $("#mainiframe").attr('src', './oderRearch.html');
//             break;
//         case "收费结算":
//             $("#mainiframe").attr('src', './chargeSettlement.html');
//             break;
//         default:
//             break;
//     }
//
// });