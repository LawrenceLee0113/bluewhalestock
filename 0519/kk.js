var loaded_id = []
function show_content_box(id) {
    console.log(id)
    if(loaded_id.includes(id) == false){
        
        switch (id) {
            case "applX":
                loaded_id.push(id)
                var sii_stock_db = new dbtool("001","bluewhal_NewStock","newstock_sii",["公司代號","公司名稱","申請日期","董事會通過日期","股票開始買賣日期","承銷商","承銷價","備註"]);
    		    var tbody_array = sii_stock_db.get_tbody("DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",false)
    		    sii_stock_db.set_thead("applX_sii_table",["公司代號","公司名稱","申請日期","通過日期","買賣日期","承銷商","承銷價","備註"])
    		    sii_stock_db.set_table_title("applX_sii_table_title", "新股上市")
    		    $('#applX_sii_table').DataTable({
    		        "data":tbody_array,
    		        "autoWidth": false
    		    });
    		    var otc_stock_db = new dbtool("001","bluewhal_NewStock","newstock_otc",["公司代號","公司名稱","申請日期","董事會通過日期","股票開始買賣日期","承銷商","承銷價","備註"]);
                var tbody_array = otc_stock_db.get_tbody("DATE(`申請日期`) >= DATE(DATE_SUB(CURDATE(),INTERVAL 7 MONTH))",false)
                otc_stock_db.set_thead("applX_otc_table",["公司代號","公司名稱","申請日期","通過日期","買賣日期","承銷商","承銷價","備註"])
                otc_stock_db.set_table_title("applX_otc_table_title", "新股上櫃")
                $('#applX_otc_table').DataTable({
                    "data":tbody_array,
                    "autoWidth": false
                });
                    
                break;
            case "":
                loaded_id.push(id)
                break;
            case "":
                loaded_id.push(id)
                break;
            case "":
                loaded_id.push(id)
                break;
            case "":
                loaded_id.push(id)
                break;
    }

    }
}
var small_boxs = []
function show_small_box(id) {
    // console.log(leftnavBigID)
    // console.log(leftnavSmallID)
    // console.log(topnavclassID)
    // console.log("\n")
    var now_box = id+"_box" // box id
    var now_box_loaded = false
    for(let i of small_boxs){
        if(i == now_box){
            
            now_box_loaded = true
        }else{
            $("#"+i).hide()
        }
    }
    if(now_box_loaded){
        $("#"+now_box).show()
        
    }else{
        $("#DFCID").append("<div id='"+now_box+"'></div>")
        small_boxs.push(now_box)
        var data_val = $("#"+id).children("a").html()
        $("#"+now_box).attr("data-name",data_val).html("~"+now_box+"~")
        
        
        var a = new dbtool("small_box_search","bluewhal_Basedata","basedata")
        // a.creat_table(now_box,id)
        var tbody_array = a.get_tbody_by_command("*",{"left_nav":leftnavBigID,"left_small_nav":leftnavSmallID,"top_nav_name":topnavclassID},false)
        
    //     a.set_thead(id+"_table",["公司代號","公司名稱","申請日期","通過日期","買賣日期","承銷商","承銷價","備註"])
	   // a.set_table_title(id+"_table_title", "新股上市")
	   // $('#'+id+'_table').DataTable({
	   //     "data":tbody_array,
	   //     "autoWidth": false
	   // });
        console.log(tbody_array)
    }
    
}