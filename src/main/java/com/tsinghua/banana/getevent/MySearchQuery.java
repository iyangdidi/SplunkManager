package com.tsinghua.banana.getevent;

public class MySearchQuery {
	//private String MySearch;
	private StringBuffer MySearch;
	
	public MySearchQuery()
	{
		this.MySearch = new StringBuffer("");
	}
	
	public void StartSearch()
	{
		this.MySearch.setLength(0);
		System.out.println(this.MySearch);
		this.MySearch.append("search ");
		System.out.println(this.MySearch);
	}
	
	public void AppendHost(String host)
	{
		this.MySearch.append(" host = ");
		this.MySearch.append(host);
	}
	
	public void Appendsource(String source)
	{
		this.MySearch.append(" source = ");
		this.MySearch.append(source);
	}
	
	public void Appendsourcetype(String sourcetype)
	{
		this.MySearch.append(" sourcetype = ");
		this.MySearch.append(sourcetype);
	}
	
	public void AppendContent(String Content)
	{
		this.MySearch.append(" ");
		this.MySearch.append(Content);
		this.MySearch.append(" ");
	}
	
	public void AppendHeadInt(int head)
	{
		this.MySearch.append(" |head ");
		this.MySearch.append(String.valueOf(head));
	}
	
	public String GetSearch()
	{
		return this.MySearch.toString();
	}
}
