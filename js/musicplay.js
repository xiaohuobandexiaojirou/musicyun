$(function(){
	if($("#playbtn").hasClass("pause")){//播放状态
		musicPlay();
	}else{//暂停状态
		musicPause();
	}
	$("#topBack").find(".title").html($("#music").find(".title").html())
	$("#topBack").find(".singer").html($("#music").find(".name").html())
	$("#musicplay").find(".singerimg").attr("src",$("#music").find(".leftimg").attr("src"))
})
//------返回键--------
function getBack(){
	$("#topBack").find(".left .backimg").click(function(){
		router("music");
		$("#music").show()
	})
}
getBack();
//------播放按钮控制-------------------
$(".playcontrol").click(function(ev){
	console.log("click");
	getCurTime();
	ev.stopPropagation;
	if($(this).hasClass("play")){
		musicPlay();
	}else{
		musicPause();
		clearInterval(timer)
	}
})
//-------设置当前播放时间----------------
var myAudio=document.getElementById("audio")
function getCurTime(){ 
	console.log(myAudio.currentTime);
} 

function setCurTime(){ 
	myAudio.currentTime =30;
} 
//-----进度拖拽---------------------
function Drag(){
	
}
Drag();
//--下一首播放---
$(".nextBtn").click(function(){
	$.ajax({
			type:"get",
//			url:this.sevece+"id",//网络请求的id
			url:"data/playlist.json",
//			url:"mp3/wu.mp3",
			async:true,
			success:function(data){
				var list=data.playlist.tracks;
				index+=1;
				var newId=list[index].id;
				console.log(newId);
				mControler.play(newId);
			}
	});
})
//--上一首播放---
$(".upBtn").click(function(){
	$.ajax({
			type:"get",
//			url:this.sevece+"id",//网络请求的id
			url:"data/playlist.json",
//			url:"mp3/wu.mp3",
			async:true,
			success:function(data){
				var list=data.playlist.tracks;
				index-=1;
				var newId=list[index].id;
				console.log(newId);
				mControler.play(newId);
			}
	});
})
//----歌词--------------------------
function getlrc(){
	//----点击看歌词-------------------------
	$("#musicplay").find(".text a").click(function(){
		$("#musicplay").find(".imgs").hide();
		$(this).hide();
		$("#musicplay").find(".text .texts").show();
	});
	$("#musicControl").find(".likeicon .likecheck").click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	})
}
getlrc();