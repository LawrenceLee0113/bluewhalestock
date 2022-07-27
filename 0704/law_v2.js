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
// 2F page更換 及 資料載入區域
function page_change_2F({ father_ID, ID }) {
    $(".dataContainer").html("");
    let nowPageId = dataContainerPageId(`${father_ID}_${ID}`);
    jQuery('<div>', {
        id: nowPageId,
        html: nowPageId + "-html"
    }).appendTo('.dataContainer');
    switch (father_ID) {
        // 營收股價
        case "YingShouGuJia": {

            break;
        };
        // 營收總覽
        case "YingShouZongLan": {

            break;
        };
        // 漲跌總覽
        case "JhangDieZongLan": {
            var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
            a.creat_table(nowPageId, nowPageId)
            var tbody_array = a.get_tbody_by_command("*", { "left_nav": father_ID, "left_small_nav": "none", "top_nav_name": $("#"+ID).html()}, false)

            a.set_thead(id + "_table", ["公司簡稱", "公司代號", "產業分類", "日漲跌", "週漲跌", "月漲跌", "季漲跌", "年漲跌"])

            a.set_table_title(id + "_table_title", $("#"+ID).html())
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