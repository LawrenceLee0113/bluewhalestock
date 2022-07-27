//漲跌總覽page script 
//20220720
loaded_leftNavScripts.push("JhangDieZongLan")
console.log("JhangDieZongLan_js is loaded")
{
    let thisPageName = "JhangDieZongLan"
    function changeJhangDieZongLan({ father_ID, ID }) {
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
            JhangDieZongLan_func({ father_ID, ID })
        }
    }
}
async function JhangDieZongLan_func({ father_ID, ID }) {
    let nowPageId = dataContainerPageId(`${ID}`);
    var a = new dbtool("small_box_search", "bluewhal_Basedata", "basedata")
    a.creat_table(nowPageId, nowPageId)
    var tbody_array = a.get_tbody_by_command("*", { "left_nav": father_ID, "left_small_nav": "none", "top_nav_name": $("#" + ID).html() }, false)
    console.log(tbody_array)
    a.set_thead(nowPageId + "_table", ["公司簡稱", "公司代號", "產業分類", "日漲跌", "週漲跌", "月漲跌", "季漲跌", "年漲跌"])

    a.set_table_title(nowPageId + "_table_title", $("#" + ID).html())
    disable_sorting1 = [
        { targets: [0, 1, 2], className: 'dt-body-left' },
        { targets: "_all", className: 'dt-body-center' }
    ]
    $('#' + nowPageId + '_table').DataTable({
        "data": tbody_array,
        "autoWidth": false,
        "searching": false,
        "paging": false,
        "info": false,
        "order": [[3, 'desc']],
        "columnDefs": disable_sorting1

    });
    table_style(nowPageId + '_table', function (row_i, row_v, col_i, col_v) {
        if (col_i > 2) {
            let now_html = parseFloat($(col_v).html())
            let now_setting = []
            if (col_i == 3) { now_setting = table_bgcolor_setting.day }
            else if (col_i == 4) { now_setting = table_bgcolor_setting.week }
            else if (col_i == 5) { now_setting = table_bgcolor_setting.month }
            else if (col_i == 6) { now_setting = table_bgcolor_setting.season }
            else if (col_i == 7) { now_setting = table_bgcolor_setting.year }
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
}