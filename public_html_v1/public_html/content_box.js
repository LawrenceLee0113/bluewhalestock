//合併儲存格版本 有變色 置中
var loaded_id = []
async function simple_table_creator({id,database,table,column=[],condition,table_name,table_title,column_title=[]}){
    var now_db = new dbtool("001", database, table, column);
    now_db.creat_table(id,table_name)
    var tbody_array = await now_db.get_tbody(condition, false)
    now_db.set_thead(table_name+"_table", column_title)
    now_db.set_table_title(table_name+"_table_title", table_title)
    $('#'+table_name+'_table').DataTable({
        "data": tbody_array,
        "autoWidth": false
    });
}

async function show_content_box(id) {
    console.log(id)
    if (loaded_id.includes(id) == false) {

        switch (id) {
            case "applX":
                loaded_id.push(id)
                simple_table_creator({
                    id,
                    database:"bluewhal_NewStock",
                    table:"newstock_sii",
                    column:["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                    condition:"DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                    table_name:id+"_sii",
                    table_title:"新股上市",
                    column_title:["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]}
                )
                simple_table_creator({
                    id,
                    database:"bluewhal_NewStock",
                    table:"newstock_otc",
                    column:["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                    condition:"DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                    table_name:id+"_otc",
                    table_title:"新股上櫃",
                    column_title:["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]}
                )

                break;
            case "direX":
                loaded_id.push(id)
                simple_table_creator({
                    id,
                    database:"bluewhal_Basedata",
                    table:"shareholdingchange",
                    column:["*"],
                    condition:"1",
                    table_name:id,
                    table_title:"董監持股轉讓",
                    column_title:["公司代號", "公司名稱", "申請人身分 ", "姓名", "預定轉讓方式及股數-轉讓方式", "預定轉讓方式及股數-轉讓股數", "目前持有股數-自有持股", "預定轉讓總股數-自有持股","預定轉讓後持股-自有持股","有效轉讓期間"]}
                )
                break;
            case "":
                loaded_id.push(id)
                break;
            case "":
                loaded_id.push(id)
                break;
            case "":
                loaded_id.push(id)
                break;
        }

    }
}

// ----------------------------------------------------------------
function table_style(table_id, func) {
    var row_obj = $("#" + table_id).children("tbody").children("tr")
    $.each(row_obj, function (row_i, row_v) {
        var column_obj = $(row_v).children("td")
        $.each(column_obj, function (col_i, col_v) {
            func(row_i, row_v, col_i, col_v)
            // console.log($(col_v).html())
        });
    });
}
var small_box_loaded_ids = []

const bgcolor = {
    light_red: "#FFABAB",
    red: "#FF5959",
    dark_red: "#FF0000",
    light_green: "#ABFFAB",
    green: "#00F500",
    dark_green: "#00B200",
    white: "#FFFFFF"

}
var table_bgcolor_setting = {
    day: [-9, -7, -5, 5, 7, 9],
    week: [-15, -10, -5, 5, 10, 15],
    month: [-30, -20, -10, 10, 20, 30],
    season: [-40, -30, -20, 20, 30, 40],
    year: [-50, -40, -30, 30, 40, 50]
}

function find_index(array, value) {
    for (let i in array) {
        if (value <= array[i]) {
            return parseInt(i)
        }
        if (array.length - 1 == i && value > array[i]) {
            return array.length
        }
    }
}
async function show_small_box(id) {
    // console.log(leftnavBigID)
    // console.log(leftnavSmallID)
    // console.log(topnavclassID)
    // console.log("\n")
    var now_box = leftnavBigID + "_" + id + "_box" // box id
    var now_box_loaded = false
    for (let i of small_box_loaded_ids) {
        if (i == now_box) {

            now_box_loaded = true
        } else {
            $("#" + i).hide()
        }
    }
    if (now_box_loaded) {
        $("#" + now_box).show()

    } else {
        $("#DFCID").append("<div id='" + now_box + "'></div>")
        small_box_loaded_ids.push(now_box)
        var data_val = $("#" + id).children("a").html()
        $("#" + now_box).attr("data-name", data_val)
        // var now_name = $("#"+now_box).attr("data-name");

        switch (leftnavBigID) {
            case "INprsB":
                var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
                a.creat_table(now_box, id)
                var tbody_array = await a.get_tbody_by_command("*", { "left_nav": leftnavBigID, "left_small_nav": leftnavSmallID, "top_nav_name": topnavclassID }, false)

                a.set_thead(id + "_table", ["公司簡稱", "公司代號", "產業分類", "日漲跌", "週漲跌", "月漲跌", "季漲跌", "年漲跌"])

                a.set_table_title(id + "_table_title", topnavclassID)
                $('#' + id + '_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "order": [[3, 'desc']]

                });

                
                table_style(id + '_table', function (row_i, row_v, col_i, col_v) {
                    if(col_i > 2){
                        let now_html = parseFloat($(col_v).html())
                        let now_setting = []
                        if (col_i == 3) {now_setting = table_bgcolor_setting.day}
                        else if (col_i == 4) {now_setting = table_bgcolor_setting.week}
                        else if (col_i == 5) {now_setting = table_bgcolor_setting.month} 
                        else if (col_i == 6) {now_setting = table_bgcolor_setting.season} 
                        else if (col_i == 7) {now_setting = table_bgcolor_setting.year}
                        let color_setting = [
                            bgcolor.dark_green,
                            bgcolor.green,
                            bgcolor.light_green,
                            bgcolor.white,
                            bgcolor.light_red,
                            bgcolor.red,
                            bgcolor.dark_red
                        ]
                        // $(col_v).attr("bgcolor",color_setting[find_index(now_setting,now_html)])
                        $(col_v).css("background-color", color_setting[find_index(now_setting, now_html)])
                        $(col_v).html(now_html + "%")
                    }
                })
                break
            case "INrevB":
                var table_container = '<div class="table_container"><div class="left_table"></div><div class="right_table"></div></div>'
                $("#"+now_box).append('<h1 style="text-align: center;"></h1>');
                $("#"+now_box).append(table_container);
                var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
                $("#"+now_box+" h1").html(topnavclassID);
                a.creat_table(now_box+" .table_container .left_table", id)
                var output_arr = []//公司簡稱 ~ 項目
                var output_arr1 = []//營收 & 年增率
                var months_arr = []
                var tbody_array = await a.get_tbody_by_command("*", { "left_nav": leftnavBigID, "left_small_nav": leftnavSmallID, "top_nav_name": topnavclassID }, false,function(content){
                    for(let i =0;i<content.length;i++){
                        let now_output_arr1 = []//公司簡稱 ~ 項目(營收)
                        let now_output_arr2 = []//公司簡稱 ~ 項目(年增率)
                        let now_output_arr3 = []//營收
                        let now_output_arr4 = []//年增率
                        for(let j = 0;j<content[i].length;j++){
                            if(j < 3){
                                now_output_arr1.push(content[i][j])
                                now_output_arr2.push(content[i][j])
                            }else if(j == 3){
                                now_output_arr1.push("營收")
                                now_output_arr2.push("年增率")
                            }
                            if(i==0&&j>2&&(j-2)%3==1){//月分列
                                months_arr.push(content[i][j])
                            }
                            if(j>2&&(j-2)%3==2){
                                now_output_arr3.push(content[i][j])
                            }else if(j>2&&(j-2)%3==0){
                                now_output_arr4.push(content[i][j])
                            }
                        }
                        output_arr.push(now_output_arr1)
                        output_arr.push(now_output_arr2)
                        output_arr1.push(now_output_arr3)
                        output_arr1.push(now_output_arr4)
                    }
                    console.log(output_arr);
                    console.log(output_arr1);
                })
                var disable_sorting = [{targets:"_all",orderable: false,className: 'dt-body-center'}]
                
                a.set_thead(id + "_table", ["公司簡稱", "公司代號", "產業分類", "項目"])
                tbody_array = a.get_tbody_by_array(output_arr)
                // a.set_table_title(id + "_table_title", topnavclassID)
                $('#' + id + '_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "order": [],
                    "columnDefs": disable_sorting
                });
                table_style(id+"_table",function(row_i, row_v, col_i, col_v){
                    if(col_i < 3){
                        if(row_i % 2 == 0){
                            $(col_v).attr("rowspan", "2");
                        }else if(row_i % 2 == 1){
                            $(col_v).remove();
                        }   
                    }
                })
                id = id +"_side"
                a.creat_table(now_box+" .table_container .right_table", id)
                a.set_thead(id + "_table", months_arr)
                tbody_array = a.get_tbody_by_array(output_arr1)
                $('#' + id + '_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false,
                    "searching": false,
                    "paging": false,
                    "info": false,
                    "order": [],
                    "columnDefs": disable_sorting
                });
                let scoller_width = $("#"+now_box+" .right_table tr").css("width")
                let target_width = parseFloat(scoller_width.substring(0,scoller_width.length-2)) / months_arr.length * 5
                $("#"+now_box+" .right_table").css("width",target_width+"px")
                $("#"+now_box+" .right_table").scrollLeft(parseFloat(scoller_width.substring(0,scoller_width.length-2)))
                let repeat_amount = 0
                let tbody_row_amount = output_arr1.length
                table_style(id+"_table",function(row_i, row_v, col_i, col_v){
                    if(row_i % 2 == 1){
                        let now_html = parseFloat($(col_v).html())
                        let now_setting = [-50,-30,-20,20,30,50]
                        let color_setting = [
                            bgcolor.dark_green,
                            bgcolor.green,
                            bgcolor.light_green,
                            bgcolor.white,
                            bgcolor.light_red,
                            bgcolor.red,
                            bgcolor.dark_red
                        ]
                        $(col_v).css("background-color", color_setting[find_index(now_setting, now_html)])
                        $(col_v).html(now_html + "%")
                    }
                    if(months_arr.length-1 == col_i && $(col_v).html() == $(row_v).children("td:eq("+(col_i-1)+")").html()){
                        repeat_amount += 1
                    }
                })
                if(repeat_amount == tbody_row_amount){
                    console.log(repeat_amount)
                    table_style(id+"_table",function(row_i, row_v, col_i, col_v){
                        if(months_arr.length-1 == col_i){
                            $(col_v).html("未公布").css("background-color","transparent")
                        }
                    })
                    
                }
                
                break
        }
    }

}