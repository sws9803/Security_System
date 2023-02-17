define([
		  "./globals"
	 	, "./function"
		, "../component/pageView"
		, "../component/view"
	]
	, function(globals,functions){
		this.dream365 = globals;
		
		this.Ajax = new dream365.module.Ajax({
			protocol : window.location.protocol,
			ip     : window.location.hostname,
			port   : window.location.port,
			module : "",
			mode   : "JSON",
			method : "POST"
		});
		
		this.functions = functions;
		
		this.setLang       = functions.setLang;
		this.setComma = functions.setComma;
		this.unComma = functions.unComma;
		this.resetComma = functions.resetComma;
		
		this.getExcelHeaders = functions.getExcelHeaders;
		this.onExcelDownLoad = functions.onExcelDownLoad;
		this.onFileDownLoad = functions.onFileDownLoad;
		
		this.closeOverlay = functions.closeOverlay;
		this.dtlChrstnPop = functions.dtlChrstnPop;
		
		this.closeLayerPopup = functions.closeLayerPopup;
		
		this.slideClickEvent = functions.slideClickEvent;
		 
		this.onLoadingShow = functions.onLoadingShow;
		this.offLoadingShow = functions.offLoadingShow;
		this.getPhoneNumFormatStr = functions.getPhoneNumFormatStr;
		this.isMbTlNum = functions.isMbTlNum;
		this.lpad = functions.lpad;
		this.rpad = functions.rpad;
		this.chkValidate = functions.chkValidate;
		
		this.windowClose = functions.windowClose;
		
	}
);