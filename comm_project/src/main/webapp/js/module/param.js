define(function(){
		
	function Param(){
	    this.onInitCommon();      // Common 정보를 관리할 객체의 초기설정 함수
	    this.onInitParam();       // Param 정보를 관리할 객체의 초기설정 함수
	    this.onInitSearchInfo();  // Search List 정보를 관리할 객체의 초기설정 함수
	
	};
	
	
	//  서버와 통실할때 사용되는 정보들
	Param.prototype.ParamInfo = {
	      common 	   : null
	    , param  	   : null
	    , searchinfo   : null
	};
	
	
	Param.prototype.getData = function(){
	    return this.ParamInfo;
	};
	
	//  Param 정보 중 COMMON Data 정보를 설정하는 함수
	Param.prototype.onInitCommon = function(){
	    this.getData().common = new Object();
	};
	
	Param.prototype.getCommon = function(){
	    return this.getData().common
	};
	
	Param.prototype.setCommon = function(objCommon){
	    this.getData().common = objCommon;
	};
	
	Param.prototype.addCommonData = function(strKey, strValue){
	    var objCommon = this.getData().common
	    objCommon[strKey] = strValue;
	};
	
	
	//  Param 정보 중 PARAM Data 정보를 설정하는 함수
	Param.prototype.onInitParam = function(){
	    this.getData().param = new Object();
	};
	
	Param.prototype.getParam = function(){
	    return this.getData().param
	};
	
	Param.prototype.setParam = function(objParam){
	    this.getData().param = objParam;
	};
	
	Param.prototype.addParamData = function(strKey, strValue){
	    var objParam = this.getData().param
	    objParam[strKey] = strValue;
	      
	};
	
	
	
	//  Param 정보 중 Search List Data 정보를 설정하는 함수
	
	
	Param.prototype.onInitSearchInfo = function(){
	    this.getData().searchinfo = new Array();
	};
	
	Param.prototype.getSearchList = function(){
	    return this.getData().searchinfo;
	};
	
	Param.prototype.setSearchList = function(objSearchList){
	    this.getData().searchinfo = objSearchList;
	};
	
	Param.prototype.addSearchListData = function(strName, strValue){
	    var objSearchList = this.getData().searchinfo;
	
	    var objTemp = new Object();
	    objTemp[strName] = strValue;
	    objSearchList.push(objTemp);
	
	};
	
	return Param;

});