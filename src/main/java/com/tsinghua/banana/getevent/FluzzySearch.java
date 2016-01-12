package com.tsinghua.banana.getevent;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import com.splunk.Application;
import com.splunk.Job;
import com.splunk.JobResultsArgs;
import com.splunk.ResultsReaderJson;
import com.splunk.Service;
import com.splunk.ServiceArgs;

public class FluzzySearch {

	private String SearchFluzzy;

	public FluzzySearch(String KeyWords)
	{
		this.SearchFluzzy = "search source = "+KeyWords+"* | stats count by source";
	}
	
	public FluzzySearch(String HostWords,String KeyWords)
	{
		this.SearchFluzzy = "search ";
		if(!HostWords.equals(""))
		{
			this.SearchFluzzy += " host = "+ HostWords;
		}
		if(!KeyWords.equals(""))
		{
			this.SearchFluzzy += " source = "+ KeyWords;
		}
		this.SearchFluzzy += "| stats count by source";
		//System.out.println(this.SearchFluzzy);
	}
	
	public HashMap ExecuteFluzzySearch(Service service) throws InterruptedException, IOException
	{

	
		HashMap<String, String> it = new HashMap<String, String>();

		System.out.println(this.SearchFluzzy);
        Job job = service.getJobs().create(this.SearchFluzzy);

        // Wait for the job to finish
        while (!job.isDone()) {
            Thread.sleep(500);
        }

        JobResultsArgs resultsArgs = new JobResultsArgs();
        resultsArgs.setOutputMode(JobResultsArgs.OutputMode.JSON);

        // Display results in JSON using ResultsReaderJson
        InputStream results = job.getResults(resultsArgs);
        ResultsReaderJson resultsReader = new ResultsReaderJson(results);
        HashMap<String, String> event;
        while ((event = resultsReader.getNextEvent()) != null) {
       	
        	System.out.println(event);
        	it.put(event.get("source"), event.get("count"));
        }
        resultsReader.close();
        return it;
	}
	
	/*
	public static void main(String args[]) throws InterruptedException, IOException
	{
		
        ServiceArgs loginArgs = new ServiceArgs();
        loginArgs.setUsername("admin");
        loginArgs.setPassword("5201314");
        loginArgs.setHost("10.2.1.166");
        loginArgs.setPort(8089);
        
    
        Service service  = Service.connect(loginArgs);
        
        FluzzySearch kk = new FluzzySearch("UPS");
        System.out.println(kk.ExecuteFluzzySearch(service));
	}
	*/


}
