$(function(){
	
	
	function getCatlist(){
		
	}
	$.ajax({
		url:"data/new_file.json",
		success:function(data){
			console.log(data.playlist.tracks)
			list=data.playlist.tracks;
			var $songlist=$("#songlist")
			var item=$(".songlist").html();
			for(var i=0;i<list.length;i++){
				var $item=$(item);
				$item.find("span").html(list[i].v+"万")
				$item.find("img").attr('src',list[i].al.picUrl)
				$item.find("p").html(list[i].al.name);
				$item.find("a").attr("href","#detail?id="+list[i].id).
				click(function(){
					router("detail2")
				})
				$songlist.append($item)
			}
		}
	});
})
