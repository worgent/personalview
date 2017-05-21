<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<c:set var="searchPage" value="true"></c:set>
<!DOCTYPE html>
<html>
<head>
	<title>全站搜索</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${site.description}" />
	<meta name="keywords" content="${site.keywords}" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/front/taobaoued/css/search.css">

</head>
<body>
<div class="articles">
	<c:forEach items="${page.list}" var="article">
		<%@ include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/widget/article.jsp"%>
	</c:forEach>
	<div class="clear"></div>
</div>

<div class="page-nav">
	<c:choose>
		<c:when test="${page.firstPage==true}">
			<div class="fa fa-angle-left"></div>
		</c:when>
		<c:otherwise>
			<a href="${pageContext.request.contextPath}/taobao/search-${site.id}-${page.prev}-${keyWord}${fns:getUrlSuffix()}"
			   class="fa fa-angle-left active"></a>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${page.lastPage==true}">
			<div class="fa fa-angle-right"></div>
		</c:when>
		<c:otherwise>
			<a href="${pageContext.request.contextPath}/taobao/search-${site.id}-${page.next}-${keyWord}${fns:getUrlSuffix()}"
			   class="fa fa-angle-right active"></a>
		</c:otherwise>
	</c:choose>
	<div class="clear"></div>
</div>
</body>
</html>