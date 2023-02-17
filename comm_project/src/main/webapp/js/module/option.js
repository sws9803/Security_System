define(function(){
	
	var objOption = {
	
		setRequestStructure : function(){
			
			var objServerInfo = {
				
				strProtocol	 : null
				, getProtocol : function() {
					return this.strProtocol;
				}
				/*  Server IP 정보 */
		 	   	,  strIP 	 : null
				, getIP : function(){
					return this.strIP;
				}
				, setIP : function(strIP){
					this.strIP = strIP;
				}
				
				/*  Server Port 정보 */
		 	   	, strPort 	 : null
				, getPort : function(){
					return this.strPort;
				}
				, setPort : function(strPort){
					this.strPort = strPort;
				}
				/*  Server IP, Port 정보 */
		 		, getServerInfo : function(strProtocol, strIP, strPort){
		 			this.strProtocol  = strProtocol;
					this.strIP   = strIP;
					this.strPort = strPort;
				}
		 		/*  Communication Method 정보 */
		 		, strModule : null
		 		, getModule : function(){
					return this.strModule;
				}
				, setModule : function(strModule){
					this.strModule = strModule;
				}
				
				/*  Communication Method 정보 */
		 	   	, strMethod 	 : null
				, getMethod : function(){
					return this.strMethod;
				}
				, setMethod : function(strMethod){
					this.strMethod = strMethod;
				}
				
				/*  Communication Mode 정보 */
		 	   	, strMode 	 : null
				, getMode : function(){
					return this.strMode;
				}
				, setMode : function(strMode){
					this.strMode = strMode;
				}
				
				/*  Communication is Ayncronize? 정보 */
		 	   	, blnAync 	 : null
				, getAync : function(){
					return this.blnAync;
				}
				, setAync : function(blnAync){
					this.blnAync = blnAync;
				}
				
				/*  Communication Mode 정보 */
		 	   	, strSuffix 	 : null
				, getSuffix : function(){
					return this.strSuffix;
				}
				, setSuffix : function(strSuffix){
					this.strSuffix = strSuffix;
				}
				
				/*  Server Module 별 서버 설정 */
				, setServerModule : function(strServerModule, strServerModuleIP, strServerModulePort){
					this["blnHave" + strServerModule]  = true;
					this["strIP_" + strServerModule]   = strServerModuleIP;
					this["strPort_" + strServerModule] = strServerModulePort;
				}
				
				, setHaveServerModule : function(strServerModule, blnHaveServerModule){
					this["blnHave" + strServerModule]  = blnHaveServerModule;
				}
				
				, setServerModuleIP : function(strServerModule, strServerModuleIP){
					this["strIP_" + strServerModule]  = strServerModuleIP;
				}
		
				, setServerModulePort : function(strServerModule, strServerModulePort){
					this["strPort_" + strServerModule]  = strServerModulePort;
				}
				
				
				, getServerModule : function(strServerModule){
					
					var objServerModuleInfo = new Object();
					objServerModuleInfo["blnHave" + strServerModule]  = this["blnHave" + strServerModule];
					objServerModuleInfo["strIP_" + strServerModule]   = this["strIP_" + strServerModule];
					objServerModuleInfo["strPort_" + strServerModule] = this["strPort_" + strServerModule];
					
					return objServerModuleInfo;
				}
				
				, getHaveServerModule : function(strServerModule){
					return this["blnHave" + strServerModule];
				}
				
				, getServerModuleIP : function(strServerModule){
					return this["strIP_" + strServerModule];
				}
		
				, getServerModulePort : function(strServerModule){
					return this["strPort_" + strServerModule];
				}
				
				
			};
			
			return objServerInfo;
			
		}
	
		, setResponseStructure : function(){
		
			//2015. 12. 30. : Cho Yongkyun : 서비스 요청 후 응답 정보 설정
			var objCallbackInfo = {
			 
				/*  서버 요청 후 응답 Scope 정보 */   
				  objRequestCtrl  : null
				, setRequestCtrl : function(objRequestCtrl){
					this.objRequestCtrl = objRequestCtrl;
				}
				, getRequestCtrl : function(){
					return this.objRequestCtrl;
				}
			
				/*  서버 요청 후 응답 Scope 정보 */   
				, objScope  : null
				, setScope : function(objScope){
					this.objScope = objScope;
				}
				, getScope : function(){
					return this.objScope;
				}
				
				/*  서버 요청 후 응답 Callback 함수 정보 */   
				, callback  : null
				, setCallback : function(callback){
					this.callback = callback;
				}
				, getCallback : function(){
					return this.callback;
				}
				
		
			};
			
			return objCallbackInfo;
		}
	}
	
	return objOption;
	
});