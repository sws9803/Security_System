define({

	/**
	 * 
	 * 다국어 정보를 가져와서 설명하는 함수
	 */
	setLang : function(strLocale){
		
		var objLocaleData = null;//sph.locale.Lang.getLocaleData(strLocale);	
		if(objLocaleData == null){
			
			var objParam = Ajax.setParam();
			objParam.addParamData("locale", strLocale);
			
			Ajax.request("commonjson.getI18nList", objParam, function(objResponse){
				var result = objResponse.result;
				
				var objLangData = new Object();
				if(result.length>0){
					for(var index = 0 ; index < result.length ; index++){
						var objResultData =  result[index];
						objLangData[objResultData.code] = objResultData.codeNm;
					}
							
					var objNamespaceData = new Object();
					objNamespaceData["translation"] = objLangData;
					
					var objLocaleData = new Object();
					objLocaleData[strLocale] = objNamespaceData
					
					sph.locale.Lang.setLocaleData(strLocale, objLocaleData);
					sph.locale.Lang.setLocale("translation", strLocale);
				}
				
			});
		}
		else{

			sph.locale.Lang.setLocale("translation", strLocale);	
		}
	},
	
	setComma : function(val) {
		var rtn="";
		if ( val == null ) {
			return "";
		} else if( isNaN(val) ) {
			return val;
		}
		var spVal = (""+val).split(".");
		rtn = (""+spVal[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		if(spVal.length>1){
			rtn = rtn + "."+spVal[1];
		}
		return rtn;
	},
	unComma : function(val) {
		
		if ( val == null ) {
			return "";
		}
		val = String(val);
	    return Number(val.replace(/,/gi,""));
	},
	resetComma : function(element) {
		element.value = setComma(unComma(element.value)) || 0;
	},
	closeOverlay : function(obj) {
		$(obj).parent().removeClass("active");
	},
	/*dtlChrstnPop : function(stationId) {
		var contentDiv = $("<div class='popupLay type1'>");
		var contentSubDiv1 = $("<div class='content'>");
		var contentSubDiv2 = $("<div class='bg'>");
		var contentSubDiv1_ifrm = $("<iframe scrolling='no'>"); 
		var contentSubDiv1_a = $("<a class='close' style='cursor:pointer;'>");
		
		var iframSrc = "https://www.e1orangecard.com/RS/Brand/RS_popup_map.aspx?p_StoreCode="
						+stationId+"&p_Channel=BC";
		
		contentSubDiv1_ifrm.attr("src",iframSrc);
		contentSubDiv1_ifrm.css({"width":"100%","height":"100%","border":"0"});
		contentSubDiv1.append(contentSubDiv1_ifrm).append(contentSubDiv1_a);
		contentDiv.append(contentSubDiv1).append(contentSubDiv2);
		$(document.body).append(contentDiv);
		contentDiv.show();
		
		contentSubDiv1_a.on("click",function(){
			$(this).parents().eq(1).remove();
		});
		
		contentSubDiv2.on("click",function(){
			$(this).parent().remove();
		});
		
	},*/
	closeLayerPopup : function(popupId) {
		$("#"+popupId).remove();
	},
	/*slideClickEvent : function(clickAt, scrinInfoList){
		var self = this;
		
		if(scrinInfoList){
			self.scrinInfoList = scrinInfoList;
		}
		
		if(!clickAt){
			var length = self.scrinInfoList.length;
			self.fSn = (scrinInfoList || (self.fSn+1 == length))? 0 : self.fSn+1;
			self.nSn = (self.fSn+1 == length)? 0 : self.fSn+1;
		}
		
		var ifrmContents = $(".swiper-slide-active").find("iframe[name=iframeView]").contents();
		var initTitle = ifrmContents.find(".tit").text();
		var locationAt = (!initTitle || !initTitle.length > 0);
		
		var slideNumbers = { "충전소 안내" : 0, "비전" : 1, "핵심가치" : 2 };
		var slideNumber = slideNumbers[self.scrinInfoList[self.nSn].scrinNm];
		var waitTime = (clickAt)? 60 : self.scrinInfoList[self.fSn].waitTime;
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			if(slideNumber == 0 && locationAt) {
				$(".swiper-slide iframe").attr("src", "/chrstn/chrstnInitView.do");
				$(".swiper-slide iframe").load();
			}
			
			mainSlider.slideTo(slideNumber);
			self.slideClickEvent(false);
		}, waitTime*1000);
	},*/
	getExcelHeaders : function(headerKey) {
		
		var arrExcelTitle = [];
		var headerIdx = 0;
		$(".bList:eq(0) table thead tr th").each(function(){
			if($(this).text() == "") {
				return true;
			}
			arrExcelTitle.push(headerKey[headerIdx] + ":" + $(this).text());
			headerIdx++;
		})
		
		return arrExcelTitle.toString();
	},
	onExcelDownLoad : function(url,paramData,filename) {
		var self = this;
		var params = paramData.getData().param;
		
		if(params.totalCount == 0) {
			 alert("조회된 내용이 없습니다."); 
			 return;
		}
		//params.common.bean =url[0];
		var excelUrl = "/" + url +".do";
		onLoadingShow();
		fetch(excelUrl,{
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(params)
		})
		.then(function(res){
			if(res.status === 200){
				return res.blob();
			} else {
				return null;
			}
			offLoadingShow();
		})
		.then(function(blob){
			if(blob){
				onFileDownLoad(blob,filename + ".xls");
			} else {
				alert("경고","엑셀파일을 생성하지 못 했습니다.","확인");
			}
			offLoadingShow();
		})
		.catch(function(error) {
			console.log('There has been a problem with your fetch operation: ' + error.message);
		});
	},
	// 로컬 파일 다운로드
	onFileDownLoad : function(blob,filename){
		if(navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, filename);
		}else {
			saveAs(blob, filename);
		}
	},
	getPhoneNumFormatStr : function(num) {
		var formatNum = '';
	    if(num.length==11){
	        /*if(type==0){
	            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
	        }else{*/
	            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	        //}
	    }else if(num.length==8){
	        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
	    }else{
	        if(num.indexOf('02')==0){
	          
	        	if(num.length==10){
	                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
	            } else {
	            	formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
	            }
	        }else{
	            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
	        }
	    }

	    return formatNum;
	},
	isMbTlNum : function(telNum) {
		 if (!telNum || telNum.Length < 8) {
            return false;
         }

         if (telNum.substring(0, 4) == "0130") {
            return true;
         } else {
            var telNo1 = telNum.substring(0, 3);
            return "011,016,017,018,019,010".indexOf(telNo1) > -1 ? true : false
         }
	},
	lpad : function(str, padLen, padStr) {
		
		if (padStr.length > padLen) {
	        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	        return str;
	    }
		
	    str += ""; // 문자로
	    padStr += ""; // 문자로
	    while (str.length < padLen) {
	        str = padStr + str;
	    }
	    str = str.length >= padLen ? str.substring(0, padLen) : str;
	    
	    return str;
	},
	rpad : function(str, padLen, padStr) {
		 
		if (padStr.length > padLen) {
	         console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
	         return str + "";
	     }
		 
	     str += ""; // 문자로
	     padStr += ""; // 문자로
	     while (str.length < padLen) {
	        str += padStr;
	     }
	     str = str.length >= padLen ? str.substring(0, padLen) : str;
	     
	     return str;
	},
	chkValidate : function() {
		var count = 0;
		
		$(document).find("[max_length]").each(function(){
			if(count==0){
				var id = $(this).attr("id");
				var maxLength = $(this).attr("max_length");
				count += functions.maxLengthCheck(id, maxLength);
			}else{
				return false;
			}
		});
		
		return (count==0)?true:false;
	},
	maxLengthCheck : function(id, maxLength) {
		var obj = $("#"+id);
		
		if(maxLength == null) {
			maxLength = obj.attr("max_length") != null ? obj.attr("max_length") : 1000;
		}
		
		if(Number(functions.byteCheck(obj)) > Number(maxLength)) {
			alert("입력가능문자수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/2, 10) + ").");
			obj.focus();
			return 1;
		}else{
			return 0;
		}
	
	},
	byteCheck : function(el) {
		var codeByte = 0;
	    for (var idx = 0; idx < el.val().length; idx++) {
	        var oneChar = escape(el.val().charAt(idx));
	        if ( oneChar.length == 1 ) {
	            codeByte ++;
	        } else if (oneChar.indexOf("%u") != -1) {
	            codeByte += 2;
	        } else if (oneChar.indexOf("%") != -1) {
	            codeByte ++;
	        }
	    }
	    return codeByte;
	},
	isEmpty : function(str) {
		 if(typeof str == "undefined" || str == null || str == "") {
	            return true;
		 } else {
	            return false ;
		 }
	},
	onLoadingShow : function() {
		if( $( "#divMainLoading" ).length == 0 ) { 
			var style_img = "position:fixed; top:50%; left:50%; text-align:center; vertical-align:middle;";
			var img="<img src=\"/images/common/loader.gif\" style=\"" + style_img + "\" />";
			var div = "<div id=\"divMainLoading\" class=\"mainModal\" style='height:"+$( "body" ).height()+"px;'>" + img + "</div>";
			$( "body" ).append( $( div ) );
		} else {
			$( "#divMainLoading" ).css( "left", ( ( $( window ).width() - $( "#divMainLoading" ).width() ) / 2 ) + "px" );
			$( "#divMainLoading" ).show();
		}
	},
	offLoadingShow : function() {
		$( "#divMainLoading" ).hide();
	},
	windowClose : function(){
		if (navigator.appVersion.indexOf("MSIE 6.0") >= 0) { 
			window.close(); 
		} else { 
			window.open('about:blank','_self').close();
		}
	}

});