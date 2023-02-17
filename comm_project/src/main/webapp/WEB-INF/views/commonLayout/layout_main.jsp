<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="ko">
<tiles:insertAttribute name="head" />
<body>
<div id="skipToContent">
	<a href="#container">본문 바로가기</a>
	<a href="#gnb">주메뉴 바로가기</a>
</div>
<div id="wrapper">
	<!-- header s -->
	<tiles:insertAttribute name="header" />
	
	<!-- header e -->
	<tiles:insertAttribute name="content" />

	<!-- footer s -->
	<tiles:insertAttribute name="footer" />
	<!-- footer e -->
</div>
</body>
</html>