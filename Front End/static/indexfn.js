

// $(document).bind("mobileinit", function(){

//    $(document).bind('pageinit')
//   //apply overrides here
// });


// $('#avatarimg').tap(function(){
//     console.log("avatartouch");


// });


// $('#dogeimg').tap(function(){
//     console.log("dogetouch");
//     $.mobile.changePage("http://jasstest.site44.com/doge.html", { transition: "slideleft" });
    
  
// });


// $('#doge_home').live('swipeleft', function(event){
//     $.mobile.changePage();
// });

// $('#doge_home').live('swipeleft', function(event){

// });




$(document).ready(function(){

    gohome();
    console.log("loaded!");
});

function gohome(){
    
    $("#main_home").show(1000);
    $('#avatar_home').hide(500);
    $('#doge_home').hide(500);
}

$('#avatarimg').click(function(){
  // $("#main_home").animate({Left: 1000}, "slow", function(){
  //    $("#main_home").hide();
  // })

  // $("#avatar_home").animate({Left: 1000}, "slow", function(){
  //    $("#avatar_home").hide();
  // })
    // $.mobile.changePage("doge.html", { transition: "slideleft" }));

    $("#main_home").hide(1000);
    $("#avatar_home").show(1000);
});

$('#dogeimg').click(function(){
     // $.mobile.changePage("doge.html");

    $("#main_home").hide(1000);
    $("#doge_home").show(1000);
});



$('.homebtn').click(function(){
    gohome();
});

/*

index.bind("swipeleft", function(){
      //navigate to next image
      //$.mobile.changePage();
});

index.bind("swiperight", function(){
      //navigate to previous image
      //$.mobile.changePage();
});

*/