/*
* 主要功能：实现检索翻页的js脚本
* 1、初始化---------------------------------->pagerInit
* 2、发送请求检索------------------------------------>startSearch
* 3、翻页功能实现------------------------------------>pageChangeEvent
* 4、上一件/下一件------------------------------------>recordChangeEvent
* 5、视图切换功能
*/
var btnPageFirst;
var btnPageNext;
var btnPagePrev;
var btnPageLast;
var pagerFirstID;
var pagerNextID;
var pagerPrevID;
var pagerLastID;
var requestConfig;
var FuncLoadData;
var page;
var pageCount;
var txtTotal;
var txtPage;
var txtCurPage;
var btnGoTo;
function pagerInit(FirstID, NextID, PrevID, LastID, CurPageID, GoTOPageID, config) {

    //第一页
    btnPageFirst = $("#" + FirstID);
    //下一页
    btnPageNext = $("#" + NextID);
    //上一页
    btnPagePrev = $("#" + PrevID);
    //最后一页
    btnPageLast = $("#" + LastID);
    //跳转
    btnGoTo = $("#" + GoTOPageID);

    txtCurPage = $("#" + CurPageID);

    pagerFirstID = FirstID;
    pagerNextID = NextID;
    pagerPrevID = PrevID;
    pagerLastID = LastID;
    requestConfig =config;
    //翻页控件
    $(btnPageFirst).bind("click", pageControlEvent);
    $(btnPageNext).bind("click", pageControlEvent);
    $(btnPagePrev).bind("click", pageControlEvent);
    $(btnPageLast).bind("click", pageControlEvent);
    $(btnGoTo).bind("click", gotoEvent);


}
/*
* 设置翻页控件的可用性
*/
var setPageNavigatorEnable = function () {
    $(btnPageFirst).removeClass("firston");
    $(btnPagePrev).removeClass("preon");
    $(btnPageNext).removeClass("nexton");
    $(btnPageLast).removeClass("laston");
    if (requestConfig.patentSearchConfig.PageCount == 1)
        return;

    if (requestConfig.patentSearchConfig.Page == 1) {
        $(btnPageNext).addClass("nexton");
        $(btnPageLast).addClass("laston");
    } else if (requestConfig.patentSearchConfig.Page == requestConfig.patentSearchConfig.PageCount) {
        $(btnPageFirst).addClass("firston");
        $(btnPagePrev).addClass("preon");
    } else {
        $(btnPageFirst).addClass("firston");
        $(btnPagePrev).addClass("preon");
        $(btnPageNext).addClass("nexton");
        $(btnPageLast).addClass("laston");
    }
}
/*
* 翻页控件事件绑定
*/
var gotoEvent = function (sender) {

    var reg = /^[\d]*$/;
    var isValid = reg.test($(txtCurPage).val());
    if (!isValid) {
        alert("对不起，只能输入数字。");
        return false;
    }

    if (requestConfig.patentSearchConfig.Page == $(txtCurPage).val())
        return;
    if ($(txtCurPage).val() > requestConfig.patentSearchConfig.PageCount)
        $(txtCurPage).val(requestConfig.patentSearchConfig.PageCount);
    if($(txtCurPage).val()<1) $(txtCurPage).val(1);

    requestConfig.patentSearchConfig.Page = $(txtCurPage).val();
    
    setPageNavigatorEnable();
    FuncLoadData(requestConfig);

}
/*
* 翻页控件事件绑定
*/
var pageControlEvent = function (sender) {

    if (requestConfig.patentSearchConfig.PageCount == 1)
        return;
    switch (this.id) {
        case pagerFirstID:
            if (!$(btnPageFirst).hasClass("firston"))
                return;
            requestConfig.patentSearchConfig.Page = 1;

            break;
        case pagerPrevID:
            if (!$(btnPagePrev).hasClass("preon"))
                return;
            requestConfig.patentSearchConfig.Page--;
            break;
        case pagerNextID:
            if (!$(btnPageNext).hasClass("nexton"))
                return;
            requestConfig.patentSearchConfig.Page++;
            break;
        case pagerLastID:
            if (!$(btnPageLast).hasClass("laston"))
                return;
            requestConfig.patentSearchConfig.Page = requestConfig.patentSearchConfig.PageCount;
            break;
    }
    $(txtCurPage).val(requestConfig.patentSearchConfig.Page); ;
    setPageNavigatorEnable();
    FuncLoadData(requestConfig);

}

/*
* 设置得到选中专利方法
* FunctionloadListData需要在外部实现
*/
this.setFuncLoadData = function (FunctionloadListData) {
    FuncLoadData = FunctionloadListData;
}
