<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${category.description}" />
	<meta name="keywords" content="${category.keywords}" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/front/taobaoued/css/column.css">

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
			<a href="${pageContext.request.contextPath}/taobao/list-${currentMenu}-${page.prev}${fns:getUrlSuffix()}"
			   class="fa fa-angle-left active"></a>
		</c:otherwise>
	</c:choose>
	<c:choose>
		<c:when test="${page.lastPage==true}">
			<div class="fa fa-angle-right"></div>
		</c:when>
		<c:otherwise>
			<a href="${pageContext.request.contextPath}/taobao/list-${currentMenu}-${page.next}${fns:getUrlSuffix()}"
			   class="fa fa-angle-right active"></a>
		</c:otherwise>
	</c:choose>
	<div class="clear"></div>
</div>
</body>
</html>