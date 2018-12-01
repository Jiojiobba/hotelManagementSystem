

$(function () {
    orderFuzzyQuery();
    layui.use('laydate', function(){
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#check_time' //指定元素
        });
        laydate.render({
            elem: '#out_time' //指定元素
        });
    })
});

var Util =new util();

let OrderFuzzyQuery = {
    "head": {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"orderFuzzyQuery"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "queryObject": {                //类型：Object  可有字段  备注：查询条件封装类
            "roomId":"",                //类型：String  可有字段  备注：房间号
            "telephone":"",                //类型：String  可有字段  备注：电话
            "idNumber":"",                //类型：String  可有字段  备注：身份证号码
            "sex":"",                //类型：String  可有字段  备注：客户性别
            "name":"",                //类型：String  可有字段  备注：客户姓名
            "id":""                //类型：String  可有字段  备注：订单号(年月日时分秒)
        },
        "pageNum":0,                //类型：Number  必有字段  备注：无
        "pageSize":10                //类型：Number  必有字段  备注：无
    }
};
function orderFuzzyQuery(){


    // OrderFuzzyQuery.param.pageNum = 0;
    // OrderFuzzyQuery.param.pageSize = 10;

    Util.postJSON(OrderFuzzyQuery, "/ordermanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;

        /*var allBook = [];
        // allBook = ajaxData.data.orderInfoList.list;

        layui.use('table', function(){
            var table = layui.table;
            table.render({
                elem: '#test'
                ,toolbar: false
                ,title: '订单表'
                ,totalRow: false
                ,height:390
                ,limit:8
                ,cols: [[
                    {field:'name', title: '姓名'}
                    ,{field:'sex',title:'性别'}
                    ,{field:'idNumber', title: '身份证'}
                    ,{field:'telephone', title: '电话'}


                ]]
                ,page: true
                ,data:allBook
            });
        });*/

        if (ajaxData.head.code === "1000") {

            var allBook = [];
            allBook = ajaxData.data.orderInfoList.list;

            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#test'
                    ,toolbar: false
                    ,title: '订单表'
                    ,totalRow: false
                    ,height:390
                    ,limit:8
                    ,cols: [[

                        {field:'name', title: '姓名'}
                        ,{field:'sex',title:'性别'}
                        ,{field:'idNumber', title: '身份证'}
                        ,{field:'telephone', title: '电话'}

                    ]]
                    ,page: true
                    ,data:allBook
                });
            });}

        else {
            layer.msg(ajaxData.head.msg);
        }
    })
};

function  rearch() {
    Util.postJSON(OrderFuzzyQuery, "/ordermanagement", function (ajaxData) {
        console.log(OrderFuzzyQuery);
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#RoomId").val(' ');
            $("#Telephone").val(' ');
            $("#IdNumber").val(" ");
            $("#Sex").val(" ");
            $("#Name").val(" ");
            $("#Id").val(" ");

            orderFuzzyQuery();
            layer.msg("查询成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
}

$("#book_btn").on('click',function () {
    OrderFuzzyQuery.param.queryObject.roomId  = $("input[name='RoomId']").val();
    OrderFuzzyQuery.param.queryObject.telephone  = $("input[name='Telephone']").val();
    OrderFuzzyQuery.param.queryObject.idNumber  = $("input[name='IdNumber']").val();
    OrderFuzzyQuery.param.queryObject.sex  = $("input[name='Sex']").val();
    OrderFuzzyQuery.param.queryObject.name  = $("input[name='Name']").val();
    OrderFuzzyQuery.param.queryObject.id  = $("input[name='Id']").val();
    OrderFuzzyQuery.param.pageNum = 1;
    OrderFuzzyQuery.param.pageSize = 10;
    console.log(OrderFuzzyQuery);

    rearch();
})