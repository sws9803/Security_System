<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- // header -->
<header id="header">
	<div class="contain">
		<div class="header">
			<h1 class="sitelogo"><a href="index.html"><img src="images/common/logo.jpg" alt="드림365"></a></h1>	
			<div class="header-search">
					<input type="text" id="searchTxt" name="" class="input" placeholder="검색어를 입력해주세요. ex)사업자등록번호, 물품분류번호, 물품식별번호 ">
					<button type="submit" class="submit" id="search">
						<span class="blind">검색</span>
					</button>
			</div>
			<div class="util">
				<ul>
					<li>
						<a href="#">
							<div class="icon"><img src="images/common/icon_login.png" alt=""></div>
							<div class="tit">로그인</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div class="icon"><img src="images/common/icon_join.png" alt=""></div>
							<div class="tit">회원가입</div>
						</a>
					</li>
					<!-- <li>
						<a href="#">
							<div class="icon"><img src="/dream/images/common/icon_logout.png" alt=""></div>
							<div class="tit">로그아웃</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div class="icon"><img src="/dream/images/common/icon_mypage.png" alt=""></div>
							<div class="tit">마페이지</div>
						</a>
					</li> -->
				</ul>
			</div>
		</div>
	</div>
	<div class="gnb-wrap">
		<div class="contain">
			<a href="#allmenu" class="btn-all-menu"><span>전체메뉴</span></a>
			<div id="gnb">
				<h2 class="blind">주메뉴</h2>
				<ul>
					<li class="active"><a href="#">장애인기업 제품 보기</a></li>
					<li><a href="#">장애인기업 찾기</a></li>
					<li><a href="#">사용 가이드</a></li>
					<li><a href="#">Dream365 소개</a></li>
				</ul>
			</div>
			<a href="#menu" class="btn-m-menu"><span>메뉴</span></a><!-- for mobile -->
		</div>
	</div>	
</header>
<!-- header //-->

<!-- for mobile -->
<div id="menu" class="mobile-navigation">
	<div class="home"><a href="http://www.senkorea.com:60196/index.php">HOME</a></div>
	<nav class="nav-menu">			
	</nav>		
	<a href="#" class="close"><span class="blind">Close</span></a>
</div>
<div class="mobile-overlay"></div>