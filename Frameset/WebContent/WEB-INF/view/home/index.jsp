<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/resources/common/include-tag-var.jsp" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@ include file="/resources/common/include-js-var.jsp" %>
<link rel="stylesheet" type="text/css" media="screen" href="${_JSPath }/common/main.css" />
<script type="text/javascript" src="${_JSPath }/common/indexdata.js"></script>
<script type="text/javascript" src="${_JSPath }/common/main.js"></script>
</head>
<body>
	<div id="pageloading"></div>
	<div id="topmenu" class="l-topmenu">
		<div class="l-topmenu-logo">肺结核综合管理平台</div>
		<div class="l-topmenu-welcome">
			<label>你好，管理员</label>
			&nbsp&nbsp
			<span class="space">|</span>
			<a href="javascript:f_addTab('pay','捐赠','pay.htm')" class="l-link2">修改密码</a>
			<span class="space">|</span>
			<a href="javascript:f_addTab('pay','捐赠','pay.htm')" class="l-link2">注销</a>
		</div>
	</div>
	<div id="main_layout" style="width:99.2%; margin:0 auto; margin-top:4px;">
		<div position="left" title="系统管理" id="menu_accordion">
			<div title="模块一" class="l-scroll">
				<ul id="_tree_menu_one" style="margin-top: 3px;">
			</div>
			<div title="模块二">
				<ul id="_tree_menu_one" style="margin-top: 3px;">
			</div>
			<div title="模块三">
				<ul id="_tree_menu_one" style="margin-top: 3px;">
			</div>
		</div>
		<div position="center" id="framecenter"> 
            <div tabid="home" title="我的主页" style="height:300px" >
                <iframe frameborder="0" name="home" id="home" src="welcome.htm"></iframe>
            </div> 
        </div> 
    </div>
	<div style="height: 32px; line-height: 32px; text-align: center;">
		Copyright © 2017 湖州中心医院
	</div>
	<div style="display:none"><script src="http://s21.cnzz.com/stat.php?id=2970137&web_id=2970137" language="JavaScript"></script></div>
</body>
</html>