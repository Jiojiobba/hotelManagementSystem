$(document).ready(function ($) {
    roomTypeGetAll();
    // getroomTypeSelect();
});

var Util =new util();

//获取所有客房类型
let RoomTypeGetAll = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomTypeGetAll"                //类型：String  必有字段  备注：无
    }
};
function roomTypeGetAll(){
    console.log("获取所有客房类型函数");

    Util.postJSON(RoomTypeGetAll, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;

        if (ajaxData.head.code === "1000") {
            //获取下拉框option
            var allType = [];
            allType = ajaxData.data.allRoomType;
            console.log(allType[0].type);
            for (var i = 0; i < allType.length; i++) {
                var temp = allType[i].code;
                var str = '<option value=' + i + ' class="type-select-option">' + temp + '</option>';
                $(str).appendTo('select');
            }
            // $("#typeCode_edit_select").change(function () {
            //     var obj = $("#typeCode_edit_select");
            //     var optionNum = obj.val();
            //
            //     $("input[name='typeNameEditInput']").attr("placeholder",allType[optionNum].type);
            //     $("input[name='typePriceEditInput']").attr("placeholder",allType[optionNum].price);
            //
            // })

                //房间类型表格渲染
            layui.use('table', function(){
                var table = layui.table;
                table.render({
                    elem: '#test'
                    ,toolbar: false
                    ,title: '客房类型表'
                    ,totalRow: false
                    ,height:390
                    ,limit:8
                    ,cols: [[
                        {field:'code',  title: '类型编号', sort: true}
                        ,{field:'type', title: '类型名称'}
                        ,{field:'price', title: '类型价格', sort: true}
                    ]]
                    ,page: true
                    ,data:allType
                });
            });
        }
        else {
            alert(ajaxData.head.msg);
            console.log(ajaxData.head.msg);
        }
    })
};


//房间类型添加
let RoomTypeAdd = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomTypeAdd"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "code":"",                //类型：String  必有字段  备注：类型编号
        "type":"",                //类型：String  必有字段  备注：客房类型
        "price":"",                //类型：Number  必有字段  备注：价格
    }
};

function roomTypeAdd() {
    console.log("进入类型添加函数");

    Util.postJSON(RoomTypeAdd, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#typeCodeAddInput").val(' ');
            $("#typeNameAddInput").val(' ');
            $("#typePriceAddInput").val(" ");
            roomTypeGetAll();
            alert("添加成功");

        } else {
            console.log(ajaxData.head.msg);
            alert(ajaxData.head.msg);

        }
    })
}

//类型添加按钮点击事件
$("#add_button").on("click", function () {
    console.log("add按钮");
    RoomTypeAdd.param.code = $("input[name='typeCodeAddInput']").val();
    RoomTypeAdd.param.type = $("input[name='typeNameAddInput']").val();
    RoomTypeAdd.param.price =  parseInt($("input[name='typePriceAddInput']").val());
    roomTypeAdd();
});

//修改类型信息
let RoomTypeUpdate = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomTypeUpdate"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "code":"",                //类型：String  必有字段  备注：类型编号
        "type":"",                //类型：String  可有字段  备注：客房类型
        "price":""                //类型：Number  可有字段  备注：价格
    }
};
//获取类型下拉框
function getroomTypeSelect() {
    console.log("进入获取下拉框函数");

    Util.postJSON(RoomTypeGetAll, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            var allType = [];
            allType = ajaxData.data.allRoomType;
            console.log(allType);
            for (var i = 0; i < allType.length; i++) {
                var temp = allType[i].code;
                var  str = '<option value='+i+'>'+ temp +'</option>';
                var selecttemp = document.getElementById("typeCode_add_select");
                $(selecttemp).after(str);
                console.log(str);

            }
            console.log($(selecttemp));
            // $("#typeCodeAddInput").val(' ');
            // $("#typeNameAddInput").val(' ');
            // $("#typePriceAddInput").val(" ");

        } else {
            console.log("获取下拉框失败");
        }
    })
}
function roomTypeUpdate() {
    console.log("进入类型修改函数");

    Util.postJSON(RoomTypeUpdate, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#typeCodeAddInput").val(' ');
            $("#typeNameAddInput").val(' ');
            $("#typePriceAddInput").val(" ");
            roomTypeGetAll();
            alert("修改成功");

        } else {
            console.log(ajaxData.head.msg);
            alert(ajaxData.head.msg);

        }
    })
}

//修改按钮点击事件
$("#add_button").on("click", function () {
    console.log("add按钮");
    RoomTypeAdd.param.code = $("input[name='typeCodeAddInput']").val();
    RoomTypeAdd.param.type = $("input[name='typeNameAddInput']").val();
    RoomTypeAdd.param.price =  parseInt($("input[name='typePriceAddInput']").val());
    roomTypeAdd();
});