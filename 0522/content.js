var loaded_id = []

async function show_content_box(id) {
    console.log(id)
    if (loaded_id.includes(id) == false) {

        switch (id) {
            case "applX":
                loaded_id.push(id)
                var sii_stock_db = new dbtool("001", "bluewhal_NewStock", "newstock_sii", ["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"]);
                var tbody_array = await sii_stock_db.get_tbody("DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))", false)
                sii_stock_db.set_thead("applX_sii_table", ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"])
                sii_stock_db.set_table_title("applX_sii_table_title", "新股上市")
                $('#applX_sii_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false
                });
                var otc_stock_db = new dbtool("001", "bluewhal_NewStock", "newstock_otc", ["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"]);
                var tbody_array = await otc_stock_db.get_tbody("DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))", false)
                console.log(tbody_array)
                otc_stock_db.set_thead("applX_otc_table", ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"])
                otc_stock_db.set_table_title("applX_otc_table_title", "新股上櫃")
                $('#applX_otc_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false
                });

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
            case "":
                loaded_id.push(id)
                break;
        }

    }
}
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
var small_boxs = []
async function show_small_box(id) {
    // console.log(leftnavBigID)
    // console.log(leftnavSmallID)
    // console.log(topnavclassID)
    // console.log("\n")
    var now_box = leftnavBigID + "_" + id + "_box" // box id
    var now_box_loaded = false
    for (let i of small_boxs) {
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
        small_boxs.push(now_box)
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

                var bgcolor = {
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
                
                var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
                a.creat_table(now_box, id)
                var output_arr = []
                var months_arr = []
                var data1_arr = []
                var data2_arr = []
                var tbody_array = await a.get_tbody_by_command("*", { "left_nav": leftnavBigID, "left_small_nav": leftnavSmallID, "top_nav_name": topnavclassID }, false,function(content){
                    console.log(content)
                    var month = (content[0].length-3)/3
                    for(var i in content){
                        var now_arr = []
                        var now_data1_arr = []
                        var now_data2_arr = []
                        for(var j in content[i]){
                            if(j < 3){
                                console.log()
                                now_arr.push(content[i][j])
                            }else if(j == 3){
                                now_arr.push("double data")
                                for(var o = 0;o<month;o++){
                                    now_arr.push("double data")
                                }
                            }
                            if(i==0&&j>2&&(j-2)%3==1){
                                months_arr.push(content[i][j])
                            }else if(j>2&&(j-2)%3==2){
                                now_data1_arr.push(content[i][j])
                            }else if(j>2&&(j-2)%3==0){
                                now_data2_arr.push(content[i][j])
                            }
                        }
                        output_arr.push(now_arr)
                        data1_arr.push(now_data1_arr)
                        data2_arr.push(now_data2_arr)
                    }
                })
                console.log(months_arr)
                console.log(data1_arr)
                console.log(data2_arr)
                tbody_array = a.get_tbody_by_array(output_arr)
                a.set_thead(id + "_table", ["公司簡稱", "公司代號", "產業分類", "項目"].concat(months_arr))
                a.set_table_title(id + "_table_title", topnavclassID)
                $('#' + id + '_table').DataTable({
                    "data": tbody_array,
                    "autoWidth": false,
                    "searching": false,
                    "paging": false,
                    "info": false
                });
                table_style(id+"_table",function(row_i, row_v, col_i, col_v){
                    if(col_i==3){
                        
                        $(col_v).html(creat_sub_td(col_v,"營收","年增率"))
                    }else if(col_i > 3){
                        $(col_v).html(creat_sub_td(col_v,data1_arr[row_i][col_i-4],data2_arr[row_i][col_i-4]+"%"))
                    }
                })

                break
        }
    }

}