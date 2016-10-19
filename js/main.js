// main.js

$("#btn_About").on("click",function(){
    $("#box1").show();
})
$("#btn_People").on("click",function(){
    $("#box2").show();
})
$("#btn_Research").on("click",function(){
    $("#box3").show();
})
$("#btn_News").on("click",function(){
    $("#box4").show();
})
$("#btn_Archives").on("click",function(){
    $("#box5").show();
})

//$("#menu-items-position").on("change", function(e) {
//  $("#main-nav-list").css("justify-content", $(this).find("option:selected").val());
//});
//
//$("#menu-items").on("change", function(e) {
//  $("#main-nav-list li").css("flex", $(this).find("option:selected").val());
//});
//
//$("#show").on("change", function(e) {
//  $("#main-nav").removeClass("outlines").addClass($(this).find("option:selected").val());
//});