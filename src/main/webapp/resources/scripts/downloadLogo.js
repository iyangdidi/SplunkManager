
function loadDownloadLogo(){
	document.writeln("<div id='download_logo' style='width:250px; height:120px; padding-right:10px; position:relative; top:400px; z-index:99'>");
	//document.writeln('<img src="images/home/downloadLogo.png">');
//	document.writeln("<p style='position:absolute; right:9px; top:1px; padding:0 2px;'><a href='javascript:void(0);' onclick='document.getElementById(\"download_logo\").style.display=\"none\";'><img src='images/close.gif' alt='关闭' border='0'><\/a><\/p>");	
	//document.writeln("<a href='' target='_blank' style='text-decoration:none;'>");
	document.writeln('<img  border=0 src="images/home/downloadLogo.png" style="padding-left:11px; width:250px; height:120px;">');
	document.writeln("<div style=' margin-top:-80px; padding-left:40px; padding-bottom:0px;' id='ewm_div'>");
	document.writeln("<span style=' padding-left:3px;'><a href='' border='0px'><img src='images/home/downApple.png' border='0' style='width:40%; height:40%;'><\/a><\/span>");
	document.writeln("<span style=' padding-left:20px'><a href=''><img src='images/home/downAndroid.png' border='0' style='width:40%; height:40%;'><\/a><\/span>");
	document.writeln("<\/div>");
	//document.writeln("<\/a>");
	document.writeln("<\/div>");
}
function scrollx(p) {
    var d = document,
    dd = d.documentElement,
    db = d.body,
    w = window,
    o = d.getElementById(p.id),
    ie6 = /msie 6/i.test(navigator.userAgent),
    style,
    timer;
    if (o) {
        o.style.cssText += ";position:" + (p.f && !ie6 ? 'fixed': 'absolute') + ";" + (p.l == undefined ? 'right:20px;': 'left:' + p.l + 'px;') + (p.t != undefined ? 'top:' + p.t + 'px': 'bottom:0');
        if (p.f && ie6) {
            o.style.cssText += ';left:expression(documentElement.scrollLeft + ' + (p.l == undefined ? dd.clientWidth - o.offsetWidth: p.l) + ' + "px");top:expression(documentElement.scrollTop +' + (p.t == undefined ? dd.clientHeight - o.offsetHeight: p.t) + '+ "px" );';
            dd.style.cssText += ';background-image: url(about:blank);background-attachment:fixed;';
        } else {
            if (!p.f) {
                w.onresize = w.onscroll = function() {
                    clearInterval(timer);
                    timer = setInterval(function() {
                        var st = (dd.scrollTop || db.scrollTop),
                        c;
                        c = st - o.offsetTop + 400;
                        if (c != 0) {
                            o.style.top = o.offsetTop + Math.ceil(Math.abs(c) / 10) * (c < 0 ? -1 : 1) + 'px';
                        } else {
                            clearInterval(timer);
                        }
                    },
                    10)
                }
            }
        }
    }
}
loadDownloadLogo();
scrollx({
    id: 'download_logo'
})
$(function(){
        var maxSize = 1230;
        var d = document;
        o = d.getElementById('download_logo');
        var body = d.documentElement || d.body;
        if (!body) {
        return;
        }
        var width = body.offsetWidth;
        if (width < maxSize) {
        o.style.display = 'none';
        } else {
        o.style.display = 'block';
        }
	$("#ewm_div").mouseover(function(){
		//$(this).css("background", "#ccc");
	}).mouseout(function(){
		//$(this).css("background", "#fff");
	});
    $(window).resize(function() {
        var d = document;
        o = d.getElementById('download_logo');
        var body = d.documentElement || d.body;
        if (!body) {
        return;
        }
        var width = body.offsetWidth;
        if (width < maxSize) {
        o.style.display = 'none';
        } else {
        o.style.display = 'block';
        }
        });
});
