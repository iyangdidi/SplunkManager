package com.tsinghua.banana.interfacebean.response;

import java.util.List;

import com.tsinghua.banana.entity.InfoTemp;


//返回某台机器的温度列表
public class ResponseGetInfoTemp {
	
	private String machine_id;
	private List<InfoTemp> infoTempList;
	private String tag;//表示数据类型，例如：(温度)“temperature”;(耗电)“power_consumption”,通过tagUtil来设置类型

	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	
	public String getMachine_id() {
		return machine_id;
	}
	public void setMachine_id(String machine_id) {
		this.machine_id = machine_id;
	}
	public List<InfoTemp> getInfoTempList() {
		return infoTempList;
	}
	public void setInfoTempList(List<InfoTemp> infoTempList) {
		this.infoTempList = infoTempList;
	}
}
