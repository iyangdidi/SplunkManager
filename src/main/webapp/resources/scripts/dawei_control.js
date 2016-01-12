// JavaScript Document
//********************************
//**	通用函数
//********************************
//



function writeFooter() {
    document.write("<div id=\"footer\">\
    <!--<div class=\"footmenu\"><a href=\"#\" title=\"设为首页\" id=\"setHome\">设为首页</a>|<a href=\"#\" title=\"加入收藏\" id=\"addFav\">加入收藏</a>|<a href=\"default.htm\" title=\"关于我们\">关于我们</a>|<a href=\"../disclaimer/default.htm\" title=\"免责声明\">免责声明</a></div>-->\
    <p class=\"copyright\">Copyright &copy; 2001-2013</p>\
    </div> ");
}

//输出Top
function writeTop() {
    //  //先获得显示权限
    if (!displayRights) {
        displayRights = getDisplayRights();
    }
    var more = "";
    if (displayRights["BZGL"] == displayRights["ZTBG"]  && !displayRights["BZGL"]) {
        // all is  none
        more = "none";
    }
    else {
        more = "";
    }
    document.write(format("<div id=\"site-nav\">\
            <div class=\"inner clearfix\">\
                <ul class=\"site-menu\">\
                    <li class=\"dropmenu\">\
                        <s></s>\
                        <a href=\"../index.htm\" class=\"opener udline\" title=\"检索\">检索</a>\
                        <div class=\"menu_bd\">\
                            <a href=\"../search/index.shtml\">简单检索</a>\
                            <a href=\"../Search/TableSearch.shtml\">表格检索</a>\
                            <a href=\"../Search/LogicSearch.shtml\">逻辑检索</a>\
                            <a href=\"../Search/ExpressionSearch.shtml\">表达式检索</a>\
                            <a href=\"../Search/IntelligentSearch.shtml\" style=\"display:{0}\">智能检索</a>\
                            <a href=\"../Search/IPCSearch.htm\" style=\"display:{1}\">IPC检索</a>\
                            <a href=\"../Search/LegalSearch.htm\" style=\"display:{2}\">法律状态</a>\
							<iframe frameborder=\"no\" class=\"T_iframe\"></iframe>\
                        </div>\
                    </li>\
                    <li style=\"display:{3}\"><span id=\"idAMySearch\" class=\"udline\">我的检索式</span></li>\
 				    <li id=\"idSearchResult\" style=\"display:none\"><a class=\"udline\" href=\"../SearchResult/default.shtml\" title=\"检索结果\">检索结果</a></li>\
                   <li class=\"dropmenu on\" style=\"display:{4}\">\
                        <a href=\"../special/list.htm\" id=\"idProjectName\" class=\"project-nav-icon opener udline\" title=\"专题库\">专题库</a>\
                    </li>\
                    <li class=\"dropmenu\">\
                        <s></s>\
                        <a href=\"#\" class=\"opener\" style=\"cursor:default;\">更多</a>\
                        <div class=\"menu_bd\">\
                            <a target=\"_blank\" href=\"../Standard/default.htm\" style=\"display:{5}\">标准管理</a>\
                            <a target=\"_blank\" href=\"../Special/reportmanage.htm\" style=\"display:{6}\">专题报告</a>\
                            <a target=\"_blank\" href=\"../DataRange/default.htm\">数据范围</a>\
                        </div>\
                    </li>\
                </ul>\
                <ul class=\"user-menu\">\
                    <li><a href=\"../index.htm\" class=\"udline\" title=\"首页\">首页</a></li>\
                    <li class=\"dropmenu\"><s></s><a id=\"account_user\" href=\"\" title=\"用户\" class=\"opener udline\"></a></li>\
                    <li><a id=\"account_login\" href=\"#\" title=\"登录\" class=\"udline\">登录</a></li>\
                    <li><a id=\"idBackStage\" class=\"udline\" style=\"display:none;\" target=\"_blank\" href=\"../BackStage/default.htm\" title=\"系统设置\">系统设置</a></li>\
                    <li><a target=\"_blank\" class=\"udline\" href=\"../Help/default.htm\" title=\"帮助\">帮助</a></li>\
                    <li><a target=\"_blank\"  href=\"../feedback/default.htm\" title=\"意见反馈\" class=\"udline\">意见反馈</a></li>\
                </ul>\
            </div>\
        </div>", displayRights["ZNJS"] ? "" : "none", displayRights["IPCJS"] ? "" : "none", displayRights["FLZTJS"] ? "" : "none", displayRights["WDJSS"] ? "" : "none", displayRights["ZTK"] ? "" : "none", displayRights["BZGL"] ? "" : "none", displayRights["ZTBG"] ? "" : "none"));

    document.write("<div id=\"divUserLogin\"></div>\
    <div id=\"divUserRegister\"></div>\
    <div id=\"divUserCenter\"></div>\
	<div id=\"divMineInfo\"></div>\
    <div id=\"divSelectProject\"></div>");

    //显示下划线效果（有udline显示）
    $(document).ready(function () {
        $("#site-nav").on("mouseenter", ".udline", function () { $(this).css("text-decoration", "underline"); })
            .on("mouseleave", ".udline", function () { $(this).css("text-decoration", "none"); }); ;
    });

    Control_OnLoad();

}

//********************************
//**	专题列表事件
//********************************
var loadProjectListCount = 0;
//SessionStorage、ClientStorage执行完成后执行之后的代码
function Control_OnLoad() {
    new ClientStorage();
    new SessionStorage();
    if (!SessionStorage.ready) {
        if (loadProjectListCount++ > 20) {
            //alert(MessageConst.Common_NoFlash);
            return;
        }
        else {
            window.setTimeout(Control_OnLoad, 200);
            return;
        }
    }
    loadProjectList();
    loadSystemManage();
    //ClientStorage.js.getResultState()
    if (getResultState())
        $("#idSearchResult").show();
}
function ProjectRequestConfig() {
    this.requestModule = "ProjectConfig";
    this.projectConfig = {};
    this.userId = getUserId();
}

//加载专题库列表

function loadProjectList() {
    var session = new SessionStorage();
    
    var t = session.getObj("currentLoginProjectInfo");
    if (t == null || t == undefined) {

    }
    else {
        var item1 = "<em onclick='return onEnterProject(" + t.ProjectID + ")'><img  src ='../images/specilico.gif' /> " + t.Title + "</em>";
        // 首页logo下的行业库名
        $("#ProjectName").html(t.Title);
        var a = $("#idProjectName")
        a.html("").append(item1)
            .before("<s></s>").after("<div id=\"idProjectList\" class=\"menu_bd\"></div>");
        //$("#idProjectName").attr("href", item);
        var content = $("#idProjectList");
        var item2 = "<a href='#' onclick='return onShowMoreProject()'>" + "切换&nbsp;&nbsp;&nbsp;&nbsp;" + "</a><a href='#' onclick=' return onQuitProject()'>退出&nbsp;&nbsp;&nbsp;&nbsp;</a>"
        content.empty().append(item2);
        //切换bar
        $("#site-nav div.inner").addClass("projectinner");
    }
}
/*
* 退出专题库
*/
function onQuitProject() {
    // 清空主题信息
    clearProjectInfo();
    window.location.href = "../index.htm";
    return false;
}
function clearProjectInfo() {
    var session = new SessionStorage();
    session.remove("currentLoginProjectInfo");
    session.remove(ClientStorage.TEMPSEARCHEXPR);
}
/*
* 进入专题库
*/
function onEnterProject(id, searchType) {
    //searchType 可选参数，用于选中节点 by cyh
    // 清空主题信息
    clearProjectInfo();
    var session = new SessionStorage();
    var title = "";
    var t, count = 0;
    var url = [Comm_UrlLayerPath() + "SearchResult/default.shtml"];
    if (!SessionStorage.ready) {
        if (count++ > 20)
            alert(MessageConst.Common_NoFlash);
        else
            window.setTimeout(function () { onEnterProject(id, searchType); }, 200);
        return;
    }

    var config = {
        requestModule: "ProjectConfig",
        userId: -1,
        projectConfig: {
            Action: "AddAccessCount"
            ,ProjectID: id
        }
    };
    var interurl = Comm_UrlLayerPath() + "client/Interface.aspx";
    var postData = YAHOO.lang.JSON.stringify(config);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: Comm_UrlLayerPath() + "client/interface.aspx",
        data: postData,
        dataType: "json",
        success: function (result) {
            if (result.ReturnValue == 0) {
                str = result.Option;
            } else {
                str = null;
            }
        }
    });
    var data = loadUserProjectRights(getUserId());
    if (data != null && data != undefined) {
        for (i = 0; i < data.length; i++) {
            if (data[i].ProjectID == id) {
                title = data[i].Title;
                t = data[i];
                session.setObj("currentLoginProjectInfo", data[i]);
                break;
            }
        }
        session.remove(ClientStorage.TEMPSEARCHEXPR);
        $("#queryExpr-str").val("");
        var data = new SearchExprItem("", getdbByType("alldb"), null, null, 1);
        session.setObj(ClientStorage.TEMPSEARCHEXPR, data);
        if (typeof(searchType)!="undefined") {
            url.push("?SearchType=");
            url.push(searchType);
        }
        window.location.href = url.join("");
    }
    return false;
}
/*
* 显示专题库选择页面
*/
function onShowMoreProject() {

    window.location.href = "../special/list.htm";
    return false;
}
//********************************
//**	专题列表事件 end
//********************************


//********************************
//**	加载用户权限--是否显示系统设置 start
//********************************
function loadSystemManage() {
    var systemRights = getUserSystemRights(getUserId());
    if (systemRights == null || systemRights == undefined) {
        $("#idBackStage").hide();
    } else {
        var vRights = systemRights.Permission;
        if (systemRights != null && systemRights != undefined && vRights.length >= 20 && vRights.substr(3, 1) == "1") {
            $("#idBackStage").show();
        }
        else {
            $("#idBackStage").hide();
        }
    }
}
