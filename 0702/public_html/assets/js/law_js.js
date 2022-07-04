var dataContainerCreatedPageIds = []
var nowShowPageId = ""
function dataContainerPageId(id){
    return `page-${id}`
}
function page_change(page_id_1F){
    let nowPageId = dataContainerPageId(page_id_1F);
    if(dataContainerCreatedPageIds.includes(nowPageId)){//載入過了
        $("#"+nowShowPageId).hide();
        $("#"+nowPageId).show();
        nowShowPageId = nowPageId
    }else{//第一次載入
        if(nowShowPageId!=""){$("#"+nowShowPageId).hide();}
        jQuery('<div>', {
            id: nowPageId,
            html:nowPageId+"_html"
        }).appendTo('.dataContainer');
        creatDataContain(page_id_1F)
        dataContainerCreatedPageIds.push(nowPageId)
        nowShowPageId = nowPageId
    }
}
// function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
function sleep(delay) {
    return new Promise(reslove => {
      setTimeout(reslove, delay)
    })
  }
async function simple_table_creator({box_id,database,table,column=[],condition,table_name,table_title,column_title=[]}){
    var now_db = new dbtool("001", database, table, column);
    now_db.creat_table(box_id,table_name)
    var tbody_array = await now_db.get_tbody(condition, false)
    now_db.set_thead(table_name+"_table", column_title)
    now_db.set_table_title(table_name+"_table_title", table_title)
    $('#'+table_name+'_table').DataTable({
        "data": tbody_array,
        "autoWidth": false
    });
}
function changePageData(pageId,content){
    $("#"+pageId).html(content);
}
async function creatDataContain(ID){
    let nowPageId = dataContainerPageId(ID);
    let nowDataContain = $("#"+nowPageId).html();
    switch (ID) {
        // 新股上市上櫃
        case "S1ns":{
            changePageData(nowPageId,"")
            simple_table_creator({
                box_id:nowPageId,
                database:"bluewhal_NewStock",
                table:"newstock_sii",
                column:["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                condition:"DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                table_name:nowPageId+"_sii",
                table_title:"新股上市",
                column_title:["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]}
            )
            simple_table_creator({
                box_id:nowPageId,
                database:"bluewhal_NewStock",
                table:"newstock_otc",
                column:["公司代號", "公司名稱", "申請日期", "董事會通過日期", "股票開始買賣日期", "承銷商", "承銷價", "備註"],
                condition:"DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",
                table_name:nowPageId+"_otc",
                table_title:"新股上櫃",
                column_title:["公司代號", "公司名稱", "申請日期", "通過日期", "買賣日期", "承銷商", "承銷價", "備註"]}
            )
            break;
        }
        // 董監持股轉讓
        case "S1is":{
            changePageData(nowPageId,"")
            simple_table_creator({
                box_id:nowPageId,
                database:"bluewhal_Basedata",
                table:"shareholdingchange",
                column:["*"],
                condition:"1",
                table_name:id,
                table_title:"董監持股轉讓",
                column_title:["公司代號", "公司名稱", "申請人身分 ", "姓名", "預定轉讓方式及股數-轉讓方式", "預定轉讓方式及股數-轉讓股數", "目前持有股數-自有持股", "預定轉讓總股數-自有持股","預定轉讓後持股-自有持股","有效轉讓期間"]}
            )
            break;
        }
        // 異常推介個股
        case "S1ss":{
            
            break;
        }
        // 注意處置股票
        case "S1as":{
            
            break;
        }
        // 分盤交易股票
        case "S1sb":{
            
            break;
        }
        // 除權除息預告
        case "S1dp":{
            
            break;
        }
        // 今日重大訊息
        case "S1tb":{
            
            break;
        }
        // 公司自結盈餘
        case "S1ce":{
            
            break;
        }
    }
}
