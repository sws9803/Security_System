define(function(){
	
	function PageView(domId){
		
		this.pageDomId = ".paginate";
		this.pageInfo = {};
		this.reqInfo = {};
		this.pageEvtFunc = null;
		
		if(domId && domId != "") {
			this.pageDomId = domId
		}
	};
	
	PageView.prototype.constructor = PageView;
	
	PageView.prototype.setPageParam = function(pageParam, reqParam){
		
		var self = this;
		self.pageInfo.rowLimit = 10;
		self.pageInfo.pageLimit = 5;
		
		$.extend(true,self.pageInfo, pageParam);
		$.extend(true,self.reqInfo, reqParam);
	};
	
	PageView.prototype.drawPage = function() {
		var totPage = 0;          
		var totalGroup = 0;
		var nowGroup = 0;
		var linkEndPage = 0;
		var nextEndpage = 0;
		var nextStartpage = 0;
		var self = this;
		
	    // 페이지 수
		var tot_temp = Math.floor(self.pageInfo.totalCount%self.pageInfo.rowLimit);
		if (tot_temp>0) {
			totPage=Math.floor(self.pageInfo.totalCount/self.pageInfo.rowLimit) + 1;
		}
		else {
			totPage=self.pageInfo.totalCount/self.pageInfo.rowLimit;
		}
		var tg_temp = totPage%self.pageInfo.pageLimit;
		if (tg_temp>0) {
			totalGroup=Math.floor(totPage/self.pageInfo.pageLimit) + 1;
		}
		else { 
			totalGroup=Math.floor(totPage/self.pageInfo.pageLimit);
		}
		var ng_temp = self.pageInfo.pageNo%self.pageInfo.pageLimit;
		if (ng_temp>0) {
			nowGroup=Math.floor(self.pageInfo.pageNo/self.pageInfo.pageLimit) + 1;
		}
		else {
			nowGroup=Math.floor(self.pageInfo.pageNo/self.pageInfo.pageLimit);
		}
		
		var linkStartPage = (nowGroup - 1) * self.pageInfo.pageLimit + 1;
		var linkEndPage = linkStartPage + self.pageInfo.pageLimit - 1;
		if (linkEndPage > totPage) {
			linkEndPage = totPage;
		}
		if (linkEndPage < linkStartPage) {
			linkEndPage = linkStartPage;
		}
		
		var prevStartpage=linkStartPage - self.pageInfo.pageLimit;
		var tmp_nextEndpage=linkEndPage + self.pageInfo.pageLimit;
		
		if (tmp_nextEndpage>totPage ) {
			nextEndpage=totPage;
		} else {
			nextEndpage=linkEndPage + self.pageInfo.pageLimit;
		}
	    $(self.pageDomId).empty();
	    
	    
	    var drawPage_span1 = $('<span>');
	    var drawPage_span2 = $('<span>');
	    var drawPage_first = $('<a class="direction first">');
	    var drawPage_prev  = $('<a class="direction prev">');
	    var drawPage_strong = $('<strong>');
	    var drawPage_span3 = $('<span>');
	    var drawPage_span4 = $('<span>');
	    var drawPage_next  = $('<a class="direction next">');
	    var drawPage_end = $('<a class="direction last">');
	    
	    
	    $(self.pageDomId).append(drawPage_first);
	    $(self.pageDomId).append(drawPage_prev);
	    drawPage_first.append(drawPage_span1);
	    drawPage_prev.append(drawPage_span2);
	    drawPage_span1.text("처음페이지");
	    drawPage_span2.text("이전페이지");
	    
	    drawPage_prev.append(drawPage_span2).append(drawPage_span2);
	    
	    if (self.pageInfo.totalCount > 0 && self.pageInfo.pageNo != 1) {
	    	drawPage_first.css({"cursor":"pointer"});
	    	drawPage_first.on("click", function(){
	    		self.goPage(1);	
	    	});
	    } 
	    
	    if (self.pageInfo.pageNo != 1) {
	    	drawPage_prev.css({"cursor":"pointer"});
	    	drawPage_prev.on("click", function(){
	    		self.goPage(self.pageInfo.pageNo - 1);	
	    	});
	    }
	    
	    for (var i = linkStartPage; i <= linkEndPage; i++) {
	    	if (i == self.pageInfo.pageNo) {
				$(self.pageDomId).append(drawPage_strong);
				drawPage_strong.text(i);
			} else {
				var drawPage_no = $('<a style="cursor:pointer;">');
				$(self.pageDomId).append(drawPage_no);
				drawPage_no.text(i)
				drawPage_no.on("click", function(){
					self.goPage(parseInt($(this).text()));	
		    	});
			}
		}
	    
	    nextStartpage=linkEndPage+1;
	   /* $(self.pageDomId).append(drawPage_span2);
	    drawPage_span2.append(drawPage_next);
    	drawPage_next.text("다음페이지");
    	drawPage_span2.append(drawPage_end);
		drawPage_end.text("마지막페이지");*/
		
		$(self.pageDomId).append(drawPage_next);
	    $(self.pageDomId).append(drawPage_end);
	    drawPage_next.append(drawPage_span1);
	    drawPage_end.append(drawPage_span2);
	    drawPage_span3.text("다음페이지");
	    drawPage_span4.text("마지막페이지");
		
	    if (self.pageInfo.pageNo != totPage) {
	    	drawPage_next.css({"cursor":"pointer"});
	    	drawPage_next.on("click", function(){
	    		self.goPage(self.pageInfo.pageNo + 1);	
	    	});
	    } 
	    if (self.pageInfo.totalCount > 0 && self.pageInfo.pageNo != totPage) {
	    	drawPage_end.css({"cursor":"pointer"});
			drawPage_end.on("click", function(){
	    		self.goPage(totPage);	
	    	});
		} 
	}
	
	PageView.prototype.goPage = function(page) {
		var self = this;
		
		self.pageInfo.pageNo = page;
		self.reqInfo.addParamData("currentPage", page);
		
		
		var callObject = self.pageInfo.callObject;
		onLoadingShow();
		Ajax.request(self.pageInfo.pageUrl, self.reqInfo, function(objResponse){
			self.pageInfo.pageEvtFunc(objResponse, callObject);
			self.drawPage();
			offLoadingShow();
		});
		
	}
	
	PageView.prototype.removePage = function() {
		var self = this;
		$(self.pageDomId).empty();
	}
	
	PageView.prototype.getCurrPageNo = function() {
		var self = this;
		return self.pageInfo.pageNo;
	}
		
	this.PageView = PageView;
	
	return PageView;
});

