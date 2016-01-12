package com.tsinghua.banana.getevent;

import com.splunk.Service;
import com.splunk.ServiceArgs;

public class LogSplunk {
	private ServiceArgs loginArgs;
	private Service service;
	
	public LogSplunk(String Username,String Secret,String URL)
	{
		this.loginArgs = new ServiceArgs();
		this.loginArgs.setUsername(Username);
		this.loginArgs.setPassword(Secret);
        String Temp[] = URL.split(":", 2);
        this.loginArgs.setHost(Temp[0]);
        this.loginArgs.setPort(Integer.parseInt(Temp[1]));
	}
	
	
	public LogSplunk(String Username,String Secret,String Address,int Port)
	{
		this.loginArgs = new ServiceArgs();
		this.loginArgs.setUsername(Username);
		this.loginArgs.setPassword(Secret);  
		this.loginArgs.setHost(Address);
		this.loginArgs.setPort(Port);
	}
	
	public Service ConnectService()
	{
		try
		{
			this.service  = Service.connect(this.loginArgs);
		}
		catch(Exception e)
		{
			System.out.println("**");
			return null;
		}
		return this.service;	
	}
        
        
        


       
}
