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
function thousandBitSeparator(num) {//千分位

    return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
        return $1 + ",";
     }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
         return $1 + ",";
     }));
}

{

    var isEchartsLoad = false
    function loadEchartsScript(){
        if(!isEchartsLoad){
            $("body").append(`  
            
            <script type="text/javascript" src="http://fastly.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js"></script>
            <script src="http://bluewhale-stock.tw/assets/js/k_line_creator.js"></script>
            `);
            // <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/jquery"></script>
            isEchartsLoad = true
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
            
            break;
        };
        // 漲跌總覽
        case "JhangDieZongLan": {
            
            break;
        };
        // 產業指數
        case "ChanYeJrShu": {

            break;
        };
        // 個股股價
        case "GeGuGuJia": {
            if(!isEchartsLoad){
                $("body").append(`  
                <script type="text/javascript" src="http://fastly.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js"></script>
                <script src="http://bluewhale-stock.tw/assets/js/k_line_creator.js"></script>
                `);
                // <script type="text/javascript" src="https://fastly.jsdelivr.net/npm/jquery"></script>
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
                url: "http://43.254.19.106:5107/industry_query",
                data: {
                    account_id:"GeGuGuJia_load",
                    left_nav:"GeGuGuJia",
                    left_small_nav:"none",
                    top_nav_name: $("#"+ID).html(),
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
                        let stock_small_type = stock[4]

                        let stock_chart_container_id = `stock_chart_${stock_num}`
                        let unit = "億"
                        jQuery('<div>', {
                            id: stock_chart_container_id+"_container",
                            style:"width: 100%;height:500px;margin-bottom: 5rem;",
                        }).appendTo('.dataContainer');
                        jQuery('<div>', {
                            id: stock_chart_container_id+"_info",
                            style:"height:5%",
                            class:"d-flex justify-content-around",
                            html:`<label for="">公司代號: <span class="text-danger">${stock_num}</span></label>
                            <label for="">公司名稱: <span class="text-danger">${stock_fullname}</span></label>
                            <label for="">市值: <span class="text-danger">${Math.floor(stock_volume/100).toLocaleString()}(${unit})</span></label>
                            <label for="">類別: <span class="text-danger">${stock_small_type}</span></label>`
                        }).appendTo('#'+stock_chart_container_id+"_container");
                        jQuery('<div>', {
                            id: stock_chart_container_id,
                            style:"height:95%",
                        }).appendTo('#'+stock_chart_container_id+"_container");
                        stock_chart_obj[stock_chart_container_id] = new k_line(stock_chart_container_id, `${stock_name}`,[5,10,20,60,120,240])
                        stock_chart_obj[stock_chart_container_id].row_data = response.values[stock_num]
                        stock_chart_obj[stock_chart_container_id].show_data({selected_disabled:[60,120,240]})
                    }
                    console.log(stock_chart_obj)
                }
            });
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