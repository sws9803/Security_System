 define(function(require){
	
	/**
	 *  
	 * 맵클릭 또는 맵오버 이벤트에서 오류 발생 패치
	 */
	var dream365 = new Object();
	var objType    = require('dream365.module.Type');
	var objJson    = require('dream365.module.Json');
	var objLog    = require('dream365.module.Log');
	
	dream365.module = new Object();
	dream365.module.Type     = objType
	dream365.module.Json     = objJson
	dream365.module.Log      = objLog
	 
	var objParam    = require('dream365.module.Param');
	var objOption   = require('dream365.module.Option');
	var objRequest  = require('dream365.module.Request');
	var objResponse = require('dream365.module.Response');
	var objAjax     = require('dream365.module.Ajax');
	
	dream365.module.Param    = objParam;
	dream365.module.Option   = objOption;
	dream365.module.Request  = objRequest;
	dream365.module.Response = objResponse;
	dream365.module.Ajax     = objAjax;
	
	
	
	
	var objCookie = require('dream365.module.Cookie');
	dream365.module.Cookie = objCookie;
	
	return dream365;
	
	
});