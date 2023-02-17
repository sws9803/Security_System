if(/iPhone|iPod|Android|iPad/.test(window.navigator.platform)){
	$(document)
	.on('focus', 'textarea,input,select', function(e) {
		$('#header').css('position', 'absolute');
	})
	.on('blur', 'textarea,input,select', function(e) {
		$('#header').css('position', '');
	});
}

jQuery(document).ready(function(){
	stageResize();

	// 타이틀 변환
	 var homeTile = jQuery('title').text();
	 var replaceTitle = jQuery('.sub-title h2').text();
	 arrTitle = jQuery('.sub-title h2').text();
	 if(replaceTitle==''){
	 }else{
	  document.title=arrTitle + " | " + homeTile;
	 };

	// 마우스오버시 이미지 변환
	jQuery("img.rollover").mouseover(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
	}).mouseout(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
	});
	
	// mobile navigation
	$(".nav-menu").html($("#gnb").html());
	$(".btn-m-menu").click(function(e){
		e.preventDefault();
		if($("html").hasClass("menu-opened")){
			$("html").removeClass("menu-opened");
		}else{			
			$("html").addClass("menu-opened"); 
		}
	});


	$(".mobile-overlay, .close").click(function(){				
		$("html").removeClass("menu-opened");
	});

	$(".mobile-navigation nav > ul > li > a").click(function(){
		t = $(this).parent('li');
		if (t.hasClass('active')) {
			t.removeClass('active');
			t.find('.submenu').slideUp('fast');
		}else {
			$(".mobile-navigation nav li").removeClass('active');
			t.addClass('active');
			if(t.find('div').hasClass('submenu')){
				$(".mobile-navigation nav .submenu").slideUp('fast');			
				t.find('.submenu').slideDown('fast');
				return false;
			}	
		}
	});

	$(".btn-all-menu").click(function(e){
		e.preventDefault();
		if($("html").hasClass("allmenu-opened")){
			$("html").removeClass("allmenu-opened");
		}else{			
			$("html").addClass("allmenu-opened"); 
		}
	});

	
	//텝
	jQuery(".tab-content").hide();
	jQuery("ul.tabs>li:first").addClass("active").show(); 	
	jQuery(".tab-content:first").show();

	jQuery("ul.tabs>li").click(function(e) {
		e.preventDefault();

		jQuery("ul.tabs>li").removeClass("active");
		jQuery(this).addClass("active");
		jQuery(".tab-content").hide();		
		
		var activeTab = jQuery(this).find("a").attr("href");
		jQuery(activeTab).fadeIn();
		return false;
	});
	
	

	// fancybox
	$(".pop_privacy").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});

	$(".pop_email").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});


	$('.mainSlider').slick({
		lazyLoad: 'progressive',
		autoplay: true,
        autoplaySpeed: 4000,
		draggable:false,
		dots: false,
		arrows:false,
		infinite: true,
		pauseOnFocus:false,
		pauseOnHover:false,
		speed: 800
	});
	
	$(".control-next").click(function(){
		$('.mainSlider').slick('slickNext');
	});
	$(".control-prev").click(function(){
		$('.mainSlider').slick('slickPrev');
	});
	// Play/Pause button
	$(".control-play").click(function(){
		$('.mainSlider').slick('slickPlay');
		$(this).hide();
		$('.control-pause').show();
	});
	$(".control-pause").click(function(){
		$('.mainSlider').slick('slickPause');
		$(this).hide();
		$('.control-play').show();
	});

	
	$('.eventSlider').slick({
		autoplay: true,
        autoplaySpeed: 4000,
		draggable:false,
		dots: true,
		arrows:false,
		infinite: true,
		pauseOnFocus:false,
		pauseOnHover:false,
		speed: 800
	});


	$('.eventSlider2').slick({
		autoplay: true,
        autoplaySpeed: 4000,
		draggable:false,
		dots: false,
		arrows:true,
		infinite: true,
		pauseOnFocus:false,
		pauseOnHover:false,
		speed: 800
	});

	// sub visual
	jQuery(".sub-visual").addClass("load");

	
	//좌측메뉴
	//jQuery(".lnb li").css("width",100/jQuery(".lnb li").length+"%");
	//jQuery(".lnb-menu li").css("width",100/jQuery(".lnb-menu li").length+"%");

	var swiper = new Swiper('.foot-logos', { //하단 로고모음
		slidesPerView: 'auto',
		preventClicks: false
	});

	// menu
	if(jQuery(window).width() <= 640) {
		var pIdx = $(".lnb-menu .swiper-slide.active").index();
		var swiper = new Swiper('.lnb-menu', {
			slidesPerView: 'auto',
			preventClicks: false,
			initialSlide: pIdx
		});

	}

	
	

	// scroll event
	$(window).bind("load scroll", function(){
		var headH = $("#header").height();
		if($(document).scrollTop() > headH){
			$("html").addClass("header-fixed");
		}else{
			$("html").removeClass("header-fixed");
		}
	});
	

	// top 
	jQuery('.scroll-top').on('click', function(){
		$('body,html').animate({scrollTop:0},400);
	});
	

	var offsetd = $(".quick").offset();
		var topPadding = 20;
		$(window).scroll(function() {
			if ($(window).scrollTop() > offsetd.top) {
				$(".quick").stop().animate({
					marginTop: $(window).scrollTop() - offsetd.top + topPadding
				});
			} else {
				$(".quick").stop().animate({
					marginTop: 0
				});
		};
	});
	

	
});	//End

$(window).bind("load resize", function(){
	stageResize();
});

function stageResize(){
	winH = $(window).height(),
	docH = $(document).height(),
	headH = $("#header").outerHeight(),
	lnbH = $("#lnb").outerHeight(),
	footH = $("#footer").outerHeight();

	$("#container").css("min-height",winH-headH-lnbH-footH);

	
}

