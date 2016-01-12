
function ClientStorage() {

    if (typeof ClientStorage.initialized == "undefined") {

        YAHOO.util.StorageEngineSWF.SWFURL = Comm_UrlLayerPath() + 'swfstore.swf';
        ClientStorage.ready = false;
        ClientStorage.SEARCH_EXPR_KEY = "search-expr";
        ClientStorage.TEMPSEARCHEXPR = "TempSearchExpr"
        ClientStorage.SHOWITEMS = "ShowItems";
        ClientStorage.SEARCH_EXPR_MAX = 40;
        try {
            ClientStorage.storageEngine = YAHOO.util.StorageManager.get(
            //使用的Engine名称：html5
                YAHOO.util.StorageEngineHTML5.ENGINE_NAME,
            //存储在本地，不是Session，Session数据随着浏览器关闭而消失
                YAHOO.util.StorageManager.LOCATION_LOCAL,
                {
                    force: false, // true: 只使用第一个参数指定的Engine
                    order: [      // 优先顺序，前一引擎不可用时，依次尝试下一引擎
                        YAHOO.util.StorageEngineHTML5,
                        YAHOO.util.StorageEngineSWF,
                        YAHOO.util.StorageEngineGears
                    ]
                }
            );
        } catch (e) {
            return null;
        }

        
        ClientStorage.storageEngine.subscribe(ClientStorage.storageEngine.CE_READY, function () {
            ClientStorage.ready = true;
        });
        
//        ClientStorage.storageEngine.subscribe(ClientStorage.storageEngine.CE_CHANGE, function () {
//            ClientStorage.ready = true;
//        });
        // 存储
        ClientStorage.prototype.set = function (key, value) {
            ClientStorage.storageEngine.removeItem(key);
            ClientStorage.storageEngine.setItem(key, value);
        };

        // 读取
        ClientStorage.prototype.get = function (key) {
            return ClientStorage.storageEngine.getItem(key);
        };

        // 删除
        ClientStorage.prototype.remove = function (key) {
            ClientStorage.storageEngine.removeItem(key);
        };

        //保存临时数据
        ClientStorage.prototype.saveTempData = function (key, data) {
            data = YAHOO.lang.JSON.stringify(data);
            ClientStorage.storageEngine.removeItem(key);
            ClientStorage.storageEngine.setItem(key, data);
        };
        //获取临时数据
        ClientStorage.prototype.getTempData = function (key) {
            return YAHOO.lang.JSON.parse(ClientStorage.storageEngine.getItem(key));
        };
        // 添加一个检索式
        ClientStorage.prototype.addSearchExpr = function (item) {
            if (!item || !item.query || item.query == "") return;
            var strAll = ClientStorage.storageEngine.getItem(ClientStorage.SEARCH_EXPR_KEY);
            var items = null;
            if (strAll == undefined || strAll == null || strAll == "") {
                items = [];
            } else {
                try {
                    items = YAHOO.lang.JSON.parse(strAll);
                    if (!YAHOO.lang.isArray(items))
                        items = [];
                } catch (e) {
                    items = [];
                }
            }
            if (items.length >= ClientStorage.SEARCH_EXPR_MAX) {
                items.pop(); //删除最后一个元素
            }
            //如果相邻两个检索相同，则不进行记录
            if (items.length > 0) {
                if (items[0].query == item.query && items[0].database == item.database) {
                    return;
                }
            }
            items.unshift(item);
            strAll = YAHOO.lang.JSON.stringify(items);
            ClientStorage.storageEngine.removeItem(ClientStorage.SEARCH_EXPR_KEY);
            ClientStorage.storageEngine.setItem(ClientStorage.SEARCH_EXPR_KEY, strAll);
        };
        // 得到全部
        ClientStorage.prototype.getAllSearchExpr = function () {
            var strAll = ClientStorage.storageEngine.getItem(ClientStorage.SEARCH_EXPR_KEY);
            if (strAll == undefined || strAll == null || strAll == "") {
                return null;
            } else {
                try {
                    return YAHOO.lang.JSON.parse(strAll);
                } catch (e) {
                    return null;
                }
            }
        };
        //得到最后一个插入的检索表达式信息
        ClientStorage.prototype.getLastSearchExpr = function () {
            var strAll = ClientStorage.storageEngine.getItem(ClientStorage.SEARCH_EXPR_KEY);
            if (strAll == undefined || strAll == null || strAll == "") {
                return null;
            } else {
                try {
                    var items = YAHOO.lang.JSON.parse(strAll);
                    return items[0];
                } catch (e) {
                    return null;
                }
            }
        };
        ClientStorage.prototype.saveAllSearchExpr = function (items) {
            try {
                var strAll = YAHOO.lang.JSON.stringify(items);
                ClientStorage.storageEngine.removeItem(ClientStorage.SEARCH_EXPR_KEY);
                ClientStorage.storageEngine.setItem(ClientStorage.SEARCH_EXPR_KEY, strAll);
            } catch (e) {
                return null;
            }
        };

        // 删除一个检索式
        ClientStorage.prototype.removeSearchExpr = function (index) {
            var strAll = ClientStorage.storageEngine.getItem(ClientStorage.SEARCH_EXPR_KEY);
            var items = null;
            if (strAll == undefined || strAll == null || strAll == "") {
                return;
            } else {
                try {
                    items = YAHOO.lang.JSON.parse(strAll);
                    if (!YAHOO.lang.isArray(items))
                        return;
                } catch (e) {
                    return;
                }
            }
            if (index >= items.length) {
                return;
            }
            items.splice(index, 1); //删除数组中的一个元素
            var strAll = YAHOO.lang.JSON.stringify(items);
            ClientStorage.storageEngine.removeItem(ClientStorage.SEARCH_EXPR_KEY);
            ClientStorage.storageEngine.setItem(ClientStorage.SEARCH_EXPR_KEY, strAll);
        };
        ClientStorage.initialized = true;
    }
}

function SessionStorage() {

    if (typeof SessionStorage.initialized == "undefined") {
        SessionStorage.ready = false;
        YAHOO.util.StorageEngineSWF.SWFURL = Comm_UrlLayerPath() + 'swfstore.swf';
        try {
            SessionStorage.storageEngine = YAHOO.util.StorageManager.get(
            //使用的Engine名称：html5
            YAHOO.util.StorageEngineHTML5.ENGINE_NAME,
            //存储在本地，不是Session，Session数据随着浏览器关闭而消失
            YAHOO.util.StorageManager.LOCATION_SESSION,
            {
                force: false, // true: 只使用第一个参数指定的Engine
                order: [      // 优先顺序，前一引擎不可用时，依次尝试下一引擎
                    YAHOO.util.StorageEngineHTML5,
                    YAHOO.util.StorageEngineSWF,
                    YAHOO.util.StorageEngineGears
                ]
            }
            );
        } catch (e) {
            return null;
        }


        SessionStorage.storageEngine.subscribe(SessionStorage.storageEngine.CE_READY, function () {
                SessionStorage.ready = true;
        });

        // 存储对象
        SessionStorage.prototype.setObj = function (key, obj) {
            try {
                this.remove(key);
                var strAll = YAHOO.lang.JSON.stringify(obj)
                SessionStorage.storageEngine.removeItem(key);
                SessionStorage.storageEngine.setItem(key, strAll);
            } catch (e) { }
        };

        // 读取对象
        SessionStorage.prototype.getObj = function (key) {
            var strAll;
            try {
                strAll = SessionStorage.storageEngine.getItem(key);
            } catch (e) { }
            if (!!strAll && strAll != undefined && strAll != "undefined" && strAll != null)
                return YAHOO.lang.JSON.parse(strAll);
            else
                return null;
        };
        // 存储字符串
        SessionStorage.prototype.set = function (key, str) {
            try {
                SessionStorage.storageEngine.removeItem(key);
                SessionStorage.storageEngine.setItem(key, str);
            } catch (e) { }
        };

        // 读取字符串
        SessionStorage.prototype.get = function (key) {
            try {
                return SessionStorage.storageEngine.getItem(key);
            } catch (e) { return null}
        
        };
        // 删除
        SessionStorage.prototype.remove = function (key) {
            SessionStorage.storageEngine.removeItem(key);
        }; 
        SessionStorage.initialized = true;
    }
}
/*
日期格式化函数
*/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//smartSearch
//  language:跨语言检索
//  synonym:同义词检索
//  personal:个人同义词
function SearchExprItem(query, database, result, time, save, page, pagesize, smartSearch) {
    this.query = query;
    this.database = database;
    this.time = time;
    if (!time) {
        var tm = new Date().Format("yyyy-MM-dd hh:mm:ss"); //将时间格式化为：2012-09-07 08:04:34
        this.time = tm;
    }
    this.result = result;
    this.isSaveQueryExpr = save;
    this.page = page;
    this.pageSize = pagesize;
    this.smartSearch = smartSearch;



}


function getUser() {
    var const_key = "user-info";
    var ss = new SessionStorage();
    var str = ss.get(const_key);
    if (!str) {
        var cs = new ClientStorage();
        str = cs.get(const_key);
    }
    if (str) {
        try{
            var usr = YAHOO.lang.JSON.parse(str);
            return usr;
        } catch(e){return null;}
    }
    return null;
}
function getUserId() {
    var usr = getUser();
    var userid = "";
    if (usr != null && !!usr.GUID) {
        userid = usr.GUID;
    }
    return userid
}

function setUser(userinfo, remember) {
    var const_key = "user-info";
    if (!userinfo) return;
    userinfo.remember = remember;
    userinfo.time = new Date();
    //var usr = { email: email, userId: userId, name: name, remember: remember, time: new Date() };
    var str = YAHOO.lang.JSON.stringify(userinfo);
    var cs = new ClientStorage();
    var ss = new SessionStorage();
    if (remember) {
        cs.set(const_key, str);
        ss.set(const_key, str);
    } else {
        ss.set(const_key, str);
        userinfo = { EMail: userinfo.EMail };
        str = YAHOO.lang.JSON.stringify(userinfo);
        cs.set(const_key, str);
    }
}
    
function logout() {
    var userinfo = getUser();
    var ss = new SessionStorage();
    ss.remove("result-state");
    // qc1324 jiahh 当前用户退出登录，也把之前进入的专题库退出
    ss.remove("currentProjectListInfo");
    ss.remove("currentLoginProjectInfo");
    var user = { EMail: userinfo.EMail };
    user.remember = userinfo.remember;
    setUser(user);
}
//根据页面选中状态获取数据库组合
function getDb() {
    var db = [], chk;
    var check = $(".chksearchdb");
    for (var i = check.length; i > 0; i--) {
        if (check[i - 1].id != "checkall" && check[i - 1].checked) {
            db.push(check[i - 1].value);
        }
    }
    return db.join(",");
}

function saveDb(dbs) {
    
    var ss = new SessionStorage();
    ss.remove("selected-database");
    ss.set("selected-database", dbs);
}
//
function setDbChecked() {
    /**增加外国库，暂时废弃**/
}

function getResultState() {
    var session = new SessionStorage();
    new ClientStorage();
    var searchItemData = session.getObj(ClientStorage.TEMPSEARCHEXPR);
    if (searchItemData && searchItemData != null && searchItemData.query && searchItemData.query.indexOf("FLD") < 0
    && window.location.href.toString().toLowerCase().indexOf("myfolder") < 0) {
        return true;
    } else {
        return false;
    }


}

function setResultState() {
// jiahh 这个函数没有用了
    var value = $("#queryExpr-str");
    var ss = new SessionStorage();
    if (value != null && value != "" && value) {
        if (value.val().indexOf("FLD") != 0) {
            ss.set("result-state", "1");
        }
    } else {
        ss.remove("result-state");
    }
}

function getFamilyOption() {
    var ss = new SessionStorage();
    try {
        return YAHOO.lang.JSON.parse(ss.get("family-state"));
    } catch (e) {
        return null;
    }

}
function setFamilyOption(state) {
    var ss = new SessionStorage();
    ss.set("family-state", YAHOO.lang.JSON.stringify(state));
}

function getUserProjectRight(userid,projectid) {

    var userproject = loadUserProjectRights(userid);
    if(userproject){
        for ( i=0; i < userproject.length ;i++){
            if(projectid == userproject[i].ProjectID)
                return userproject[i].Share;
        }
    }
    return 0;
}

// 设置用户主题信息Storage_UserProjectRights
function loadUserProjectRights(userid) {

    var const_key = "currentProjectListInfo";
    // 记录上一次去专题信息时的用户ID
    var const_userid = "preUserid";
    var preUserid;
    var ss = new SessionStorage();
    var str = null;
    if (SessionStorage.ready) {
        if (ss.getObj(const_userid) == userid)
            str = ss.getObj(const_key);
        else ss.setObj(const_userid, userid)
    }
    if (!str) {
        var config = {
            requestModule: "ProjectConfig",
            userId: userid,
            projectConfig: {
                Action: "LoadUserRights"
            }
        };
        var postData = YAHOO.lang.JSON.stringify(config);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: Comm_UrlLayerPath() + "client/interface.aspx",
            data: postData,
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.ReturnValue == 0) {
                    str = result.Option;
                    if (SessionStorage.ready) ss.setObj(const_key, result.Option)
                } else {
                    if (SessionStorage.ready) ss.setObj(const_key, null)
                    str = null;
                }
            }
        });
    }

    return str;

}

function getUserSystemRights(userid) {
    if (userid == "") return null;
    var const_key = "currentUserSystemInfo";
    // 记录上一次去专题信息时的用户ID
    var const_userid = "preUserid-SystemRight";
    var preUserid;

    var ss = new SessionStorage();
    var str = null;
    if (SessionStorage.ready) {
        if (ss.getObj(const_userid) == userid)
            str = ss.getObj(const_key);
        else ss.setObj(const_userid, userid)
    }
    if (!str) {
        var config = {
            requestModule: "UserManager",
            userId: userid,
            userConfig: {
                Action: "LoadUserRights"
            }
        };
        var postData = YAHOO.lang.JSON.stringify(config);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: Comm_UrlLayerPath() + "client/interface.aspx",
            data: postData,
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.ReturnValue == 0) {
                    str = result.Option;
                    if (SessionStorage.ready) ss.setObj(const_key, result.Option)
                } else {
                    if (SessionStorage.ready) ss.setObj(const_key, null)
                    str = null;
                }
            }
        });
    }
    return str;
}
function getUserSystemRightsByID(userid, perid) {
    var hasright = false;
    var rights = getUserSystemRights(userid);
    if (rights && rights.Permission && rights.Permission.length > (perid + 1)) {
        if (rights.Permission.substr(perid, 1) == 1) {
            hasright = true;
        }
    }
    return hasright;
}
// 返回前台所需的后台参数数据
function Storage_SystemInfo() {
    var const_key = "SystemInfo";
    var ss = new SessionStorage();
    var str;
    if (SessionStorage.ready) str = ss.getObj(const_key);
    if (!str) {
        var config = {
            requestModule: "SystemSet",
            userId: "-1",
            systemConfig: {
                Action: "LoadInfo"
            }
        };

        var postData = YAHOO.lang.JSON.stringify(config);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: Comm_UrlLayerPath() + "client/interface.aspx",
            data: postData,
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.ReturnValue != '0') {
                    alert(result.ErrorInfo);
                    return;
                } else if (result.Option != undefined && result.Option != null) {
                    // 放到session里
                    if (SessionStorage.ready)  ss.setObj(const_key, result.Option)
                    str = result.Option;
                }

            }
        });
    }

    return str;

}

// 返回权限设置List
function Storage_ModulesInfo() {
    var const_key = "ModulesInfo";
    var ss = new SessionStorage();
    var str;
    if (SessionStorage.ready) str = ss.getObj(const_key);
    if (!str) {
        var config = {
            requestModule: "SystemSet",
            userId: "-1",
            systemConfig: {
                Action: "LoadModulesConfig"
            }
        };

        var postData = YAHOO.lang.JSON.stringify(config);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: Comm_UrlLayerPath() + "client/interface.aspx",
            data: postData,
            async: false,
            dataType: "json",
            success: function (result) {
                if (result.ReturnValue != '0') {
                    alert(result.ErrorInfo);
                    return;
                } else if (result.Option != undefined && result.Option != null) {
                    // 放到session里
                    if (SessionStorage.ready) ss.setObj(const_key, result.Option)
                    str = result.Option;
                }

            }
        });
    }

    return str;

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
// 定义一个全局变量存放各个模块显示权限
function getDisplayRights() {
    var displayRights = null;
    //  //先获得显示权限
    if (!displayRights) {
        displayRights = {};
        var str = Storage_SystemInfo();
        if (str != null) {
            var displayModuleList = str.DisplayModuleList;
            var displayModule = null;
            for (var i = 0; i < displayModuleList.length; i++) {
                displayModule = displayModuleList[i];
                displayRights[displayModule.Key] = displayModule.Display;
            }
        }
    }
    return displayRights;
}
// 定义一个全局变量存放各个模块显示权限
var displayRights = getDisplayRights();
