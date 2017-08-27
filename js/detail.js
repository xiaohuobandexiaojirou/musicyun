var id=getUrlParams().id
console.log("歌单id："+id)

//var url="http:music.126.com/songlist.php?id="+id         这才是网络json数据
function getlist(callback){
	$.ajax({
		type:"get",
		url:"data/playlist"+id+".json",
		async:true,
		success:function(data){
			var title=data.playlist.creator;
			var list=data.playlist.tracks;
//			callback(data.playlist.tracks)
//-----------------------------------------------------
			$("#songface").find(".hot").html(title.province)
			$("#songface").find(".faceimg").attr("src",title.avatarUrl)
			$("#songface").find("p").html(title.signature)
			$("#songface").find(".authorimg").attr("src",title.backgroundUrl)
			$("#songface").find(".author").html(title.nickname)
//-----------------------------------------------------
			var $songlist=$("#songlist");
			var item=$(".songlist").html();
			for(var i=0;i<list.length;i++){
//				console.log(list[i].name,list[i].ar[0].name)
				var $item=$(item);
				var music=list[i];
//				console.log($item)
				$item.find(".number").html(i+1)
				$item.find("span").html(list[i].name)
				$item.find("p").html(list[i].ar[0].name);
				$item.data("music",music).click(function(){
					//-------------------------------
					line=0;
					playLiner();
					//--------------------------------------------------------
//					$(this).siblings().find(".number").removeClass("active");
//					$(this).siblings().find("span").removeClass("active");
//					$(this).siblings().find("p").removeClass("active");
//					
//					$(this).find(".number").addClass("active");
//					$(this).find("span").addClass("active");
//					$(this).find("p").addClass("active");
					songListactive($(this).index());
//			  		router("musicplay");
//					console.log($(this).data("music").name,$(this).data("music").ar[0].name)
					$("#music").find(".title").html($(this).data("music").name)
					$("#music").find(".name").html($(this).data("music").ar[0].name)
					$("#music").find(".leftimg").attr("src",$(this).data("music").al.picUrl)
					mControler.play($(this).data("music").id)//播放音乐传入id
					mControler.index($(this).index())//播放音乐传入id
				})
				$songlist.append($item)
			}
		}
	});
}
getlist();
//var item=$(".songlist").html();
//var $item=$(item)
//var text=$item.find("p");
//
//var $text=$(text);
//console.log($text.html())

function getBack(){
	$("#topBack").find(".left .backimg").click(function(){
		router("music")
	})
}
getBack();




