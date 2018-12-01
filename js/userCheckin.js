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
var Util =new util();
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
                    {field:'id',  title: '订单号', sort: true}
                    ,{field:'name', title: '姓名'}
                    ,{field:'idNumber', title: '身份证'}
                    ,{field:'telephone', title: '电话'}
                    ,{field:'payment', title: '支付金额',sort:true}
                    ,{field:'roomId', title: '房间号',sort:true}
                    ,{field:'checkTime', title: '入住时间',sort:true}
                    ,{field:'outTime', title: '退房时间',sort:true}
                    ,{field:'creationTime', title: '订单创建时间',sort:true}
                    ,{field:'bookTime', title: '预定时间',sort:true}
                    ,{field:'comment', title: '备注'}

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
                        {field:'id',  title: '订单号', sort: true}
                        ,{field:'name', title: '姓名'}
                        ,{field:'idNumber', title: '身份证'}
                        ,{field:'telephone', title: '电话'}
                        ,{field:'payment', title: '支付金额',sort:true}
                        ,{field:'roomId', title: '房间号',sort:true}
                        ,{field:'checkTime', title: '入住时间',sort:true}
                        ,{field:'outTime', title: '退房时间',sort:true}
                        ,{field:'creationTime', title: '订单创建时间',sort:true}
                        ,{field:'bookTime', title: '预定时间',sort:true}
                        ,{field:'comment', title: '备注'}

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

let ClientCheck = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"clientCheck"                //类型：String  必有字段  备注：无
    },
    "param": {                //类型：Object  必有字段  备注：无
        "roomCode":""                //类型：String  必有字段  备注：房间号
    }
}

function add(){
    Util.postJSON(ClientCheck, "/ordermanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        console.log(ClientCheck.param.roomCode);
        if (ajaxData.head.code === "1000") {
            $("#RoomNumber").val(' ');
            $("#UserName").val(' ');
            $("#IdNumber").val(" ");
            $("#CheckTime").val(" ");
            $("#OutTime").val(" ");
            $("#UserId").val(" ");

            orderFuzzyQuery();
            layer.msg("入住成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
    }



$("#add2").on('click',function () {

    ClientCheck.param.roomCode=$("input[name='RoomNumber']").val();
    add();

});

let ClientOut = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"clientOut"                //类型：String  必有字段  备注：无
    },
    "param": {                //类型：Object  必有字段  备注：无
        "roomCode":""                //类型：String  必有字段  备注：房间号
    }
}


function delete2(){
    Util.postJSON(ClientOut, "/ordermanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        console.log(ClientOut.param.roomCode);
        if (ajaxData.head.code === "1000") {
            $("#RoomNumber").val(' ');
            $("#UserName").val(' ');
            $("#IdNumber").val(" ");
            $("#CheckTime").val(" ");
            $("#OutTime").val(" ");
            $("#UserId").val(" ");

            orderFuzzyQuery();
            layer.msg("退房成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
}


$("#delete").on('click',function () {

    ClientOut.param.roomCode=$("input[name='RoomNumber']").val();
    delete2();

});