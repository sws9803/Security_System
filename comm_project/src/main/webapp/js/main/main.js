$(document).ready(function() {
	
	$("#noticeSj").keyup(function(e){
		if(e.keyCode == "13"){
			$("#btnSearch").trigger("click");
		}
	});
	
	$("#btnSearch").click(function(e){
		
		if($('#noticeSj').val() == ''){
			alert('검색어를 입력해 주세요.');
			return;
		}
		
		var url = "main/getMainInfos.do";
		
		// var param = {}; 밑에와 동일한 기능
		var param = new Object(); // key 값과 value 값을 가지고 있는 객체 생성 
		
		param.noticeSj = $("#noticeSj").val(); //noticeSj라는 key에 해당 value를 넣겠다는 뜻 (Controller에서 자동 값 할당을 위해서는 변수명과 Parameter 값을 동일하게 적어줘야됨)
		
		$.ajax({ //ajax 사용 밑은 속성들
			url: url,
			type: 'POST', //요청 방식
			contentType: 'application/json',
			dataType: 'json', 
			data: JSON.stringify(param), //내가 넘기는 parameter (여기서는 검색어)
		})
		.done(function(result) {
			console.log("result : ", result);
			if(result){
				
				$('#listbody').empty(); // 해당 부분에 값들 날리기, 이유: 검색을 할때 검색값이 누적되면 안도기ㅣ 때문
				
				if(result.mainResult.length == 0){
					var th = $('<th colspan="2">').text('검색결과가 없습니다.');
					
					$('#listbody').append( $('<tr>').append(th) );
				} else{ //이 부분 중요 ajax
					$.each(result.mainResult, function(idx, item){
						var tr = $('<tr>');
						
						var td1= $('<td>').text(item.noticeId);
						var td2= $('<td>').text(item.noticeSj);
						
						tr.append(td1).append(td2); 
						
						$('#listbody').append(tr);
					});
				}
			}
			
		})
		.fail(function() {
			alert("AJAX Error! Please refresh the page!'");
		});	
	});
	
});
