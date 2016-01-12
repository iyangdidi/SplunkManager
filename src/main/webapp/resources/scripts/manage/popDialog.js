function PopupDialogs(){
	
	//memberRegView
	PopupDialogs.prototype.createModifyMemberRegDialog = function (parent){
		var strHTML = '<div id="_modifyMemberReg">\
			<iframe frameborder="no" id="modifyMemberRegDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifyMemberReg");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifyMemberRegDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifyMemberReg").dialog({
			title: "新建会员",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifyMemberRegDialog")[0].contentWindow.ModifyMemberUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifyMemberReg").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyMemberView.html?registerID="+id); 
        	$("#_modifyMemberReg").dialog("open");
        };  
	};
	
	//UserView
	PopupDialogs.prototype.createModifyUserDialog = function (parent){
		var strHTML = '<div id="_modifyUser">\
			<iframe frameborder="no" id="modifyUserDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifyUser");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifyUserDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifyUser").dialog({
			title: "新建用户",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifyUserDialog")[0].contentWindow.ModifyUserUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifyUser").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyUserView.html?id="+id); 
        	$("#_modifyUser").dialog("open");
        };  
	};
	
	//sysRoleView
	PopupDialogs.prototype.createModifyRoleDialog = function (parent){
		var strHTML = '<div id="_modifyRole">\
			<iframe frameborder="no" id="modifyRoleDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifyRole");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifyRoleDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifyRole").dialog({
			title: "新建用户",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifyRoleDialog")[0].contentWindow.modifyRoleUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifyRole").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyRoleView.html?id="+id); 
        	$("#_modifyRole").dialog("open");
        };  
	};
	
	//sharePublicizeView
	PopupDialogs.prototype.createModifySharePublicizeDialog = function (parent){
		var strHTML = '<div id="_modifySharePublicize">\
			<iframe frameborder="no" id="modifySharePublicizeDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifySharePublicize");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifySharePublicizeDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifySharePublicize").dialog({
			title: "新建小编分享",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifySharePublicizeDialog")[0].contentWindow.ModifySharePublicizeUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifySharePublicize").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function () {
        	$(frame).attr("src", "modifySharePublicizeView.html"); 
        	$("#_modifySharePublicize").dialog("open");
        };  
	};
	
	//sharePublicizeImageView
	PopupDialogs.prototype.createModifySharePublicizeImageDialog = function (parent){
		var strHTML = '<div id="_modifySharePublicizeImage">\
			<iframe frameborder="no" id="modifySharePublicizeImageDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifySharePublicizeImage");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifySharePublicizeImageDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifySharePublicizeImage").dialog({
			title: "添加小编分享图片",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifySharePublicizeImageDialog")[0].contentWindow.ModifySharePublicizeImageUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifySharePublicizeImage").dialog("close");
        };
        
        //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (pID) {
        	$(frame).attr("src", "modifySharePublicizeImageView.html?pID="+pID); 
        	$("#_modifySharePublicizeImage").dialog("open");
        };  
	};
	
	//importMemberView
	PopupDialogs.prototype.createImportMemberDialog = function (parent){
		var strHTML = '<div id="_importMember">\
			<iframe frameborder="no" id="importMemberDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_importMember");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#importMemberDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog2.hide();
        };
        $("#_importMember").dialog({
			title: "批量导入",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "导入":function(){
            	 
            	  $("#importMemberDialog")[0].contentWindow.ImportMemberExcel(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog2 = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog2.hide = function () {
            $("#_importMember").dialog("close");
        };
        
        //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog2.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog2.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog2.showDialog = function () {
        	$(frame).attr("src", "importMemberView.html"); 
        	$("#_importMember").dialog("open");
        };  
	};
	
	//sysDictionaryView
	PopupDialogs.prototype.createModifySysDictionaryDialog = function (parent){
		var strHTML = '<div id="_modifySysDictionary">\
			<iframe frameborder="no" id="modifySysDictionaryDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifySysDictionary");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifySysDictionaryDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifySysDictionary").dialog({
			title: "修改系统字典",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifySysDictionaryDialog")[0].contentWindow.ModifySysDictionaryUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifySysDictionary").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifySysDictionaryView.html?id="+id); 
        	$("#_modifySysDictionary").dialog("open");
        };  
	};
	
	//roleDictionaryView
	PopupDialogs.prototype.createModifyRoleDictionaryDialog = function (parent){
		var strHTML = '<div id="_modifyRoleDictionary">\
			<iframe frameborder="no" id="modifyRoleDictionaryDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifyRoleDictionary");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifyRoleDictionaryDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifyRoleDictionary").dialog({
			title: "修改角色字典",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifyRoleDictionaryDialog")[0].contentWindow.ModifyRoleDictionaryUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifyRoleDictionary").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyRoleDictionaryView.html?id="+id); 
        	$("#_modifyRoleDictionary").dialog("open");
        };  
	};
	
	//roleServiceDictionaryView
	PopupDialogs.prototype.createModifyRoleServiceDictionaryDialog = function (parent){
		var strHTML = '<div id="_modifyRoleServiceDictionary">\
			<iframe frameborder="no" id="modifyRoleServiceDictionaryDialog" scrolling="yes" style="width:100%;height:250px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifyRoleServiceDictionary");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifyRoleServiceDictionaryDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifyRoleServiceDictionary").dialog({
			title: "修改角色服务字典",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 350,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifyRoleServiceDictionaryDialog")[0].contentWindow.ModifyRoleServiceDictionaryUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifyRoleServiceDictionary").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyRoleServiceDictionaryView.html?id="+id); 
        	$("#_modifyRoleServiceDictionary").dialog("open");
        };  
	};
	
	//detailMemberRegView
	PopupDialogs.prototype.createDetailMemberRegDialog = function (parent){
		var strHTML = '<div id="_detailMemberReg">\
			<iframe frameborder="no" id="detailMemberRegDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_detailMemberReg");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#detailMemberRegDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog3.hide();
        };
        $("#_detailMemberReg").dialog({
			title: "详细信息",
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
        PopupDialogs.prototype.ViewAddModifyUpdateDialog3 = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog3.hide = function () {
            $("#_detailMemberReg").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog3.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog3.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog3.showDialog = function (id) {
        	$(frame).attr("src", "detailMemberRegView.html?registerID="+id); 
        	$("#_detailMemberReg").dialog("open");
        };  
	};
	//updateFileView
	PopupDialogs.prototype.createUpdateFileDialog = function (parent){
		var strHTML = '<div id="_updateFile">\
			<iframe frameborder="no" id="updateFileDialog" scrolling="yes" style="width:100%;height:400px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_updateFile");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#updateFileDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog3.hide();
        };
        $("#_updateFile").dialog({
			title: "修改信息",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 500,    
            modal: true,        
            buttons: {     
                "保存":function(){
               	 
              	  $("#updateFileDialog")[0].contentWindow.ModifyUpdateFileUpdate(handleOk); 
                },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_updateFile").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "modifyUpdateFileView.html?id="+id); 
        	$("#_updateFile").dialog("open");
        };  
	};
	
	//importMemberAdvView
	PopupDialogs.prototype.createImportMemberAdvDialog = function (parent){
		var strHTML = '<div id="_importMemberAdv">\
			<iframe frameborder="no" id="importMemberAdvDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_importMemberAdv");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#importMemberAdvDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_importMemberAdv").dialog({
			title: "批量导入",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "导入":function(){
            	 
            	  $("#importMemberAdvDialog")[0].contentWindow.importMemberAdvExcel(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_importMemberAdv").dialog("close");
        };
        
        //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function () {
        	$(frame).attr("src", "importMemberAdvView.html"); 
        	$("#_importMemberAdv").dialog("open");
        };  
	};
	
	//selView
	PopupDialogs.prototype.createModifySelfDialog = function (parent){
		var strHTML = '<div id="_modifySelf">\
			<iframe frameborder="no" id="modifySelfDialog" scrolling="yes" style="width:100%;height:214px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_modifySelf");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#modifySelfDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide();
        };
        $("#_modifySelf").dialog({
			title: "个人信息修改",
            autoOpen: false,
			resizable: false, // 不可拖动改动大小
            width: 450,
            height: 325,    
            modal: true,        
            buttons: {     
              "保存":function(){
            	 
            	  $("#modifySelfDialog")[0].contentWindow.ModifySelfUpdate(handleOk); 
              },
              "关闭": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.hide = function () {
            $("#_modifySelf").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog.showDialog = function (id) {
        	$(frame).attr("src", "userManage/modifySelfView.html?id="+id); 
        	$("#_modifySelf").dialog("open");
        };  
	};
	
	//批量查询会员
	var registerIDs;
	PopupDialogs.prototype.createBatchSearchDialog = function (parent){
		var strHTML = '<div id="_batchSearch">\
			<iframe frameborder="no" id="batchSearchDialog" scrolling="yes" style="width:100%;height:400px;overflow:hidden;"></iframe>\
            </div>';
		
		var dialog = $("#_batchSearch");
		
		if ($(dialog).length > 0) {
            return;
        }
        var container = $(parent);
        
        $(container).html(strHTML);
        var frame = $("#batchSearchDialog");
        
      //点击确定，执行成功
        var handleOk = function () {	
        	var tmp = getUrlParam("keywords");
        	PopupDialogs.prototype.reloadTableData();
        	PopupDialogs.prototype.ViewAddModifyUpdateDialog4.hide();
        };
        $("#_batchSearch").dialog({
			title: "批量查询",
            autoOpen: false,
			resizable: true, // 不可拖动改动大小
            width: 800,
            height: 500,    
            modal: true,        
            buttons: {     
              /*"查询":function(){
            	 
            	  $("#batchSearchDialog")[0].contentWindow.batchSearchUpdate(handleOk); 
              },*/
              "取消": function() {
                $( this ).dialog( "close" );
              }
            },
            close: function() {
              //allFields.val( "" ).removeClass( "ui-state-error" );
            }
          });
        PopupDialogs.prototype.ViewAddModifyUpdateDialog4 = {};
        PopupDialogs.prototype.ViewAddModifyUpdateDialog4.hide = function () {
            $("#_batchSearch").dialog("close");
        };
        
      //创建成功
        var handleSuccess = function (o) {
        };
        //创建失败
        var handleFailure = function (o) {
            alert("Submission failed: " + o.status);
        };
        //应该是是创建时执行
        PopupDialogs.prototype.ViewAddModifyUpdateDialog4.callback = {
                success: handleSuccess,
                failure: handleFailure
        };
        PopupDialogs.prototype.ViewAddModifyUpdateDialog4.validate = function () {
            return true;
        };
        
        PopupDialogs.prototype.ViewAddModifyUpdateDialog4.showDialog = function () {
        	$(frame).attr("src", "batchSearchView.html"); 
        	$("#_batchSearch").dialog("open");
        };  
	};
}