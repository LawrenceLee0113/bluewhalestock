function dataContainerPageId(id) {
    return `page-${id}`
}

async function simple_table_creator({ box_id, database, table, column = [], condition, table_name, table_title, column_title = [] }) {
    var now_db = new dbtool("001", database, table, column);
    now_db.creat_table(box_id, table_name)
    var tbody_array = await now_db.get_tbody(condition, false)
    now_db.set_thead(table_name + "_table", column_title)
    now_db.set_table_title(table_name + "_table_title", table_title)
    $('#' + table_name + '_table').DataTable({
        "data": tbody_array,
        "autoWidth": false
    });
}
function changeContainer(nowPageId, content) {
    $("#" + nowPageId).html(content);
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
// 1F page更換 及 資料載入區域
function page_change_1F(page_id_1F) {
    $(".dataContainer").html("");
    let nowPageId = dataContainerPageId(page_id_1F);

    jQuery('<div>', {
        id: nowPageId,
        html: nowPageId + "_html"
    }).appendTo('.dataContainer');
    creatDataContain(page_id_1F)
}
async function creatDataContain(ID) {
    let nowPageId = dataContainerPageId(ID);
    let nowDataContain = $("#" + nowPageId).html();
    switch (ID) {
        // 新股上市上櫃
        case "S1ns": {
            changeContainer(nowPageId, "")
            simple_table_creator({
                box_id: nowPageId,
                database: "bluewhal_NewStock",
                table: "newstock_sii",
                column: ["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                condition: "DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                table_name: nowPageId + "_sii",
                table_title: "新股上市",
                column_title: ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]
            }
            )
            simple_table_creator({
                box_id: nowPageId,
                database: "bluewhal_NewStock",
                table: "newstock_otc",
                column: ["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                condition: "DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                table_name: nowPageId + "_otc",
                table_title: "新股上櫃",
                column_title: ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]
            }
            )
            break;
        }
        // 董監持股轉讓
        case "S1is": {
            changeContainer(nowPageId, "")
            simple_table_creator({
                box_id: nowPageId,
                database: "bluewhal_Basedata",
                table: "shareholdingchange",
                column: ["*"],
                condition: "1",
                table_name: id,
                table_title: "董監持股轉讓",
                column_title: ["公司代號", "公司名稱", "申請人身分 ", "姓名", "預定轉讓方式及股數-轉讓方式", "預定轉讓方式及股數-轉讓股數", "目前持有股數-自有持股", "預定轉讓總股數-自有持股", "預定轉讓後持股-自有持股", "有效轉讓期間"]
            }
            )
            
            break;
        }
        // 異常推介個股
        case "S1ss": {

            break;
        }
        // 注意處置股票
        case "S1as": {

            break;
        }
        // 分盤交易股票
        case "S1sb": {

            break;
        }
        // 除權除息預告
        case "S1dp": {

            break;
        }
        // 今日重大訊息
        case "S1tb": {

            break;
        }
        // 公司自結盈餘
        case "S1ce": {

            break;
        }
    }
}
function thousandBitSeparator(num) {//千分位

    return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
        return $1 + ",";
     }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
         return $1 + ",";
     }));
 }
var isEchartsLoad = false
//權值個股 
function QuanZhiGeGu_load(page_id_1F){
    if(!isEchartsLoad){
        $("body").append(`  
        <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/jquery"></script>
        <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js"></script>
        <script src="https://bluewhale-stock.tw/assets/js/k_line_creator.js"></script>
        `);
        
        isEchartsLoad = true
    }
    $(".dataContainer").html(`
    <div class="d-flex align-items-center justify-content-center w-100 h-100">
    <strong>Loading...</strong>
    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  
    `);
    var stock_chart_obj = {
    }
    $.ajax({
        type: "POST",
        url: "https://43.254.19.106:5107/industry_query",
        data: {
            account_id:"QuanZhiGeGu_load",
            left_nav:"QuanZhiGeGu",
            left_small_nav:page_id_1F,
            top_nav_name:"1F",
            mode :"*"
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            $(".dataContainer").html("");
            for(var stock of response.info){
                let stock_num = stock[0]
                let stock_name = stock[1]
                let stock_fullname = stock[2]
                let stock_volume = stock[3]
                let stock_chart_container_id = `stock_chart_${stock_num}`
                jQuery('<div>', {
                    id: stock_chart_container_id+"_container",
                    style:"width: 100%;height:500px"
                }).appendTo('.dataContainer');
                jQuery('<div>', {
                    id: stock_chart_container_id+"_info",
                    style:"height:5%",
                    class:"d-flex justify-content-around",
                    html:`<label for="">公司代號: <span class="text-danger">${stock_num}</span></label>
                    <label for="">公司名稱: <span class="text-danger">${stock_fullname}</span></label>
                    <label for="">市值: <span class="text-danger">${stock_volume.toLocaleString()}</span></label>`
                }).appendTo('#'+stock_chart_container_id+"_container");
                jQuery('<div>', {
                    id: stock_chart_container_id,
                    style:"height:95%",
                }).appendTo('#'+stock_chart_container_id+"_container");
                stock_chart_obj[stock_chart_container_id] = new k_line(stock_chart_container_id, `${stock_name}`,[5,10,20])
                stock_chart_obj[stock_chart_container_id].row_data = response.values[stock_num]
                stock_chart_obj[stock_chart_container_id].show_data({})
            }
            console.log(stock_chart_obj)
        }
    });
    switch (page_id_1F) {
        // 市值Top10
        case "Q1t1":{
        
            break;
        }
        // 市值Top20
        case "Q1t2":{
            
            break;
        }
        // 市值Top30
        case "Q1t3":{
            
            break;
        }
        // 市值Top40
        case "Q1t4":{
            
            break;
        }
        // 市值Top50
        case "Q1t5":{
            
            break;
        }
    }
}
// 2F page更換 及 資料載入區域
function page_change_2F({ father_ID, ID }) {
    $(".dataContainer").html("");
    let nowPageId = dataContainerPageId(`${father_ID}_${ID}`);
    jQuery('<div>', {
        id: nowPageId
    }).appendTo('.dataContainer');
    switch (father_ID) {
        // 營收股價
        case "YingShouGuJia": {

            break;
        };
        // 營收總覽
        case "YingShouZongLan": {
            var table_container = '<div class="table_container"><div class="left_table"></div><div class="right_table"></div></div>'
            var css_setting = `
            <style>
            .table_container{
                display: flex;
            }
            .right_table{
                overflow: auto;
            }
            .right_table tr,.left_table tr{
                white-space:nowrap
            }
            </style>
            `
            $("#"+nowPageId).append('<h1 style="text-align: center;"></h1>');
            $("#"+nowPageId).append(table_container);
            $("#"+nowPageId).css({"display":"flex","flex-direction":"column","align-items":"center"})
            $("#"+nowPageId).append(css_setting);
            $("#"+nowPageId+" h1").html($("#"+ID).html());

            var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
            a.creat_table(nowPageId+" .table_container .left_table", ID)
            var output_arr = []//公司簡稱 ~ 項目
            var output_arr1 = []//營收 & 年增率
            var months_arr = []
            var tbody_array = a.get_tbody_by_command("*", { "left_nav": father_ID, "left_small_nav": "none", "top_nav_name":  $("#"+ID).html() }, false,function(content){
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
            
            a.set_thead(ID + "_table", ["公司簡稱", "公司代號", "產業分類", "項目"])
            tbody_array = a.get_tbody_by_array(output_arr)
            // a.set_table_title(id + "_table_title", topnavclassID)
            $('#' + ID + '_table').DataTable({
                "data": tbody_array,
                "autoWidth": false,
                "searching": false,
                "paging": false,
                "info": false,
                "order": [],
                "columnDefs": disable_sorting
            });
            table_style(ID+"_table",function(row_i, row_v, col_i, col_v){
                if(col_i < 3){
                    if(row_i % 2 == 0){
                        $(col_v).attr("rowspan", "2");
                    }else if(row_i % 2 == 1){
                        $(col_v).remove();
                    }   
                }
            })

            ID = ID +"_side"
            a.creat_table(nowPageId+" .table_container .right_table", ID)
            a.set_thead(ID + "_table", months_arr)
            tbody_array = a.get_tbody_by_array(output_arr1)
            $('#' + ID + '_table').DataTable({
                "data": tbody_array,
                "autoWidth": false,
                "searching": false,
                "paging": false,
                "info": false,
                "order": [],
                "columnDefs": disable_sorting
            });
            let show_data_amount = 5
            let scoller_width = $("#"+nowPageId+" .right_table tr").css("width")
            if(show_data_amount == 0){
                let left_width = $("#"+nowPageId+" .left_table").css("width")
                $(".table_container").css("width","100%");
                $("#"+nowPageId+" .right_table").css("width",`calc(100% - ${left_width})`)

            }else{
                let target_width = parseFloat(scoller_width.substring(0,scoller_width.length-2)) / months_arr.length * show_data_amount
                $("#"+nowPageId+" .right_table").css("width",target_width+"px")
            }
            $("#"+nowPageId+" .right_table").scrollLeft(parseFloat(scoller_width.substring(0,scoller_width.length-2)))
            let repeat_amount = 0
            let tbody_row_amount = output_arr1.length
            table_style(ID+"_table",function(row_i, row_v, col_i, col_v){
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
                table_style(ID+"_table",function(row_i, row_v, col_i, col_v){
                    if(months_arr.length-1 == col_i){
                        $(col_v).html("未公布").css("background-color","transparent")
                    }
                })
                
            }
            break;
        };
        // 漲跌總覽
        case "JhangDieZongLan": {
            var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
            a.creat_table(nowPageId, nowPageId)
            var tbody_array = a.get_tbody_by_command("*", { "left_nav": father_ID, "left_small_nav": "none", "top_nav_name": $("#"+ID).html()}, false)
            console.log(tbody_array)
            a.set_thead(nowPageId + "_table", ["公司簡稱", "公司代號", "產業分類", "日漲跌", "週漲跌", "月漲跌", "季漲跌", "年漲跌"])

            a.set_table_title(nowPageId + "_table_title", $("#"+ID).html())
            $('#' + nowPageId + '_table').DataTable({
                "data": tbody_array,
                "autoWidth": false,
                "searching": false,
                "paging": false,
                "info": false,
                "order": [[3, 'desc']]

            });
            table_style(nowPageId + '_table', function (row_i, row_v, col_i, col_v) {
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
            break;
        };
        // 產業指數
        case "ChanYeJrShu": {

            break;
        };
        // 個股股價
        case "GeGuGuJia": {

            break;
        };
        // 彙總報表
        case "HuiZongBaoBiao": {

            break;
        };
        // 本益總覽
        case "BenYiZongLan": {

            break;
        };
        // 股利總覽
        case "GuLiZongLan": {

            break;
        };
        // 產業地圖
        case "ChanYeDiTu": {

            break;
        };
        // 價值池
        case "JiaJrChr": {

            break;
        };
        // 產業新聞
        case "ChanYeSinWun": {

            break;
        };
    }

}