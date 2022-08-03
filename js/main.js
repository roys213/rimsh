$(function(){
	var scrollT=0;
	var pageN=0;
	var targetY=0;
	var winHalf;
	var transition=false;
	var categoryFlag=false;

	$(".floating_menu li").eq(pageN).addClass("active");
	$("#header .menu li").eq(pageN).addClass("active");
	$("#start .controller li").eq(pageN).addClass("active");

	$(".fix_tab").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active")){
			$("body").removeClass("fixed");
			$(this).removeClass("active");
			$(".floating_menu").removeClass("active");
		}
		else{
			$("body").addClass("fixed");
			$(this).addClass("active");
			$(".floating_menu").addClass("active");
		}
	});
	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT <= $("#page1").offset().top-winHalf){
			pageN=0;
		}
		else if(scrollT <= $("#page2").offset().top-winHalf){
			pageN=1;
		}
		else if(scrollT <= $("#page3").offset().top-winHalf){
			pageN=2;
		}
		else if(scrollT <= $("#page4").offset().top-winHalf){
			pageN=3;

			if((scrollT+$(window).height()) == $(document).height()){
				pageN=4;
			}
		}
		else{
			pageN=4;
		}

		$(".floating_menu li").removeClass("active");
		$(".floating_menu li").eq(pageN).addClass("active");
		$("#header .menu li").removeClass("active");
		$("#header .menu li").eq(pageN).addClass("active");
		$("#start .controller li").removeClass("active");
		$("#start .controller li").eq(pageN).addClass("active");

		if(pageN == 1 || pageN == 3){
			$("#start .controller").addClass("dark");
			$("#header .menu").addClass("dark");
			$(".logo").addClass("dark");
			$(".fix_tab").addClass("dark");
		}
		else{
			$("#start .controller").removeClass("dark");
			$("#header .menu").removeClass("dark");
			$(".logo").removeClass("dark");
			$(".fix_tab").removeClass("dark");
		}

		if(categoryFlag){
			return;
		}
		else{
			if(pageN == 0){
				$("#header").addClass("active");
			}
			else{
				$("#page"+pageN).addClass("active");

				if(pageN == 4){
					categoryFlag=true;
				}
			}
		}
	});
	$(window).resize(function(){
		winHalf=$(window).height()/2;
		$(window).trigger("scroll");
	});
	$(window).trigger("resize");

	$("#header .menu li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}

		$("html").animate({"scrollTop":targetY}, 300);
	});
	$(".floating_menu li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top;
		}

		transition=true;
		$("body").removeClass("fixed");
		$(".fix_tab").removeClass("active");
		$(".floating_menu").removeClass("active");
	});
	$(".floating_menu").on("transitionend", function(){
		if($(this).hasClass("active") == false && transition){
			transition=false;
			$("html").animate({"scrollTop":targetY}, 300);
		}
	});

	// video 관련문
	var count=0;
	var videoUrl=["video1", "video2", "video3"];
	var svgOffset=[21, 49, 77];
	var videoTotal=videoUrl.length-1;
	var videoN=0;
	var videoPath="";
	var video=document.getElementById("my_video");
	video.muted=true;
	videoInterface();
	v_controllerInterface();

	function videoInterface(){ 
		// video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src:videoPath});
		$("#my_video").hide().css({opactiy:0});
		video.play();
		videoDimmed();
	}
	function videoDimmed(){
		$("#my_video").hide().css({opacity:0});

		setTimeout(function(){
			$("#my_video").show().animate({opacity:1}, 300);
		}, 500);
	};
	function v_controllerInterface(){ 
		$("#start .v_controller").removeClass("active");
		$("#start .v_controller .count li").removeClass("active");
		$("#start .v_controller .count li").eq(videoN).addClass("active");
		$("#start .v_controller svg").css({left:svgOffset[videoN]});

		setTimeout(function(){
			$("#start .v_controller .num").html("<span>"+(videoN+1)+"</span> / "+videoUrl.length);
			$("#start .v_controller").addClass("active");
		}, 80);
	}
	video.addEventListener("ended", function(){
		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}
		videoInterface();
		v_controllerInterface();
	});
	$(".v_controller .prev").click(function(e){
		e.preventDefault();

		if(videoN > 0){
			videoN--;
		}
		else{
			videoN=videoTotal;
		}
		videoInterface();
		v_controllerInterface();
	});
	$(".v_controller .next").click(function(e){
		e.preventDefault();

		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}
		videoInterface();
		v_controllerInterface();
	});

	$("#project1").addClass("active");

	$(".project .title").click(function(e){
		var portY;
		e.preventDefault();
		$(".project").removeClass("active");
		$(this).parents(".project").addClass("active");
		portY=$(this).parents(".project").offset().top;
			$("html").animate({scrollTop : portY}, 800);
	});
});