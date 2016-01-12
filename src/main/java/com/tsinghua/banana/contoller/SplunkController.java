package com.tsinghua.banana.contoller;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsinghua.banana.HomeController;
import com.tsinghua.banana.entity.ComputeLog;
import com.tsinghua.banana.entity.InfoTemp;
import com.tsinghua.banana.interfacebean.ResponseData;
import com.tsinghua.banana.interfacebean.request.RequestCommon;
import com.tsinghua.banana.interfacebean.request.RequestGetComputeLog;
import com.tsinghua.banana.interfacebean.request.RequestGetInfoByTag;
import com.tsinghua.banana.interfacebean.response.ResponseCommonCountSource;
import com.tsinghua.banana.interfacebean.response.ResponseGetComputeLog;
import com.tsinghua.banana.interfacebean.response.ResponseGetComputeLog2;
import com.tsinghua.banana.interfacebean.response.ResponseGetEvent;
import com.tsinghua.banana.interfacebean.response.ResponseGetInfoTemp;
import com.tsinghua.banana.interfacebean.response.ResponseGetMuiltipleView;
import com.tsinghua.banana.interfacebean.response.ResponseGetRawData;
import com.tsinghua.banana.service.SplunkService;
import com.tsinghua.banana.util.ComputeEnum;
import com.tsinghua.banana.util.TagUtil;
import com.tsinghua.banana.warning.EarlyWarning;
import com.tsinghua.banana.warning.ResponseGetMetric;



@Controller
@RequestMapping("/splunk")
public class SplunkController {
	
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String test(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@Autowired
	private  SplunkService splunkService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/getInfoByTag", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getInfoByTag(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestGetInfoByTag request = mapper.readValue(body, RequestGetInfoByTag.class);
				
		//TODO
		//handle the request
		ResponseGetInfoTemp response = new ResponseGetInfoTemp();
		
		int tag = request.getTag();
		if(tag == TagUtil.air_condition_temperature)
			response = splunkService.getAirConditionTemperature();
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}

	@RequestMapping(value = "/getComputeLog", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getComputeLog(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestGetComputeLog request = mapper.readValue(body, RequestGetComputeLog.class);
				
		ResponseGetComputeLog response = new ResponseGetComputeLog();
		
		int type = request.getCompute_type();

		if(type == ComputeEnum.COMPUTE_ERROR.getValue())
			response = splunkService.getComputeError();
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		
		return responseData;
	}
	
	@RequestMapping(value = "/getComputeLog2", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getComputeLog2(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestGetComputeLog request = mapper.readValue(body, RequestGetComputeLog.class);
				
		ResponseGetComputeLog2 response = new ResponseGetComputeLog2();
		
		int type = request.getCompute_type();

		if(type == ComputeEnum.COMPUTE_ALL.getValue())
			response = splunkService.getComputeAllType();
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getGroup", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getGroup(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseCommonCountSource response = splunkService.getCroup(request);		
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getRawData", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getRawData(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseGetRawData response = new ResponseGetRawData();
		
		response = splunkService.getRawData(request);
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getRawDataBySource", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json" })
	@ResponseBody
	public ResponseData getRawDataBySource(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseGetRawData response = new ResponseGetRawData();
		
		response = splunkService.getRawDataBySource(request.getKeyword());
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getCommonCountSource", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json;charset:utf-8" })
	@ResponseBody
	public ResponseData getCommonCountSource(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseCommonCountSource response = splunkService.getCommonCountSource(request);
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getEvent", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json;charset:utf-8" })
	@ResponseBody
	public ResponseData getEvent(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		/*
		 * ----------------------------------------------------------------
		 * 2015-12-29, modified by Samuel.Jiang
		 * ----------------------------------------------------------------
		 */
		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseGetEvent response = null;
		
		response = splunkService.getMachineOrItem(request);

	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/getMuiltipleView", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json;charset:utf-8" })
	@ResponseBody
	public ResponseData getMuiltipleView(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);

		ObjectMapper mapper = new ObjectMapper();
		RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseGetMuiltipleView response = splunkService.getMuiltipleView(request);
	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
	@RequestMapping(value = "/warning", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json;charset:utf-8" })
	@ResponseBody
	public ResponseData warning(@RequestBody String body)
			throws JsonParseException, JsonMappingException, IOException {
		logger.info(body);
		
		splunkService.connectToSplunk();
		
		EarlyWarning sss;
		HashMap it = null;
		try {
			sss = new EarlyWarning();
			it = sss.GetWarningINFO(splunkService.service);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		ObjectMapper mapper = new ObjectMapper();
		//RequestCommon request = mapper.readValue(body, RequestCommon.class);
				
		ResponseGetEvent response = new ResponseGetEvent();
		response.setMap(it);
		
		//response = splunkService.getMachineOrItem(request);

	
		ResponseData responseData = new ResponseData();	
		responseData.setValue(response);
		return responseData;
	}
	
//	@RequestMapping(value = "/getMetric", method = RequestMethod.POST, headers = {"Accept=application/json", "Content-type=application/json;charset:utf-8" })
//	@ResponseBody
//	public ResponseData getMetric(@RequestBody String body)
//			throws JsonParseException, JsonMappingException, IOException {
//		logger.info(body);
//		
//		ResponseGetMetric response = splunkService.getMetric();
//		
//		ResponseData responseData = new ResponseData();	
//		responseData.setValue(response);
//		return responseData;
//	}
}
