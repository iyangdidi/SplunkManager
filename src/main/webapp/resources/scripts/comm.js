// JavaScript Document
//********************************
//**	通用函数
//********************************
//JSON字符串转JSON对象
function parseObj(strData) {
    return (new Function("return " + strData))();    
}
//判断是否为空，true说明正常，false说明有问题
function CheckNull(input) {
    input = input.replace(/(^\s*)(\s*$)/g, '');
    if (input != "") {
        return true;
    }
    return false;
}
//判断是否为数字
function CheckNum(input) {
    var re = /^[0-9]\d*$/;
    if (re.test(input)) {
        return true;
    }
    return false;
}
//判断非法字符 true 为正常，false则说明有问题
function CheckFormat(input)
{
	var regex = /[<>!#\$%&\^]/;
	if(!regex.test(input))
	{
		return  true;
	}
	return false;
}

function CheckFormat2(input)
{
	var regex = /[<>!#\$%\^]/;
	if(!regex.test(input))
	{
		return  true;
	}
	return false;
}

//**  通用函数结束  **************

//用于计算三个搜索页中divmain的高度，以保证footer居底
function SearchResize(){
	var d, obj, sh;
	d=document.documentElement;
	obj = document.getElementById("divMain");
	sh=d.clientHeight - 178;
	if(obj.clientHeight < sh){
		obj.style.height = sh + "px";
    }
}

//输出BackStage页面的通用样式
function BackStageStyle() {
    var style = "<style type=\"text/css\">html, body {overflow:hidden;} html{ overflow-y:auto; *overflow-y:scroll;}</style>";
    document.write(style);
}

//显示提示信息
//调用：直接调用函数即可，需要显示提示的文本框在class中添加showtip，并添加自定义属性 tip="{w:数字, tip:''}"，按JSON格式书写w：提示框宽度，tip：提示内容，可输入html代码
//示例：<input type="textbox" class="showtip" tip="{w:300, tip:'这是一个示例！'}" />
function ShowTip(){
    $(".showtip").dwShowTip();
}

// 根据指定类型获取数据库集合
// dbType:china/chinaNoSQ/foreign/alldb
function getdbByType(dbType) {
    var systemInfo = Storage_SystemInfo();
    var dbset = "";
    var systemdb = [];
    var cnarray = [], foreignarray = [];
    cnarray = systemInfo.CNArray;
    foreignarray = systemInfo.ForeignArray;
    switch (dbType) {
        case "china":
            dbset = systemInfo.CNArray.join(",");
            break;
        case "chinaNoSQ":
            var dbInfo = CNArray;
            var index = cnarray.indexOf("FMSQ");
            if (index >= 0) cnarray.splice(index, 1);
            dbset = cnarray.join(",");
            break;
        case "foreign":
            dbset = systemInfo.ForeignArray.join(",");
            break;
        case "alldb":
            dbset = systemInfo.ForeignArray.join(",") + "," + systemInfo.CNArray.join(",");
            break;
        default: dbset = "nodb";
    }
    return dbset;
}

//根据下拉更改文本框的提示信息
function SetSelTip(){
	var sels = $("select.sel");
	sels.dwSelTip();
}

//隐藏ie6下的swf
function hideswf() {
    if (($.browser.msie && $.browser.version == '6.0') || ($.browser.msie && $.browser.version == '7.0')) {
        //2012-12-25
        //解决ie6，ie7下swf隐藏问题yuiswf一个界面有可能有好多个，yuiswf后面的数字会变，
        //应用正则匹配解决yuiswf变化问题
        var itemswf2;
        var itemswf = $("object");
        var itemswfId = $(itemswf).attr("id");
        var reg = new RegExp("^yuiswf\\d*$");
        if (reg.test(itemswfId)) {
            $(itemswf).width(0).height(0);
        }
    }
}


//tab切换函数
function FucTab(callback) {
    $(".tab").each(function () {
        var target = $(this);
        var tabsa = target.find("div.tabtitle a");
        var tabconts = target.find("div.tabbody div.tabcontent");
        tabsa.each(function (_i) {
            $(this).click(function () {
                tabsa.removeClass("tabchecked").eq(_i).addClass("tabchecked");
                tabconts.hide().eq(_i).show();
                if (typeof (callback) == "function") {
                    callback();
                }
            });
        });
    });
}

//折叠显示指定区域（表格检索）
//{handle:"", target:""}，参数允许多个
function FucCollapse() {
    var arg = arguments;
    var para = { coltxt: "收起", exptxt: "展开", colclass: "colmoref" };
    var _handle, _target;

    for (var i = 0; i < arg.length; i++) {
        _handle = $(arg[i].handle);
        _target = $(arg[i].target);
        fuccol(i, _handle, _target);
    }
    //内部函数
    function fuccol(idx, han, tar) {
        //根据ClientStorage初始化
        han.toggle(
            function () {
                tar.show();
                han.removeClass(para.colclass).attr("title", para.coltxt);
                $(this).blur();
                return false;
            },
            function () {
                tar.hide();
                han.addClass(para.colclass).attr("title", para.exptxt);
                $(this).blur();
                return false;
            }
        );
    };
    //改变状态，并将状态保存到ClientStorage
    function collapse(h, t) {
        //alert(f);
        if (f) {
            t.show();
            h.removeClass(para.colclass).attr("title", para.coltxt);
        } else {
            t.hide();
            h.addClass(para.colclass).attr("title", para.exptxt);
        }
        //保存状态
    };
}

//jiahh 这个方法应该做成同步执行的
function checkVersion(localVersion, layer) {
    // 默认是第一层
    var Curlayer = 1;
    var versionUrl = Comm_UrlLayerPath() + "client/version.aspx?time=" + new Date();
    $.ajax({
        type: "post",
        url: versionUrl,
        async: false ,
        success: function (serverVersion) {
            var data = serverVersion.split('|');
            if (data != null) {
                if (data[0] != localVersion) {
                    window.location.reload();
                }
            }
        }
    });
}
function Comm_UrlLayerPath() {
    var s = $("script");
    var re = "", _reg = /scripts\/jquery-\d\.\d\.\d\.(min\.)?js/ig;
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
}


function checkVersionYUI(localVersion) {
    callback = {
        success: function (sender) {
            var serverVersion = sender.responseText;
            var data = serverVersion.split('|');
            if (data != null) {
                // 首页的最新数据情况隐藏
                //if ($("#idHomeInfo").length > 0 && data.length >= 2) {
                //    $("#idHomeInfo").html(data[1]);
                //}
                if (data[0] != localVersion) {
                    window.location.reload();
                }
            }
        },
        failure: function (sender) {
        }
    };
    var obj = YAHOO.util.Connect.asyncRequest('POST', Comm_UrlLayerPath() + "client/version.aspx", callback, null);
}

function HomeFav(opts) {
    var ie, ff = navigator.userAgent.indexOf("Firefox") > 0;
    var para = { home: "", fav: "", url: "http://www.innojoy.com", title: "专利搜索引擎" };
    var btnhome, btnfav;
    para = $.extend(para, opts || {});
    btnhome = $(para.home);
    btnfav = $(para.fav);


    //判断ie及版本
    var ie = (function () {
        var undef,
             v = 3,
             div = document.createElement('div'),
             all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
        return v > 4 ? v : undef;
    } ());

    btnhome.bind("click", function () {
        setHome(this);
        this.blur();
        return false;
    });

    if (ff) {
        btnfav.attr({
            "rel": "sidebar",
            "href": para.url,
            "title": para.title
        });
    }
    btnfav.bind("click", function () {
        this.blur();
        return addFav(this);
    });

    function setHome(obj) {
        try{
            obj.style.behavior='url(#default#homepage)';
            obj.setHomePage(para.url);
        } catch (e) {
            alert("您的浏览器不支持自动设置主页，请使用浏览器菜单手动设置。");
        }
    }

    function addFav(obj) {
        //alert(ie);
        if (ie) {
            window.external.addFavorite(para.url, para.title);
            return false;
        } else if (ff) {
            return true;
        } else {
            alert("您的浏览器不支持自动添加收藏，请使用浏览器菜单手动添加。");
            return false;
        }
    }
}

//折叠左边栏（检索结果页）

/*  quan于 2012-11-20 注册这部分
function puckerbar(opt) {
    var bar = $("#bathandle"), global;
    global = $.extend({}, opt || {});

    if (bar.length) {

        bar.click(function () {
            var listBox = $(".infolist");
			var treeBox = $(".subbar");
			var listBoxWidth = $(listBox).width();
            if ($(treeBox).is(":visible")) {
                $(treeBox).hide();
                $(listBox).css("width", (listBoxWidth + 171) + "px");
                $(this).removeClass("batcolse");
				$(this).addClass("batopen");
            }
            else {
				$(listBox).css("width", (listBoxWidth - 171) + "px");
                $(treeBox).show();
                $(this).removeClass("batopen");
				$(this).addClass("batcolse");
            }
            onChange();
        });

    }
    //当侧栏状态发生变化时触发
    function onChange() {
        var fuc = global.onChange;
        if (typeof (fuc) == "function") {
            fuc.apply(null);
        }
    }
}
*/
/**
 * 因为修改的左这栏的拖动效果，所以quan于2012-11-20重写了折叠左边栏的代码，如下：
 */
function puckerbar(opt) {
    var bar = $("#bathandle"), global;
    global = $.extend({}, opt || {});

    if (bar.length) {

		bar.hover(function(){
			$(this).addClass("bathover");
		},function(){
			$(this).removeClass("bathover");
		});

        bar.click(function () {
			var treeBox = $("#subbar");
            if ($(treeBox).is(":visible")) {
                $(treeBox).hide();
            }
            else {
                $(treeBox).show();
            }
			onChange();
        });

    }
    //当侧栏状态发生变化时触发
    function onChange() {
        var fuc = global.onChange;
        if (typeof (fuc) == "function") {
            fuc.apply(null);
        }
    }
}

//jQuery 插件部分
$.fn.extend({
    /**************
    ** 显示提示信息
    **************/
    dwShowTip: function () {
        var mytip, strhtml, mycont, mymask;
        mytip = $("#mytip");
        if (mytip.length == 0) {
            strhtml = "<div id='mytip' class='mytip'><div class='mytipcont' style='height:200px;'></div>\
                            <div class='mytipmask'><iframe id='mytipifr' class='mytipifr' frameborder='0' style='height:100%; width:100%;'></iframe></div></div>";
            //<div id="mytip" class="mytip"><div class="mytipcont"></div><div class="mytipmask"><iframe id="mytipifr" class="mytipifr" frameborder="0" style="height:100%; width:100%;"></iframe></div></div>
            mytip = $(strhtml);
            $("body").append(mytip);
        }
        mymask = mytip.find("div.mytipmask");
        mycont = mytip.find("div.mytipcont");
        return this.each(function (_index) {
            var self = $(this), strtips, objtips, objtip, d, wh, timer;
            strtips = self.attr("tips");
            if (strtips == null) {
                return true;
            }
            objtips = parseObj(strtips);
            objtip = getMyTip(objtips);
            d = document.documentElement;
            wh = null;
            self.bind({
                "mouseover": function (e) {
                    timer = window.setTimeout(tipshow, 500);
                    e.stopPropagation();
                },
                "mouseout": function (e) {
                    window.clearTimeout(timer);
                    tiphide();
                    e.stopPropagation();
                }
            });

            function tipshow() {
                var t, l, of;
                t = 0;
                l = 0;
                of = self.offset();
                mytip.show();
                mycont.html(objtip.tip).width(objtip.w);
                wh = getWH(mycont); //获得内容区域高度，宽度用于同步其他容器
                l = of.left + 60;
                t = of.top + 22;
                if (t + wh.h > d.clientHeight) {	//保证提示区域不超出显示区
                    t = t - wh.h - 22;
                    if (t < 0) {
                        t = 0;
                    }
                }
				if (l + wh.w > d.clientWidth) {	//保证提示区域不超出显示区
                    l = l - wh.w - 22;
                    if (l < 0) {
                        l = 0;
                    }
                }

                mymask.css({ width: (wh.w + 2), height: (wh.h + 2) }).
                    find("iframe").css({ width: (wh.w + 2), height: (wh.h + 2) }); //控制遮罩层及iframe高度
                mytip.css({ top: t, left: l }); //整体定位
            }

            function tiphide() {
                mytip.hide();
                wh = null;
            }
        });

        function getWH(obj) {
            var obj = obj[0];
            return { w: obj.clientWidth, h: obj.clientHeight };
        }

        function getMyTip(j) {
            var tip = "", w;
            var jtip = [
            //申请号
				{"name": "an", "w": 400, "tip": "<div class=\'tiptxt\'>申请号可以使用“?”代替单个字符，使用“%”代替多个字符。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知申请号为99120331.3，应键入：<span class=\'tipwarn\'>“CN99120331”或“CN99120331.3”</span>；如申请号为CN200410016940.6，应键入：<span class=\'tipwarn\'>“CN200410016940”或“CN200410016940.6”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知申请号前七位为9912033，应键入：<span class=\'tipwarn\'>“CN9912033”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知申请号中间包含99120，应键入：<span class=\'tipwarn\'>“%99120%”</span>。" },
            //公开号
				{"name": "pnm", "w": 400, "tip": "<div class=\'tiptxt\'>公开（公告）号可以使用“?”代替单个字符，使用“%”代替多个字符。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知公开（公告）号为1219642，应键入：<span class=\'tipwarn\'>“CN1219642”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知公开（公告）号的前几位为12192，应键入：<span class=\'tipwarn\'>“CN12192”</span>。" },
            //名称，摘要，权利要求书
                {"name": "tiabstclm", "w": 430, "tip": getCommTip("str", "名称，摘要，权利要求书") },
            //名称，摘要
                {"name": "tiabst", "w": 430, "tip": getCommTip("str", "名称，摘要") },
            //名称
				{"name": "ti", "w": 430, "tip": getCommTip("str", "名称") },
            //摘要
				{"name": "abst", "w": 430, "tip": getCommTip("str", "摘要") },
            //主权项（CL）
				{"name": "cl", "w": 430, "tip": getCommTip("str", "主权项") },
            //权利要求书（CLM）
				{"name": "clm", "w": 430, "tip": getCommTip("str", "权利要求书") },
            //说明书（DESCR）
				{"name": "descr", "w": 430, "tip": getCommTip("str", "说明书") },
            //主分类号（PIC）
				{"name": "pic", "w": 400, "tip": "<div class=\'tiptxt\'>同一专利申请案具有多个分类号时，第一个分类号称为主分类号。主分类号可以使用“?”代替单个字符，使用“%”代替多个字符。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知主分类号为G06F15/16，应键入：<span class=\'tipwarn\'>“G06F15/16”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知主分类号起首部分为G06F，应键入：<span class=\'tipwarn\'>“G06F”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知主分类号的一部分为06F15，应键入：<span class=\'tipwarn\'>“%06F15%”</span>。" },
            //分类号（SIC）
				{"name": "sic", "w": 400, "tip": "<div class=\'tiptxt\'>分类号可由《国际专利分类表》查得。分类号可以使用“?”代替单个字符，使用“%”代替多个字符。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知分类号为G06F15/16，应键入：<span class=\'tipwarn\'>“G06F15/16”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知分类号起首部分为G06F，应键入：<span class=\'tipwarn\'>“G06F”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知分类号的一部分为06F15，应键入：<span class=\'tipwarn\'>“%06F15%”</span>。" },
            //申请人（PA）
				{"name": "pa", "w": 430, "tip": "<div class=\'tiptxt\'>申请（专利权）人可以是个人或公司，可以输入姓名或公司名称。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知申请人为吴学仁，应键入：<span class=\'tipwarn\'>“吴学仁”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知申请人姓吴，应键入：<span class=\'tipwarn\'>“吴”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知申请人名字中包含“仁”，应键入：<span class=\'tipwarn\'>“仁”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;4、已知申请人姓吴，且名字中包含“仁”，应键入：<span class=\'tipwarn\'>“吴 and 仁”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;5、已知申请人为辽宁某供电公司，应键入：<span class=\'tipwarn\'>“辽宁 and 供电公司”</span>。" },
            //地址（ADDR）
				{"name": "addr", "w": 400, "tip": "<div class=\'tiptxt\'>申请人地址可以使用“?”代替单个字符，使用“%”代替多个字符。各关键字之间可以使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知申请人地址为香港新界，应键入：<span class=\'tipwarn\'>“香港新界”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知申请人地址邮编为100088，应键入：<span class=\'tipwarn\'>“100088”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知申请人地址邮编为300457，地址为某市泰华路12号，应键入：<span class=\'tipwarn\'>“300457 and 泰华路12号”</span>。" },
            //国省代码（CO）
                {"name": "co", "w": 400, "tip": "<div class=\'tiptxt\'>国省代码可以是国家、省的名称、字母或数字编码，可以使用“?”代替单个字符，使用“%”代替多个字符。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知法国的国省代码为FR，应键入：<span class=\'tipwarn\'>“法国”或“FR”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知江苏的国省代码为32，应键入：<span class=\'tipwarn\'>“江苏”或“32”</span>。" },
            //发明（设计）人（INN）
				{"name": "inn", "w": 400, "tip": "<div class=\'tiptxt\'>发明（设计）人可以是个人或公司，可以输入姓名或公司名称。各关键字之间可以使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知发明（设计）人为李志海，应键入：<span class=\'tipwarn\'>“李志海”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知发明（设计）人姓李，应键入：<span class=\'tipwarn\'>“李”</span>。" },
            //申请日（AD）
				{"name": "ad", "w": 400, "tip": getCommTip("date", "申请日") },
            //公开（公告）日（PD）
				{"name": "pd", "w": 400, "tip": "<div class=\'tiptxt\'>由年（4位）、月（2位）、日（2位）三部分组成。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知公开（公告）日为1999年10月06日，应键入：<span class=\'tipwarn\'>“19991006”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知公开（公告）日在1999年10月，应键入：<span class=\'tipwarn\'>“199910”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知公开（公告）日在1999年，应键入：<span class=\'tipwarn\'>“1999”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;4、如需检索公开（公告）日为1998到1999年之间的专利，应键入：<span class=\'tipwarn\'>“1998 to 1999”</span>。</div>" },
            //优先权（PR）
				{"name": "pr", "w": 460, "tip": "<div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知专利的优先权日为2009.02.06，应键入：<span class=\'tipwarn\'>“20090206”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知专利的优先权号为US 09/994264，应键入：<span class=\'tipwarn\'>“US 09/994264”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知专利的优先权号为US 12/361,087，应键入：<span class=\'tipwarn\'>“'US 12/361,087'”</span>。" },
            //分案原申请号（DAN）
                {"name": "dan", "w": 460, "tip": "<div class=\'tiptxt\'>可输入完整或部分的分案原申请号，也可以输入分案原申请日。各关键字之间可以使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知分案原申请号首部为200710，应键入：<span class=\'tipwarn\'>“200710”</span>。" },
            //代理机构（AGC）
				{"name": "agc", "w": 400, "tip": "<div class=\'tiptxt\'>可输入完整或部分的代理机构名称。各关键字之间可以使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知专利代理机构为广东专利事务所，应键入：<span class=\'tipwarn\'>“广东专利事务所”</span>。" },
            //代理人（AGT）
				{"name": "agt", "w": 400, "tip": "<div class=\'tiptxt\'>可输入完整或部分的代理人姓名。各关键字之间可以使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知专利代理人为马永利，应键入：<span class=\'tipwarn\'>“马永利”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知专利代理人姓马，应键入：<span class=\'tipwarn\'>“马”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知专利代理人名字中包含“利”，应键入：<span class=\'tipwarn\'>“利”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;4、已知专利代理人姓马，且名字中包含“利”，应键入：<span class=\'tipwarn\'>“马 and 利”</span>。" },
            //颁证日（LD）
				{"name": "ld", "w": 400, "tip": getCommTip("date", "颁证日") },
            //国际申请（IAN）
                {"name": "ian", "w": 400, "tip": "<div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;\
                1、PCT申请号格式为: PCTCCYYYYNNNNNN(PCT+国编码+4位年+6位数字)，例如：<span class=\'tipwarn\'>“PCTUS1994008862”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知申请日期为1994年08月04日，应键入：<span class=\'tipwarn\'>“'19940804'”</span>。"
            },
            //国际公布（IPD）
				{"name": "ipd", "w": 430, "tip": "<div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;\
                1、公开号格式：<br>\
                &nbsp;&nbsp;&nbsp;1978 ～ 2002年6月：  WOYYNNNNN   (2位年5位数字), 例如：<span class=\'tipwarn\'>“WO0251230”</span>(2002年6月的最大号)。<br />\
                &nbsp;&nbsp;&nbsp;2002年7月 ～ 2003年：WOYYNNNNNN  (2位年6位数字)，例如：<span class=\'tipwarn\'>“WO02051231”</span>(2002年7月的最小号)。<br />\
                &nbsp;&nbsp;&nbsp;2004年 ～ 今：       WOYYYYNNNNNN(4位年6位数字)，例如：<span class=\'tipwarn\'>“WO2009085009”</span>。<br />\
                2、已知公布日期为1994年08月04日，应键入：<span class=\'tipwarn\'>“'19940804'”</span>。"
},
            //进入国家日期（DEN）
				{"name": "den", "w": 400, "tip": getCommTip("date", "进入国家日期") },
            //有效性
                {"name": "lv", "w": 400, "tip": "<div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知有效性为有效，应键入：<span class=\'tipwarn\'>“有效”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知有效性为无效，应键入：<span class=\'tipwarn\'>“无效”</span>。" },
            //最新法律状态
                {"name": "lls", "w": 400, "tip": "<div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知最新法律状态为公开，应选择：<span class=\'tipwarn\'>“公开”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知最新法律状态为实审，应选择：<span class=\'tipwarn\'>“实审”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知最新法律状态为授权，应选择：<span class=\'tipwarn\'>“授权”</span>。" }
            //全局标引
                , { "name": "gfi", "w": 400, "tip": getCommTip("str", "全局标引") }
			];

            if (typeof (j.tip) == "string") {
                tip = j.tip;
                if (typeof (j.w) == "number") {
                    w = j.w;
                } else {
                    w = 100;
                }
            } else if (typeof (j.name) == "string") {
                tip = "";
                $(jtip).each(function () {
                    if (this.name == j.name.toLowerCase()) {
                        tip = this.tip;
                        w = this.w;
                        return false;
                    }
                });
            }
            return { w: w, tip: tip };
        }

        //生成提示相同内容
        function getCommTip(t, n) {
            var str = "<div class=\'tiptxt\'>可输入一个或多个关键字，各关键字之间可使用AND、OR、NOT运算。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知$tag$中包含“计算机”，应键入：<span class=\'tipwarn\'>“计算机”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知$tag$中包含“计算机”和“应用”，应键入：<span class=\'tipwarn\'>“计算机 and 应用”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知$tag$中包含“计算机”或“控制”，应键入：<span class=\'tipwarn\'>“计算机 or 控制”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;4、已知$tag$中包含“计算机”，不包含“电子”时，应键入：<span class=\'tipwarn\'>“计算机 not 电子”</span>。"
            var date = "<div class=\'tiptxt\'>由年（4位）、月（2位）、日（2位）三部分组成。</div><div class=\'tiptitle\'>检索示例：</div>&nbsp;&nbsp;&nbsp;&nbsp;1、已知$tag$为1999年10月16日，应键入：<span class=\'tipwarn\'>“19991016”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;2、已知$tag$在1999年10月，应键入：<span class=\'tipwarn\'>“199910”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;3、已知$tag$在1999年，应键入：<span class=\'tipwarn\'>“1999”</span>。<br />&nbsp;&nbsp;&nbsp;&nbsp;4、如需检索$tag$为1998到1999年之间的专利，应键入：<span class=\'tipwarn\'>“1998 to 1999”</span>。</div>";
            var re = "", regx;
            regx = /\$tag\$/ig
            switch (t) {
                case "str":
                    re = str.replace(regx, n);
                    break;
                case "date":
                    re = date.replace(regx, n);
                    break;
            }
            return re;
        }
    },

    /**************
    ** 根据下拉框内容，更改tip
    **************/
    dwSelTip: function () {
        return this.each(function (_index) {
            var self = $(this), tbox;
            tbox = $("input.showtip", self.parents("div.logschitem"));

            ChangeTips(tbox, $(self).find("option:selected").attr("name"));
            self.unbind("change").bind("change", function () {
                ChangeTips(tbox, $(this).find("option:selected").attr("name"));
            });
        });

        function ChangeTips(o, name) {
            $(o).attr("tips", "{'name':'" + name + "'}").dwShowTip();
        }
    },
    //保证对象宽度为偶数，仅限ie7
    dwEvenWidth: function () {
        if ($.browser.msie && $.browser.version == "7.0") {//判断是否为ie7
            this.each(function () {
                var t, w;
                t = $(this);
                w = t.width();
                if (w % 2 == 1) {   //宽度为奇数则减去1
                    t.width(w - 1);
                }
            });
        }
        return this;    //返回对象
    }
});


function changeLLSorLV(selectItem) {
    var lvdata = ["", "有效", "无效"];
    var llsdata = ["", "公开", "实审", "驳回", "撤回", "授权", "部分无效", "全部无效", "终止", "届满"];
    var input = $(selectItem).parents(".logschitem").children(".logschitemb").find("input");
    $(input).val("");
    $(input).autocomplete({
        minLength: 0
           , source: []
           , position: { collision: "flipfit" }
           , change: showHits//
    }).on("click", function () {
        if ($(this).autocomplete("widget").is(":visible")) {
            $(this).autocomplete("close");
            return;
        }
        $(this).autocomplete("search", "");
    });
    if ($(selectItem).val() == "LLS=") {
        $(input).autocomplete({
            source: llsdata
        });
    }
    else if ($(selectItem).val() == "LV=") {
        $(input).autocomplete({
            source: lvdata
        });
    }
    else if ($(selectItem).val().indexOf("GFI") >= 0) {
        var id = $(selectItem).val().substring(3, 5);
        $(input).autocomplete({
            source: gfiData[id]
        });
    }
    else {
        $(input).autocomplete({
            source: []
        });
    }
    $(selectItem).change(function () {
        $(input).val("");
        if (this.value == "LLS=") {
            $(input).autocomplete({
                source: llsdata
            });
        }
        else if (this.value == "LV=") {
            $(input).autocomplete({
                source: lvdata
            });
        }
        else if ($(selectItem).val().indexOf("GFI") >= 0) {
            var id = $(selectItem).val().substring(3, 5);
            $(input).autocomplete({
                source: gfiData[id]
            });
        }
        else {
            $(input).autocomplete({
                source: []
            });
        }
    });

}   


//jQuery对象扩展
$.extend({
    //获得querrystring的方法  by cyh
    "request": function (key) {
        if (typeof (key) == "string" && key.length > 0) {
            var args = new Object();
            var query = location.search.substring(1);
            var pairs = query.split("&"); // Break at ampersand
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) continue;
                var argname = pairs[i].substring(0, pos).toLowerCase();
                var value = pairs[i].substring(pos + 1);
                value = decodeURIComponent(value);
                args[argname] = value;
            }

            return typeof (args[key.toLowerCase()]) == "string" ? args[key.toLowerCase()] : "";
        } else {
            return "";
        }
    }
});

function yui_alert(str,cfg) {

        YAHOO.namespace('widget.alert');
        alert_old = window.alert;
        window.alert = function (str, cfg) {
            if(typeof(str)!="string" || str == null || str == undefined)
                return;
            var ln, w, h, r, start;
            ln = str.length;
            w = -1, h=-1;
            if(cfg){
                if(typeof(cfg.w)=="number"){
                    w = cfg.w;
                }
                if(typeof(cfg.h)=="number"){
                    h = cfg.h;
                }
            }
            start = 1;
            var temp = str.match(/<br/ig);
            //根据字符个数及换行符，判断宽度，高度
            if(temp){
                start = (temp.length + 1);
            }
            if(w<0){
                for(r=start;;r++){
                    w = (Math.ceil(ln/r) * 12 + 70);
                    if(w<200){
                        w = 200;
                        break;
                    }else if(w<=1000){
                        break;
                    }
                }
            }
            if(h<0){
                h = (18 * r) + 90;
            }
            var temp = ["<div class='myalertmsg'>", str, "</div>"];
            YAHOO.widget.alert.dlg.setBody(temp.join(""));
            YAHOO.widget.alert.dlg.setHeader("提示信息");
            YAHOO.widget.alert.dlg.cfg.queueProperty('zIndex', 9999);
            if(typeof(w)=="number"){
                YAHOO.widget.alert.dlg.cfg.queueProperty('width', w + "px");
            }
            //alert_old(h);
            if(typeof(h)=="number" && h>120){
                YAHOO.widget.alert.dlg.cfg.queueProperty('height', h + "px");
            }
            YAHOO.widget.alert.dlg.render(document.body);
            if (YAHOO.widget.alert.dlg.bringToTop) {
                YAHOO.widget.alert.dlg.bringToTop();
            }
            YAHOO.widget.alert.dlg.show();
            $("#widget_alert button").blur();   //去掉按钮默认虚线（outline）
        }; //window.alert end

        YAHOO.util.Event.on(window, 'load', function () {
            var handleOK = function () {
                this.hide();
            };
            YAHOO.widget.alert.dlg = new YAHOO.widget.SimpleDialog('widget_alert', {
                visible: false,
                width: '20em',
                zIndex: 9999,
                close: true,
                fixedcenter: true,
                modal: true,
                draggable: true,
                constraintoviewport: true,
                buttons: [
                        { text: '确定', handler: handleOK, isDefault: true }]
            });
            YAHOO.widget.alert.dlg.setHeader("Alert!");
            YAHOO.widget.alert.dlg.setBody('Alert body passed to window.alert'); // Bug in panel, must have a body when rendered
            YAHOO.widget.alert.dlg.render(document.body);
        }); // YAHOO.util.Event.on end

}
function jq_alert(str) {
    var ud = "undefined";
    if (typeof (jQuery) != ud && typeof (jQuery.ui) != ud && typeof (jQuery.ui.dialog) != ud) {
        if ($("#dialog-message-alert").length == 0) {
            var html = "<div  id='dialog-message-alert' title ='提示信息' > <span id='dialog-message-span'> " + str + " <span></div>";
            $("body").append(html);
        }
        $("#dialog-message-alert").dialog({
            modal: true,
            buttons: {
                "确定": function () {
                    $(this).dialog("close");
                }
            }
        });
    } else {
        alert_old(str);
    }

}
// 必须项 str callbackOKFunc 可选项 callbackOKJsonP, callbackCancleFunc, callbackCancleJsonP
// ok 回调callbackOKFunc 回调参数callbackOKJsonP
// cancle 回调callbackCancleFunc 回调参数callbackCancleJsonP
function jq_confirm(str, callbackOKFunc, callbackOKJsonP, callbackCancleFunc, callbackCancleJsonP) {
    var ud = "undefined";
    if (typeof (jQuery) != ud && typeof (jQuery.ui) != ud && typeof (jQuery.ui.dialog) != ud) {
        var html = "<div  id='dialog-message-confirm' title ='确认信息' > <span id='dialog-message-confirm-span'> " + str + " </span></div>";
        $(html).dialog({
            modal: true,
            buttons: {
                "确定": function () {
                    if (callbackOKJsonP) callbackOKFunc(callbackOKJsonP);
                    else callbackOKFunc();
                    $(this).dialog('close');
                },
                "取消": function () {
                    if (callbackCancleFunc) {
                        if (callbackCancleJsonP) callbackCancleFunc(callbackCancleJsonP);
                        else callbackCancleFunc();
                    }
                    $(this).dialog("close");
                }
            }
        });
    }

}
function dw_alert(str , title) {
    var ud = "undefined";
    if (typeof (jQuery) != ud && typeof (jQuery.ui) != ud && typeof (jQuery.ui.dialog) != ud) {
//        if ($("#dialog-message-alert").length == 0) {
//            var html = "<div  id='dialog-message-alert' title ='提示信息' > <span id='dialog-message-span'> " + str + " </span></div>";
//            $("body").append(html);
//        } else {
//            $("#dialog-message-span").val(str);
//        }
        var html = "<div  id='dialog-message-alert' title ='提示信息' > <span id='dialog-message-span'> " + str + " </span></div>";
        //$("#dialog-message-alert").dialog({
        $(html).dialog({
            modal: true,
            buttons: {
                "确定": function () {
                    $(this).dialog("close");
                }
            }
        });
    } else {
        alert_old(str);
    }
}
//匿名函数，替换系统alert
(function () {
    if (typeof (alert_old) == "undefined") {
        alert_old = window.alert;
        window.alert = dw_alert;
    }
})();
//    var ud = "undefined";
//    if(typeof(jQuery)!=ud && typeof(jQuery.ui)!=ud&& typeof(jQuery.ui.dialog)!=ud){
//        // 使用jquer.dialog
//        window.alert = function (str, cfg){
//         alert("test");
//        }
//    }
//    else if (typeof (YAHOO) == ud ||typeof(YAHOO.widget.alert)== ud|| typeof(YAHOO.widget.SimpleDialog)== ud ) {
//        return false;   //不存在YUI引用，返回，不替换alert
//    } else {
//        YAHOO.namespace('widget.alert');
//        alert_old = window.alert;
//        window.alert = function (str, cfg) {
//            if(typeof(str)!="string" || str == null || str == undefined)
//                return;
//            var ln, w, h, r, start;
//            ln = str.length;
//            w = -1, h=-1;
//            if(cfg){
//                if(typeof(cfg.w)=="number"){
//                    w = cfg.w;
//                }
//                if(typeof(cfg.h)=="number"){
//                    h = cfg.h;
//                }
//            }
//            start = 1;
//            var temp = str.match(/<br/ig);
//            //根据字符个数及换行符，判断宽度，高度
//            if(temp){
//                start = (temp.length + 1);
//            }
//            if(w<0){
//                for(r=start;;r++){
//                    w = (Math.ceil(ln/r) * 12 + 70);
//                    if(w<200){
//                        w = 200;
//                        break;
//                    }else if(w<=1000){
//                        break;
//                    }
//                }
//            }
//            if(h<0){
//                h = (18 * r) + 90;
//            }
//            var temp = ["<div class='myalertmsg'>", str, "</div>"];
//            YAHOO.widget.alert.dlg.setBody(temp.join(""));
//            YAHOO.widget.alert.dlg.setHeader("提示信息");
//            YAHOO.widget.alert.dlg.cfg.queueProperty('zIndex', 9999);
//            if(typeof(w)=="number"){
//               YAHOO.widget.alert.dlg.cfg.queueProperty('width', w + "px");
//            }
//            //alert_old(h);
//            if(typeof(h)=="number" && h>120){
//               YAHOO.widget.alert.dlg.cfg.queueProperty('height', h + "px");
//            }
//            YAHOO.widget.alert.dlg.render(document.body);
//            if (YAHOO.widget.alert.dlg.bringToTop) {
//                YAHOO.widget.alert.dlg.bringToTop();
//            }
//            YAHOO.widget.alert.dlg.show();
//            $("#widget_alert button").blur();   //去掉按钮默认虚线（outline）
//        }; //window.alert end

//        YAHOO.util.Event.on(window, 'load', function () {
//            var handleOK = function () {
//                this.hide();
//            };
//            YAHOO.widget.alert.dlg = new YAHOO.widget.SimpleDialog('widget_alert', {
//                visible: false,
//                width: '20em',
//                zIndex: 9999,
//                close: true,
//                fixedcenter: true,
//                modal: true,
//                draggable: true,
//                constraintoviewport: true,
//                buttons: [
//                     { text: '确定', handler: handleOK, isDefault: true }]
//            });
//            YAHOO.widget.alert.dlg.setHeader("Alert!");
//            YAHOO.widget.alert.dlg.setBody('Alert body passed to window.alert'); // Bug in panel, must have a body when rendered
//            YAHOO.widget.alert.dlg.render(document.body);
//        }); // YAHOO.util.Event.on end
//    }; //if end
//})();

//加载用户权限--是否系统设置各项内容
function loadBackStageManage() {
    var systemRights = getUserSystemRights(getUserId());
    if (systemRights == null || systemRights == undefined) {
        $("#idOrg").hide();
        $("#idRole").hide();
        $("#idGroup").hide();
        $("#idCompany").hide();
        $("#idProject").hide();
        $("#idSynonym").hide();
        $("#idLanguage").hide();
        $("#idFreeItem").hide();
        $("#idSystem").hide();
        $("#idLogin").hide();
        $("#idOper").hide();
        $("#idLogStatistics").hide();
        $("#idOperStatistics").hide();
        $("#idIndustry").hide();
        $("#idArea").hide();
        $("#idCount").hide();
    }
    else {
        var vRights = systemRights.Permission;
        var flag = false;
        if (systemRights != null && systemRights != undefined && vRights.length <= 64) {
            if (vRights.substr(4, 1) == "1") {
                $("#idOrg").show();
                document.getElementById("manage_frame").src = "Organization.htm";
                document.getElementById("idOrg").className = "cur";
                flag = true;
            }
            else {
                $("#idOrg").hide();
            }
            if (vRights.substr(5, 1) == "1") {
                $("#idGroup").show();
                if (!flag) {
                    document.getElementById("manage_frame").src = "Group.htm";
                    document.getElementById("idGroup").className = "cur";
                    flag = true;
                }
            }
            else {
                $("#idGroup").hide();
            }
            if (vRights.substr(6, 1) == "1") {
                $("#idCompany").show();
                if (!flag) {
                    document.getElementById("manage_frame").src = "CompanyTree.htm";
                    document.getElementById("idCompany").className = "cur";
                    flag = true;
                }
            }
            else {
                $("#idCompany").hide();
            }
            if (vRights.substr(7, 1) == "1") {
                $("#idProject").show();
                if (!flag) {
                    document.getElementById("manage_frame").src = "../special/default.htm";
                    document.getElementById("idProject").className = "cur";
                    flag = true;
                }
            }
            else {
                $("#idProject").hide();
            }
            if (vRights.substr(8, 1) == "1") {
                $("#idSynonym").show();
                $("#idLanguage").show();
                if (!flag) {
                    document.getElementById("manage_frame").src = "Synonym.htm";
                    document.getElementById("idSynonym").className = "cur";
                    flag = true;
                }
            }
            else {
                $("#idSynonym").hide();
                $("#idLanguage").hide();
            }
            if (vRights.substr(9, 1) == "1") {
                $("#idFreeItem").show();
                if (!flag) {
                    document.getElementById("manage_frame").src = "GlobalFreeItem.htm";
                    document.getElementById("idFreeItem").className = "cur";
                    flag = true;
                }
            }
            else {
                $("#idFreeItem").hide();
            }
            if (vRights.substr(10, 1) == "1") {
                $("#idSystem").show();
            }
            else {
                $("#idSystem").hide();
            }
            if (vRights.substr(11, 1) == "1") {
                $("#idLogin").show();
            }
            else {
                $("#idLogin").hide();
            }
            if (vRights.substr(12, 1) == "1") {
                $("#idOper").show();
            }
            else {
                $("#idOper").hide();
            }
            if (vRights.substr(13, 1) == "1") {
                $("#idLogStatistics").show();
            }
            else {
                $("#idLogStatistics").hide();
            }
            if (vRights.substr(14, 1) == "1") {
                $("#idOperStatistics").show();
            }
            else {
                $("#idOperStatistics").hide();
            }
            if (vRights.substr(15, 1) == "1") {
                $("#idIndustry").show();
            }
            else {
                $("#idIndustry").hide();
            }
            if (vRights.substr(16, 1) == "1") {
                $("#idArea").show();
            }
            else {
                $("#idArea").hide();
            }
            if (vRights.substr(17, 1) == "1") {
                $("#idCount").show();
            }
            else {
                $("#idCount").hide();
            }
            if (vRights.substr(44, 1) == "1") {
                $("#idRole").show();
            }
             else {
                $("#idRole").hide();
            }
            if (vRights.substr(37, 1) == "1") {
                $("#idPatentFile").show();               
            }
            else {
                $("#idPatentFile").hide();
            }
            if (vRights.substr(38, 1) == "1") {
                $("#idPatentBBS").show();
            }
            else {
                $("#idPatentBBS").hide();
            }
            if (vRights.substr(39, 1) == "1") {
                $("#idIP").show();
            }
            else {
                $("#idIP").hide();
            }
        }
        else {
            $("#idOrg").hide();
            $("#idGroup").hide();
			$("#idRole").hide();
            $("#idCompany").hide();
            $("#idProject").hide();
            $("#idSynonym").hide();
            $("#idLanguage").hide();
            $("#idFreeItem").hide();
            $("#idSystem").hide();
            $("#idLogin").hide();
            $("#idOper").hide();
            $("#idLogStatistics").hide();
            $("#idOperStatistics").hide();
            $("#idIndustry").hide();
            $("#idArea").hide();
            $("#idCount").hide();
            $("#idIP").hide();
            $("#idPatentFile").hide();
            $("#idPatentBBS").hide();
        }
    }
}
//加载用户权限--是否标准上传各项内容
function loadStandardManage() {
    var systemRights = getUserSystemRights(getUserId());
    if (systemRights == null || systemRights == undefined) {
        $("#divStandardTree").hide();
        $("#btnUpLoad").hide();
    }
    else {
        var vRights = systemRights.Permission;
        var flag = false;
        if (systemRights != null && systemRights != undefined && vRights.length <= 64) {
            if (vRights.substr(21, 1) == "1") {
                $("#divStandardTree").show();
                flag = true;
            }
            else {
                $("#divStandardTree").hide();
            }
            if (vRights.substr(22, 1) == "1") {
                $("#btnUpLoad").show();
            }
            else {
                $("#btnUpLoad").hide();
            }
        }
        else {
            $("#divStandardTree").hide();
            $("#btnUpLoad").hide();
        }
    }
}
//加载用户权限--是否专题库报告管理各项内容
function loadProjectFileManage() {
    var systemRights = getUserSystemRights(getUserId());
    if (systemRights == null || systemRights == undefined) {
        $("#divCategoryManage").hide();
        $("#btnUpLoad").hide();
    }
    else {
        var vRights = systemRights.Permission;
        var flag = false;
        if (systemRights != null && systemRights != undefined && vRights.length <= 64) {
            if (vRights.substr(31, 1) == "1") {
                $("#divCategoryManage").show();
                flag = true;
            }
            else {
                $("#divCategoryManage").hide();
            }
            if (vRights.substr(32, 1) == "1") {
                $("#btnUpLoad").show();
            }
            else {
                $("#btnUpLoad").hide();
            }
        }
        else {
            $("#divCategoryManage").hide();
            $("#btnUpLoad").hide();
        }
    }
}
/*
* 主要功能：实现与类似C#的格式化字符串功能
*/
function format(source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
}
/*
* 主要功能：实现与类似C#的格式化字符串功能
*/
function Comm_Format(source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
}
// 获取url上的参数值
function Comm_GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

function getUrlParam(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) return unescape(r[2]); return null; //返回参数值
}