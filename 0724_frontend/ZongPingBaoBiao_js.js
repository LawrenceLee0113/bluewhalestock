//總評報表page script 
//20220724
loaded_leftNavScripts.push("ZongPingBaoBiao")
console.log("ZongPingBaoBiao_js is loaded")
{
    let thisPageName = "ZongPingBaoBiao"
    function changeZongPingBaoBiao({ ID,stock_num="main" }) {
        if (nowLeftNavName != thisPageName) {
            $(".dataContainer").html("");

        }
        nowLeftNavName = thisPageName
        let nowPageId = dataContainerPageId(stock_num);

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
            ZongPingBaoBiao_func({ ID,stock_num })
        }
    }
}
async function ZongPingBaoBiao_func({ ID,stock_num }) {
    let nowPageId = dataContainerPageId(stock_num);
    if(stock_num=="main"){
        var now_tbody_array;
        alert("main")
        
    }else{
        loadEchartsScript()
        var stock_chart_obj = {
        }
       $.ajax({
        type: "POST",
        url: "http://43.254.19.106:5107/stock_data",
        data: {"stock_num": stock_num},
        dataType: "json",
        success: function (response) {
            console.log(response)
            let unit = "億"
            let stock = response.stock_info[0]
            let stock_num = stock[1]
            let stock_name = stock[2]
            let stock_fullname = stock[3]
            let stock_volume = stock[8]//市值
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
            stock_chart_obj[stock_chart_container_id].row_data = response.k_link_data
            stock_chart_obj[stock_chart_container_id].show_data({selected_disabled:[60,120,240]})
        }
    });
    }
}