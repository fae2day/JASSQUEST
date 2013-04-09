$(document).ready(function(){
    gohome();
    console.log("loaded!");
});


$('#avatarimg').click(function(){
    $("#main_home").hide();
    $("#avatar_home").show();
});

$('#dogeimg').click(function(){
    $("#main_home").hide();
    $("#doge_home").show();
});



$('.homebtn').click(function(){
    gohome();
});


function gohome(){
    $("#main_home").show();
    $('#avatar_home').hide();
    $('#doge_home').hide();
}