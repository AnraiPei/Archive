<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="/WEB-INF/tlds/sitemesh-decorator.tld" prefix="decorator"%>
<%@ taglib uri="/WEB-INF/tlds/sitemesh-page.tld" prefix="page"%>
<!-- <@ taglib uri='/WEB-INF/tlds/core-elutil.tld' prefix='elutil'%>
<@ taglib uri='/WEB-INF/tlds/core-pager.tld' prefix='pager'%>
<@ taglib uri='/WEB-INF/tlds/core-info.tld' prefix='info'%> -->


<c:set var="_ContextPath" value="${pageContext.request.contextPath}" />
<c:set var="_FrameworkPath" value="${pageContext.request.contextPath }/resources/framework" />
<c:set var="_JSPath" value="${pageContext.request.contextPath }/resources/js" />


<script type="text/javascript">
var _ContextPath = '${_ContextPath}';
var _FrameworkPath = '${_FrameworkPath}';
var _JSPath = '${_JSPath}';
</script>
