// =========== 大盤資訊的按鈕 ===========
DaPanZhiBiao           = ["大盤營收","D1dr","營收年增","D1rg","大盤評價","D1dv","漲跌停數","D1ud"];
QuanZhiGeGu            = ["市值Top10","Q1t1","市值Top20","Q1t2","市值Top30","Q1t3","市值Top40","Q1t4","市值Top50","Q1t5"];
ShiChangZiXun          = ["新股上市上櫃","S1ns","董監持股轉讓","S1is","異常推介個股","S1ss","注意處置股票","S1as","分盤交易股票","S1sb","除權除息預告","S1dp","今日重大訊息","S1tb","公司自結盈餘","S1ce",];
JingJiZhiBiao          = ["經濟成長","J1ag","採購經理人","J1cb","國民所得","J1cs","物價指數","J1gp","貨幣供給","J1ms","國際匯率","J1gc",];
MaoYiShuJu             = [];
ShangPinHangQing       = [];
GeGuPaiHang            = ["營收成長","G1rg","外資買賣","G1ft","投信買賣","G1tb","股價漲幅","G1su","成交量","G1sv","殖利率","G1dr"];
// =========== 產業資訊的按鈕 ===========
// 儲存產業數據按鈕ID
var IndustryID = "";
// 儲存中產業分類
var middleClassID = "Semiconductor";
// 儲存細產業分類
var smallClassID = "Semiconductor1";
// 名稱
ChanYeTzShiun          = ["半導體業","Semiconductor","光電產業","Optoelectronics","網路通訊","Network","電子零件","ElectronicParts","電路板業","CircuitBoard","電腦產業","Computer","電力能源","PowerEnergy","資訊服務","InformationService","電子通路","ElectronicDistributors","金融保險","Finance","生物科技","Biotechnology","運動產業","Sports","生活用品","DailyGoods","紡織產業","Textile","食品產業","Food","百貨量販","GeneralMerchandise","家庭電器","HomeAppliances","汽車產業","Automotive","設備產業","Equipment","電機機械","ElectricalMachinery","鋼鐵產業","Steel","水泥產業","Cement","建築工程","architecture","其他傳產","TraditionalProduction","化學石化","Chemical","交通運輸","Transportation"];
//小產業分類
Semiconductor          = ['矽智財','特殊應用IC','記憶體','記憶體控制IC','電源管理IC','驅動IC','網路通訊IC ','影音IC','影像感測IC','觸控IC','微控制器MCU','輸出入介面IC','二極體','功率電晶體','記憶體模組','晶圓','磊晶','網通晶圓','晶圓代工 ','封測材料','導線架','IC封測',];
Optoelectronics        = ['背光模組 ','面板材料','面板','觸控面板模組','顯示器','LED晶粒 ','LED封裝','LED燈具 ','光學鏡頭','光碟片','光碟片 ','攝影機 ',];
Network                = ['光主動元件','光被動元件','無線通訊元件','GPS應用','網路通訊設備','衛星通訊','電信服務',];
ElectronicParts        = ['被動元件材料','電阻 ','電容 ','電感 ','石英元件','連接器','連接線材','電源供應器','電子材料','散熱','3C機殼元件',];
CircuitBoard           = ['電路板材料','銅箔基板','IC載板','電路板','電路板加工',];
Computer               = ['嵌入式系統','金融終端機','強固型電腦','博弈機台','電腦及伺服器','主機板與顯卡','組裝與代工','電腦週邊3C',];
PowerEnergy            = ['太陽能材料','太陽能電池模組','重電','不斷電系統','電池模組','電池材料',];
InformationService     = ['韌體設計','軟體開發','金融系統軟體','專案系統軟體','軟體代理','軟硬體整合','網站經營','網購平台',]
ElectronicDistributors = ['3C通路','半導體通路','設備通路','電子材料通路','電子零件通路',];
Finance                = ['金控','保險','銀行','證券期貨','泛金融',];
Biotechnology          = ['保健品','藥妝美容 ','連鎖藥局 ','生醫材質','測試儀','眼睛醫材','醫院用醫材','基因檢測','醫療服務','生物相似藥','疫苗','原料藥','新藥','學名藥',];
Sports                 = ['自行車製造 ','自行車零件','球具','健身','鞋子','鞋子材料',];
DailyGoods             = ['旅行社','飯店 ','生理用品','清潔劑','影視','補教','精品','活動製作','娛樂場所','傢俱','衛浴','廚房用品','事務機','殯葬',];
Textile                = ['纖維','紡紗','織布','成衣',];
Food                   = ['食品原料','飼料','食用油品','肉品','其他食品','食品容器','餐飲','飲料',];
GeneralMerchandise     = ['貿易通路','服飾','超商','購物中心',];
HomeAppliances         = ['家庭電器','影音產品','居家安控電子',];
Automotive             = ['汽車電機系統','汽車系統','汽車塑件','汽車金屬件','汽車鈑金烤漆','其他汽車配件','車燈','車用電子','成車生產','汽車代理銷售',];
Equipment              = ['電子實驗室','半導體設備','PCB設備','光學檢測設備','自動化設備','量測儀','機械加工機','木工工具機','食品設備 ','其他設備',];
ElectricalMachinery    = ['縫紉機','手工具機','水泵','傳動元件','冷凍空調','五金',];
Steel                  = ['鋼材','不鏽鋼','線材盤元','鋼鐵裁剪','鋼筋','鋼鐵製品','螺絲螺帽',];
Cement                 = ['水泥',];
architecture           = ['建設公司','綜合營建公司','營造工程','房地產代銷','裝潢與建材','能源工程','廠房工程','機電工程','資產租賃',]  ;
TraditionalProduction  = ['廢棄物處理','電線電纜','橡膠','玻璃','造紙','表面處理','印刷出版',];
Chemical               = ['天然氣供應','加油站','塑化原料','石化原料','合成樹脂','染料塗料','化學品','塑膠加工','農業化學',];
Transportation         = ['大眾交通','貨櫃航運','散裝航運','貨櫃集散與物流','陸運物流','承攬及報關','飛機維修製造','船維修製造',]
// =========== 個股資訊的按鈕 ===========
ZongPingBaoBiao        = [];
ChanYeFenSi            = [];
GongKaiZiXun           = [];
GuDongBaoChou          = [];
SunIPaoPiao            = [];
TzChanFuJai            = [];
XianJinLiuLiang        = [];
KuaBiauBiLiu           = [];
TungYeBiJiau           = [];
GuZhiMoXing            = [];

// ======================= 左導覽列按鈕實心填滿 =======================
const boxes = document.querySelectorAll('.circle-c');
boxes.forEach(box => {
  box.addEventListener('click', function backgroundClick(event) {
    // 將所有class=circle-c的選單移除active這個class
    boxes.forEach(box => {
        box.classList.remove("active");
    });
    // 按下的按鈕，class 加上 active
    console.log('box clicked', event);
    box.classList.add("active");
  });
});
// ======================== 按鈕按下後文字變色 ========================
function activeTheButton(a){
  const boxes = document.querySelectorAll(a);
  boxes.forEach(box => {
    box.addEventListener('click', function backgroundClick(event) {
      // 將所有選單移除activeButton這個class
      boxes.forEach(box => {
          box.classList.remove("activeButton");
      });
      // 按下的按鈕，class 加上 activeButton
      console.log('box clicked', event);
      box.classList.add("activeButton");
    });
  });
}

// ============== 左側導覽列按鈕全部加上EventListener觸發 ==============
// 不需要左側導覽列的項目 class = buttonType-0
const divDisplay_0 = document.querySelectorAll('.buttonType-0');
divDisplay_0.forEach(div => {
  div.addEventListener('click', box_with_0F) ;
})
// 需要左側導覽列的項目 class = buttonType-1
const divDisplay_1 = document.querySelectorAll('.buttonType-1');
divDisplay_1.forEach(div => {
  div.addEventListener('click', box_with_1F) ;
}) 
// 需要左側導覽列還需要細產業按鈕的項目 class = buttonType-2
const divDisplay_2 = document.querySelectorAll('.buttonType-2');
divDisplay_2.forEach(div => {
  div.addEventListener('click', box_with_2F) ;
})   

dataBox_display="";
// =================================================================
// ====================== 按下的按鈕不需要小導覽列） ====================
// =================================================================
function box_with_0F(event){
  dataBox_display += '<div class="col-lg-12"><div class="dataContainer"></div></div>';
  document.getElementById("dataBox").innerHTML = dataBox_display;
  dataBox_display="";
  id = event.target.id
  box_0F_data(id);
};
// =================================================================
// ========== 按下大盤或個股下拉選單中的選項後觸發（只有左小導覽列） ========
// =================================================================
function box_with_1F(event){
  id = event.target.id ;
  nameIDList = [];
  // 配對按下的按鈕是哪一個
  switch (id) {
    case "DaPanZhiBiao":{nameIDList = DaPanZhiBiao ;break;};
    case "QuanZhiGeGu":{nameIDList = QuanZhiGeGu ;break;};
    case "ShiChangZiXun":{nameIDList = ShiChangZiXun ;break;};
    case "JingJiZhiBiao":{nameIDList = JingJiZhiBiao ;break;};
    case "MaoYiShuJu":{nameIDList = MaoYiShuJu ;break;};
    case "ShangPinHangQing":{nameIDList = ShangPinHangQing ;break;};
    case "GeGuPaiHang":{nameIDList = GeGuPaiHang ;break;};
  }
  dataBox_display += '<!-- 左側小導覽列 --><div class="col-lg-2"><!-- 小尺寸螢幕才出現的選單 --><div class="d-flex justify-content-around d-lg-none"><!-- 第一選單 --><div class="dropdown"><button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">數據類型</button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">';
  // 小尺寸螢幕才出現的選單
  for (var i = 0; i < (nameIDList.length)/2; i++) {
    dataBox_display += '<li><a class="leftnavClass dropdown-item" id="'+nameIDList[i*2+1]+'" href="#">'+nameIDList[i*2]+'</a></li>';
  }   
  dataBox_display += '</ul></div><!-- End 第一選單 --></div><!-- 大尺寸螢幕才出現的選單 --><div class="test d-none d-lg-block">';
  // 大尺寸螢幕才出現的選單
  for (var i = 0; i < (nameIDList.length)/2; i++) {
    dataBox_display += '<a class="leftnavClass ';
    // 第一個按鈕顏色不一樣 class 加上 activeButton 改變文字顏色
    if(i == 0){
      dataBox_display += 'activeButton';
    }
    dataBox_display += '" href="#" id="'+nameIDList[i*2+1]+'"><div class="d-flex justify-content-center alert bgc-b" role="alert">'+nameIDList[i*2]+'</div></a>';
  }       
  dataBox_display += '</div></div><!-- End 左側小導覽列 --><!-- 右側數據區塊 --><div class="col-lg-10"><div class="dataContainer"></div></div><!-- End 右側數據區塊 -->';
  document.getElementById("dataBox").innerHTML = dataBox_display;
  dataBox_display="";
  // 按下按鈕回傳左導覽列第一個項目的ID
  box_1F_data(nameIDList[1]);
  // 左小導覽列出現後，為每個按鈕加上EventListener 並傳遞ID
  const getleftnavClass = document.querySelectorAll('.leftnavClass');
  getleftnavClass.forEach(iCl => {
    iCl.addEventListener('click', function leftnavClassClick(event) {
      console.log('iCl clicked', event);
      box_1F_data(this.id);
    });
  });
  activeTheButton(".leftnavClass");
}
// ==================================================================
// ================== 將小產業按鈕功能從box_with_2F切出來 ===============
// ==================================================================
function F_for_box_with_2F(){
  // 小尺寸螢幕才出現的選單(產業選擇)          
  // 細產業分類的ID
  nameIDList2 = [];
  // 配對按下的按鈕是哪一個
  switch (middleClassID) {
    case "Semiconductor"         :{nameIDList2 = Semiconductor ;break;};
    case "Optoelectronics"       :{nameIDList2 = Optoelectronics ;break;};
    case "Network"               :{nameIDList2 = Network ;break;};
    case "ElectronicParts"       :{nameIDList2 = ElectronicParts ;break;};
    case "CircuitBoard"          :{nameIDList2 = CircuitBoard ;break;};
    case "Computer"              :{nameIDList2 = Computer ;break;};
    case "PowerEnergy"           :{nameIDList2 = PowerEnergy ;break;};
    case "InformationService"    :{nameIDList2 = InformationService ;break;};
    case "ElectronicDistributors":{nameIDList2 = ElectronicDistributors ;break;};
    case "Finance"               :{nameIDList2 = Finance ;break;};
    case "Biotechnology"         :{nameIDList2 = Biotechnology ;break;};
    case "Sports"                :{nameIDList2 = Sports ;break;};
    case "DailyGoods"            :{nameIDList2 = DailyGoods ;break;};
    case "Textile"               :{nameIDList2 = Textile ;break;};
    case "Food"                  :{nameIDList2 = Food ;break;};
    case "GeneralMerchandise"    :{nameIDList2 = GeneralMerchandise ;break;};
    case "HomeAppliances"        :{nameIDList2 = HomeAppliances ;break;};
    case "Automotive"            :{nameIDList2 = Automotive ;break;};
    case "Equipment"             :{nameIDList2 = Equipment ;break;};
    case "ElectricalMachinery"   :{nameIDList2 = ElectricalMachinery ;break;};
    case "Steel"                 :{nameIDList2 = Steel ;break;};
    case "Cement"                :{nameIDList2 = Cement ;break;};
    case "architecture"          :{nameIDList2 = architecture ;break;};
    case "TraditionalProduction" :{nameIDList2 = TraditionalProduction ;break;};
    case "Chemical"              :{nameIDList2 = Chemical ;break;};
    case "Transportation"        :{nameIDList2 = Transportation ;break;};
  }
  // 小尺寸螢幕才出現的細產業分類
  for (var i = 0; i < nameIDList2.length; i++) {
    dataBox_display += '<li><a class="smallClass dropdown-item" id="'+middleClassID+(i+1)+'" href="#">'+nameIDList2[i]+'</a></li>';
  }
  document.getElementById("smallClass2Fneed1").innerHTML = dataBox_display;
  dataBox_display = "";
  // 大尺寸螢幕才出現的細產業分類
  for (var i = 0; i < nameIDList2.length; i++) {
    dataBox_display += '<a class="me-1" href="#"><div class="smallClass '
    // 第一個按鈕顏色不一樣 class 加上 activeButton 改變文字顏色
    if(i == 0){
      dataBox_display += 'activeButton '
    }
    dataBox_display += 'd-flex justify-content-center p-2 alert bgc-b" id="'+middleClassID+(i+1)+'">'+nameIDList2[i]+'</div></a>'
  }
  document.getElementById("smallClass2Fneed2").innerHTML = dataBox_display;
  dataBox_display = "";
  // 小產業分類設定好後，再小產業按鈕加上EventListener 並儲存按鈕ID
  const iClassS = document.querySelectorAll('.smallClass');
  iClassS.forEach(iCl => {
    iCl.addEventListener('click', function ClassClickS(event) {
      console.log('iCl clicked', event);
      smallClassID = this.id;
      box_2F_data(smallClassID,IndustryID);
    });
  });
  activeTheButton(".smallClass");
}
// =================================================================
// =========== 按下產業資訊下拉選單中的選項後觸發 ========================
// =================================================================
function box_with_2F(event){
  id = event.target.id ;
  // 儲存按下的下拉選單的ID
  IndustryID = id;
  dataBox_display += '<!-- 左側小導覽列 --><div class="col-lg-3 col-xxl-2"><!-- 小尺寸螢幕才出現的選單 --><div class="d-flex justify-content-around d-lg-none"><!-- 第一選單 --><div class="dropdown"><button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">中產業選擇</button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">'
  // 小尺寸螢幕才出現的選單(數據類型)
  for (var i = 0; i < (ChanYeTzShiun.length)/2; i++) {
    dataBox_display += '<li><a class="midleClass dropdown-item industry-class" id="'+ChanYeTzShiun[i*2+1]+'" href="#">'+ChanYeTzShiun[i*2]+'</a></li>';
  }          
  dataBox_display += '</ul></div><!-- End 第一選單 --><!-- 第二選單 --><div class="dropdown"><button class="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">細產業選擇</button><ul class="dropdown-menu" id="smallClass2Fneed1" aria-labelledby="dropdownMenuButton1">'

  dataBox_display += '</ul></div><!-- End 第二選單 --></div><!-- 大尺寸螢幕才出現的選單 --><div class="d-none d-lg-flex"><div>'
  // 大尺寸螢幕才出現的選單
  count_ind = 0;
  // 中產業分類第一排
  for (var i = 0; i < (ChanYeTzShiun.length)/4; i++) {
    dataBox_display += '<a class="midleClass '
    // 第一個按鈕顏色不一樣 class 加上 activeButton 改變文字顏色
    if(i == 0){
      dataBox_display += 'activeButton'
    }
    dataBox_display += '" href="#" id="'+ChanYeTzShiun[i*2+1]+'"><div class="d-flex justify-content-center alert bgc-b" role="alert">'+ChanYeTzShiun[i*2]+'</div></a>';
    count_ind = i;
  }
  dataBox_display += '</div><div class="ms-2">'
  // 中產業分類第二排
  for (var i = count_ind+1; i < (ChanYeTzShiun.length)/2; i++) {
    dataBox_display += '<a class="midleClass" href="#" id="'+ChanYeTzShiun[i*2+1]+'"><div class="d-flex justify-content-center alert bgc-b" role="alert">'+ChanYeTzShiun[i*2]+'</div></a>';
  }
  dataBox_display += '</div></div></div><!-- End 左側小導覽列 --><!-- 右側數據區塊 --><div class="col-lg-9 col-xxl-10"><!-- 小產業分類 大尺寸螢幕才出現 --><div class="d-none d-lg-flex flex-wrap" id="smallClass2Fneed2">'
  
  dataBox_display += '</div><div class="dataContainer"></div></div><!-- End 右側數據區塊 -->'
  document.getElementById("dataBox").innerHTML = dataBox_display;
  dataBox_display = "";
  F_for_box_with_2F();
  // 中產業分類設定好後，再中產業按鈕加上EventListener 並儲存按鈕ID
  const iClassM = document.querySelectorAll('.midleClass');
  iClassM.forEach(iCl => {
    iCl.addEventListener('click', function ClassClickM(event) {
      console.log('iCl clicked', event);
      middleClassID = this.id;
      smallClassID = middleClassID+"1";
      F_for_box_with_2F();
      box_2F_data(smallClassID,IndustryID);
    });
  });
  box_2F_data(smallClassID,IndustryID);
  activeTheButton(".midleClass");
}

// ====================按下按鈕觸發內容填入======================
// 在各個會觸發的案扭上加上class="buttonType- 0~2 "
// 依照類型觸發3種不同的 Ｆ（）
// ===========================類型0===========================
function box_0F_data(ID){
  switch (ID) {
    // 首頁
    case "Forpa"        :{alert(ID);break;};
    // 產業漲跌
    case "ChanYeJangDie":{alert(ID);break;};
    // 國際股市
    case "GuoJiGuShi"   :{alert(ID);break;};
  }
}
// ===========================類型1===========================
function box_1F_data(ID){
  switch (ID) {
    // =========大盤指標========
    // 大盤營收
    case "D1dr":{alert(ID);break;};
    // 營收年增
    case "D1rg":{alert(ID);break;};
    // 大盤評價
    case "D1dv":{alert(ID);break;};
    // 漲跌停數
    case "D1ud":{alert(ID);break;};
    // =========權值個股========
    // 市值Top10
    case "Q1t1":{alert(ID);break;};
    // 市值Top20
    case "Q1t2":{alert(ID);break;}
    // 市值Top30
    case "Q1t3":{alert(ID);break;}
    // 市值Top40
    case "Q1t4":{alert(ID);break;}
    // 市值Top50
    case "Q1t5":{alert(ID);break;}
    // =========市場資訊========
    // 新股上市上櫃
    case "S1ns":{page_change(ID);break;}
    // 董監持股轉讓
    case "S1is":{page_change(ID);break;}
    // 異常推介個股
    case "S1ss":{page_change(ID);break;}
    // 注意處置股票
    case "S1as":{page_change(ID);break;}
    // 分盤交易股票
    case "S1sb":{page_change(ID);break;}
    // 除權除息預告
    case "S1dp":{page_change(ID);break;}
    // 今日重大訊息
    case "S1tb":{page_change(ID);break;}
    // 公司自結盈餘
    case "S1ce":{page_change(ID);break;}
    // =========經濟指標========
    // 經濟成長
    case "J1ag":{alert(ID);break;}
    // 採購經理人
    case "J1cb":{alert(ID);break;}
    // 國民所得
    case "J1cs":{alert(ID);break;}
    // 物價指數
    case "J1gp":{alert(ID);break;}
    // 貨幣供給
    case "J1ms":{alert(ID);break;}
    // 國際匯率
    case "J1gc":{alert(ID);break;}
    // =========個股排行========
    // 營收成長
    case "G1rg":{alert(ID);break;}
    // 外資買賣
    case "G1ft":{alert(ID);break;}
    // 投信買賣
    case "G1tb":{alert(ID);break;}
    // 股價漲幅
    case "G1su":{alert(ID);break;}
    // 成交量
    case "G1sv":{alert(ID);break;}
    // 殖利率
    case "G1dr":{alert(ID);break;}
  }
}
// ===========================類型2===========================
function box_2F_data(ID,father_ID){
  switch (father_ID) {
    // 營收股價
    case "YingShouGuJia"  :{alert(father_ID+"的"+ID);break;};
    // 營收總覽
    case "YingShouZongLan":{alert(father_ID+"的"+ID);break;};
    // 漲跌總覽
    case "JhangDieZongLan":{alert(father_ID+"的"+ID);break;};
    // 產業指數
    case "ChanYeJrShu"    :{alert(father_ID+"的"+ID);break;};
    // 個股股價
    case "GeGuGuJia"      :{alert(father_ID+"的"+ID);break;};
    // 彙總報表
    case "HuiZongBaoBiao" :{alert(father_ID+"的"+ID);break;};
    // 本益總覽
    case "BenYiZongLan"   :{alert(father_ID+"的"+ID);break;};
    // 股利總覽
    case "GuLiZongLan"    :{alert(father_ID+"的"+ID);break;};
    // 產業地圖
    case "ChanYeDiTu"     :{alert(father_ID+"的"+ID);break;};
    // 價值池
    case "JiaJrChr"       :{alert(father_ID+"的"+ID);break;};
    // 產業新聞
    case "ChanYeSinWun"   :{alert(father_ID+"的"+ID);break;};
  }
}











