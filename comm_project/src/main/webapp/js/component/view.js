define([
	"./component"
], function(Component){
	function View(objDomInfo){

		Component.apply(this, arguments)
		this.setDomInfo(objDomInfo);
		this.working=false;
		this.fixPos=false;
		this.overlay = $();
	};
	
	View.prototype = Object.create(Component.prototype);
	View.prototype.constructor = View;
	
	View.prototype.load = function(strUrl,callback){
		
		//console.log("==> View.prototype.load : ", strUrl);
		var self = this;
		
		strUrl = "./" + strUrl + ".do";
		
		
		//console.log("==> View.prototype.load : ", strUrl);
		//window.parent.fnMainLoadingShow();
		this.dom.load(strUrl, function(err, status, xhr){
			if(status == "error") {
				//console.log(err.request.status);
				//this.load(rootCntext+"/ajax/error/error-"+err.request.status+".html");
				//sph.popup.Alert.show("해당 페이지를 로딩할수 없습니다.","Url : "+strUrl, "error");
			}else {
				///self.dom.trigger("loadEnd");
				//debugger
				if(callback){
					callback();
				}
				
			}
			//window.parent.fnMainLoadingHidden();
			//self.stopLoading();
		});
	};
	
	View.prototype.loadFullPath = function(strUrl,callback){
		
		//console.log("==> View.prototype.load : ", strUrl);
		var self = this;
		
		strUrl = "/" + strUrl + ".do";
		this.dom.load(strUrl, function(err, status, xhr){
			if(status == "error") {
				//console.log(err.request.status);
			}else {
				//self.dom.trigger("loadEnd");
				if(callback){
					callback();
				}
			}
			
			//window.parent.fnMainLoadingHidden();
			//self.stopLoading();
		});
	};
		
	View.prototype.iframeLoad = function(strId, strUrl, pageId){
			
		var self = this;
		//console.log("==> View.prototype.load : ", pageId);
		
		strUrl = "./" + strUrl + ".view?pageId="+pageId;
		
		var contentsViewInIframe = $("<iframe id=\""+ strId +"\" src=\""+ strUrl + "\" style=\"width:100%;height:100%;border:none;overflow: hidden;\"></iframe>");
		
		this.dom.append(contentsViewInIframe);
		
		this.iFrameDom = contentsViewInIframe;
					
	};
		
		
	View.prototype.startLoading = function(loading_overlay) {
		var self = this;
		if(self.working) return;
		self.working = true;
		
	
		var loadingIcon = "fa fa-spin fa-spinner fa-2x orange";
		self.overlay.remove();
		self.overlay  = $('<div id="viewLoad" class="ajax-loading-overlay"><i class="ajax-loading-icon '+loadingIcon+'"></i> '+this.loading_text||''+'</div>')
		
		if(loading_overlay == 'body') {
			$('body').append(self.overlay.addClass('ajax-overlay-body'));
		} else if(loading_overlay) {
			$(loading_overlay).append(self.overlay );
		} else {
			self.dom.append(self.overlay );
		}
		
	}
		
	View.prototype.stopLoading = function(stopNow) {
		var self = this;
		if(stopNow === true) {
			self.working = false;
			
			self.overlay.remove();
			if(self.fixPos) {
				self.dom.css('position', '');//restore previous 'position' value
				self.fixPos = false;
			}
			
			if(self.loadTimer != null) {
				self.clearTimeout(loadTimer);
				self.loadTimer = null;
			}
		}
		else {
			self.overlay.addClass('almost-loaded');
			
			self.dom.one('ajaxscriptsloaded.inner_call', function() {
				self.stopLoading(true);
				/**
				if(window.Pace && Pace.running == true) {
					Pace.off('done');
					Pace.once('done', function() { self.stopLoading(true) })
				}
				else self.stopLoading(true);
				*/
			})
		}
	}
		
	View.prototype.working = function() {
		return working;
	}
	
	this.View = View;
	
	return View;
});

