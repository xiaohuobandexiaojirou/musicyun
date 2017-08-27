$(function(){
	router("home",$("#deslist"));
	$("#v1").click(function(){
		$("nav ul li").removeClass("active")
		$(this).addClass("active")
		router("home",$("#deslist"))
	});
	$("#v2").click(function(){
		$("nav ul li").removeClass("active")
		$(this).addClass("active")
		router("songlist",$("#deslist"))
	});
	$("#v3").click(function(){
		$("nav ul li").removeClass("active")
		$(this).addClass("active")
		router("ranking",$("#deslist"))
	});
	$("#v4").click(function(){
		$("nav ul li").removeClass("active")
		$(this).addClass("active")
		router("songer",$("#deslist"))
	});
});
//===================
$(".searchbtn").click(function(){
	router("search");
	$("#music").hide();
})
