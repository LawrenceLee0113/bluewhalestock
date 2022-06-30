$(document).ready(function () {
    $("#login_btn").click(function (e) { 
        e.preventDefault();
        $(".container").show();
    });
    $(".cancel_btn").click(function (e) { 
        e.preventDefault();
        $(".container").hide();
    });
});