(function ($) {
    $.extend({
        /*****************************
        ** loading 函数
        *****************************/
        dwLoad: function (opts) {
            var mypath = $.dwGetPath();
            var settings = {
                id: "dwloadbody",
                bodycss: "dwloadbody",
                maskcss: "dwloadmask",
                loadcss: "dwloaddiv",
                loadimg: mypath + "images/Loading.gif",
                txtcss: "dwloadtxt",
                loadtxt: "",
                loadtime: 0,
                timeout: "reload",
                toreloadmsg: "超时时间已到！\r\n\r\n【您需要重新刷新页面吗？】\r\n\r\n按“确定”刷新本页，按“取消”继续等待！    ",
                toclosemsg: "超时时间已到！\r\n\r\n【您确认关闭当前窗口吗？】\r\n\r\n”按“确定”关闭窗口，按“取消”继续等待！    "
            };
            var para = {};
            $.extend(settings, opts || {});
            var divload = dwIniLoad();
            var l = { loading: function () {
                var beforeshow, aftershow, arg, n;
                arg = arguments;
                if (arg.length <= 0) {
                    beforeshow = settings.beforeshow;
                    aftershow = settings.aftershow;
                    n = parseInt(settings.loadtime);
                } else {
                    $.extend(para, arg[0] || {});
                    beforeshow = arg[0].beforeshow;
                    aftershow = arg[0].aftershow;
                    n = parseInt(arg[0].loadtime);
                }
                if (typeof (beforeshow) == "function") {
                    beforeshow();
                }
                //						alert(divload.html());
                divload.show();
                if (typeof (aftershow) == "function") {
                    aftershow();
                }
                if (!isNaN(n) && n > 0) {
                    setTimeout(function () { dwLoadTimeout(); }, 1000 * n);
                }
            },
                loadend: function () {
                    if (arguments.length <= 0) {
                        divload.hide();
                    } else {
                        var beforehide, afterhide;
                    }
                }
            };
            return l;

            //内部函数，初始化loading图层.
            function dwIniLoad() {
                var s = settings;
                var divload = $("#" + s.id);
                if (divload.length <= 0) {
                    strload = "<div id=\"ID\" class=\"CLASS1\"><div class=\"CLASS3\"><img src=\"IMGSRC\" alt=\"loading\" /><div class=\"TXTCSS\">LOADTXT</div></div><div class=\"CLASS2\"></div><iframe src=\"\" frameborder=\"0\" style=\"position:absolute; top:0px; left:0px; width:100%; height:100%; z-index:-1; opacity:.45;filter: alpha( opacity=45 ); -moz-opacity: 45;\"></iframe></div>";
                    var strReg = /ID|CLASS1|CLASS2|CLASS3|IMGSRC|TXTCSS|LOADTXT/g;
                    strload = strload.replace(strReg,
						function (MatchStr) {
						    switch (MatchStr) {
						        case "ID":
						            return s.id;
						            break;
						        case "CLASS1":
						            return s.bodycss;
						            break;
						        case "CLASS2":
						            return s.maskcss;
						            break;
						        case "CLASS3":
						            return s.loadcss;
						            break;
						        case "IMGSRC":
						            return s.loadimg;
						            break;
						        case "TXTCSS":
						            return s.txtcss;
						            break;
						        case "LOADTXT":
						            return s.loadtxt;
						            break;
						        default:
						            break;
						    }
						}
					);
                    divload = $(strload);
                    divload.appendTo("body").hide();
                    if ($("div.dwloadbody").height() == 0) {
                        $("div.dwloadbody").height(document.documentElement.clientHeight);
                    }
                }
                return divload;
            } //dwIniLoad end

            //超时处理
            function dwLoadTimeout() {
                var t;
                t = (typeof (para.timeout) == "function") ? para.timeout : settings.timeout;
                if (typeof (t) == "function") {
                    t();
                } else if (typeof (t) == "string") {
                    switch (t) {
                        case "close":
                            if (confirm(settings.toreclosemsg)) {
                                window.top.close();
                            }
                            break;
                        default:
                            if (confirm(settings.toreloadmsg)) {
                                window.location.href = window.location.href;
                            }
                            break;
                    }
                }
            } //dwLoadTimeout end
        }, //dwLoad end
        /*****************************
        ** loading 函数
        *****************************/
        dwGetPath: function () {
            var s = $("script");
            var re = "", _reg = /scripts\/loadingproc\.(min\.)?js/ig;
            s.each(function (i) {
                var src = $(this).attr("src");
                if (_reg.exec(src)) {
                    re = src.replace(_reg, "");
                    return false;
                } else {
                    re = "";
                }
            });
            return re;
        },
        //*************************************
        //**  动态生成link标签，引用css文件
        //*************************************
        dwSetStyle: function (url) {
            var mypath = $.dwGetPath();
            url = mypath + url;
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", url);
            if (typeof (fileref) != "undefined") {
                //document.getElementsByTagName("head")[0].appendChild(fileref);
                $("head")[0].appendChild(fileref);
            }
        }
    }); //$.extend end

    //生成link标签，插入css引用
    $.dwSetStyle("css/loading.css");
})(jQuery);

(function () {
    $.extend($.fn, {
        mask: function (msg, maskDivClass, winHeight) {
            this.unmask(); // 参数 
            var op = {
                opacity: 0.4,
                z: 10000,
                bgcolor: '#ccc'
            };
            var original = $(document.body);
            var position = {
                top: 0,
                left: 0
            };
            if (this[0] && this[0] !== window.document) {
                original = this;
                position = original.position();
            } // 创建一个 Mask 层，追加到对象中 
            var maskDiv = $('<div class="maskdivgen"> </div>');
            maskDiv.appendTo(original);
            var maskWidth = original.outerWidth();
            if (!maskWidth) {
                maskWidth = original.width();
            }
            var maskHeight = original.outerHeight();
            if (!maskHeight) {
                maskHeight = original.height();
            }
            maskDiv.css({
                position: 'absolute',
                top: position.top,
                left: position.left,
                'z-index': op.z,
                width: maskWidth,
                height: maskHeight,
                'background-color': op.bgcolor,
                opacity: 0
            });
            if (maskDivClass) {
                maskDiv.addClass(maskDivClass);
            }
            if (msg) {
                var msgDiv = $('<div style="position:absolute;border:#6593cf 1px solid; padding:1px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px"><img align="absMiddle" src="../images/ajax-loader16x16.gif"/>&nbsp;' + msg + '</div></div>');
            }else{
                var msgDiv = $('<div style="position:absolute;border:#6593cf 1px solid; padding:1px;background:#ccca"><div style="line-height:24px;border:#a3bad9 1px solid;background:white;padding:2px 10px 2px 10px"><img align="absMiddle" src="../images/ajax-loader16x16.gif"/>&nbsp;</div></div>');
            }
            msgDiv.appendTo(maskDiv);
            var widthspace = (maskDiv.width() - msgDiv.width());
            var heightspace = (maskDiv.height() - msgDiv.height());
            var windowHeight = $(window).height();

            msgDiv.css({
                cursor: 'wait',
                left: (widthspace / 2 - 2)
            });
            var lefts = msgDiv.offset().left;
            if (winHeight) {
                windowHeight = winHeight;
            }
            if (maskDiv.offset().top < windowHeight && (maskDiv.offset().top + maskDiv.height() > windowHeight)) {
                msgDiv.offset({ top: (windowHeight + maskDiv.offset().top - msgDiv.height()) / 2, left: lefts });
            } else {
                msgDiv.css({ top: (heightspace / 2 - 2) });
            }

            maskDiv.fadeIn('fast',
			function () { // 淡入淡出效果 
			    $(this).fadeTo('slow', op.opacity);
			});
            return maskDiv;
        },
        unmask: function () {
            var original = $(document.body);
            if (this[0] && this[0] !== window.document) {
                original = $(this[0]);
            }
            original.find("> div.maskdivgen").fadeOut('slow',
			function () {
			    $(this).remove();
			});
        }
    });
})();
	
