package com.tsinghua.banana.interfacebean.response;

import java.util.List;

import com.tsinghua.banana.entity.ComputeLog;

public class ResponseGetComputeLog {
	
	int type;
	List<ComputeLog> computeLogLists;
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public List<ComputeLog> getComputeLogLists() {
		return computeLogLists;
	}
	public void setComputeLogLists(List<ComputeLog> computeLogLists) {
		this.computeLogLists = computeLogLists;
	}
	
	
}
