define(function(require){

	function Component(){
		
	};
	
	Component.prototype.setDomInfo = function(objDomInfo){
		
		if(eacweb.module.Type.isString(objDomInfo)){
			this.domId = objDomInfo;
			this.dom = $("#"+this.domId);
		}
		else{
			this.dom = objDomInfo
			this.domId = this.dom.attr("id");
		}
		
		if(eacweb.module.Type.isNull($.fn.getManager)){
			$.fn.getManager = function(){
				return this.data("Object");
			}
		}
		
		this.dom.data("Object", this);
		
	};

	Component.prototype.selectDom = function(strDomInfo){
		
		return $(this.dom.find(strDomInfo));
	
	}
	
	Component.prototype.closest = function(strDomInfo){
		
		return this.dom.closest(strDomInfo);
	
	}
	
	Component.prototype.data = function(strKey, objData){
		
		if(eacweb.module.Type.isNull(objData)){
			this.dom.data(strKey);
		}
		else{
			this.dom.data(strKey, objData);
		}
		
	}
	return Component;
	
});
