
var preClick = 0;

//======================
//异常处理
//======================
function handleQuestFailure() {
    alert("请求失败!");
};

//======================
//视图显示
//======================
$(function () {
	
	$.ajax({
		async:false,
		cache:false,
		contentType:"application/json",
		type:"POST",
		dataType:"json",
		url:"../user/findUrlTableByRole",
		error:function(data){
			handleQuestFailure();
		},
		success:function(data){
			
			var urlTable = data.value.urlTable;
			var userID = data.value.userID;
			var pList = new Array();//模块节点列表
			var pName = new Array();//模块节点名称列表
			for(var i = 0; i < urlTable.length; i++){//获得模块节点列表
				var pId = urlTable[i].pId;  
				var find = 0;
				for(var j=0; j < pList.length; j++){
					if(pList[j] == pId)
						find = 1;
				}
				if(find == 1)
					continue;
				pList.push(pId);
				pName.push(urlTable[i].pTitle);
			}
			
			var html="";
	//		html+="<div>";
			//html+="<button style='width:160px' class='formbtn' type='button' onclick='logout();'>注销</button>";   
	//		html+="<button style='width:100px' class='formbtn' type='button' onclick='selfinfomodify("+userID+")'>修改密码</button>";
	//		html+="<button style='width:100px' class='formbtn' type='button' onclick='logout()'>退出</button>"; 
			//html+="<a onclick='selfinfomodify("+userID+")'><img src='images/index/a.png' height='20px'/></a>";  
	//		html+="</div>";
			for(var i=0; i<pList.length; i++){
				var content="";
				content += "<div class='"+pList[i]+" displayStype' id='"+pList[i]+"'>";
				content += "<h2>"+pName[i]+"</h2>";
				content += "<ul>";
				for(var j=0; j<urlTable.length; j++){
					if(urlTable[j].pId == pList[i])
						content += "<li><a onclick='setCurrClick("+urlTable[j].id+")' id='menuId"+urlTable[j].id+"' href='../"+urlTable[j].url+"' target=main>"+urlTable[j].title+"</a></li>"
				}
	            content += "</ul>";
	        	content += "</div>";
	        	html+=content;
			}
	//		html+="<div>";
	//		html+="<button style='width:200px' class='formbtn' type='button' onclick='logout();'>退出</button>";    
	//		html+="</div>";
			 $("#subMenu").html(html);
		}
	});
});
function setCurrClick(id){
	if(preClick != 0)
		document.getElementById("menuId"+preClick).style.backgroundColor = "";
		//$("#menuId"+preClick).style.backgroundColor = "";
	preClick = id;
	//$("#menuId"+preClick).style.backgroundColor = "#EBF1FA";
	document.getElementById("menuId"+preClick).style.backgroundColor = "#EFEFEF";
}

function openAndHide(name){
	var tmp = document.getElementById(name).style.display;
	
	if(tmp == "none" || tmp == "")
		document.getElementById(name).style.display = "bolck";
	else
		document.getElementById(name).style.display = "";
}