$(function(){
	
	$.ajax({
		async:false,
		cache:false,
		contentType:'application/json',
		type:"POST",
		url:'../role/loadroleinfo',
		error:function(data){
			handleFailure()
			return;
		},
		success:function(data){
			var m = data.value.rows;
			var content="";
			for(var i=0; i<m.length; i++){
				content += "<option value='"+m[i].id+"'>";
				content += m[i].roleName;
				content += "</option>";
			}
			$("#roleID").html(content);		
		}
	});

	search($("#roleID option:selected").val());
});

var trs = document.getElementById('authItem').getElementsByTagName('tr');
var trs2 = document.getElementById('moduleItem').getElementsByTagName('tr');
function selecthelp(){    
 for( var i=0; i<trs.length; i++ ){  
  trs[i].onmousedown = function(){  
   tronmousedown(trs,this,1);  //选择已经授权的条目
  }  
 }  
 for( var i=0; i<trs2.length; i++ ){  
	  trs2[i].onmousedown = function(){  
	   tronmousedown(trs2,this,2);  //选择还未授权的条目
	  }  
 }  
} 

var authChoosed = new Array();
var moduleChoosed = new Array();
function tronmousedown(trs,obj,flag){  
 for( var o=0; o<trs.length; o++ ){  
  if( trs[o] == obj ){    
	  var tmp = trs[o].style.background;
	  if(trs[o].style.background == 'rgb(223, 235, 242)' || trs[o].style.background.toUpperCase() == "#DFEBF2"){
	   	trs[o].style.background = '';	   	
	   	if(flag == 1){
	   		arrayRemove(authChoosed, trs[o].id);
	   	}else{
	   		arrayRemove(moduleChoosed, trs[o].id);
	   	}
	  } 
	  else{
		  trs[o].style.background = '#DFEBF2'; 
		  if(flag == 1){
			  authChoosed.push(trs[o].id);
		  }else{
			  moduleChoosed.push(trs[o].id);
		  }
	  }
		
  }   
 }  
}  
function arrayRemove(list, id){//移除的条目值设为0
	for(var i=0; i<list.length; i++){
		if(list[i] == id){
			list[i] = "0";
		}
	}
}

function auth(flag){//1:移除权限，2：添加权限
	var authList;
	
	if(flag == 1){
		authList = formatIds(authChoosed);
	}else{
		authList = formatIds(moduleChoosed);
	}
	
	var config = {
			roleID: $("#roleID option:selected").val(),
			authList: authList,
			flag: flag
	};
	var postData = JSON.stringify(config);
	$.ajax({
		async:false,
		cache:false,
		contentType:"application/json",
		type:"POST",
		dataType:"json",
		data:postData,
		url:"../user/auth",
		error:function(data){},
		success:function(data){
			 research();
		}
	});
	
	authChoosed = new Array();
	moduleChoosed = new Array();
}
function formatIds(list){
	var result = "";
	for(var i=0; i<list.length; i++){
		if(list[i] != "0"){
			result += list[i]+",";
		}
	}
	
	if(result.length > 0){
		result = result.substr(0, result.length-1);		
	}
	
	return result;
}

function refresh(){
	location.reload();
}
function research(){
	search($("#roleID option:selected").val());
}
function search(roleID){
	
	var config = {
			roleID: roleID
	};
	var postData = JSON.stringify(config);
	$.ajax({
		async:false,
		cache:false,
		contentType:"application/json",
		type:"POST",
		dataType:"json",
		data:postData,
		url:"../user/loadauthinfo",
		error:function(data){},
		success:function(data){
			var urlList = data.value.urlTableList;
			var authList = data.value.authTableList;
			
			//var distributed = new Array();
			//var undistributed = new Array();
			var authItem="<tr style='background-color:#0099FF'><th>ID</th><th>父模块</th><th>子模块</th></tr>";
			var moduleItem="<tr style='background-color:#0099FF'><th>ID</th><th>父模块</th><th>子模块</th></tr>";
			for(var i=0; i< urlList.length; i++){
				var j=0
				var flag = false;
				for(; j<authList.length; j++){
					if(authList[j].urlTableId == urlList[i].id){//放到已经授权的列表
						authItem += "<tr id='"+urlList[i].id+"'><td style='width:100px'>"+urlList[i].id+"</td><td>"+urlList[i].pTitle+"</td><td>"+urlList[i].title+"</td></tr>";
						flag = true;
						continue;
					}
				}
				if(!flag){
					moduleItem += "<tr id='"+urlList[i].id+"'><td>"+urlList[i].id+"</td><td>"+urlList[i].pTitle+"</td><td>"+urlList[i].title+"</td></tr>";
				}
			}
			
			$("#authItem").html(authItem);
			$("#moduleItem").html(moduleItem);
			
		}
	});
	
	selecthelp();
}