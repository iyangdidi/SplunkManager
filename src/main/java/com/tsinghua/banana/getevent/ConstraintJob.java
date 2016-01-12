package com.tsinghua.banana.getevent;

import com.splunk.Args;
import com.splunk.Job;
import com.splunk.Service;

public class ConstraintJob {
	private Args queryArgs;
	private String MyQuery;
	private Service service;
	private Job job;
	
	public ConstraintJob(String MyQuery,Service service)
	{
		this.queryArgs = new Args();
		this.MyQuery = MyQuery;
		this.service = service;
	}
	
	public void EventStartTime(String st)
	{
		this.queryArgs.put("earliest_time", st);
        //oneshotSearchArgs.put("latest_time",   "2015-12-20T12:00:00.000-07:00");
		/*
		 *    queryArgs.put("field_list", fieldList);
        if (latestTime != null)
            
        if (statusBuckets > 0)
            queryArgs.put("status_buckets", statusBuckets);
		 */
	}
	
	public void EventEndTime(String st)
	{
		this.queryArgs.put("latest_time", st);
	}
	
	public Job GetJobFromServiceAndQuery() throws InterruptedException
	{
        this.job = this.service.getJobs().create(this.MyQuery,this.queryArgs);
        while (!this.job.isDone()) {
            Thread.sleep(500);
        }
        return this.job;
	}
	
	//public 
}
