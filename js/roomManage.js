$(document).ready(function ($) {
    roomTypeGetAll();
    roomInfoGetAll();
});
let Util = new util();
let RoomTypeGetAll = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomTypeGetAll"                //类型：String  必有字段  备注：无
    }
};

//获取客房类型
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
                var str = '<option value=' + i + '>' + temp + '</option>';
                $(str).appendTo('select');
            }
        }
        else {
            alert(ajaxData.head.msg);
        }
    })
};

//获取客房信息
let RoomInfoGetAll = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomInfoGetAll"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "pageNum":"",                //类型：Number  必有字段  备注：第几页
        "pageSize":""                //类型：Number  必有字段  备注：每页信息条数
    }
};
function roomInfoGetAll() {
    RoomInfoGetAll.param.pageNum = 0;
    RoomInfoGetAll.param.pageSize = 10;

    Util.postJSON(RoomInfoGetAll, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        //房间类型表格渲染
        if (ajaxData.head.code === "1000") {
            var allRoom = [];
            allRoom = ajaxData.data.roomInfoList.list;
            //客房信息表格渲染
            layui.use('table', function(){
                 table = layui.table;

                table.render({
                    elem: '#test'
                    ,toolbar: false
                    ,title: '客房信息表'
                    ,totalRow: true
                    ,height:430
                    ,limit:8
                    ,cols: [[
                        {type: 'checkbox'}
                        ,{field:'id', title: '房间号码', sort: true,totalRowText: '合计：'}
                        ,{field:'roomCode', title: '类型编号', sort: true}
                        ,{field:'type', title: '客房类型', sort: true}
                        ,{field:'person', title: '客房人数', sort: true}
                        ,{field:'checkState', title: '入住状态', sort: true}
                        ,{field:'bookState', title: '预订状态', sort: true}
                        ,{field:'price', title: '价格', sort: true,totalRow: true}
                        ,{field:'comment', title: '备注'}
                        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:115}
                    ]]
                    ,page: true
                    ,data:allRoom

                });
                table.on('tool(test-table)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                    var data = obj.data //获得当前行数据
                        ,layEvent = obj.event; //获得 lay-event 对应的值
                    console.log(data);

                    $("input[name='roomIdEditInput']").val(data.id);//房间号码
                    $("input[name='roomPersonEditInput']").attr("placeholder", data.persons);//最大人数
                    $("input[name='roomLiveEditInput']").attr("placeholder", data.checkState);//入住状态位
                    $("input[name='roomBookEditInput']").attr("placeholder", data.bookState);//预订状态位
                    $("input[name='roomEditComment']").attr("placeholder", data.comment);//备注

                    if(layEvent === 'del'){
                        layer.confirm('确认删除？', function(index){
                            obj.del(); //删除对应行（tr）的DOM结构
                            layer.close(index);
                            //向服务端发送删除指令
                            RoomInfoDelete.param.deleteIdList[0] =data.id;
                            roomInfoDelete();
                        });
                    }  else if(layEvent === 'edit'){

                        layer.open({
                            type: 1,
                            shade: false,
                            title: false, //不显示标题
                            resize:false,
                            fixed:false,
                            move:false,
                            scrollbar: false,
                            area:['400px','480px'],
                            content: $('.layer_notice'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
                            cancel: function(){
                                var editClose = document.getElementById("layer_notice_edit");
                                editClose.style.cssText = "display: none;";
                            }
                        });
                        $("#room_edit").on("click",function () {
                            let obj = $("#roomTypeId_edit_select").find("option:selected").text();
                            RoomInfoUpdate.param.id = $("input[name='roomIdEditInput']").val();//房间号
                            RoomInfoUpdate.param.roomCode = obj;//客房类型编号
                            RoomInfoUpdate.param.persons = parseInt($("input[name='roomPersonEditInput']").val());//人数
                            RoomInfoUpdate.param.comment =  $("input[name='roomEditComment']").val();//备注
                            RoomInfoUpdate.param.checkState =  $("input[name='roomLiveEditInput']").val();//入住状态位
                            RoomInfoUpdate.param.bookState =  $("input[name='roomBookEditInput']").val();//预订状态位
                            roomInfoUpdate();
                            var editClose = document.getElementById("layer_notice_edit");
                            editClose.style.cssText = "display: none;";

                        });
                    }
                });
            })
        }

        else {
            console.log(ajaxData.head.msg)
        }
        });


    }

//增加客房信息
let RoomInfoAdd = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomInfoAdd"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "id":"",                //类型：String  必有字段  备注：房间号
        "roomCode":"",                //类型：String  必有字段  备注：客房类型编号
        "persons":"",                //类型：Number  必有字段  备注：最大可住人数
        "comment":""                //类型：String  可有字段  备注：备注
    }
};

function roomInfoAdd() {

    Util.postJSON(RoomInfoAdd, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            roomInfoGetAll();
        }

        else {
            layer.msg(ajaxData.head.msg);
        }
    });

}
$("#room_add").on("click",function () {
    var obj = $("#roomTypeId_selset").find("option:selected").text();
    RoomInfoAdd.param.id = $("input[name='roomIdInput']").val();//房间号
    RoomInfoAdd.param.roomCode = obj;//客房类型编号
    RoomInfoAdd.param.persons = parseInt($("input[name='roomPersonInput']").val());//人数
    RoomInfoAdd.param.comment =  $("input[name='roomComment']").val();//备注
    roomInfoAdd();
});

//删除房间信息
let RoomInfoDelete = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomInfoDelete"                //类型：String  必有字段  备注：无
    },
    "param":  {                //类型：Object  必有字段  备注：无
        "deleteIdList":  []                //类型：Array  必有字段  备注：删除id列表
    }
};
function roomInfoDelete() {
    Util.postJSON(RoomInfoDelete, "/roommanagement", function (ajaxData) {
        localStorage.token = ajaxData.head.token;
        console.log(RoomInfoDelete);
        if (ajaxData.head.code === "1000") {
            layer.msg("删除成功");
        }

        else {
            layer.msg(ajaxData.head.msg);
        }
    });
};

//更新客房信息
let RoomInfoUpdate = {
    "head":  {                //类型：Object  必有字段  备注：无
        "appVerNo":"1.0.0",                //类型：String  必有字段  备注：无
        "functionNo":"roomInfoUpdate"                //类型：String  必有字段  备注：无
    },
        "param":{                //类型：Object  必有字段  备注：无
        "id":"",                //类型：String  必有字段  备注：房间号
        "roomCode":"",                //类型：String  可有字段  备注：客房类型编号
        "persons":"",                //类型：Number  可有字段  备注：最大可住人数
        "checkState":"",                //类型：String  可有字段  备注：入住状态位
        "bookState":"",                //类型：String  可有字段  备注：预订状态位
        "comment":""                //类型：String  可有字段  备注：备注
    }
};
function roomInfoUpdate() {
    console.log(RoomInfoUpdate);
    Util.postJSON(RoomInfoUpdate, "/roommanagement", function (ajaxData) {
        // localStorage.token = ajaxData.head.token;
        if (ajaxData.head.code === "1000") {
            roomInfoGetAll();
            layer.msg("修改成功");
        }

        else {
            layer.msg(ajaxData.head.msg);
        }
    });


}
