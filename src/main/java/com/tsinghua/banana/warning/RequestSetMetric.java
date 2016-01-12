package com.tsinghua.banana.warning;

import java.util.List;

public class RequestSetMetric {
	List<Metric> metricList;
	List<String> unionList;
	
	public List<Metric> getMetricList() {
		return metricList;
	}
	public void setMetricList(List<Metric> metricList) {
		this.metricList = metricList;
	}
	public List<String> getUnionList() {
		return unionList;
	}
	public void setUnionList(List<String> unionList) {
		this.unionList = unionList;
	}
	
}
