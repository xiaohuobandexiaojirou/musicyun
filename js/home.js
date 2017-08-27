$(function(){
	function getCatlist(n,callback){
		if(checkcache()){//访问缓存
			console.log(n)
			var list=JSON.parse(localStorage.playlists);
			callback(list);
			console.log("访问缓存")
		}else{//访问网络，ajax请求
			$.ajax({
				url:"data/topPlayList.json",
				success:function(data){
//    			console.log(data.playlists)
					var list=data.playlists;
					
					localStorage.playlists=JSON.stringify(data.playlists);
					localStorage.cachetime=new Date().getTime();//得到缓存时间
					callback(list);//调用回调函数
				}
			});
			console.log("访问网络")
		}
	}
	function checkcache(){//检查缓存
		if(!localStorage.playlists){
			return false;
		}
		var time=new Date().getTime();
		var ctime=time-localStorage.cachetime;
//		console.log(ctime)
		if(ctime>5*1000){
			return false
		}else{
			return true
		}
	}
	
	
	getCatlist(9,function loadlist(list){//调用函数并执行回调函数；得到列表数据并赋值
		var $songlist=$(".listsong")
		var item=$(".songlist").html();
		for(var i=0;i<list.length;i++){
			var $item=$(item);
			$item.find("span").html(list[i].playCount)
			$item.find("img").attr('src',list[i].coverImgUrl)
			$item.find("p").html(list[i].name);
			$item.find("a").attr("href","#detail?id="+list[i].id).
			click(function(){
				router("detail")
			})
			$songlist.append($item)
		}
	});
})


