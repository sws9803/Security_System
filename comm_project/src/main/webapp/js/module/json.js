define(function(){
	
	var objJson = {

	    /*
	     *  JSON Object를 JSON String으로 변환
	     */
	    decode : function(objJsonData){
	        var strJsonData = JSON.stringify(objJsonData);
	        return strJsonData;
	    }

	    /*
	     *  JSON String JSON Object으로 변환
	     */
	    , encode : function(strJsonData){
	        var objJsonData = eval("(" + strJsonData+")");
	        return objJsonData;
	    }

	};
	
	return objJson;
	
});

