package com.tsinghua.banana.getevent;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.splunk.Job;
import com.splunk.JobResultsArgs;
import com.splunk.ResultsReaderJson;
import com.splunk.Service;

public class GetJsonFrom{

	private JSONObject ObjectJson;
	private JSONObject ReferenceJson;
	//private Service service;
	private JSONObject CurrentJson;
	public GetJsonFrom() throws JSONException
	{
		this.ObjectJson = new JSONObject();
		this.CurrentJson = new JSONObject(); 
		this.ReferenceJson = ReadFile(GetJsonFrom.class.getResource("Refer.json").getPath());
	}
	
	
	 public JSONObject ReadFile(String path) throws JSONException {  
	        File file = new File(path);  
	        BufferedReader reader = null;  
	        String laststr = "";  
	        try {  
	            reader = new BufferedReader(new FileReader(file));  
	            String tempString = null;  
	            while ((tempString = reader.readLine()) != null) {  
	                laststr = laststr + tempString;  
	            }  
	            reader.close();  
	        } catch (IOException e) {  
	            e.printStackTrace();  
	        } finally {  
	            if (reader != null) {  
	                try {  
	                    reader.close();  
	                } catch (IOException e1) {  
	                }  
	            }  
	        }
	        JSONObject ReferJson = new JSONObject();
	        JSONObject TempJson = new JSONObject(laststr);
	        Iterator it = TempJson.keys();  
            while (it.hasNext()) {  
                String key = (String) it.next();
                ReferJson.put(key, new JSONObject(TempJson.getString(key).toString()));
            }
	        return ReferJson;
 	        
	    }
	 
	 
	 public JSONObject GetJsonDependOn(JSONObject CycleJsonObject,Job job) throws IOException, InterruptedException, JSONException
	 {

	        
	        
	        /*
	         * 
	         * SPLIT FROM THIS LINE? 
	         */
	        
	        
	        


	        // Specify JSON as the output mode for results
	        JobResultsArgs resultsArgs = new JobResultsArgs();
	        resultsArgs.setOutputMode(JobResultsArgs.OutputMode.JSON);

	        // Display results in JSON using ResultsReaderJson
	        InputStream results = job.getResults(resultsArgs);
	        ResultsReaderJson resultsReader = new ResultsReaderJson(results);
	        HashMap<String, String> event;
	        JSONObject json=new JSONObject();  
	        while ((event = resultsReader.getNextEvent()) != null) {
	        	//System.out.println(event.get("_raw"));
	        	String MaybeKey = event.get("source").substring(0,event.get("source").length() - 4);
	        	//System.out.println(MaybeKey);
	        	if(CycleJsonObject.isNull(MaybeKey))
	        	{
	        		continue;
	        	}
	            //System.out.println(event.get("_raw"));
        		String[] DataArray = event.get("_raw").split(",");
        		
        		JSONObject ItemJsonObject = CycleJsonObject.getJSONObject(MaybeKey);
        		JSONObject Refer = this.ReferenceJson.getJSONObject(MaybeKey);
        		//System.out.println(MaybeKey);
        		Iterator it = ItemJsonObject.keys();  
                while (it.hasNext()) {  
                    String key = (String) it.next();
                    ItemJsonObject.put(key,DataArray[Refer.getInt(key)]);
                }
                CycleJsonObject.put(MaybeKey,ItemJsonObject); 
	        }
			return CycleJsonObject;
			
		} 
 
	
	 
	 
	 
	public JSONObject GetJsonDependOn(String Devicename,List<String>AttributeList,Job job) throws IOException, InterruptedException, JSONException
	{

        
        
        /*
         * 
         * SPLIT FROM THIS LINE? 
         */
        
        // Specify JSON as the output mode for results
        JobResultsArgs resultsArgs = new JobResultsArgs();
        resultsArgs.setOutputMode(JobResultsArgs.OutputMode.JSON);

        // Display results in JSON using ResultsReaderJson
        InputStream results = job.getResults(resultsArgs);
        ResultsReaderJson resultsReader = new ResultsReaderJson(results);
        HashMap<String, String> event;
        //System.out.println("\nFormatted results from the search job as JSON\n");
        JSONObject json=new JSONObject();  
        JSONArray jsonMembers = new JSONArray();  
        JSONObject member = new JSONObject();
        JSONObject Refer = this.ReferenceJson.getJSONObject(Devicename);
        //System.out.println(this.ReferenceJson.get(Devicename));
        //System.out.println(Refer.toString());
        //System.out.println(Arrays.toString(AttributeList.toArray(new String[AttributeList.size()])));
         
        while ((event = resultsReader.getNextEvent()) != null) {
        	
        	//System.out.println(event.get("source"));
        	if(event.get("source").contains(Devicename))
        	{
        		//System.out.println(event.get("_raw"));
        		String[] DataArray = event.get("_raw").split(",");
        		
        		for(int i = 0;i < AttributeList.size();i++)
        		{
        			String Temp = AttributeList.get(i);
        			//System.out.println(Refer.getInt(Temp));
        			member.put(Temp, DataArray[Refer.getInt(Temp)]);
        		}
        	}
        	jsonMembers.put(member); 
        }
        json.put(Devicename, jsonMembers);
        resultsReader.close();
		return json;
		
	}
	
	
	public HashMap GetMapFromSplunk(String Device,String Item[],Job job) throws IOException, InterruptedException, JSONException
	 {

	        JobResultsArgs resultsArgs = new JobResultsArgs();
	        resultsArgs.setOutputMode(JobResultsArgs.OutputMode.JSON);

	        // Display results in JSON using ResultsReaderJson
	        InputStream results = job.getResults(resultsArgs);
	        ResultsReaderJson resultsReader = new ResultsReaderJson(results);
	        HashMap<String, String> event;
	        
	        HashMap<String, String> map = new HashMap<String,String>();
	        JSONObject json=new JSONObject();  
	        while ((event = resultsReader.getNextEvent()) != null) {
	        	String MaybeKey = event.get("source").substring(0,event.get("source").length() - 4);
	        	if(!Device.contains(MaybeKey))
	        	{
	        		continue;
	        	}
	        	String[] DataArray = event.get("_raw").split(",");   		
       		JSONObject Refer = this.ReferenceJson.getJSONObject(MaybeKey);
       		String GetTime = DataArray[Refer.getInt(Item[0])];
       		
       		map.put(GetTime,DataArray[Refer.getInt(Item[1])]);
	        }
			
	        return map;
	}
	
	
	public HashMap GetItemMapFromSplunk(String Device) throws JSONException
	{
		HashMap<String, String> map = new HashMap<String,String>();
		Iterator it = this.ReferenceJson.getJSONObject(Device).keys();
		while(it.hasNext())
		{
			String Key = it.next().toString();
			map.put(Key, "1");
		}
		return map;
	}

	
	public static HashMap GetDemo2() throws JSONException
	{
		GetJsonFrom sss = new GetJsonFrom();
		return sss.GetItemMapFromSplunk("UPS监控.UPS1");
	}
	
	public static Map GetDemo() throws JSONException, IOException, InterruptedException
	{
		//LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
		LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
        Service service  = LogSplunk.ConnectService();
    	
    	
       
    	GetJsonFrom sss = new GetJsonFrom();

    	
    	MySearchQuery MySearch = new MySearchQuery();
    	MySearch.StartSearch();
    	//MySearch.AppendHost();
    	MySearch.Appendsource("UPS监控.UPS1"+".csv");
    	MySearch.AppendHeadInt(2);
    	
    	System.out.println(MySearch.GetSearch());
    	
    	ConstraintJob JobQuery = new ConstraintJob(MySearch.GetSearch(),service);


    	String[] Item = {"Time","主输入电流A"};
    	return sss.GetMapFromSplunk("UPS监控.UPS1.csv",Item, JobQuery.GetJobFromServiceAndQuery());

        
        
	}
	/*
	public static JSONObject GetUPSINFO() throws JSONException, IOException, InterruptedException
	{
		LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
        Service service  = LogSplunk.ConnectService();
    	
    	
       
    	GetJsonFrom sss = new GetJsonFrom();

    	List aaaa = new ArrayList<String>();
    	aaaa.add("主输入电流A");
    	aaaa.add("主输入相电压A");
    	aaaa.add("Time");
    	
    	//String MySearch = MySearchString("","UPS监控.UPS1"+".csv","",10);
    	MySearchQuery MySearch = new MySearchQuery();
    	MySearch.StartSearch();
    	//MySearch.AppendHost();
    	MySearch.Appendsource("UPS监控.UPS1"+".csv");
    	MySearch.AppendHeadInt(2);
    	
    	System.out.println(MySearch.GetSearch());
    	
    	ConstraintJob JobQuery = new ConstraintJob(MySearch.GetSearch(),service);
    	//JobQuery.EventStartTime("2015-06-19T12:00:00.000-07:00");  
    	//JobQuery.EventEndTime("2015-12-12T12:00:00.000-07:00");	
    	JSONObject cccc = sss.GetJsonDependOn("UPS监控.UPS1",aaaa,JobQuery.GetJobFromServiceAndQuery());
    	return cccc;
	}
	*/
	
	/*
	public static JSONObject GetUPSINFO() throws JSONException, IOException, InterruptedException
	{
		LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
        Service service  = LogSplunk.ConnectService();
    	
    	
        
     
    	GetJsonFrom sss = new GetJsonFrom();

    	List aaaa = new ArrayList<String>();
    	aaaa.add("主输入电流A");
    	aaaa.add("主输入相电压A");
    	aaaa.add("Time");
    	
    	
    	ConstraintJob JobQuery = new ConstraintJob("search *",service);
    	//JobQuery.EventStartTime("2015-06-19T12:00:00.000-07:00");  
    	//JobQuery.EventEndTime("2015-12-12T12:00:00.000-07:00");	
    	JSONObject cccc = sss.GetJsonDependOn("UPS监控.UPS1",aaaa,JobQuery.GetJobFromServiceAndQuery());
    	return cccc;
	}
	*/
	
	/*
	public static JSONObject GetAllINFO() throws JSONException, IOException, InterruptedException
	{
		LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
        Service service  = LogSplunk.ConnectService();
    	
    	
        GetJsonFrom sss = new GetJsonFrom();
        JSONObject InputIII = new JSONObject();
    	JSONObject member1 = new JSONObject();
    	JSONObject member2 = new JSONObject();
    	JSONObject member3 = new JSONObject();
    	member1.put("主输入电流A", "");
    	member1.put("主输入相电压A", "");
    	InputIII.put("UPS监控.UPS1", member1);
    	member2.put("主输入电流A", "");
    	member2.put("主输入相电压A", "");
    	InputIII.put("UPS监控.UPS2", member2);
    	member3.put("湿度", "");
    	member3.put("湿度设定值", "");
    	InputIII.put("空调监控.102施耐德空调2", member3);
    	//= sss.ReadFile("D:\\JYYY.json");

    	ConstraintJob JobQuery1 = new ConstraintJob("search *",service);
    	//JobQuery1.EventStartTime("2015-12-11T12:00:00.000-07:00");  
    	//JobQuery1.EventEndTime("2015-12-13T12:00:00.000-07:00");	
    	JSONObject qqqqq = sss.GetJsonDependOn(InputIII,JobQuery1.GetJobFromServiceAndQuery());
    	
    	return qqqqq;
	}
	
	*/
	
	
    public static void main(String[] args) throws InterruptedException, IOException, JSONException {
  
	
    	
    	System.out.println(GetDemo().toString());

 
    	
    }
}
