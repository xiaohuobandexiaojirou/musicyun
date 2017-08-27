var timer;//进度条timer
var index;
function fontSize(){
		document.documentElement.style.fontSize=document.documentElement.clientWidth/3.2+"px";
	};
	fontSize();
	window.onload=fontSize;
	window.onresize=fontSize;
	

function getUrlParams(){
		var theurl=window.location.href;
		console.log(theurl)
		var arr=theurl.split("?");
		var prr=arr[1].split("&");
		var params={};
		for(var i=0;i<prr.length;i++){
			var kv=prr[i].split("=");
			console.log(kv)
			params[kv[0]]=kv[1];//对象赋值

		}
			console.log('这个实'+params);
			return params;
		
};
//getUrlParams();
function getUrlmsParams(){
		let url=window.location.href;
		console.log(url);
		let arr=url.split("#");
		if(arr.length==2){
			let prr=arr[1].split("?");
			console.log(prr);
			let m=prr[0];
		}else{
			console.log(404)
		}
		return m;
}
console.log(getUrlmsParams());
//路由封装
function router(m,$container){
	$container=$container||$("#share");
	$.ajax({
		url:"views/"+m+".html",
		success:function(data){
			console.log("ok")
			$container.html(data);
			getjs(m);
		}
	})
};

function getjs(m){
	$.ajax({
		url:"js/"+m+".js",
	})
}

var m=getUrlmsParams();
router(m);

$(function(){
	if(!localStorage.count){
		localStorage.count=0;
	}
	localStorage.count++;
	if(localStorage.count==1){
		router("hello");
	}else{
		router("music");
		router("audio",$("#globel"))
	}
	
	
	
})


//-----音乐播放情况------------------------------
function musicPlay(){
		playLiner();
		console.log("播放")
		$("#audio").get(0).play();//音乐播放
		$("#musicplay").find(".controlimg").removeClass("controls");//唱片播放杆放上去；
		$("#musicplay").find(".leftimg").addClass("leftimgname");//唱片开始旋转；
		$(".playcontrol").removeClass("play")//唱片详情播放键移出play按钮，显示为暂停按钮；
		$("#playbtn").addClass("pause")//播放时按钮显示为暂停按钮
}

//-----音乐暂停情况------------------------------
function musicPause(){
		clearInterval(timer);
		console.log("暂停");
		$("#audio").get(0).pause();//音乐暂停
		$("#musicplay").find(".controlimg").addClass("controls")//唱片播放杆移出来；
		$("#musicplay").find(".leftimg").removeClass("leftimgname");//唱片停止旋转；
		$(".playcontrol").addClass("play")//唱片详情播放键添加play按钮
		$("#playbtn").removeClass("pause")//暂停时按钮显示为播放按钮
		
}

//-----进度条功能------------------------
var line=0;
function playLiner(time){
	//一个容器来存入当前歌词时间，和歌词内容
	var lycList=[];
	$.ajax({//请求这个歌词数据
		type:"get",
		url:"lrc/jilejintu.lrc",//现在先用单一歌词
		async:true,
		success:function(data){
			//运用字符串转换数组方法获取数据；
			var arr=data.split("\n");
			for(var i=0;i<arr.length;i++){
				var a =arr[i].slice(1,9);//歌词时间
				var b =arr[i].slice(10);//歌词内容
				var last=parseFloat(a.slice(3,9));
				var mint=a.slice(0,2);
				if(mint<10){
					var second=parseInt(mint)*60;
					var score=second+last;
				}
				//将数组加入到穿件的对象容器中；
				lycList.push({'time':score,'des':b});
					console.log($("#audio").get(0).currentTime);
			}
			console.log(lycList)
		}
	});
	clearInterval(timer);
	var lydemp="";//用来存储当前显示歌词的容器
	var countline=0;
	timer=setInterval(function(){
		console.log("时间总长度"+$("#audio").get(0).duration);
		console.log("当前时间位置"+parseFloat($("#audio").get(0).currentTime).toFixed(2))
		var nowline=$("#audio").get(0).currentTime
		var n=2.5/$("#audio").get(0).duration;
//		console.log(time)
		line=n*nowline;
		$(".linecontrol").css({"left":line+"rem"});
		for(var i=0;i<lycList.length;i++){
			if(parseFloat($("#audio").get(0).currentTime).toFixed(2)==lycList[i].time){//当得到歌词对应时间时执行
				countline+=-0.15;//歌词上移距离
				console.log($("#musicplay").find(".text p").text());
				lydemp+="<li>"+lycList[i].des+"</li>";//歌词递加
				console.log("当前歌词内容："+lydemp);
				$("#musicplay").find(".text ul li").removeClass("active");//去掉类名
				$("#musicplay").find(".text ul").html(lydemp);//歌词加入
				$("#musicplay").find(".text ul li").eq(i).addClass("active");//加上类名active
				console.log(i);
				$("#musicplay").find(".text ul").css("marginTop",countline+"rem")
			}
		}
		if(line>=2.5){
			clearInterval(timer)
		}
	},10)
}
//------歌单切换状态--------------
function songListactive(id,obj){
	console.log("songList"+id)
	var $songlist=$("#songlist");
		$songlist.find(".number").removeClass("active");
		$songlist.find("span").removeClass("active");
		$songlist.find("p").removeClass("active");
		$songlist.find(".number").eq(id).addClass("active");
		$songlist.find("span").eq(id).addClass("active");
		$songlist.find("p").eq(id).addClass("active");
	
}



