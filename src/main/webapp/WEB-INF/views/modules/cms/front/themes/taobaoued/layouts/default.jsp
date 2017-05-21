<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/include/taglib.jsp"%>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<!DOCTYPE html>
<html>
<head>
	<title><sitemesh:title default="欢迎光临"/> - ${site.title} - Powered By JeeSite</title>
	<%@include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/include/head.jsp" %>
	<!-- Baidu tongji analytics --><script>var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="//hm.baidu.com/hm.js?82116c626a8d504a5c0675073362ef6f";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script>
	<sitemesh:head/>
</head>
<body>

<div class="wrapper">
	<div class="topper">
		<div class="container">
			<div class="col-left menu">
				<div class="header-img">
					<img src="${ctxStatic}/front/taobaoued/img/logo.png">
				</div>
				<div class="menu-nav">
					<div class="j-nav-lable">
						<span></span>
					</div>
					<ul class="ul-menu-first">
						<li class="child-1 ${currentMenu eq "-1" or currentMenu == null ? 'current':''}">
							<a href="${pageContext.request.contextPath}/taobao/index-${site.id}-1${fns:getUrlSuffix()}">
							<span >首页</span></a>
						</li>

						<c:forEach items="${categories}" var="category">
							<c:if test="${category.inMenu eq '1'}">
							<li class="${category.parent.id ne '1'?'child-2':'child-1'} ${currentMenu == category.id ? 'current' : ''}">
								<a href="${pageContext.request.contextPath}/taobao/list-${category.id}-1${fns:getUrlSuffix()}"">
									<span>${category.name}</span></a>
							</li>
							</c:if>
						</c:forEach>
					</ul>
				</div>
				<form class="nav-search" method="get"
					  action="${pageContext.request.contextPath}/taobao/search-${site.id}-1-${keyWord}${fns:getUrlSuffix()}">
					<i class="fa fa-search active"></i>
					<i class="fa fa-search deactive"></i>
					<input type="text" name="keyWordPost" placeholder="">
				</form>
			</div>
			
			<div class="col-right main">
				<div class="header">
					<div class="login-container">
						<div class="path-qr">
							<img class="small" src="${ctxStatic}/front/taobaoued/img/qr.png">
							<i class="fa fa-caret-up"></i>
							<div class="clear"></div>
							<div class="big" >
								<%
									String url=request.getScheme()+"://";
									url+=request.getHeader("host");
									url+=request.getRequestURI();
									if(request.getQueryString()!=null)
										url+="?"+request.getQueryString();

								%>
								<img src="http://s.jiathis.com/qrcode.php?url=<%=url%>">
								<%--<img src="${ctxStatic}/front/taobaoued/img/path-two-dimension.png">--%>
							</div>

						</div>
						<a href=""><span>登入</span></a>
					</div>
					<c:if test="${not empty keyWord}">
					<div class="search-label">
						<label>搜索结果</label>
					</div>
					</c:if>
				</div>
				<sitemesh:body/>
			</div>
			<div class="clear"></div>

		</div>

	</div>
	<div class="footer">
		<div class="container">
			<div class="top">
				<div class="friend-link">
					<label>友情链接</label>
					<ul>
						<c:forEach items="${friendLinks}" var="link">
							<li>
								<a href="${link.href}" target="_blank">${link.title}</a>
							</li>
						</c:forEach>

						<div class="clear"></div>
					</ul>
				</div>
				<div class="hot-label">
					<label>热门标签</label>
					<c:forEach items="${hotLabels}" var="link" varStatus="status">
						<a href="${link.href}" target="_blank">
							${link.title}
						</a>
						<c:if test="${not status.last}">
							<i class="fa fa-circle"></i>
						</c:if>
					</c:forEach>

					<form class="nav-search" method="get"
						  action="${pageContext.request.contextPath}/taobao/search-${site.id}-1-${keyWord}${fns:getUrlSuffix()}">
						<i class="fa fa-search active"></i>
						<i class="fa fa-search deactive"></i>
						<input type="text" name="keyWordPost" placeholder="">
					</form>
				</div>
				<div class="clear"></div>

			</div>
			<div class="bottom">
				<img src="${ctxStatic}/front/taobaoued/img/logo-foot.png">
				<span>Copyright © 2015 Taobao UED. All rights reserved.</span>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	<div class="right-fixed-wrapper">
		<div class="up">
			<i class="fa fa-angle-up"></i>
		</div>
	</div>
</div>
<%@include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/include/footer.jsp" %>

</body>
</html>