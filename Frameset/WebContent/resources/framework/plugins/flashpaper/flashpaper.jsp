<%@ include file="/resource-include/taglibs.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>在线阅读</title>
<%@ include file="/resource-include/common_include.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="${_ctx}/lib/plugins/flashpaper/swfobject.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	  var width = $("#flashContent").width();
		var height = $("#flashContent").height();
		swfobject.embedSWF("FlashPaper1000x700_id.swf?url=${param.url}&fileId=${param.id}&showTool=0&showPrint=0&showPop=0", "flashContent", 1000, 700, "9.0.0", "expressInstall.swf");
	});
</script>
<style type="css/text">
	html,body{ margin:0; height:100%; }
	.container{ height:100%; background-color:#00F;}
</style>
</head>
<body>
	<div style="text-align:center;width:100%;">
		<div id="flashContent" class="container" >&nbsp;
		</div>
	</div>
</body>
</html>