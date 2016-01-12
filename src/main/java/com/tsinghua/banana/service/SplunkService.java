package com.tsinghua.banana.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.tsinghua.banana.entity.ComputeLog;
import com.tsinghua.banana.getevent.ConstraintJob;
import com.tsinghua.banana.getevent.FluzzySearch;
import com.tsinghua.banana.getevent.GetJsonFrom;
import com.tsinghua.banana.getevent.LogSplunk;
import com.tsinghua.banana.getevent.MySearchQuery;
import com.tsinghua.banana.interfacebean.request.RequestCommon;
import com.tsinghua.banana.interfacebean.response.ResponseCommonCountSource;
import com.tsinghua.banana.interfacebean.response.ResponseGetComputeLog;
import com.tsinghua.banana.interfacebean.response.ResponseGetComputeLog2;
import com.tsinghua.banana.interfacebean.response.ResponseGetEvent;
import com.tsinghua.banana.interfacebean.response.ResponseGetInfoTemp;
import com.tsinghua.banana.interfacebean.response.ResponseGetMuiltipleView;
import com.tsinghua.banana.interfacebean.response.ResponseGetRawData;
import com.tsinghua.banana.util.ComputeEnum;
import com.tsinghua.banana.util.Constants;
import com.tsinghua.banana.util.RequestEnum;
import com.tsinghua.banana.warning.ResponseGetMetric;
import com.splunk.*;

@Service
public class SplunkService {
	
	public com.splunk.Service service;
	
	public void connectToSplunk(){
		LogSplunk LogSplunk = new LogSplunk("admin","5201314","10.2.1.166",8089);
        service  = LogSplunk.ConnectService();
	}
	
	public ResponseGetInfoTemp getAirConditionTemperature(){
		
		this.connectToSplunk();
		
		this.testInfo();
		
		ResponseGetInfoTemp response = new ResponseGetInfoTemp();
		
		return response;
	}	
	
	public void testInfo(){
//		//Test infomation - print all the splunk user
//		for (User user : service.getUsers().values())
//		    System.out.println(user.getName());
		
//		for (Application app : service.getApplications().values())
//		    System.out.println(app.getName());
		
//		int count = 30;
//		int offset = 0;
//		ConfCollection confs;
//		CollectionArgs collargs = new CollectionArgs();
//		collargs.setCount(count);
//		collargs.setOffset(offset);
//
//		confs = service.getConfs(collargs);
//		// Got the first 30 elements
//		offset = offset + 30;
//		collargs.setOffset(offset);
//		confs = service.getConfs(collargs);
//		// Got the next 30 elements
		
//		// Retrieve the collection
//		JobCollection jobs = service.getJobs();
//		System.out.println("There are " + jobs.size() + " jobs available to 'admin'\n");
//
//		// List the job SIDs
//		for (Job job : jobs.values()) {
//		    System.out.println(job.getName());
//		}
		
		// Run a normal search
		//host=centos-client01 source=/var/log/log/ceilometer/* | head 10
		String searchQuery_normal = "search host=centos-client01 source=/var/log/log/ceilometer/* | head 10";
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(searchQuery_normal, jobargs);

		// Wait for the search to finish
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        // TODO Auto-generated catch block
		        e.printStackTrace();
		    }
		}
		// Get the search results and use the built-in XML parser to display them
		InputStream resultsNormalSearch =  job.getResults();

		ResultsReaderXml resultsReaderNormalSearch;

		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");
		        for (String key: event.keySet())
		            System.out.println("   " + key + ":  " + event.get(key));
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}

		// Get properties of the completed job
		System.out.println("\nSearch job properties\n---------------------");
		System.out.println("Search job ID:         " + job.getSid());
		System.out.println("The number of events:  " + job.getEventCount());
		System.out.println("The number of results: " + job.getResultCount());
		System.out.println("Search duration:       " + job.getRunDuration() + " seconds");
		System.out.println("This job expires in:   " + job.getTtl() + " seconds");
		
//		// Create a simple search job
//		try {
//
//			String mySearch = "search * | head 5";
//			Job job = service.getJobs().create(mySearch);
//
//			// Wait for the job to finish
//			while (!job.isDone()) {
//				Thread.sleep(500);
//			}
//
//			// Display results
//			InputStream results = job.getResults();
//			String line = null;
//			System.out.println("Results from the search job as XML:\n");
//			BufferedReader br = new BufferedReader(new InputStreamReader(
//					results, "UTF-8"));
//			while ((line = br.readLine()) != null) {
//				System.out.println(line);
//			}
//			br.close();
//		} catch (Exception e) {
//		}
		
//		GetJsonFrom sss = new GetJsonFrom();
//		
//		List aaaa = new ArrayList<String>();
//    	aaaa.add("���������A");
//    	aaaa.add("���������ѹA");
//    	aaaa.add("Time");   	
//    	
//    	ConstraintJob JobQuery = new ConstraintJob("search *",service);
//    	JobQuery.EventStartTime("2015-06-19T12:00:00.000-07:00");  
//    	JobQuery.EventEndTime("2015-12-12T12:00:00.000-07:00");	
//    	JSONObject cccc = sss.GetJsonDependOn("UPS���.UPS1",aaaa,JobQuery.GetJobFromServiceAndQuery());
	}

	public ResponseGetComputeLog getComputeError() {
		
		//连接Splunk
		this.connectToSplunk();
		
		//添加查询信息
		MySearchQuery serchStr = new MySearchQuery();
		serchStr.StartSearch();
		serchStr.AppendHost("centos-client01");
		serchStr.Appendsource("/var/log/log/ceilometer/compute.log");
		serchStr.AppendContent("field4=ERROR");
        //MySearch.AppendContent("110");
		serchStr.AppendHeadInt(10);
        
        //执行查询
        String searchQuery_normal = serchStr.GetSearch();//"search host=centos-client01 source=/var/log/log/ceilometer/* | head 10";
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(searchQuery_normal, jobargs);
		
		//等待查询完毕
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        e.printStackTrace();
		    }
		}
		
		//结果处理
		InputStream resultsNormalSearch =  job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		List<ComputeLog> computeLogList = new ArrayList<ComputeLog>();
		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;		    
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");			    	
		        ComputeLog log = null;
		        for (String key: event.keySet())
		        {
		        	if(key.equals("_raw")){
		        		String _raw = event.get(key);		        			        		
		        		log = getComputeLogCodeAndDesc(_raw);
		        		//computeLogList.add(log);
		        	}
		            System.out.println("   " + key + ":  " + event.get(key));
		        }
		        computeLogList.add(log);
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
        
        ResponseGetComputeLog response = new ResponseGetComputeLog();
        response.setType(ComputeEnum.COMPUTE_ERROR.getValue());
        response.setComputeLogLists(computeLogList);
		
		return response;
	}
	public ResponseGetComputeLog2 getComputeAllType() {
		
		//连接Splunk
		this.connectToSplunk();
        
        //执行查询
		String search = "search  host="+Constants.HOST+" source = /var/log/ceilometer/compute.log | stats count by field4";
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);
		
		//等待查询完毕
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        e.printStackTrace();
		    }
		}
		
		//结果处理
		InputStream resultsNormalSearch =  job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		//List<ComputeLog> computeLogList = new ArrayList<ComputeLog>();
		HashMap map = new HashMap();
		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;		    
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");			    	
		        
		        //ComputeLog log = null;
		        String[] tmp = new String[2];//=2
		        int i=0;
		        for (String key: event.keySet())
		        {
		        	//map.put(arg0, arg1)
		        	tmp[i++] = event.get(key);		        	
		            System.out.println("   " + key + ":  " + event.get(key));
		        }
		        //computeLogList.add(log);
		        map.put(tmp[0], tmp[1]);
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
        
        ResponseGetComputeLog2 response = new ResponseGetComputeLog2();
        response.setType(ComputeEnum.COMPUTE_ALL.getValue());
        response.setMap(map);
		
		return response;
	}
	
	public ComputeLog getComputeLogCodeAndDesc(String _raw){	
		
		ComputeLog log = new ComputeLog();
		
		String[] _datas = _raw.split(":");
		String info = _datas[_datas.length-1];			
		String[] tmps = info.split("\\.");
		info = tmps[0].trim();
		tmps = info.split(" ");
		
		String code = "";
		String desc = "";
		if(info.charAt(0) == '['){	
			code = tmps[1].trim(); 
			code = code.substring(0, code.length()-1);
			desc = tmps[tmps.length-1];
		}else if(info.charAt(info.length()-1) == ')'){
			code = tmps[tmps.length-1].trim(); 
			code = code.substring(0,code.length()-1);
			desc = tmps[0]+tmps[1];
		}else{
			desc = info;
		}	
		log.setCode(code);
		log.setDescribe(desc);
		
		return log;
	}

	public ResponseGetRawData getRawData(RequestCommon request) {
		ResponseGetRawData response = new ResponseGetRawData();
		
		int request_id = request.getRequest_id();
		//type_name,page
		String[] keys = request.getKeyword().split(",");
		String search = "";
		String search_totalData = "";
		int total = Constants.PAGE_NUM*Integer.parseInt(keys[1]);
		//if(request_id == RequestEnum.Request_ComputeLog.getValue())			
			//response = this.getComputeLogRawData(request.getKeyword());
		if(request_id == RequestEnum.Request_ComputeLog_Type.getValue())
		{
			search_totalData = Constants.computeLog_search_pre + Constants.count_total;
			search = Constants.computeLog_search_pre + " field4=" + keys[0] + " | head "+total; 
		}
		else if(request_id == RequestEnum.Request_Search_Ceilometer.getValue())
		{
			search_totalData = Constants.search_ceilometer_pre + Constants.count_total;
			search = Constants.search_ceilometer_pre + " " + keys[0] + " | head "+total; 
		}else if(request_id == RequestEnum.Request_Feild1Count_Raw_Openvswitch.getValue()){	//source,total,field		
			String searchTmp = "search host="+Constants.HOST+" source="+keys[0]+" field1="+keys[2];// Constants.search_ceilometer_pre + " " + keys[0] + " | head "+total; 
			search_totalData = searchTmp + Constants.count_total;
			search = searchTmp + " | head "+total; 
		}else if(request_id == RequestEnum.Request_Search_Openvswitch.getValue()){
			search_totalData = Constants.search_openvswitch_pre + Constants.count_total;
			search = Constants.search_openvswitch_pre + " " + keys[0] + " | head "+total; 
		}
		
		response = this.splunkSearchPaged(search, total);
		response.setTotal(this.splunkSearchGetCount(search_totalData));		
		
		return response;
	}
	
	private ResponseGetRawData splunkSearchPaged(String search, int total){
		//连接Splunk
		this.connectToSplunk();
        
        //执行查询
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);
		
		//等待查询完毕
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        e.printStackTrace();
		    }
		}
		
		//结果处理
		InputStream resultsNormalSearch =  job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		List<String> rawDatas = new ArrayList<String>();
		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;	
		    
		    //跳过前面的部分，取最后的PAGE_NUM条
		    int preNum = total - Constants.PAGE_NUM;
		    if(preNum > 0){
		    	while(resultsReaderNormalSearch.getNextEvent()!=null && preNum>1){
		    		preNum--;
		    	}
		    }		    
		    //取剩下的条目
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");			    	
		        String rawData = "";
		        for (String key: event.keySet())
		        {
		        	if(key.equals("_raw"))  
		        		rawData = event.get(key);
		            System.out.println("   " + key + ":  " + event.get(key));
		        }
		        rawDatas.add(rawData);
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
        
		ResponseGetRawData response = new ResponseGetRawData();
		response.setRawDatas(rawDatas);
		return response;
	}
	
	private int splunkSearchGetCount(String search){
		// 连接Splunk
		this.connectToSplunk();

		// 执行查询
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);

		// 等待查询完毕
		while (!job.isDone()) {
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

		// 结果处理
		InputStream resultsNormalSearch = job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		List<String> rawDatas = new ArrayList<String>();
		try {
			resultsReaderNormalSearch = new ResultsReaderXml(
					resultsNormalSearch);
			HashMap<String, String> event;

			// 取剩下的条目
			while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
				System.out.println("\n****************EVENT****************\n");
				String rawData = "";
				for (String key : event.keySet()) {					
					System.out.println("   " + key + ":  " + event.get(key));
					return Integer.parseInt(event.get(key));
				}
				rawDatas.add(rawData);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return 0;
	}

	private ResponseGetRawData getComputeLogRawData(String keyword) {		
		
		//eg: error,1
		String[] keys = keyword.split(",");		
		
		//连接Splunk
		this.connectToSplunk();
        
        //执行查询
		String search = "";
		if(keys.length > 0)
			search = Constants.computeLog_search_pre + " field4=" +keys[0];
		int total = 0;
		if(keys.length > 1){
			total = Integer.parseInt(keys[1])*Constants.PAGE_NUM;
			search += " " + "| head " + total;
		}
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);
		
		//等待查询完毕
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        e.printStackTrace();
		    }
		}
		
		//结果处理
		InputStream resultsNormalSearch =  job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		List<String> rawDatas = new ArrayList<String>();
		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;	
		    
		    //跳过前面的部分，取最后的PAGE_NUM条
		    int preNum = total - Constants.PAGE_NUM;
		    if(preNum > 0){
		    	while(resultsReaderNormalSearch.getNextEvent()!=null && preNum>1){
		    		preNum--;
		    	}
		    }		    
		    //取剩下的条目
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");			    	
		        String rawData = "";
		        for (String key: event.keySet())
		        {
		        	if(key.equals("_raw"))  
		        		rawData = event.get(key);
		            System.out.println("   " + key + ":  " + event.get(key));
		        }
		        rawDatas.add(rawData);
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
        
		ResponseGetRawData response = new ResponseGetRawData();
		response.setRawDatas(rawDatas);
		return response;
	}

	public ResponseCommonCountSource getCommonCountSource(RequestCommon request) {
		ResponseCommonCountSource response = new ResponseCommonCountSource();
		
		String search = "";
		if(request.getRequest_id() == RequestEnum.Request_SourceCount_Ceilometer.getValue())//监控openstack各组件的状态及资源使用情况
			search = Constants.search_ceilometer_pre;
		else if(request.getRequest_id() == RequestEnum.Request_SourceCount_Ceph.getValue())//存储资源的信息	
			search = Constants.search_ceph_pre;
		else if(request.getRequest_id() == RequestEnum.Request_SourceCount_Neutron.getValue())//网络资源信息
			search = Constants.search_neutron_pre;		
		else if(request.getRequest_id() == RequestEnum.Request_SourceCount_Nova.getValue())//计算资源的信息
			search = Constants.search_nova_pre;
		else if(request.getRequest_id() == RequestEnum.Request_SourceCount_Ntpstats.getValue())//时间信息
			search = Constants.search_ntpstats_pre;
		else if(request.getRequest_id() == RequestEnum.Request_SourceCount_Openvswitch.getValue())//虚拟交换机的信息
			search = Constants.search_openvswitch_pre;		
		search =  search+ Constants.count_by_source;
		
		response = this.splunkSearchCommonCountSource(search);
		return response;
	}

	private ResponseCommonCountSource splunkSearchCommonCountSource(String search){
		this.connectToSplunk();

		// 执行查询
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);

		// 等待查询完毕
		while (!job.isDone()) {
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

		// 结果处理
		InputStream resultsNormalSearch = job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		HashMap map = new HashMap();
		try {
			resultsReaderNormalSearch = new ResultsReaderXml(
					resultsNormalSearch);
			HashMap<String, String> event;
			
			while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
				System.out.println("\n****************EVENT****************\n");
				
				String[] tmp = new String[2];
				int i=0;
				for (String key : event.keySet()) {
					tmp[i++] = event.get(key);	
					System.out.println("   " + key + ":  " + event.get(key));
				}
				map.put(tmp[1], tmp[0]);				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		ResponseCommonCountSource response = new ResponseCommonCountSource();
		response.setMap(map);
		return response;
	}
	
	public ResponseGetRawData getRawDataBySource(String keyword) {
		
		//eg: source,pageNum
		String[] keys = keyword.split(",");		
		
		//连接Splunk
		this.connectToSplunk();
        
        //执行查询
		String search = "";
		if(keys.length > 0)
			search = "search host="+Constants.HOST+" source="+keys[0];//Constants.computeLog_search_pre + " field4=" +keys[0];
		int total = 0;
		if(keys.length > 1){
			total = Integer.parseInt(keys[1])*Constants.PAGE_NUM;
			search += " | head " + total;
		}
		JobArgs jobargs = new JobArgs();
		jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
		Job job = service.getJobs().create(search, jobargs);
		
		//等待查询完毕
		while (!job.isDone()) {
		    try {
		        Thread.sleep(500);
		    } catch (InterruptedException e) {
		        e.printStackTrace();
		    }
		}
		
		//结果处理
		InputStream resultsNormalSearch =  job.getResults();
		ResultsReaderXml resultsReaderNormalSearch;
		List<String> rawDatas = new ArrayList<String>();
		try {
		    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
		    HashMap<String, String> event;	
		    
		    //跳过前面的部分，取最后的PAGE_NUM条
		    int preNum = total - Constants.PAGE_NUM;
		    if(preNum > 0){
		    	while(resultsReaderNormalSearch.getNextEvent()!=null && preNum>1){
		    		preNum--;
		    	}
		    }		    
		    //取剩下的条目
		    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
		        System.out.println("\n****************EVENT****************\n");			    	
		        String rawData = "";
		        for (String key: event.keySet())
		        {
		        	if(key.equals("_raw"))  
		        		rawData = event.get(key);
		            System.out.println("   " + key + ":  " + event.get(key));
		        }
		        rawDatas.add(rawData);
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}
        
		ResponseGetRawData response = new ResponseGetRawData();
		response.setRawDatas(rawDatas);
		return response;
	}

//	public ResponseCommonCountSource getEvent(RequestCommon request) {
//		this.connectToSplunk();
//	
//    	
//		//machine_name,index
//    	//String[] keys = request.getKeyword().split(",");
//        
//    	String [] keysStrings = {"UPS监控.UPS1","主输入电流A","主输入相电压A","Time"};
//
//    	GetJsonFrom sss = null;
//		try {
//			sss = new GetJsonFrom();
//		} catch (JSONException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//
//    	List aaaa = new ArrayList<String>();
//    	
//    	for(int i = 1;i < keysStrings.length; i++)
//    	{
//    		aaaa.add(keysStrings[i]);
//    	}
//    	
//
//    	MySearchQuery MySearch = new MySearchQuery();
//    	MySearch.StartSearch();
//    	//MySearch.AppendHost("");
//    	MySearch.Appendsource(keysStrings[0]+".csv");
//    	//MySearch.AppendHeadInt(2);
//    	
//    	//System.out.println(MySearch.GetSearch());
//    	
//    	ConstraintJob JobQuery = new ConstraintJob(MySearch.GetSearch(),service);
//    	//JobQuery.EventStartTime("2015-06-19T12:00:00.000-07:00");  
//    	//JobQuery.EventEndTime("2015-12-12T12:00:00.000-07:00");	
//    	JSONObject cccc = null;
//		try {
//			cccc = sss.GetJsonDependOn(keysStrings[0],aaaa,JobQuery.GetJobFromServiceAndQuery());
//		} catch (Exception e) 
//		{
//			e.printStackTrace();
//		}
//    	System.out.println(cccc.toString());
//    	
//    	return null;
//    	//return cccc;
//	}
	
	
	
	
	public ResponseGetEvent getEvent(RequestCommon request) {		
		
		this.connectToSplunk();
	
    	
		//machine_name,index
    	//String[] keys = request.getKeyword().split(",");
        
		String DeveceName = "UPS监控.UPS1";
		
    	String [] keysStrings = {"Time","主输入电流A"};

    	GetJsonFrom sss = null;
		try {
			sss = new GetJsonFrom();
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

    	MySearchQuery MySearch = new MySearchQuery();
    	MySearch.StartSearch();
    	//MySearch.AppendHost("");
    	MySearch.Appendsource(DeveceName+".csv");
    	//MySearch.AppendHeadInt(2);
    	
    	//System.out.println(MySearch.GetSearch());
    	
    	ConstraintJob JobQuery = new ConstraintJob(MySearch.GetSearch(),service);
    	
    	ResponseGetEvent it = new ResponseGetEvent();
    	try {
			it.setMap(sss.GetMapFromSplunk(DeveceName+".csv",keysStrings,JobQuery.GetJobFromServiceAndQuery()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
    	return it;
	}

	public ResponseCommonCountSource getCroup(RequestCommon request) {
		
		String search="";
		String[] keys = request.getKeyword().split(",");//source
		if(request.getRequest_id() == RequestEnum.Request_Feild1Count_Openvswitch.getValue())
			search  = "search host="+Constants.HOST+" source="+keys[0]+" | stats count by field1";//+" field1="+keys[1];
		
		ResponseCommonCountSource response = this.splunkSearchCommonCountSource(search);
		return response;
	}
	
	/*
	 * ----------------------------------------------------------------
	 * 2015-12-29, Added by Samuel.Jiang
	 * ----------------------------------------------------------------
	 */
	public ResponseGetEvent getMachineOrItem(RequestCommon request) {
		ResponseGetEvent response = new ResponseGetEvent();
		System.out.println(request.getRequest_id());
		
//		try {
//			String keyword = URLEncoder.encode(request.getKeyword(), "UTF-8");
//			keyword = URLDecoder.decode(request.getKeyword(),"UTF-8");
//			keyword = URLDecoder.decode(keyword,"UTF-8");
//			System.out.println(keyword);
//		} catch (UnsupportedEncodingException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
		
		if(request.getRequest_id() == RequestEnum.Request_GetMachineName.getValue())
		{
			response = this.getFluzzySearch(request);
		}
		if(request.getRequest_id() == RequestEnum.Request_GetItemFromDpMachine.getValue())
		{
			try {
				System.out.println(request.getKeyword());
				
				//TEST-------------------
				//request.setKeyword("UPS监控.UPS2");
				//-----------------------
				
				response = this.getItemsDpMachine(request);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(request.getRequest_id() == RequestEnum.Request_GetContentDpMachineAndItem.getValue())
		{
			//TEST-------------------
			//request.setKeyword("UPS监控.UPS2,Time,主输入电流C");
			//-----------------------
			response = this.getContentEvent(request);
		}
//		if(request.getRequest_id() == RequestEnum.Request_GetContentDpMachineAndItem_muilti.getValue())
//		{
//			request.setKeyword("UPS监控.UPS2,Time,主输入电流C;UPS监控.UPS2,Time,主输入电流C");
//			response = this.getContentEvent(request);
//		}
		
		if(request.getRequest_id() == RequestEnum.Request_GetAllMachineName.getValue())
		{
			response = this.getAllMachineName(request);
		}
		System.out.println(response.getMap());
		/*
		 * Response 有问题
		 * 
		 */
		return response;
	}
	
	/*
	 * ----------------------------------------------------------------
	 * 2015-12-29, Added by Samuel.Jiang
	 * ----------------------------------------------------------------
	 */
	public ResponseGetEvent getAllMachineName(RequestCommon request) {
		this.connectToSplunk();
		 FluzzySearch kk = new FluzzySearch("Third","");
		 ResponseGetEvent it = new ResponseGetEvent();
		 System.out.println();
	     try {
	    	 it.setMap(kk.ExecuteFluzzySearch(service));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}   
	    return it;
	}
	
	
	
	/*
	 * ----------------------------------------------------------------
	 * 2015-12-29, Added by Samuel.Jiang
	 * ----------------------------------------------------------------
	 */
	public ResponseGetEvent getFluzzySearch(RequestCommon request) {
		
		this.connectToSplunk();
		 FluzzySearch kk = new FluzzySearch(request.getKeyword());
		 ResponseGetEvent it = new ResponseGetEvent();
	     try {
	    	 it.setMap(kk.ExecuteFluzzySearch(service));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}   
	    return it;
	}
	
	/*
	 * ----------------------------------------------------------------
	 * 2015-12-29, Added by Samuel.Jiang
	 * ----------------------------------------------------------------
	 */
	public ResponseGetEvent getItemsDpMachine(RequestCommon request) throws JSONException {
		this.connectToSplunk();
		
		String keys = request.getKeyword();
		if(keys.endsWith(".csv"))
		{
			keys = keys.substring(0, keys.length() - 4);
		}
		
		GetJsonFrom sss = null;
		try {
			sss = new GetJsonFrom();
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
				
		ResponseGetEvent it = new ResponseGetEvent();
    	try {
    		/*
    		 * need jyy to modify 中文
    		 * "UPS监控.UPS2"
    		 */
			it.setMap(sss.GetItemMapFromSplunk(keys));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
    	return it;
		
	}
	/*
	 * ----------------------------------------------------------------
	 * 2015-12-29, added by Samuel.Jiang
	 * ----------------------------------------------------------------
	 */
	public ResponseGetEvent getContentEvent(RequestCommon request) {
		
		this.connectToSplunk();
	
    	
		//machine_name,index
    	String[] keys = request.getKeyword().split(",");
    	String DeveceName = "";
    	
    	if(keys[0].endsWith(".csv"))
    	{
    		DeveceName = keys[0];
    	}
    	else
    	{
    		DeveceName = keys[0]+".csv";
    	}
		
		
    	String [] keysStrings = new String[2];
    	keysStrings[0] = keys[1];
    	keysStrings[1] = keys[2];

    	GetJsonFrom sss = null;
		try {
			sss = new GetJsonFrom();
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

    	MySearchQuery MySearch = new MySearchQuery();
    	MySearch.StartSearch();
    	//MySearch.AppendHost("");
    	MySearch.Appendsource(DeveceName);
    	//MySearch.AppendHeadInt(2);
    	
    	//System.out.println(MySearch.GetSearch());
    	
    	ConstraintJob JobQuery = new ConstraintJob(MySearch.GetSearch(),service);
    	
    	ResponseGetEvent it = new ResponseGetEvent();
    	try {
			it.setMap(sss.GetMapFromSplunk(DeveceName,keysStrings,JobQuery.GetJobFromServiceAndQuery()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
    	return it;
	}
	
	public ResponseGetMuiltipleView getMuiltipleView(RequestCommon request) {
		
		//request.getKeyword("UPS监控.UPS2,Time,主输入电流C;UPS监控.UPS2,Time,主输入电流C");
		String[] keyss = request.getKeyword().split(";");
		List<ResponseGetEvent> viewList = new ArrayList<ResponseGetEvent>();
		
		for(int i=0; i<keyss.length; i++){
			request.setKeyword(keyss[i]);
			ResponseGetEvent tmp = this.getContentEvent(request);
			viewList.add(tmp);
		}
		
		ResponseGetMuiltipleView response = new ResponseGetMuiltipleView();
		response.setViewList(viewList);		
		
		return response;
	}
	
//	private ResponseCommonCountSource getNeutronSource() {		
//	
//	// String[] keys = keyword.split(",");
//	// 连接Splunk
//	this.connectToSplunk();
//
//	// 执行查询
//	String search = Constants.search_neutron_pre + Constants.count_by_source;
//	JobArgs jobargs = new JobArgs();
//	jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
//	Job job = service.getJobs().create(search, jobargs);
//
//	// 等待查询完毕
//	while (!job.isDone()) {
//		try {
//			Thread.sleep(500);
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//	}
//
//	// 结果处理
//	InputStream resultsNormalSearch = job.getResults();
//	ResultsReaderXml resultsReaderNormalSearch;
//	HashMap map = new HashMap();
//	try {
//		resultsReaderNormalSearch = new ResultsReaderXml(
//				resultsNormalSearch);
//		HashMap<String, String> event;
//		
//		while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
//			System.out.println("\n****************EVENT****************\n");
//			
//			String[] tmp = new String[2];
//			int i=0;
//			for (String key : event.keySet()) {
//				tmp[i++] = event.get(key);	
//				System.out.println("   " + key + ":  " + event.get(key));
//			}
//			map.put(tmp[1], tmp[0]);				
//		}
//	} catch (Exception e) {
//		e.printStackTrace();
//	}
//	
//	ResponseCommonCountSource response = new ResponseCommonCountSource();
//	response.setMap(map);
//	return response;
//}

//public ResponseGetRawData splunkSearchGetRawData(String search, int total) {
//	//连接Splunk
//	this.connectToSplunk();
//
//	JobArgs jobargs = new JobArgs();
//	jobargs.setExecutionMode(JobArgs.ExecutionMode.NORMAL);
//	Job job = service.getJobs().create(search, jobargs);
//	
//	//等待查询完毕
//	while (!job.isDone()) {
//	    try {
//	        Thread.sleep(500);
//	    } catch (InterruptedException e) {
//	        e.printStackTrace();
//	    }
//	}
//	
//	//结果处理
//	InputStream resultsNormalSearch =  job.getResults();
//	ResultsReaderXml resultsReaderNormalSearch;
//	List<String> rawDatas = new ArrayList<String>();
//	try {
//	    resultsReaderNormalSearch = new ResultsReaderXml(resultsNormalSearch);
//	    HashMap<String, String> event;	
//	    
//	    //跳过前面的部分，取最后的PAGE_NUM条
//	    int preNum = total - Constants.PAGE_NUM;
//	    if(preNum > 0){
//	    	while(resultsReaderNormalSearch.getNextEvent()!=null && preNum>1){
//	    		preNum--;
//	    	}
//	    }		    
//	    //取剩下的条目
//	    while ((event = resultsReaderNormalSearch.getNextEvent()) != null) {
//	        System.out.println("\n****************EVENT****************\n");			    	
//	        String rawData = "";
//	        for (String key: event.keySet())
//	        {
//	        	if(key.equals("_raw"))  
//	        		rawData = event.get(key);
//	            System.out.println("   " + key + ":  " + event.get(key));
//	        }
//	        rawDatas.add(rawData);
//	    }
//	} catch (Exception e) {
//	    e.printStackTrace();
//	}
//    
//	ResponseGetRawData response = new ResponseGetRawData();
//	response.setRawDatas(rawDatas);
//	return response;
//}
}
