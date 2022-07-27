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
    var now_tbody_array;
    $.ajax({
        type: "POST",
        url: "http://43.254.19.106:5107/industry_query",
        data: {
            account_id: "YingShouZongLan",
            left_nav: "YingShouZongLan",
            left_small_nav: "none",
            top_nav_name: $("#" + ID).html(),
            mode: "*"
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            now_tbody_array = response
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



            //左邊資料table

            var left_table_array = []
            for (let i of now_tbody_array.info.stock_info) {
                left_table_array.push(i.concat(["營收"]))
                left_table_array.push(i.concat(["年增率"]))
            }
            // console.log(left_table_array)

            var left_table_name = nowPageId + "_left"
            var left_table_obj = new dbtool2({
                tbody_array: left_table_array,
                box_id: `${nowPageId} .left_table`,
                table_name: left_table_name
            })

            left_table_obj.set_thead(
                ["公司簡稱", "公司代號", "產業分類", "項目"]
            )

            var left_table_datatableSetting = {
                "columnDefs": [
                    { targets: [0, 1, 2], orderable: false, className: 'dt-body-left' },
                    { targets: "_all", orderable: false, className: 'dt-body-center' }
                ],
                "searching": false,
                "paging": false,
                "info": false,
                "order": [],
            }
            left_table_obj.set_tbody(left_table_datatableSetting)
            table_style(left_table_name + "_table", function (row_i, row_v, col_i, col_v) {
                if (col_i < 3) {
                    if (row_i % 2 == 0) {
                        $(col_v).attr("rowspan", "2");
                    } else if (row_i % 2 == 1) {
                        $(col_v).remove();
                    }
                }
            })




            //右邊資料table

            var right_tbody_array = []
            for (let i in now_tbody_array.info.stock_info) {
                
                let stock_num = now_tbody_array.info.stock_info[i][1]


                let revenue_array = [];//營收array
                let year_growth_rate_array = [];//年增率
                for (let now_month of now_tbody_array.info.month_info) {
                    let _pushed = false
                    for (let j of now_tbody_array.values[stock_num]) {
                        if (j[0] == now_month) {

                            revenue_array.push(j[1])
                            year_growth_rate_array.push(j[2])
                            _pushed = true
                            break;
                        }
                        
                    }
                    if (!_pushed) {
                        revenue_array.push("無資料")
                        year_growth_rate_array.push("無資料")
                    }
                }
                right_tbody_array.push(revenue_array)//營收array
                right_tbody_array.push(year_growth_rate_array)//年增率

            }

            // console.log(right_tbody_array)



            var right_table_name = nowPageId + "_right"
            var right_table_obj = new dbtool2({
                tbody_array: right_tbody_array,
                box_id: `${nowPageId} .right_table`,
                table_name: right_table_name
            })

            // console.log(now_tbody_array.info.month_info)
            right_table_obj.set_thead(
                now_tbody_array.info.month_info
            )

            var right_table_datatableSetting = {
                "columnDefs": [
                    { targets: "_all", orderable: false, className: 'dt-body-center' }
                ],
                "searching": false,
                "paging": false,
                "info": false,
                "order": []

            }
            right_table_obj.set_tbody(right_table_datatableSetting)

            // let repeat_amount = 0
            let months_arr = now_tbody_array.info.month_info
            table_style(right_table_name + "_table", function (row_i, row_v, col_i, col_v) {
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
                    if ($(col_v).html() != "無資料") {

                        let now_html = parseInt($(col_v).html())
                        $(col_v).html(now_html.toLocaleString())
                    }
                }
                if (months_arr.length - 1 == col_i && $(col_v).html() == $(row_v).children("td:eq(" + (col_i - 1) + ")").html()) {
                    // repeat_amount += 1
                }
            })
            // if (repeat_amount == tbody_row_amount) {
            //     console.log(repeat_amount)
            //     table_style(ID + "_table", function (row_i, row_v, col_i, col_v) {
            //         if (months_arr.length - 1 == col_i) {
            //             $(col_v).html("未公布").css("background-color", "transparent")
            //         }
            //     })

            // }


            //右邊css setting
            let show_data_amount = 5//右邊table顯示的資料數量
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


        }
    });
}