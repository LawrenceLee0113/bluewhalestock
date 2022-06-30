
$(document).ready(function () {
    // 搜尋股票
    var stock_nums = []
    var stock_names = []
	$("#submitButton").click(function (e) { 
		var stock_value = $("#input").val().trim();
		// alert("Stock Code: " + stock_value)
		var ouput_num = stock_names.indexOf(stock_value)
		if(ouput_num == -1) {
			var output = stock_value
		}else{
			var output = stock_nums[ouput_num]
            location.href = "https://43.254.19.106:5107/stock_search?stock_name=" + output
		}
		// alert("Output: " + output)
	});
    $("#input").keyup(function (e) { 

        e.preventDefault();
        var key_word = $("#input").val();
        var search_column;
        if(isNaN(key_word)) {
            search_column = "公司簡稱";
        }else{
            search_column = "公司代號";
        }

        var get_data_base = new dbtool("search","bluewhal_Basedata","basedata",["公司代號","公司簡稱"]);
        var content = get_data_base.get_tbody("`"+search_column+"` LIKE '"+key_word+"%' order by `搜尋次數` desc limit 10",true,function(content){
            
            console.log(content);
            $("#dlSTOCK_ID_NM").empty();
            for(var i of content){
                stock_nums.push(i[0])
                stock_names.push(i[0] + " "+ i[1])
    		    $("#dlSTOCK_ID_NM").append("<option value='" + i[0] + " "+ i[1] + "'>")
    	    }
        });
    });
});