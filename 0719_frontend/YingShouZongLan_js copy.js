//營收總覽page script 
//20220720
loaded_leftNavScripts.push("YingShouZongLan")
console.log("YingShouZongLan_js is loaded")
{
    let thisPageName = "YingShouZongLan"
    function changeYingShouZongLan({ father_ID, ID }) {
        if (nowLeftNavName != thisPageName) {
            $(".dataContainer").html("");

        }
        nowLeftNavName = thisPageName
        let nowPageId = dataContainerPageId(ID);

        let pages = $(".dataContainer").children("div")
        let showed = false

        $.each(pages, function (i, v) {
            if ($(v).attr("id") == nowPageId) {
                $(v).show();
                showed = true
            } else {
                $(v).hide();
            }
        });
        if (!showed) {
            jQuery('<div>', {
                id: nowPageId,
                html: ``
            }).appendTo('.dataContainer');
            YingShouZongLan_func({ father_ID, ID })
        }
    }
}
async function YingShouZongLan_func({ father_ID, ID }) {
    let nowPageId = dataContainerPageId(`${ID}`);
    var table_container = `
            <div class="two_table_wrapper">
                <div class="info_html">
                </div>
                <div class="table_container">
                <div class="left_table"></div>
                <div class="right_table"></div>
                </div>
                
            </div>
            `
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
                .info_html{
                    width:100%;
                    display:flex;
                    justify-content: right;
                }
                </style>
                `
    var info_html = `
                營收單位: (千)
                
            `
    $("#" + nowPageId).append('<h1 style="text-align: center;"></h1>');
    $("#" + nowPageId).append(table_container);
    $("#" + nowPageId + " .info_html").append(info_html);
    $("#" + nowPageId).css({ "display": "flex", "flex-direction": "column", "align-items": "center" })
    $("#" + nowPageId).append(css_setting);
    $("#" + nowPageId + " h1").html($("#" + ID).html());

    var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
    a.creat_table(nowPageId + " .table_container .left_table", ID)
    var output_arr = []//公司簡稱 ~ 項目
    var output_arr1 = []//營收 & 年增率
    var months_arr = []
    var tbody_array = a.get_tbody_by_command("*", { "left_nav": father_ID, "left_small_nav": "none", "top_nav_name": $("#" + ID).html() }, false, function (content) {
        console.log(content)
        for (let i = 0; i < content.length; i++) {
            let now_output_arr1 = []//公司簡稱 ~ 項目(營收)
            let now_output_arr2 = []//公司簡稱 ~ 項目(年增率)
            let now_output_arr3 = []//營收
            let now_output_arr4 = []//年增率
            for (let j = 0; j < content[i].length; j++) {
                if (j < 3) {
                    now_output_arr1.push(content[i][j])
                    now_output_arr2.push(content[i][j])
                } else if (j == 3) {
                    now_output_arr1.push("營收")
                    now_output_arr2.push("年增率")
                }
                if (i == 0 && j > 2 && (j - 2) % 3 == 1) {//月分列
                    months_arr.push(content[i][j])
                }
                if (j > 2 && (j - 2) % 3 == 2) {
                    if (content[i][j] == "no_data") {
                        content[i][j] = "無資料"
                    }
                    now_output_arr3.push(content[i][j])
                } else if (j > 2 && (j - 2) % 3 == 0) {
                    if (content[i][j] == "no_data") {
                        content[i][j] = "無資料"
                    }
                    now_output_arr4.push(content[i][j])
                }
            }
            output_arr.push(now_output_arr1)
            output_arr.push(now_output_arr2)
            output_arr1.push(now_output_arr3)
            output_arr1.push(now_output_arr4)
        }
    })
    var disable_sorting1 = [
        { targets: [0, 1, 2], orderable: false, className: 'dt-body-left' },
        { targets: "_all", orderable: false, className: 'dt-body-center' }
    ]
    var disable_sorting2 = [
        { targets: "_all", orderable: false, className: 'dt-body-center' }
    ]

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
        "columnDefs": disable_sorting1
    });
    table_style(ID + "_table", function (row_i, row_v, col_i, col_v) {
        if (col_i < 3) {
            if (row_i % 2 == 0) {
                $(col_v).attr("rowspan", "2");
            } else if (row_i % 2 == 1) {
                $(col_v).remove();
            }
        }
    })

    ID = ID + "_side"
    a.creat_table(nowPageId + " .table_container .right_table", ID)
    a.set_thead(ID + "_table", months_arr)
    tbody_array = a.get_tbody_by_array(output_arr1)
    $('#' + ID + '_table').DataTable({
        "data": tbody_array,
        "autoWidth": false,
        "searching": false,
        "paging": false,
        "info": false,
        "order": [],
        "columnDefs": disable_sorting2
    });
    let show_data_amount = 5
    let scoller_width = $("#" + nowPageId + " .right_table tr").css("width")
    if (show_data_amount == 0) {
        let left_width = $("#" + nowPageId + " .left_table").css("width")
        $(".table_container").css("width", "100%");
        $("#" + nowPageId + " .right_table").css("width", `calc(100% - ${left_width})`)

    } else {
        let target_width = parseFloat(scoller_width.substring(0, scoller_width.length - 2)) / months_arr.length * show_data_amount
        $("#" + nowPageId + " .right_table").css("width", target_width + "px")
    }
    $("#" + nowPageId + " .right_table").scrollLeft(parseFloat(scoller_width.substring(0, scoller_width.length - 2)))
    let repeat_amount = 0
    let tbody_row_amount = output_arr1.length
    table_style(ID + "_table", function (row_i, row_v, col_i, col_v) {
        if (row_i % 2 == 1) {
            let now_html = parseFloat($(col_v).html())
            let now_setting = [-50, -30, -20, 20, 30, 50]
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
            if ($(col_v).html() != "無資料") {

                $(col_v).html(Math.floor(now_html) + "%")
            } 
        }
        if (row_i % 2 == 0) {
            let now_html = parseInt($(col_v).html())
            $(col_v).html(now_html.toLocaleString())
        }
        if (months_arr.length - 1 == col_i && $(col_v).html() == $(row_v).children("td:eq(" + (col_i - 1) + ")").html()) {
            repeat_amount += 1
        }
    })
    if (repeat_amount == tbody_row_amount) {
        console.log(repeat_amount)
        table_style(ID + "_table", function (row_i, row_v, col_i, col_v) {
            if (months_arr.length - 1 == col_i) {
                $(col_v).html("未公布").css("background-color", "transparent")
            }
        })

    }
}