//權值個股page script 
//20220720
loaded_leftNavScripts.push("ShiChangZiXun")
console.log("QuanZhiGeGu_js is loaded")
{
    let thisPageName = "QuanZhiGeGu"
function changeQuanZhiGeGu(ID){
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
            html: `
            <div class="d-flex align-items-center justify-content-center w-100 h-100">
            <strong>Loading...</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
            `
        }).appendTo('.dataContainer');
        QuanZhiGeGu_func(ID)
    }
}
}
async function QuanZhiGeGu_func(ID) {
    loadEchartsScript()
    let nowPageId = dataContainerPageId(ID);
    
    var stock_chart_obj = {
    }
    $.ajax({
        type: "POST",
        url: "http://43.254.19.106:5107/industry_query",
        data: {
            account_id:"QuanZhiGeGu_load",
            left_nav:"QuanZhiGeGu",
            left_small_nav:ID,
            top_nav_name:"1F",
            mode :"*"
        },
        dataType: "json",
        success: function (response) {
            console.log(response)
            $("#"+nowPageId).html("");
            let unit = "億"
            for(var stock of response.info){
                let stock_num = stock[0]
                let stock_name = stock[1]
                let stock_fullname = stock[2]
                let stock_volume = stock[3]
                let stock_chart_container_id = `stock_chart_${stock_num}`
                
                jQuery('<div>', {
                    id: stock_chart_container_id+"_container",
                    style:"width: 100%;height:500px;margin-bottom: 5rem;",
                    class:"d-flex flex-column"
                }).appendTo('#'+nowPageId);
                jQuery('<div>', {
                    id: stock_chart_container_id+"_info",
                    style:``,
                    class:"row justify-content-around",
                    html:`
                    <div class="col-md-auto">
                    公司代號: <span class="text-danger">${stock_num}</span>
                    </div>
                    <div class="col-md-auto">
                    公司名稱: <span class="text-danger">${stock_fullname}
                    </div>
                    <div class="col-md-auto">
                    市值: <span class="text-danger">${Math.floor(stock_volume/100).toLocaleString()}(${unit})</span>
                    </div>
                    `
                }).appendTo('#'+stock_chart_container_id+"_container");
                jQuery('<div>', {
                    id: stock_chart_container_id,
                    style:`height:85%`,
                }).appendTo('#'+stock_chart_container_id+"_container");
                stock_chart_obj[stock_chart_container_id] = new k_line(stock_chart_container_id, `${stock_name}`,[5,10,20,60,120,240])
                stock_chart_obj[stock_chart_container_id].row_data = response.values[stock_num]
                stock_chart_obj[stock_chart_container_id].show_data({selected_disabled:[60,120,240]})
            }
            console.log(stock_chart_obj)
        }
    });
}