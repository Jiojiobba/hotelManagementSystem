

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
        "pageNum":"",                //类型：Number  必有字段  备注：无
        "pageSize":""                //类型：Number  必有字段  备注：无
    }
};
function orderFuzzyQuery(){
    // layui.use('laydate', function(){
    //     var laydate = layui.laydate;
    //
    //     //执行一个laydate实例
    //     laydate.render({
    //         elem: '#check_time' //指定元素
    //     });
    //     laydate.render({
    //         elem: '#out_time' //指定元素
    //     });
    // }),

    OrderFuzzyQuery.param.pageNum = 0;
    OrderFuzzyQuery.param.pageSize = 10;

    Util.postJSON(OrderFuzzyQuery, "/ordermanagement", function (ajaxData) {
         localStorage.token = ajaxData.head.token;



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




//添加类型信息
let BookAdd={
    "head": {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"orderAdd"                //类型：String  必有字段  备注：无
    },
        "param": {                //类型：Object  必有字段  备注：无
        "orderInfo":  {                //类型：Object  必有字段  备注：订单信息封装类
            "comment":"",                //类型：String  可有字段  备注：备注
            "bookTime":"",                //类型：Number  可有字段  备注：预订时间(时间戳)
            "creationTime":"",                //类型：Number  必有字段  备注：订单创建时间(时间戳)
            "outTime":"",                //类型：Number  可有字段  备注：退房时间(时间戳)
            "checkTime":"",                //类型：Number  可有字段  备注：入住时间(时间戳)
            "roomId":"",                //类型：String  必有字段  备注：房间号
            "payment":"",                //类型：Number  必有字段  备注：支付金额
            "telephone":"",                //类型：String  必有字段  备注：电话
            "idNumber":"",                //类型：String  必有字段  备注：身份证号码
            "sex":"",                //类型：String  必有字段  备注：客户性别
            "name":"",                //类型：String  必有字段  备注：客户姓名
            "id":""                //类型：String  必有字段  备注：订单号(年月日时分秒)
        }
    }
};

function bookAdd() {
    Util.postJSON(BookAdd, "/ordermanagement", function (ajaxData) {
    console.log(BookAdd);
    localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#BookName").val(' ');
            $("#BookRoomNumber").val(' ');
            $("#CheckTime").val(" ");
            $("#OutTime").val(" ");
            $("#BookPrice").val(" ");

            $("#BookUserName").val(" ");
            $("#BookUserSex").val(" ");
            $("#BookUserNumber").val(" ");
            $("#BookUserTelephone").val(" ");
            $("#Comment").val(" ");

            orderFuzzyQuery();
            layer.msg("添加成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
}
//类型添加按钮点击事件
$("#add_book_btn").on("click", function () {
    BookAdd.param.orderInfo.id  = $("input[name='BookNumber']").val();
    BookAdd.param.orderInfo.roomId = $("input[name='BookRoomNumber']").val();

    var date=$("input[name='CheckTime']").val();
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    BookAdd.param.orderInfo.checkTime  = date.getTime();

     date= $("input[name='OutTime']").val();
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    BookAdd.param.orderInfo.outTime  = date.getTime();


    BookAdd.param.orderInfo.payment =  parseInt($("input[name='BookPrice']").val());

    BookAdd.param.orderInfo.name  = $("input[name='BookUserName']").val();
    BookAdd.param.orderInfo.sex = $("input[name='BookUserSex']").val();
    BookAdd.param.orderInfo.idNumber = $("input[name='BookUserNumber']").val();
    BookAdd.param.orderInfo.telephone =  $("input[name='BookUserTelephone']").val();
    BookAdd.param.orderInfo.comment =  $("input[name='Comment']").val();


    BookAdd.param.orderInfo.creationTime =new Date().getTime();


    bookAdd();

});

//修改类型信息
let BookEdit={
    "head": {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"orderUpdate"                //类型：String  必有字段  备注：无
    },
    "param": {                //类型：Object  必有字段  备注：无
        "orderInfo":  {                //类型：Object  必有字段  备注：订单信息封装类
            "comment":"",                //类型：String  可有字段  备注：备注
            "bookTime":"",                //类型：Number  可有字段  备注：预订时间(时间戳)
            "creationTime":"",                //类型：Number  必有字段  备注：订单创建时间(时间戳)
            "outTime":"",                //类型：Number  可有字段  备注：退房时间(时间戳)
            "checkTime":"",                //类型：Number  可有字段  备注：入住时间(时间戳)
            "roomId":"",                //类型：String  必有字段  备注：房间号
            "payment":"",                //类型：Number  必有字段  备注：支付金额
            "telephone":"",                //类型：String  必有字段  备注：电话
            "idNumber":"",                //类型：String  必有字段  备注：身份证号码
            "sex":"",                //类型：String  必有字段  备注：客户性别
            "name":"",                //类型：String  必有字段  备注：客户姓名
            "id":""                //类型：String  必有字段  备注：订单号(年月日时分秒)
        }
    }
};

function bookEdit() {
    Util.postJSON(BookEdit, "/ordermanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#BookNumber").val(' ');

            orderFuzzyQuery();
            layer.msg("修改订单成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
}
//类型修改按钮点击事件
$("#edit_book_btn").on("click", function () {
    BookEdit.param.orderInfo.id  = $("input[name='BookNumber']").val();
    BookEdit.param.orderInfo.roomId = $("input[name='BookRoomNumber']").val();

    var date=$("input[name='CheckTime']").val();
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    BookEdit.param.orderInfo.checkTime  = date.getTime();

    date= $("input[name='OutTime']").val();
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    BookEdit.param.orderInfo.outTime  = date.getTime();


    BookEdit.param.orderInfo.payment =  parseInt($("input[name='BookPrice']").val());

    BookEdit.param.orderInfo.name  = $("input[name='BookUserName']").val();
    BookEdit.param.orderInfo.sex = $("input[name='BookUserSex']").val();
    BookEdit.param.orderInfo.idNumber = $("input[name='BookUserNumber']").val();
    BookEdit.param.orderInfo.telephone =  $("input[name='BookUserTelephone']").val();
    BookEdit.param.orderInfo.comment =  $("input[name='Comment']").val();



    BookEdit.param.orderInfo.id = $("input[name='BookNumber']").val();
    console.log(BookEdit);
    bookEdit();

});

//删除类型信息
let BookDelete ={
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"orderDelete"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "deleteIdList":[""]                //类型：String  必有字段  备注：要删除的客房类型编号
}
};

function bookDelete() {


    Util.postJSON(BookDelete, "/ordermanagement", function (ajaxData) {
        // console.log(BookDelete);
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#BookUserName").val(' ');
            $("#BookUserSex").val(' ');
            $("#BookRoomNumber").val(" ");
            $("#BookUserNumber").val(" ");
            $("#BookUserTelephone").val(" ");
            $("#BookUserPrice").val(" ");
            orderFuzzyQuery();
            layer.msg("删除订单成功");
        } else {
            layer.msg(ajaxData.head.msg);

        }
    })
}
//类型删除按钮点击事件
$("#delete_book_btn").on("click", function () {
    var value = $("input[name='BookNumber']").val();
    //console.log(typeof (value));
    BookDelete.param.deleteIdList[0] = value;
    console.log(BookDelete.param.deleteIdList);
    bookDelete();
});