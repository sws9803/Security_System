define(function(){
	
	var objLog = {
	
		blnIsLogging : true,
	    strTag : "[VinfluxMobile] :: ",
	    d : function(){
	
			if(!this.blnIsLogging){
				return;
			}
		
			Array.prototype.unshift.call(arguments, this.strTag);
			console.log.apply(this, arguments);
	        
	    },
	
	    e : function(){
			
			if(!this.blnIsLogging){
				return;
			}
	
			Array.prototype.unshift.call(arguments, this.strTag);
			console.log.apply(this, arguments);
	        
			throw( new Error(this.strTag + " : Exception : ", arguments) );
		
	    }
	
	}
	
	return objLog;
	
});


