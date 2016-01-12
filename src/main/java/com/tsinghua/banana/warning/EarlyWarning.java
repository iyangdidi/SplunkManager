package com.tsinghua.banana.warning;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import com.tsinghua.banana.getevent.*;
import org.json.JSONException;
import org.json.JSONObject;

import com.splunk.Job;
import com.splunk.JobResultsArgs;
import com.splunk.ResultsReaderJson;
import com.splunk.Service;

public class EarlyWarning {

	private JSONObject ObjectJson;
	private JSONObject ReferenceJson;
	//private Service service;
	private JSONObject CurrentJson;
	private List<String[]> list;
	
	public EarlyWarning() throws JSONException
	{
		this.ObjectJson = new JSONObject();
		this.CurrentJson = new JSONObject(); 
		this.ReferenceJson = ReadFile(EarlyWarning.class.getResource("Refer.json").getPath());
		//System.out.println(this.ReferenceJson);
		list = ReadWarningFile(EarlyWarning.class.getResource("WariningList.csv").getPath());
		
	}
	
	public List<String[]> GetWarningList()
	{
		return this.list;
	}
	
	
	public List<String[]> ReadWarningFile(String path)
	{
		ArrayList<String[]>it= new ArrayList<String[]>();
		File file = new File(path);  
        BufferedReader reader = null;  
        String laststr = "";  
        try {  
            reader = new BufferedReader(new FileReader(file));  
            String tempString = null;
            reader.readLine();
            while ((tempString = reader.readLine()) != null) {
            	//System.out.println(tempString);
                it.add(tempString.split(","));
            }  
            reader.close();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            if (reader != null) {  
                try {  
                    reader.close();  
                } catch (IOException e1){  
                }  
            }  
        }
        return it;
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
	                } catch (IOException e1){  
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
	 
	 
	 /*
	 public HashMap GetEarlyAMachineWarning()
	 {
		 
	 }
	 */
	 
	 
	 public String GetEarlyWarning(String Device,String Item,String DnLimit,String UpLimit,Job job) throws IOException, InterruptedException, JSONException
	 {

	        // Specify JSON as the output mode for results
		 	
		 	
		 	HashMap<String,String> map = new HashMap<String,String>();
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
	        	if(!Device.equals(MaybeKey))
	        	{
	        		continue;
	        	}
	            //System.out.println(event.get("_raw"));
        		String[] DataArray = event.get("_raw").split(",");
        		JSONObject Refer = this.ReferenceJson.getJSONObject(MaybeKey);
  
        		                
                    
                if(Float.parseFloat(DataArray[Refer.getInt(Item)]) >= Float.parseFloat(UpLimit))
                {
                	return "Warning";
                }
                if(Float.parseFloat(DataArray[Refer.getInt(Item)]) <= Float.parseFloat(DnLimit))
                {
                	return "Warning";
                }
                return "Normal";
                //CycleJsonObject.put(MaybeKey,ItemJsonObject); 
	        }
	        return "Nodata";
			
			
		}
	 
	 
	    public HashMap GetWarningINFO(Service service) throws JSONException, IOException, InterruptedException
		{
	        //
	        
	        HashMap<String , String> it = new HashMap<String , String>(); 
	        
	        for(int i = 0; i < this.GetWarningList().size(); i ++)
	        {
	        	String TmpWarning[] = this.GetWarningList().get(i);
	        	String Search = "search host = Third source = "+ TmpWarning[0] + ".csv |head 1";
	        	ConstraintJob JobQuery1 = new ConstraintJob(Search,service);
	        	String Score = this.GetEarlyWarning(TmpWarning[0],TmpWarning[1],TmpWarning[2],TmpWarning[3],JobQuery1.GetJobFromServiceAndQuery());
	        	it.put(TmpWarning[0]+","+TmpWarning[1], Score);
	        }	    	
	    	return it;
		}
	    
	    
	   
	    
	    /*
	    public static void main(String arg[])
	    {
	    	EarlyWarning sss = null;
			try {
				sss = new EarlyWarning();
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	    	LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
	        Service service  = LogSplunk.ConnectService();
	    	
	    	try {
				System.out.println(sss.GetWarningINFO(service).toString());
			} catch (JSONException | IOException | InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    }
	    */
	
	
}
