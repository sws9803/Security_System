define(function(){

	var objType = {

	    isNull :  function(obj_value){
	        if((typeof obj_value) === "undefined"){
	            return true;
	        }
	        else{
				if(obj_value === null){
					return true;
				} else if(typeof(obj_value) == "string"){
				    if(obj_value == ""){
				        return true;
				    }
				    else{
				        return false;
				    }
	
				} else{
					return false;
				}
	        }
	    }
	
	    , isString :  function(obj_value){
	        if((typeof obj_value) === "string"){
	            return true;
	        }
	        else{
	            return false;
	        }
	    }
	    
	    , isArray :  function(obj_value){
	    	
	    	if(!this.isNull(obj_value)){
	    	
	    		if( (obj_value.constructor === Array) == true){
	    			return true;
	    		}
	    		else{
	    			return false;
	    		}
	    	}
	    	
	    }
	    
	    , isEmpty :  function(obj_value){
	       
	    	if(this.isArray(obj_value)){
	    		if(obj_value.length == 0){
	    			return true;
	    		}
	    		else{
	    			return false;
	    		}
	    	}
	    	
	    }
	
	    , isObject :  function(obj_value){
	        if((typeof obj_value) === "object"){
	            return true;
	        }
	        else{
	            return false;
	        }
	    }
	
	
	    , isFunction :  function(obj_value){
	        if((typeof obj_value) === "function"){
	            return true;
	        }
	        else{
	            return false;
	        }
	    }
	
	    , isNumber :  function(obj_value){
	
	    	if(!this.isNull(obj_value)) {
		    	var intValue = parseInt(obj_value);
		    	
		    	if(isNaN(intValue)){
		    		return false;
		    	}
		    	else {
		    		return true;
		    	}
	    	}
	    	else{
	    		return true;
	    	}
	    	
	    }
	    
	    , isFloat :  function(obj_value){
	    	
	    	if(!this.isNull(obj_value)) {
		    	var floatValue = parseFloat(obj_value);
		    	
		    	if(isNaN(floatValue)){
		    		return false;
		    	}
		    	else {
		    		return true;
		    	}
	    	}
	    	else{
	    		return true;
	    	}
	    	
	    }
	
	    , isBoolean :  function(obj_value){
	        if((typeof obj_value) === "boolean"){
	            return true;
	        }
	        else{
	            return false;
	        }
	    }
	
	}
	
	return objType;
});
