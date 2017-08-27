
mControler={
	sevece:"http://music.126.com/song.php?id=",//通过网络路径找寻歌曲存放点
	play:function(id){
		console.log(id)//传入的对应歌曲的id名
		$.ajax({
			type:"get",
//			url:this.sevece+"id",//网络请求的id
			url:"data/songlist.json",
//			url:"mp3/wu.mp3",
			async:true,
			success:function(data){
				var url=data[id].url;
				$("#audio").attr("src",url)
				musicPlay();
			}
		});
	},
	index:function(i){
		index=i
		console.log("索引值"+index)
	}
}



//----------页面当前记录的歌曲------------------------
$("#audio").attr("src","mp3/wu.mp3");
//------------------------
$("#playbtn").click(function(ev){
	ev.stopPropagation;
	if($(this).hasClass("pause")){
		musicPause();
	}else{
		musicPlay();
	}
})
//--------------------
$("#music").find(".left").click(function(ev){
	router("musicplay");
	$("#music").hide();
})
//--下一首播放---
$(".nextBtn").click(function(){
	index+=1;
	songListactive(index);
	$.ajax({
			type:"get",
//			url:this.sevece+"id",//网络请求的id
			url:"data/playlist.json",
//			url:"mp3/wu.mp3",
			async:true,
			success:function(data){
				var list=data.playlist.tracks;
				var newId=list[index].id;
				console.log(newId);
				mControler.play(newId);
			}
	});
})

