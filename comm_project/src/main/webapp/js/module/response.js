define(function(){

	function Response(objResponseData){
		if((typeof objResponseData) !== "undefined"){
	       /* this.serviceId         = objResponseData.common.method;
	        this.common            = objResponseData.common;
	        this.param             = objResponseData.param;
	        this.result            = objResponseData ;
	        this.searchInfo        = objResponseData.searchInfo;
	        this.message	       = objResponseData.message;
	        this.statusCode		   = objResponseData.statusCode;
	        
	        this.httpStatus		   = null;
	        this.limit             = objResponseData.limit;
	        this.page              = objResponseData.page;
	        this.start             = objResponseData.start;*/
	    	this.result            = objResponseData;
	        
	    }
	
	};
	
	
	//서버에 요청 서비스 ID
	Response.prototype.serviceId  = null;
	
	Response.prototype.setServiceId = function(str_CallSrvID){
	    this.serviceId = str_CallSrvID;
	}
	
	Response.prototype.getServiceId = function(){
	    return this.serviceId;
	}
	
	
	//서버에 요청 후 응답 Common 정보
	Response.prototype.common = null;
	
	Response.prototype.setCommon = function(objCommon){
	    this.common = objCommon;
	}
	
	Response.prototype.getCommon = function(){
	    return this.common;
	}
	
	
	//서버에 요청 후 응답 List 정보
	Response.prototype.param = null;
	
	Response.prototype.getParam= function(arr_List){
	    this.param = arr_List;
	}
	
	Response.prototype.getParam= function(){
	    return this.param;
	}
	
	
	
	//서버에 요청 후 응답 Param 정보
	Response.prototype.result = null;
	
	Response.prototype.setResult = function(objParam){
	    this.result = objParam;
	}
	
	Response.prototype.getResult = function(){
	    return this.result;
	}
	
	
	//서버에 요청 후 응답 Search List 정보
	Response.prototype.searchInfo   = null;
	
	Response.prototype.setSearchInfo = function(objSearchList){
	    this.searchInfo = objSearchList;
	}
	
	Response.prototype.getSearchInfo = function(){
	    return this.searchInfo;
	}
	
	
	//서버에 요청 후 응답 코드
	Response.prototype.statusCode   = null;
	
	Response.prototype.setStatusCode = function(stStatusCode){
	    this.statusCode = stStatusCode;
	}
	
	Response.prototype.getStatusCode = function(){
	    return this.statusCode;
	}
	
	
	//서버에 요청 후 응답 메세지
	Response.prototype.message	    = null;
	
	Response.prototype.setMessage = function(str_Message){
	    this.message = str_Message;
	}
	
	Response.prototype.getMessage = function(){
	    return this.message;
	}
	
	
	
	//서버에 요청 후 페이지당 아이템 갯수
	Response.prototype.limit = null;
	
	Response.prototype.setLimit = function(int_limit){
	    this.limit = int_limit;
	}
	
	Response.prototype.getLimit = function(){
	    return this.limit;
	}
	
	
	
	//서버에 요청 후 응답의 데이터의 현재 페이지
	Response.prototype.page = null;
	
	Response.prototype.setPage = function(int_Page){
	    this.page = int_Page;
	}
	
	Response.prototype.getPage = function(){
	    return this.page;
	}
	
	
	//서버에 요청 후 응답의 데이터의 시작 페이지
	Response.prototype.start = null;
	
	Response.prototype.setStart = function(in_Start){
	    this.start = in_Start;
	}
	
	Response.prototype.getStart = function(){
	    return this.start;
	}
	
	return Response;

});
