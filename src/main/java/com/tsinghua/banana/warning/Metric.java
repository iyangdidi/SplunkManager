package com.tsinghua.banana.warning;

public class Metric {
	int id;
	String name;
	double upper;
	double bottom;
	String union_id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getUpper() {
		return upper;
	}
	public void setUpper(double upper) {
		this.upper = upper;
	}
	public double getBottom() {
		return bottom;
	}
	public void setBottom(double bottom) {
		this.bottom = bottom;
	}
	public String getUnion_id() {
		return union_id;
	}
	public void setUnion_id(String union_id) {
		this.union_id = union_id;
	}
	
}
