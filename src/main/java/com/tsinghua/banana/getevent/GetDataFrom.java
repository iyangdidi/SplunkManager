/**
 * 
 */
/**
 * @author Jiangyy
 *
 */
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

public class GetDataFrom{

	
    public static void main(String[] args) throws InterruptedException, IOException {

        // Create a map of arguments and add login parameters
    	
    	LogSplunk LogSplunk = new LogSplunk("admin","changeme","localhost",8089);
        Service service  = LogSplunk.ConnectService();
        
        ConstraintJob Constrantjob1 = new ConstraintJob("search * | head 7000",service);
        Job job = Constrantjob1.GetJobFromServiceAndQuery();


        // Specify JSON as the output mode for results
        JobResultsArgs resultsArgs = new JobResultsArgs();
        resultsArgs.setOutputMode(JobResultsArgs.OutputMode.JSON);

        // Display results in JSON using ResultsReaderJson
        InputStream results = job.getResults(resultsArgs);
        ResultsReaderJson resultsReader = new ResultsReaderJson(results);
        HashMap<String, String> event;
        //System.out.println("\nFormatted results from the search job as JSON\n");
        while ((event = resultsReader.getNextEvent()) != null) {
        	if(event.get("source").contains("UPS���.UPS1"))
        	{
        		System.out.println(event.get("_raw"));
        	}      
        }
        resultsReader.close();
    }
}