$(function() {
	
	var totalPanels			= $(".scrollContainer").children().size();//5
		
	var regWidth			= $(".panel").css("width");//300
	var regImgWidth			= $(".panel img").css("width");//260
	var regTitleSize		= $(".panel h2").css("font-size");
	var regParSize			= $(".panel p").css("font-size");
	
	var movingDistance	    = 320;
	
	var curWidth			= 350;
	var curImgWidth			= 326;
	var curTitleSize		= "20px";
	var curParSize			= "15px";

	var $panels				= $('#slider .scrollContainer > div');
	var $container			= $('#slider .scrollContainer');

	$panels.css({'float' : 'left','position' : 'relative'});
    
	$("#slider").data("currentlyMoving", false);

	$container
		.css('width', ($panels[0].offsetWidth * $panels.length) +100 )
		.css('left', "-340px");

	var scroll = $('#slider .scroll').css('overflow', 'hidden');//³¬³ö·¶Î§µÄÒþ²Ø
	
	//direction true = right, false = left
	function change(direction) {
	   
	    //if at the first, dont move
		if(direction && !(curPanel+2 < totalPanels)){ 
			$("#left").css('display','none');
		}else{
			$("#left").css('display','');
		}
		if(direction && !(curPanel+1 < totalPanels)){ 	return false; }	
		
		//if at the last panel, dont move
		if((!direction && (curPanel <= 3))) {
			$("#right").css('display','none');
		}else{
			$("#right").css('display','');
		}
		 //if at the last panel, dont move
		if((!direction && (curPanel <= 2))) { return false; }	
        
        //if not currently moving
        if (($("#slider").data("currentlyMoving") == false)) {
            
			$("#slider").data("currentlyMoving", true);
			
			var next         = direction ? curPanel + 1 : curPanel - 1;
			var leftValue    = $(".scrollContainer").css("left");
			var movement	 = direction ? parseFloat(leftValue, 10) - movingDistance : parseFloat(leftValue, 10) + movingDistance;
		
			$(".scrollContainer")
				.stop()
				.animate({
					"left": movement
				}, function() {
					$("#slider").data("currentlyMoving", false);
				});
			
			//returnToNormal("#panel_"+curPanel);
			//growBigger("#panel_"+next);
			
			curPanel = next;
			
			//remove all previous bound functions
			$("#panel_"+(curPanel+1)).unbind();	
			
			//go forward
			$("#panel_"+(curPanel+1)).click(function(){ change(true); });
			
            //remove all previous bound functions															
			$("#panel_"+(curPanel-1)).unbind();
			
			//go back
			$("#panel_"+(curPanel-1)).click(function(){ change(false); }); 
			
			//remove all previous bound functions
			$("#panel_"+curPanel).unbind();
		}
	}
	
	// Set up "Current" panel and next and prev
	//growBigger("#panel_3");	
	var curPanel = 3;
	
	$("#panel_"+(curPanel+1)).click(function(){ change(true); });
	$("#panel_"+(curPanel-1)).click(function(){ change(false); });
	
	//when the left/right arrows are clicked
	$(".right").click(function(){ change(false); });	
	$(".left").click(function(){ change(true); });
	
	$(window).keydown(function(event){
	  switch (event.keyCode) {
			case 13: //enter
				$(".right").click();
				break;
			case 32: //space
				$(".right").click();
				break;
	    case 37: //left arrow
				$(".left").click();
				break;
			case 39: //right arrow
				$(".right").click();
				break;
	  }
	});
	
});