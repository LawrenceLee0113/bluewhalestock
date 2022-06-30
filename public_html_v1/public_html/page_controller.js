function GetUrlVar(VarName) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + VarName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}
var now_leftnavBigID = GetUrlVar("leftnavBigID")
if(now_leftnavBigID==""){
    now_leftnavBigID="INrepB"
}
opencolor('all-BIa',$("#"+now_leftnavBigID).children("a").attr("id"),now_leftnavBigID)
// alert(now_leftnavBigID)
function change_page(now_leftnavBigID){
    history.pushState({now_leftnavBigID}, `Selected: ${now_leftnavBigID}`, `${window.location.pathname}?leftnavBigID=${now_leftnavBigID}`)
}
window.addEventListener('popstate', e => {
    now_leftnavBigID = e.state.now_leftnavBigID
    console.log(e)
    opencolor('all-BIa',$("#"+now_leftnavBigID).children("a").attr("id"),now_leftnavBigID,false)
});