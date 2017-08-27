function getBack(){
	$("#searchItem").find(".formtext .backimg").click(function(){
		router("music");
		$("#music").show()
	})
}
getBack();
//通过历史热门记录快速搜索
function getSearch(){
	$("#searchpoint").find("ul li").click(function(){
		$("#searchItem").find(".searchthing").val($(this).text())
	})
};
getSearch()
