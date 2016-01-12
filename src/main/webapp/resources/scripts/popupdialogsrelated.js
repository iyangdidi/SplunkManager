/*
* 主要功能：本系统用到的弹出对话框相关的操作
*/
function PopupDialogs() {
	/*
	 * 检索条件查看对话框
	 * */
	PopupDialogs.prototype.createViewSearchDialog = function (parent) {
        var strHTML = '<div id="_viewSearchContainer">\
        				<iframe frameborder="no" id="frameViewSearchDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
                        </div>';
        
        var dialog = $("#_viewSearchContainer");
        
        if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);

        $(container).html(strHTML);
        var frame = $("#frameViewSearchDialog");
                    
        $("#_viewSearchContainer").dialog({
			title: "查看",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {              
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewSearchDialog = {};
        PopupDialogs.prototype.ViewSearchDialog.hide = function () {
            $("#_viewSearchContainer").dialog("close");
        };
        
        //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewSearchDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewSearchDialog.validate = function () {
            return true;
        };
        PopupDialogs.prototype.ViewSearchDialog.showDialog = function (data) {
        	$(frame).attr("src", "download/searchtreeview.html?searchID=" + data.id+"&mType=1");  
        	$("#_viewSearchContainer").dialog("open");
        };          
                   
	};
	
	/*
    * 检索条件编辑对话框
    */
    PopupDialogs.prototype.createSaveSearchDialog = function (parent) {
        var strHTML = '<div id="_saveSearchContainer">\
        				<iframe frameborder="no" id="frameSaveSearchDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
                        </div>';
        
        var dialog = $("#_saveSearchContainer");
        
        if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);

        $(container).html(strHTML);
        var frame = $("#frameSaveSearchDialog");
        
        //点击确定，执行成功
        var handleOk = function () {
            PopupDialogs.prototype.reloadSearchTree();
            PopupDialogs.prototype.SaveSearchDialog.hide();
        };
        
        $("#_saveSearchContainer").dialog({
            title: "编辑",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {
              "保存": function() {            	  
            	$("#frameSaveSearchDialog")[0].contentWindow.save(handleOk);                                
              },
              "取消": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.SaveSearchDialog = {};
        PopupDialogs.prototype.SaveSearchDialog.hide = function () {
            $("#_saveSearchContainer").dialog("close");
        };
        
        //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.SaveSearchDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.SaveSearchDialog.validate = function () {
            return true;
        };
        PopupDialogs.prototype.SaveSearchDialog.showDialog = function (data) {
        	$(frame).attr("src", "download/searchtreeview.html?searchID=" + data.id+"&mType=2");  
        	$("#_saveSearchContainer").dialog("open");        	
        }; 
	};
	
	    /*
	    * 检索条件删除对话框
	    */
	    PopupDialogs.prototype.createDeleteSearchDialog = function (parent) {
	        var strHTML = '<div id="_deleteSearchContainer">\
	        				<iframe frameborder="no" id="frameDeleteSearchDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
	                        </div>';
	        
	        var dialog = $("#_deleteSearchContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frameDeleteSearchDialog");
	        
	        //点击确定，执行成功
	        var handleOk = function () {	   
	        	PopupDialogs.prototype.reloadSearchTree();
	            PopupDialogs.prototype.DeleteSearchDialog.hide();
	        };
	        
	        $("#_deleteSearchContainer").dialog({
	        	title: "删除",
	            autoOpen: false,
				resizable: false, // 不可拖动改动大小
	            width: 450,
				height: 325,    
	            modal: true,        
	            buttons: {
	              "删除": function() {       
	            	  if(confirm("删除检索条件后将无法恢复，是否继续?")){
	            		  $("#frameDeleteSearchDialog")[0].contentWindow.del(handleOk);
	            	   }	            	                                
	              },
	              "取消": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.DeleteSearchDialog = {};
	        PopupDialogs.prototype.DeleteSearchDialog.hide = function () {
	            $("#_deleteSearchContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.DeleteSearchDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.DeleteSearchDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.DeleteSearchDialog.showDialog = function (data) {
	        	$(frame).attr("src", "download/searchtreeview.html?searchID=" + data.id+"&mType=3");  
	        	$("#_deleteSearchContainer").dialog("open");
	        }; 
		};
		
	    /*
	    * 输入专利号对话框
	    */
	    PopupDialogs.prototype.createInputPatentDialog = function (parent) {
	        var strHTML = '<div id="_InputPatentContainer">\
	        				<iframe frameborder="no" id="frameInputPatentDialog" scrolling="no" style="width:100%;height:230px;overflow:hidden;"></iframe>\
	                        </div>';
	        
	        var dialog = $("#_InputPatentContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frameInputPatentDialog");
	        
	      //点击确定，执行成功
	        var handleOk = function () {
	            PopupDialogs.prototype.reloadSearchTree();
	            PopupDialogs.prototype.InputPatentDialog.hide();
	        };
	        
	        $("#_InputPatentContainer").dialog({
	            autoOpen: false,
	            resizable: false, // 不可拖动改动大小
				draggable: false, //窗口不可拖动
	            width: 450,
	            height: 340,
	            modal: true,
	            title: "请输入专利号",
	            buttons: {
	              "确定": function() {            	  
	            	$("#frameInputPatentDialog")[0].contentWindow.save(handleOk);                                
	              },
	              "取消": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.InputPatentDialog = {};
	        PopupDialogs.prototype.InputPatentDialog.hide = function () {
	            $("#_InputPatentContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.InputPatentDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.InputPatentDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.InputPatentDialog.showDialog = function () {
	        	$(frame).attr("src", "download/inputpatent.html");  
	        	$("#_InputPatentContainer").dialog("open");
	        }; 
		};
		/*
	    * 开始先把号下载对话框
	    */
	    PopupDialogs.prototype.createDownloadSelectDialog = function (parent) {
	        var strHTML = "<div id='_DownloadSelectContainer'>\
					          <iframe id='frmDownloadSelectDialog'  frameborder='no' scrolling='no' style='width:100%;height:100%;'></iframe>\
					        </div>";
	        
	        var dialog = $("#_DownloadSelectContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frmDownloadSelectDialog");
	        
	      //点击确定，执行成功
	        var handleOk = function () {		            
	            PopupDialogs.prototype.DownloadSelectDialog.hide();
	        };
	        
	        $("#_DownloadSelectContainer").dialog({
	        	title: "下载专利",
	            autoOpen: false,
	            width: 400,
	            height: 250,    
	            modal: true,        
				resizable: false,
	            buttons: {
	              "确定": function() {            	  
	            	$("#frmDownloadSelectDialog")[0].contentWindow.save(handleOk);                                
	              },
	              "取消": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.DownloadSelectDialog = {};
	        PopupDialogs.prototype.DownloadSelectDialog.hide = function () {
	            $("#_DownloadSelectContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.DownloadSelectDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.DownloadSelectDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.DownloadSelectDialog.showDialog = function (list,mType) {
	        	$(frame).attr("src", "task/downloadselectopen.html?list="+list+"&mType="+mType);  
	        	$("#_DownloadSelectContainer").dialog("open");
	        }; 
		};
		
		/*
	    * 开始先把号下载对话框--开始下载--停止下载--重新下载共用的页面
	    */
	    PopupDialogs.prototype.createStartDownloadDialog = function (parent) {
	        var strHTML = "<div id='_StartDownloadContainer'>\
					          <iframe id='frmStartDownloadDialog'  frameborder='no' scrolling='no' style='width:100%;height:100%;'></iframe>\
					        </div>";
	        
	        var dialog = $("#_StartDownloadContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frmStartDownloadDialog");
	        
	      //点击确定，执行成功
	        var handleOk = function () {		            
	            PopupDialogs.prototype.StartDownloadDialog.hide();
	        };
	        
	        $("#_StartDownloadContainer").dialog({
	        	title: "下载专利",
	            autoOpen: false,
	            width: 800,
	            height: 456,    
	            modal: true,
				resizable: false,
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.StartDownloadDialog = {};
	        PopupDialogs.prototype.StartDownloadDialog.hide = function () {
	            $("#_StartDownloadContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.StartDownloadDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.StartDownloadDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.StartDownloadDialog.showDialog = function (mType) {
				$(frame).attr("src", "task/downloadoperatenew.html?mType="+mType);  
	        	$("#_StartDownloadContainer").dialog("open");
	        }; 
		};
		
		
		/*
	    * 选择停止下载对话框
	    */
	    PopupDialogs.prototype.createSelStopDownloadDialog = function (parent) {
	        var strHTML = "<div id='_SelStopDownloadContainer'>\
					          <iframe id='frmSelStopDownloadDialog'  frameborder='no' scrolling='no' style='width:100%;height:100%;'></iframe>\
					        </div>";
	        
	        var dialog = $("#_SelStopDownloadContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frmSelStopDownloadDialog");
	        
	      //点击确定，执行成功
	        var handleOk = function () {		            
	            PopupDialogs.prototype.SelStopDownloadDialog.hide();
	        };
	        
	        $("#_SelStopDownloadContainer").dialog({
	        	title: "选择停止下载专利",
	            autoOpen: false,
	            width: 800,
	            height: 456,    
	            modal: true,	            
				resizable: false,
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.SelStopDownloadDialog = {};
	        PopupDialogs.prototype.SelStopDownloadDialog.hide = function () {
	            $("#_SelStopDownloadContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.SelStopDownloadDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.SelStopDownloadDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.SelStopDownloadDialog.showDialog = function (mType) {
	        	$(frame).attr("src", "task/downloadselectstop.html?mType="+mType);
	        	
	        	$("#_SelStopDownloadContainer").dialog("open");
	        }; 
		};
		
				
		
		/*
		 * 新建代理----批量导入---对话框
		 * */
		PopupDialogs.prototype.createAddProxyimportItemDialog = function (parent) {
	        var strHTML = '<div id="_addProxyimportContainer">\
	        				<iframe frameborder="no" id="frameAddProxyimportDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
	                        </div>';
	        
	        var dialog = $("#_addProxyimportContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frameAddProxyimportDialog");
	                  
	      //点击确定，执行成功
	        var handleOk = function () {	
	        	PopupDialogs.prototype.reloadTableData();
	            PopupDialogs.prototype.ViewAddProxyimportDialog.hide();
	           // window.location.reload();
	        };
	        $("#_addProxyimportContainer").dialog({
				title: "新建代理 批量",
	            autoOpen: false,
				resizable: false, // 不可拖动改动大小
	            width: 450,
	            height: 325,    
	            modal: true,        
	            buttons: {     
	              "保存":function(){
	            	  $("#frameAddProxyimportDialog")[0].contentWindow.add(handleOk); 
	              },
	              "关闭": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.ViewAddProxyimportDialog = {};
	        PopupDialogs.prototype.ViewAddProxyimportDialog.hide = function () {
	            $("#_addProxyimportContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.ViewAddProxyimportDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.ViewAddProxyimportDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.ViewAddProxyimportDialog.showDialog = function (sitecd) {
	        	$(frame).attr("src", "download_proxyimport.html?sitecd="+sitecd);  
	        	$("#_addProxyimportContainer").dialog("open");
	        };          
	                   
		};
				
		/*
		 * 新建代理对----单个---话框
		 * */
		PopupDialogs.prototype.createAddProxyItemDialog = function (parent) {
	        var strHTML = '<div id="_addProxyItemContainer">\
	        				<iframe frameborder="no" id="frameAddProxyItemDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
	                        </div>';
	        
	        var dialog = $("#_addProxyItemContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frameAddProxyItemDialog");
	                  
	      //点击确定，执行成功
	        var handleOk = function () {	
	        	PopupDialogs.prototype.reloadTableData();
	            PopupDialogs.prototype.ViewAddProxyDialog.hide();
	          //  window.location.reload();
	        };
	        $("#_addProxyItemContainer").dialog({
				title: "新建代理",
	            autoOpen: false,
				resizable: false, // 不可拖动改动大小
	            width: 450,
	            height: 325,    
	            modal: true,        
	            buttons: {     
	              "保存":function(){
	            	 
	            	  $("#frameAddProxyItemDialog")[0].contentWindow.ServerIpAdd(handleOk); 
	              },
	              "关闭": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.ViewAddProxyDialog = {};
	        PopupDialogs.prototype.ViewAddProxyDialog.hide = function () {
	            $("#_addProxyItemContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.ViewAddProxyDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.ViewAddProxyDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.ViewAddProxyDialog.showDialog = function (sitecd) {
	        	$(frame).attr("src", "download_proxyview.html?sitecd="+sitecd); 
	        	$("#_addProxyItemContainer").dialog("open");
	        };          
	                   
		};
		
		/*
		 * 编辑修改页面-------------
		 * */
		PopupDialogs.prototype.createAddProxyItemUpdateDialog = function (parent) {
	        var strHTML = '<div id="_addProxyItemtUpdateContainer">\
	        				<iframe frameborder="no" id="frameAddProxyItemtuUdateDialog" scrolling="no" style="width:100%;height:214px;overflow:hidden;"></iframe>\
	                        </div>';
	        
	        var dialog = $("#_addProxyItemtUpdateContainer");
	        
	        if ($(dialog).length > 0) {
	            return;
	        }
	        var container = $(parent);

	        $(container).html(strHTML);
	        var frame = $("#frameAddProxyItemtuUdateDialog");
	                  
	      //点击确定，执行成功
	        var handleOk = function () {	
	        	PopupDialogs.prototype.reloadTableData();
	            PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog.hide();
	        };
	        $("#_addProxyItemtUpdateContainer").dialog({
				title: "新建代理 批量",
	            autoOpen: false,
				resizable: false, // 不可拖动改动大小
	            width: 450,
	            height: 325,    
	            modal: true,        
	            buttons: {     
	              "保存":function(){
	            	  $("#frameAddProxyItemtuUdateDialog")[0].contentWindow.ServerIpUpdate(handleOk); 
	              },
	              "关闭": function() {
	                $( this ).dialog( "close" );
	              }
	            },
	            close: function() {
	              //allFields.val( "" ).removeClass( "ui-state-error" );
	            }
	          });
	        PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog = {};
	        PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog.hide = function () {
	            $("#_addProxyItemtUpdateContainer").dialog("close");
	        };
	        
	        //创建成功
	        var handleSuccess = function (o) {
	        };
	        //创建失败
	        var handleFailure = function (o) {
	            alert("Submission failed: " + o.status);
	        };
	        //应该是是创建时执行
	        PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog.callback = {
	                success: handleSuccess,
	                failure: handleFailure
	        };
	        PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog.validate = function () {
	            return true;
	        };
	        PopupDialogs.prototype.ViewAddProxyItemUpdatetDialog.showDialog = function (conifg,sitecd) {
	        	$(frame).attr("src", "download_proxyview.html?id="+conifg.id+"&serverip="+conifg.serverip+"&port="+conifg.port+"&userid="+conifg.userid+"&password="+conifg.password+"&domain="+conifg.domain+"&sitecd="+sitecd);  
	        	$("#_addProxyItemtUpdateContainer").dialog("open");
	        };          
	                   
		};
}

