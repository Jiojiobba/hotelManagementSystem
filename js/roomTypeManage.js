$(document).ready(function ($) {
    roomTypeGetAll();
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

    Util.postJSON(RoomTypeGetAll, "/roommanagement", function (ajaxData) {

        localStorage.token = ajaxData.head.token;

        if (ajaxData.head.code === "1000") {
            //获取下拉框option
            var allType = [];

            allType = ajaxData.data.allRoomType;
            $("select").empty();
            for ( var i = 0; i < allType.length; i++) {
                var temp = allType[i].code;
                var str = '<option value=' + i + ' class="type-select-option">' + temp + '</option>';
                $(str).appendTo('select');
            }
            selectChange();
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
            layer.msg(ajaxData.head.msg);
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
    Util.postJSON(RoomTypeAdd, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            $("#typeCodeAddInput").val(' ');
            $("#typeNameAddInput").val(' ');
            $("#typePriceAddInput").val(" ");
            roomTypeGetAll();
            layer.msg('添加成功');
        } else {
            layer.msg(ajaxData.head.msg);
        }
    })
}
//类型添加按钮点击事件
$("#add_btn").on("click", function () {
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
//placeholder填充
function selectChange(){

    Util.postJSON(RoomTypeGetAll, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        var allType = [];
        if (ajaxData.head.code === "1000") {
            allType = ajaxData.data.allRoomType;
            var obj1 = $("#typeCode_edit_select");
            var obj2 = $("#typeCode_delete_select");
            var optionNum1 = obj1.val();
            var optionNum2 = obj2.val();
            $("input[name='typeNameEditInput']").attr("placeholder", allType[optionNum1].type);
            $("input[name='typePriceEditInput']").attr("placeholder", allType[optionNum1].price);

            $("input[name='typeNameDeleteInput']").val(allType[optionNum2].type);
            $("input[name='typePriceDeleteInput']").val( allType[optionNum2].price);

        }
        else {
            layer.msg(ajaxData.head.msg);
        }

    });
}

function roomTypeUpdate() {
        Util.postJSON(RoomTypeUpdate, "/roommanagement", function (ajaxData) {
            localStorage.token = ajaxData.head.token;
            if (ajaxData.head.code === "1000") {
                roomTypeGetAll();
                $("input[name='typeNameEditInput']").val('');
                $("input[name='typePriceEditInput']").val('');
                layer.msg("修改成功");
            } else {
                layer.msg(ajaxData.head.msg);
            }
        })
    }

//修改按钮点击事件
$("#edit_btn").on("click", function () {
    var obj = $("#typeCode_edit_select").find("option:selected").text();
    RoomTypeUpdate.param.code = obj;
    RoomTypeUpdate.param.type = $("input[name='typeNameEditInput']").val();
    RoomTypeUpdate.param.price =  parseInt($("input[name='typePriceEditInput']").val());
    roomTypeUpdate();
});



//删除
let RoomTypeDelete ={
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomTypeDelete"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "deleteCode":""                //类型：String  必有字段  备注：要删除的客房类型编号
    }
};
function roomTypeDelete() {
    Util.postJSON(RoomTypeDelete, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            roomTypeGetAll();
            var selectedd = $("#typeCode_delete_select");
            var selectedNum = selectedd.val();
            $("#select_id option [value= selectedNum]").remove(); //删除Select中Value=''的Option
            selectedd.val("0");
            $("input[name='typeNameEditInput']").val('');
            $("input[name='typePriceEditInput']").val('');
            roomTypeGetAll();
            layer.msg("删除成功");


        } else {
            layer.msg(ajaxData.head.msg);
        }
    })
}
$("#delete_btn").click("on", function () {
    var obj = $("#typeCode_delete_select").find("option:selected").text();
    RoomTypeDelete.param.deleteCode = obj;
    roomTypeDelete();
});