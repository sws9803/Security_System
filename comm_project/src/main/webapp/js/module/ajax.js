define(function(require){
	
	var Ajax = function(){
		this._$init.apply(this, arguments);
	};
	
	Ajax.prototype._$init = function(objOption){
		this.objOption = objOption;
		
		this.objType		    = require('dream365.module.Type');
		this.objRequestParam    = require('dream365.module.Param');
		this.objRequestModuleOption   = require('dream365.module.Option');
		this.objRequestModule  = require('dream365.module.Request');
		this.objResponseModule = require('dream365.module.Response');
		this.objCookie		    = require('dream365.module.Cookie');
		
        var objRequestOption = this.objRequestModuleOption.setRequestStructure();
        objRequestOption.getServerInfo(objOption.protocol, objOption.ip, objOption.port);
        objRequestOption.setMethod(objOption.method);
        objRequestOption.setMode(objOption.mode);
        objRequestOption.setModule(objOption.module);
        objRequestOption.setAync(objOption.aync);
        objRequestOption.setSuffix(objOption.suffix);
        this.objRequest = new this.objRequestModule(objRequestOption);
        
	};
	
	Ajax.prototype.setParam = function(name){
		
		var objParam = new this.objRequestParam(name);
		return $.extend(true,{},objParam);
	};
	
	Ajax.prototype.callback = function(objResponse, objComponent) {
        /**
           - Vinflkux 서비스 요청에 사용되는 Param 정보 설정
         */

	   var objScope = objComponent.getScope();
	   var callback = objComponent.getCallback();
       if(objResponse.httpStatus == this.objRequest.Code.HTTP_SUCCESS){
    	   var objResult = new this.objResponseModule(objResponse.resultData);
    	   callback(objResult, objScope);
       } else if(objResponse.httpStatus == this.objRequest.Code.HTTP_FORBIDDEN) {
    	  alert('로그인 후에 이용하실  수있습니다.');
    	  top.location.href =  "/loginView.do";
       } else if(objResponse.httpStatus == this.objRequest.Code.HTTP_INTERNAL) {
    	  alert('현재 요청을 처리할 수 없습니다.');
    	  offLoadingShow();
       } else {
    	   console.log("네트워크 연결이 원활하지 않습니다.");
       }

    }
	
	Ajax.prototype.request = function(strServiceUrl, objParams, callBack, objScope, blnLocking) {
		
        var self = this;
        var arrUrlData = strServiceUrl.split('.');
        var strControllerName = arrUrlData[0];
        var strMethodName     = arrUrlData[1];

        //서비스 요청 공통 데이터 설정
        objParams.addCommonData('bean'   , strControllerName);
        objParams.addCommonData('method' , strMethodName);
        
        //서비스 요청 후 응답 정보 설정
        var objCallbackInfo = this.objRequestModuleOption.setResponseStructure();
        objCallbackInfo.setRequestCtrl(this);
        objCallbackInfo.setScope(objScope);
        objCallbackInfo.setCallback(callBack);

        //서비스 요청 후 추가 응답 정보 설정
        objCallbackInfo.objParent = this;
        //objCallbackInfo.strCallServiceId = strCallServiceId;

        
        //서비스 요청 - 비동기 일 경우에는 응답을 반환. 동기일 경우 objCallbackInfo를 통해 응답을 반환
        //console.log(strServiceUrl);
        var objResponse = this.objRequest.request(strServiceUrl, objParams, objCallbackInfo);


        //서비스 요청에 대한 응답 반환
        return objResponse;

    }
	
	return Ajax;
   
});

