// 所有標籤頁通用，按下按鈕顯示相對應的容器並將該按鈕變色
function openbox(displayClass,colorClass,colorID,displayID) {
	// 參數 1所有容器的class 2所有文字的class 3該按鈕文字的ID 4該容器的ID
	var i, box, fontColor;
	box = document.getElementsByClassName(displayClass);
	fontColor = document.getElementsByClassName(colorClass);
	// 隱藏所有資料容器
	for (i = 0; i < box.length; 
		i++) {
		box[i].style.display = "none";}
	// 消除所有按鈕顏色
	for (i = 0; i < fontColor.length; i++) {
		fontColor[i].style.color = "#A1A1A1";}
	// 目標容器取消隱藏
	document.getElementById(displayID).style.display = "block";
	// 所選按鈕文字變色
	document.getElementById(colorID).style.color = "black";
	show_content_box(displayID)
}

// 產業標籤頁適用，儲存按下的按鈕ID
var leftnavBigID   ="INrepB"  ;   //左側大導覽列
var leftnavSmallID ="RicicPB" ;   //左側小導覽列
var topnavclassID  ="矽智財"   ;  //上方細產業

// 產業標籤頁適用，按下左側小導覽列，顯示對應上排細產業導覽列，並記錄按下按鈕的ID。
function openclass(displayClass,colorClass,colorID,displayID,className,createID) {
	// 參數 1所有容器的class 2所有文字的class 3該按鈕文字的ID 4該容器的ID 5產業列表[] 6幫細產業創ID
	openbox(displayClass,colorClass,colorID,displayID);	
	var html_for_SmallClassButton = ''
	for (var i = 0; i < className.length; i++) { 
		html_for_SmallClassButton += '<div class="smallClassA" id="'+createID+String(i)+'" onclick="opencolor('+"'smallClassa','"+createID+String(i)+String(i)+"','"+createID+String(i)+"')"+'"><a class="smallClassa" id="'+createID+String(i)+String(i)+'">'+className[i]+'</a></div>';
	}
	document.getElementById(displayID).innerHTML = html_for_SmallClassButton;
	document.getElementById(displayID).style.display = "flex";
	//記錄按下按鈕的ID
	leftnavSmallID = colorID ;
	topnavclassID = className[0];
	show_small_box(className[0])
}

// 產業標籤頁適用，按下左側大導覽列，左側大導覽列文字變色，並記錄按下按鈕的ID。
// 產業標籤頁適用，按下上方細產業，上方細產業文字變色，並記錄按下按鈕的ID。
function opencolor(colorClass,colorID,divID,is_popstate=true) {
	// 參數 1所有文字的class 2該按鈕文字的ID 3記錄按下按鈕的ID 4 is popstate
	var i, fontColor;
	fontColor = document.getElementsByClassName(colorClass);
	// 消除所有按鈕顏色
	for (i = 0; i < fontColor.length; i++) {
		fontColor[i].style.color = "#A1A1A1";}
	// 所選按鈕文字變色
	document.getElementById(colorID).style.color = "black";
	//記錄按下按鈕的ID
	if(colorClass == "all-BIa"){
		leftnavBigID = divID;
	}
	if(colorClass == "smallClassa"){
		topnavclassID = document.getElementById(divID).innerText;
	}	
	show_small_box(divID)
	if(is_popstate){
	    
	    change_page(divID)
	}
}



