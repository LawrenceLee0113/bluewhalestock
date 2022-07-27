console.log("dbtool is on load!")
class dbtool {
    constructor(account_id, database_name, table_name, column_names = ["*"]) {
        this.account_id = account_id;
        this.database_name = database_name;
        this.table_name = table_name;
        this.column_names = column_names;
        this.tbody_content = [];
    }
    list_to_string(list,c=","){
        return list.join(c);
    }
    get_tbody(condition = "",async_mode=true,func=function(){},column_names = this.column_names,table_name = this.table_name) {
        var content = [];
        $.ajax({
            type: "POST",
            url: "http://43.254.19.106:5107/get_data_base",
            async:async_mode,
            data: {
                "account_id": this.account_id,
                "database_name": this.database_name,
                "table_name": table_name,
                "column_names": this.list_to_string(column_names),
                "condition": condition
            },
            dataType: "json",
            success: function (data) {
                
                content = data.values;
                func(content)
            }

        });
        this.tbody_content = content;
        return content;
    }
    get_tbody_by_command(mode="*",data={},async_mode=true,func=function(){}) {
        var content = [];
        $.ajax({
            type: "POST",
            url: "http://43.254.19.106:5107/industry_query",
            async:async_mode,
            data: {
                "account_id": this.account_id,
                "left_nav": data.left_nav,
                "left_small_nav": data.left_small_nav,
                "top_nav_name": data.top_nav_name,
                "mode": mode
            },
            dataType: "json",
            success: function (data) {
                content = data.values;
                func(content)
            }

        });
        this.tbody_content = content;
        return content;
        
    }
    get_tbody_by_array(array=[]){
        this.tbody_content = array;
        return this.tbody_content;
    }
    set_tbody(table_id,tbody_content=this.tbody_content) {
        var content = "";
        for (var i of tbody_content) {
            var output = "";
            for (var j of i) {
                output += "<td>" + j + "</td>"
            }
            content += "<tr>" + output + "</tr>"
        }
        $("#"+table_id+" tbody").html(content);
    }
    set_thead(table_id, thead_names) {
        var head_output = ""
        for(var i of thead_names) {
            
            head_output += "<th>" + i + "</th>"
        }
        head_output = "<tr>" + head_output + "</tr>"
        $("#"+table_id+" thead").html(head_output);
        
    }
    set_table_title(header_id, title) {
        $("#"+header_id).html(title);
    }
    creat_table(box_id,table_id){
        $("#"+box_id).append("<h1 id='"+table_id+"_table_title' style='text-align:center'></h1><table id='"+table_id+"_table'><thead></thead><tbody></tbody></table>")
    }
}

class dbtool2 {
    constructor({tbody_array,box_id,table_name}) {
        this.tbody_array = tbody_array;
        this.table_name = table_name
        this.box_id = box_id

        this.creat_table(this.box_id,this.table_name)

    }
    list_to_string(list,c=","){
        return list.join(c);
    }
    set_tbody() {
        
        $('#' + this.table_name + '_table').DataTable({
            "data": this.tbody_array,
            "autoWidth": false
        });
    }
    set_thead(thead_names) {
        var head_output = ""
        for(var i of thead_names) {
            
            head_output += "<th>" + i + "</th>"
        }
        head_output = "<tr>" + head_output + "</tr>"
        $("#"+this.table_name+"_table thead").html(head_output);
        
    }
    set_table_title(title) {
        $("#"+this.table_name+"_table_title").html(title);
    }
    creat_table(box_id,table_name){
        $("#"+box_id).append("<h1 id='"+table_name+"_table_title' style='text-align:center'></h1><table id='"+table_name+"_table'><thead></thead><tbody></tbody></table>")
    }
}
function creat_sub_td(col_v, top_text, bottom_text,border_top = "1px solid #ddd") {
        var padding = $(col_v).css("padding").split(" ")
        if (border_top == "1px solid #ddd"){
            var border_top = $(col_v).css("border-top")
        }
        var top_p = "8px"
        var left_p = "10px"
        switch (padding.length) {
            case 1:
                top_p = padding[0]
                left_p = padding[0]
                break
            case 2:
                top_p = padding[0]
                left_p = padding[1]
                break
            case 4:
                top_p = padding[0]
                left_p = padding[1]
                break
        }
        $(col_v).css("padding","0px")
        var padding_setting = parseInt(top_p.substring(0, top_p.length - 2)) / 2 + "px " + left_p
        var inner_html =
            "<div class='table_container'     style='margin: 0;padding: 0;width: calc(100% - {lr_padding});height: 100%;display: flex;flex-direction: column;'>" +
            "<div class='table_top' style='height: 50%;width: 100%;padding: {padding_setting};border-bottom: {border_top};'>" +
            "{top_text}" +
            "</div>" +
            "<div class='table_bottom' style='height: 50%;width: 100%;padding: {padding_setting}'>" +
            "{bottom_text}" +
            "</div>" +
            "</div>"
        let lr_padding = parseInt(left_p.substring(0, top_p.length - 1)) * 2 + "px"
        inner_html = inner_html.replace(/{padding_setting}/g, padding_setting).replace("{top_text}", top_text)
        inner_html = inner_html.replace("{bottom_text}", bottom_text).replace("{lr_padding}",lr_padding).replace("{border_top}",border_top)
        return inner_html
    }
// $(document).ready(function () {
//     $.ajax({
//         type: "get",
//         url: "https://43.254.19.106:5107/ping_database",
//         data: {},
//         dataType: "json",
//         success: function (data) {
//             console.log(data);
//         }

//     });
// });