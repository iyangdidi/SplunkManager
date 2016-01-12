// vim: set et sw=4 ts=4 sts=4 fdm=marker ff=unix fenc=utf8 nobomb:
/**
 * popdrop.js
 *
 * @author xinsea
 * @date   2011-10-22
 * @link   http://www.xinsea.com/
 */

function qzz_popdrop(D) {
    var B = $("." + D), timer;
    B.live("mouseover", function () {
        if (timer) {
            window.clearTimeout(timer);
        }
        $(this).addClass("over");
    }).live("mouseout", function () {
        var self = $(this);
        timer = window.setTimeout(clearclass, 0);  //增加延时，防止下拉区域闪烁
        function clearclass() {
            self.removeClass("over");
        }
    });

    
    
//    if ($.browser.msie) {
//        alert("hello");
//        B.hover(function () {

//            alert("hello");
//            $(this).addClass("over")
//        }, function () {
//            $(this).removeClass("over")
//        })
//    } else {
//        B.mouseover(function(){
//            $(this).addClass("over")
//        }).mouseout(function(){
//            $(this).removeClass("over")
//        })
//    }
}

$(document).ready(function() {
    qzz_popdrop("dropmenu");
});