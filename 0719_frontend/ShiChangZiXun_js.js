//市場資訊page script 
//20220720
console.log("ShiChangZiXun_js is loaded")
loaded_leftNavScripts.push("ShiChangZiXun")
{
let thisPageName = "ShiChangZiXun"
function changeShiChangZiXunPage(ID){
    if (nowLeftNavName != thisPageName){
    $(".dataContainer").html("");

    }
    nowLeftNavName = thisPageName
    let nowPageId = dataContainerPageId(ID);

    let pages = $(".dataContainer").children("div")
    let showed = false

    $.each(pages, function (i, v) { 
        if($(v).attr("id") == nowPageId){
            $(v).show();
            showed = true
        }else{
            $(v).hide();
        }
    });
    if(!showed){
        jQuery('<div>', {
            id: nowPageId,
            html: nowPageId + "_html"
        }).appendTo('.dataContainer');
        ShiChangZiXun_func(ID)
    }
}
}
async function ShiChangZiXun_func(ID) {
    let nowPageId = dataContainerPageId(ID);
    let nowDataContain = $("#" + nowPageId).html();
    switch (ID) {
        // 新股上市上櫃
        case "S1ns": {
            changeContainer(nowPageId, "")
            $.ajax({
                type: "POST",
                url: "http://43.254.19.106:5107/simple",
                data: {
                    account_id:"",
                    leftNavID:"ShiChangZiXun",
                    middleNavID:"S1ns",
                    topNavID:"",
                    dataMode:"0"
                },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    let otc_Obj = new dbtool2({
                        tbody_array:response.values,
                        box_id:nowPageId,
                        table_name:nowPageId + "_otc"
                    })
                    otc_Obj.set_thead(
                        ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]
                    )
                    otc_Obj.set_table_title(
                        "新股上市"
                    )
                    otc_Obj.set_tbody()
                    
                }
            });
            $.ajax({
                type: "POST",
                url: "http://43.254.19.106:5107/simple",
                data: {
                    account_id:"",
                    leftNavID:"ShiChangZiXun",
                    middleNavID:"S1ns",
                    topNavID:"",
                    dataMode:"1"
                },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    let otc_Obj = new dbtool2({
                        tbody_array:response.values,
                        box_id:nowPageId,
                        table_name:nowPageId + "_sii"
                    })
                    otc_Obj.set_thead(
                        ["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]
                    )
                    otc_Obj.set_table_title(
                        "新股上櫃"
                    )
                    otc_Obj.set_tbody()
                    
                }
            });
            break;
        }
        // 董監持股轉讓
        case "S1is": {
            changeContainer(nowPageId, "")
            $.ajax({
                type: "POST",
                url: "http://43.254.19.106:5107/simple",
                data: {
                    account_id:"",
                    leftNavID:"ShiChangZiXun",
                    middleNavID:"S1is",
                    topNavID:"",
                    dataMode:"0"
                },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    let otc_Obj = new dbtool2({
                        tbody_array:response.values,
                        box_id:nowPageId,
                        table_name:nowPageId
                    })
                    otc_Obj.set_thead(
                        ["公司代號", "公司名稱", "申請人身分 ", "姓名", "預定轉讓方式及股數-轉讓方式", "預定轉讓方式及股數-轉讓股數", "目前持有股數-自有持股", "預定轉讓總股數-自有持股", "預定轉讓後持股-自有持股", "有效轉讓期間"]
                    )
                    otc_Obj.set_table_title(
                        "董監持股轉讓"
                    )
                    otc_Obj.set_tbody()
                    
                }
            });
            break;
        }
    }
}