define(function(require){

	
	function Request(objServerInfo){
		
		this.objType = require("dream365.module.Type");
		this.objJson = require("dream365.module.Json");
		this.objLog  = require("dream365.module.Log");
		
		this.objServerInfo = objServerInfo;
		
		//Request Mode 관련 설정. AMF, JSON
	    if(this.objType.isNull(objServerInfo.strMode)){
	        this.objRequestMethod.strMode   = this.Code.Mode_JSON;
	        //this.objRequestMethod.strMode   = this.Code.Mode_JSON;
	    }
	    else{
	        this.objRequestMethod.strMode   = objServerInfo.strMode;
	    }
	
	
		//Request Method 관련 설정. POST, GET
	    if(this.objType.isNull(objServerInfo.strMethod)){
	       this.objRequestMethod.strMethod   = this.Code.Method_POST;
	       //this.objRequestMethod.strMode   = this.Code.Method_GET;
	    }
	    else{
	         this.objRequestMethod.strMethod   = objServerInfo.strMethod;
	    }
	    
		//Request Aync 관련 설정
	    if(this.objType.isNull(objServerInfo.blnAync)){
	        this.objRequestMethod.blnAync   = true;
	    }
	    else{
	        this.objRequestMethod.blnAync   = objServerInfo.blnAync;
	    }
	
	};
	
	

	Request.prototype.Code = {


	      Method_POST : "POST"
	    , Method_GET  : "GET"

	    , Mode_JSON : "JSON"
	    , Mode_FORM : "FORM"

	    /*
	     *  XmlHttpRequest Ready State 값
	     *
	     *  0 : uninitialized
	     *  1 : loading
	     *  2 : loaded
	     *  3 : interactive
	     *  4 : complete
	     */
	    , READY_UNINITIALIZED : 0
	    , READY_LOADING       : 1
	    , READY_LOADED        : 2
	    , READY_INTERACTIVE   : 3
	    , READY_COMPLETE      : 4

	    /*
	     *  XmlHttpRequest HTTP Status 값
	     *
	     *  200 : 성공
	     *  403 : 접근거부
	     *  404 : 파일/페이지 없음
	     */
	     , HTTP_SUCCESS   : 200
	    
	     , HTTP_FORBIDDEN : 403
	     , HTTP_NOTFOUND  : 404
	     , HTTP_INTERNAL  : 500
	     , HTTP_CONNECTION_ERROR   : 999

	};
	
	
	/*
	 * Request Server 정보 설정
	 */
	Request.prototype.objServerInfo = {};
	
	
	/*
	 * Request Method 정보 설정
	 */
	Request.prototype.objRequestMethod = {
	
	      strMode   : null
	    , strMethod : null
	    , blnAync   : null
	
	};
	
	Request.prototype.setRequestMethod = function(strMethod){
	
	    if((typeof objRequestMethod) === "string"){
	        this.objRequestMethod.strMethod = strMethod.toUpperCase();
	    }
	    else{
	        this.objRequestMethod.strMethod = this.Code.Method_POST;
	    }
	};
	
	Request.prototype.getRequestMethod = function(){
	    return this.objRequestMethod.strMethod;
	}
	
	Request.prototype.setAsync= function(blnAync){
	    this.objRequestMethod.blnAync = blnAync;
	};
	
	Request.prototype.isAsync = function(){
	    return this.objRequestMethod.blnAync;
	}
	
	
	/*
	 * JSON 통신관련 정보 - 파라미터 설정 함수
	 * 분류 JSON 통신관련 함수
	 */
	Request.prototype.setJSONParamData = function(objParams){
		
	    var strParams = this.objJson.decode(objParams);
	    return strParams;
	
	};
	
	
	/*
	 * 통신관련 통신관련 정보 - 통신 URL 설정 함수
	 * 분류 JSON 통신관련 함수
	 */
	Request.prototype.setUrlForJSONRequest = function(strControllerName, strMethodName){
	
		var strUrl = null;
		
		var strAppCode = this.objServerInfo.strModule;
		var suffix = ".do";
		
		if(this.objServerInfo && this.objServerInfo.strSuffix){
			suffix = this.objServerInfo.suffix;
		}
		if(strAppCode != null){
			var blnHaveModule = this.objServerInfo["blnHave"+strAppCode];
		}
		else{
			blnHaveModule = false;
		}
		
		if(blnHaveModule == true){
			
			strUrl =  this.objServerInfo["strIP_"+strAppCode];
			if(strUrl != null && strUrl !=undefined && strUrl.length>0){
				
				if(this.objServerInfo.strProtocol.indexOf("https")  > -1 ){
					strUrl = "https://" + strUrl;
				} else {
					strUrl = "http://" + strUrl;
				} 
				
				var strAppPort =  "";//this.objServerInfo["strPort_"+strAppCode];
				
				if(this.objType.isNull(strAppPort)){
					strUrl = strUrl + "/";
				}
				else{
					strUrl = strUrl + ":" + strAppPort + "/"
				}
			}
		}
		else{
			
			strUrl =  this.objServerInfo.strIP;
			if(strUrl != null && strUrl !=undefined && strUrl.length>0){
				if(this.objServerInfo.strProtocol.indexOf("https")  > -1 ){
					strUrl = "https://" + strUrl;
				} else {
					strUrl = "http://" + strUrl;
				}
				
				if(this.objType.isNull( this.objServerInfo.strPort)){
					strUrl = strUrl + "/";
				}
				else{
					strUrl = strUrl + ":" + this.objServerInfo.strPort + "/"
				}
			}
		}
		
		if(strControllerName  && strControllerName != "") {
			strUrl += strControllerName + "/"
		}
		
		strUrl = strUrl + strMethodName + suffix;
		
		return strUrl;
	
	};
	
	
	/*
	 * JSON 통신관련 정보 - 통신 함수
	 * 분류 JSON 통신관련 함수
	 */
	Request.prototype.requestUsingJSON = function(strControllerName, strMethodName, objParams, objComponent){
		
		var strParamData = this.setJSONParamData(objParams.param);
		var strUrl = this.setUrlForJSONRequest(strControllerName, strMethodName);
	    var objRequest = this.getRequestObject();
	    
	    if(this.isAsync()){
	        this.setAsyncInfo(objRequest, strControllerName, strMethodName, objComponent);
	    }
		objRequest.open(this.getRequestMethod(), strUrl, this.isAsync());
	    
	    objRequest.setRequestHeader("Content-Type", "application/json;charset=utf-8;");
		objRequest.send(strParamData);
	
	
	    if(!this.isAsync()){
	        return objRequest;
	    }
	
	};
	
	Request.prototype.requestUsingForm = function(strControllerName, strMethodName, objParams, objComponent){
		
		var formData = new FormData();
		var paramData = objParams.param;
		$.each(paramData,function(key, val){
			if(typeof val === "string") {
				formData.append(key, val);
			} else if(typeof val === "object") {
				if($(val).is("[type=file]")) {
					formData.append(key, $(val)[0].files[0]);
				}
			}
			
		});
		
	    var strUrl = this.setUrlForJSONRequest(strControllerName, strMethodName);
	    var objRequest = this.getRequestObject();
	    
	    if(this.isAsync()){
	        this.setAsyncInfo(objRequest, strControllerName, strMethodName, objComponent);
	    }
		objRequest.open(this.getRequestMethod(), strUrl, true);
		objRequest.send(formData);
	
	    if(!this.isAsync()){
	        return objRequest;
	    }
	
	};
	
	//==============================================================================
	
	Request.prototype.request = function(strServiceUrl, objParams, objComponent){
	
	    var arrServiceUrl = strServiceUrl.split('/');
	    //console.log(arrServiceUrl.length );
	    if(arrServiceUrl.length !=2){
	        //this.objLog.d("Error : Service Url is wrong. Chcking Service Url : @ControllerName.MethodName (etc:loginController.actionlogin");
	        return false;
	    }
	
	    var strControllerName = arrServiceUrl[0];
	    var strMethodName     = arrServiceUrl[1];
	    
	    var reqMode = objParams.getParam().reqMode;
	    
	    if(reqMode && reqMode == this.Code.Mode_FORM){
	    	return this.requestUsingForm(strControllerName, strMethodName, objParams.getData(), objComponent);
	    } else if(this.objRequestMethod.strMode = this.Code.Mode_JSON){
	    	return this.requestUsingJSON(strControllerName, strMethodName, objParams.getData(), objComponent);
	    } else {
	        //this.objLog.d("Not Supprted Mode : " +  this.objRequestMethod.strMode);
			return null;
	    }
	
	};
	
	
	/*
	 * XmlHttpRequest Instance를 생성하는 함수
	 * 통신모듈 공통
	 */
	Request.prototype.getRequestObject = function(){
	
	    var objRequest = new XMLHttpRequest();
	    if (window.ActiveXObject)
	    {
	        try {
	            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	        }
	        catch (objError) {
	            try {
	                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	            }
	            catch (objError) {
	                console.log("Can't set AmlHttpRequest!!");
	            }
	        }
	    }
	   /* else if (window.XMLHttpRequest)
	    {
	        objRequest = new XMLHttpRequest();
	    } else {
	    	objRequest = new XMLHttpRequest();
	    }*/
	    
	    return objRequest;
	};
	
	
	/*
	 * Asyn 관련 calback 함수 설정
	 * 통신모듈 공통
	 */
	Request.prototype.setAsyncInfo = function(objRequest, strControllerName, strMethodName, objComponent) {
		
		var objSelf = this;
		
		objRequest.onreadystatechange = function(objEvent) {
			
			
			/*
	         *  XmlHttpRequest Ready State 값
	         *
	         *  0 : uninitialized
	         *  1 : loading
	         *  2 : loaded
	         *  3 : interactive
	         *  4 : complete
	         */
			
			//var callback = objComponent.getCallback();
			var objRequestCtrl = objComponent.getRequestCtrl();
			
	        if (objRequest.readyState == objSelf.Code.READY_COMPLETE) {
	            	
	        	//objSelf.objLog.d("=====> objRequest.readyState : " + objRequest.readyState);
	          
			    /*
	             *  XmlHttpRequest HTTP Status 값
	             *
	             *  200 : 성공
	             *  403 : 접근거부
	             *  404 : 파일/페이지 없음
	             */
				var objResponse = new Object();
				objResponse.httpStatus     =  objRequest.status;
				objResponse.controllerName =  strControllerName;
				objResponse.methodName     =  strMethodName;
				
			     if( objRequest.status === objSelf.Code.HTTP_SUCCESS ){
			    	 objResponse.resultData = objSelf.objJson.encode(objRequest.responseText); 
	             }
			     
			     objRequestCtrl.callback(objResponse, objComponent);
				
	        }
	        else {
	            /*
	             * 
	             * XmlHttpRequest의 readyState기 4인 경우를 제외한 다른 값들에 대한 상태 처리가 추가 되어야 함.
	             */
	        }
	
	    };
	
	    objRequest.onerror = function(strError) {
	        
	    	//objSelf.objLog.d("Request Error!" + objSelf.objJson.decode(objerror));
	         
			var objRequestCtrl = objComponent.getRequestCtrl();
			
	     	var objResponse = new Object();
			objResponse.httpStatus     =  objSelf.Code.HTTP_CONNECTION_ERROR;
			objResponse.controllerName =  strControllerName;
			objResponse.methodName  =  strMethodName;
			objResponse.message 	=  "Error : Connection Fail.<br>Check server settings.";
	    	objResponse.resultData = objSelf.objJson.encode(strError);
		     
	    	objRequestCtrl.callback(objResponse, objComponent);
		     
			 
	    };
	
	};
	
	return Request;
	
	
});
