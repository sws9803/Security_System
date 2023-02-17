define(function(){
	
	var objCookie = {


	    //Cookie에 등록하는 정보의 보존일수
	    intDays : 0

	    //Cookie에 'Name = Value' 쌍으로  정보를 등록
	    , write : function(strName, strValue, intDays){
	        
	    	var objExpireDate = new Date();
	        if((typeof intDays) != "undefined"){
	        	objExpireDate.setDate(objExpireDate.getDate() + intDays);
	        	document.cookie = strName + '=' + escape(strValue) + ';expires='+ objExpireDate.toGMTString() + "; path=/";
	        }
	        else{
	        	document.cookie = strName + '=' + escape(strValue) + ';expires='+ this.intDays + "; path=/";
	        }

	        
	    }


	    // Cookie 정보 중 Name에 대한 Value 검색
	    , read : function(strName){

	        if (document.cookie.length > 0) {
	            var intCookiesInfoStartIndex = document.cookie.indexOf(strName + '=');
	            if (intCookiesInfoStartIndex != -1) {
	                intCookiesInfoStartIndex = intCookiesInfoStartIndex + strName.length + 1;
	                var intCookiesInfoEndIndex = document.cookie.indexOf(';', intCookiesInfoStartIndex);
	                if (intCookiesInfoEndIndex == -1)
	                    intCookiesInfoEndIndex = document.cookie.length;
	                return unescape(document.cookie.substring(intCookiesInfoStartIndex, intCookiesInfoEndIndex));
	            }
	        }

	        return null;
	    }


	    // Cookie 정보 중 Name에 대한 Value 삭제
	    , remove : function(strName){
	        var objExpireDate = new Date();
	        objExpireDate.setTime(objExpireDate.getDate() - 1);
	        document.cookie = strName + '=' + ';expires=' + objExpireDate.toGMTString() + "; path=/";
	    }
	    
	    , clear : function(){
  
	    	var objCookies = document.cookie.split(";");
    	    for (var idx = 0 ; idx < objCookies.length ; idx++) {   
    	         var objCookie =  objCookies[idx].split("=");
    	         this.remove(objCookie[0].trim())
    	     }
    	   
	    }
	
	}
	
	return objCookie;
	
});
