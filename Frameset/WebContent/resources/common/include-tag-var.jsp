<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>


<c:set var="_ContextPath" value="${pageContext.request.contextPath}" />
<c:set var="_FrameworkPath" value="${pageContext.request.contextPath }/resources/framework" />
<c:set var="_JSPath" value="${pageContext.request.contextPath }/resources/js" />
<c:set var="_Module_Path" value="${pageContext.request.contextPath }/resources/js/module" />


<script type="text/javascript">
var _ContextPath = '${_ContextPath}';
var _FrameworkPath = '${_FrameworkPath}';
var _JSPath = '${_JSPath}';
var _Module_Path = '${_Module_Path}';
</script>
