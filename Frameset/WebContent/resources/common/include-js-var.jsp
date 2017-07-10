<%@ page pageEncoding="UTF-8"%>

<link href="${_FrameworkPath }/themes/default/style.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${_FrameworkPath }/themes/css/core.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${_FrameworkPath }/themes/css/print.css" rel="stylesheet" type="text/css" media="print"/>
<link href="${_FrameworkPath }/uploadify/css/uploadify.css" rel="stylesheet" type="text/css" media="screen"/>

<!--[if IE]>
<link href="${_FrameworkPath }/themes/css/ieHack.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->

<!--[if lt IE 9]>
<script src="${_FrameworkPath }/js/speedup.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/jquery-1.11.3.min.js" type="text/javascript"></script>
<![endif]-->

<!--[if gte IE 9]>
<!-->
<script src="${_FrameworkPath }/js/jquery-2.1.4.min.js" type="text/javascript"></script>
<!--
<![endif]-->

<script src="${_FrameworkPath }/js/jquery.cookie.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/jquery.validate.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/jquery.bgiframe.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/xheditor/xheditor-1.2.2.min.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/xheditor/xheditor_lang/zh-cn.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/uploadify/scripts/jquery.uploadify.js" type="text/javascript"></script>

<!-- svg图表  supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+ -->
<script type="text/javascript" src="${_FrameworkPath }/chart/raphael.js"></script>
<script type="text/javascript" src="${_FrameworkPath }/chart/g.raphael.js"></script>
<script type="text/javascript" src="${_FrameworkPath }/chart/g.bar.js"></script>
<script type="text/javascript" src="${_FrameworkPath }/chart/g.line.js"></script>
<script type="text/javascript" src="${_FrameworkPath }/chart/g.pie.js"></script>
<script type="text/javascript" src="${_FrameworkPath }/chart/g.dot.js"></script>


<script src="${_FrameworkPath }/js/dwz.core.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.util.date.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.validate.method.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.barDrag.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.drag.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.tree.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.accordion.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.ui.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.theme.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.switchEnv.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.alertMsg.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.contextmenu.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.navTab.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.tab.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.resize.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.dialog.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.dialogDrag.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.sortDrag.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.cssTable.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.stable.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.taskBar.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.ajax.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.pagination.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.database.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.datepicker.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.effects.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.panel.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.checkbox.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.history.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.combox.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.file.js" type="text/javascript"></script>
<script src="${_FrameworkPath }/js/dwz.print.js" type="text/javascript"></script>

<!-- 可以用dwz.min.js替换前面全部dwz.*.js (注意：替换时下面dwz.regional.zh.js还需要引入)
<script src="bin/dwz.min.js" type="text/javascript"></script>
-->

<script src="${_FrameworkPath }/js/dwz.regional.zh.js" type="text/javascript"></script>