<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>首页</title>
    <meta name="decorator" content="cms_default_${site.theme}"/>
    <meta name="description" content="${article.description} ${category.description}" />
    <meta name="keywords" content="${article.keywords} ${category.keywords}" />

</head>
<body>
<div class="banner">
    <a href="${pageContext.request.contextPath}/taobao/view-${firstBannerArticle.category.id}-${firstBannerArticle.id}${fns:getUrlSuffix()}" target="_blank">
    <div class="first-banner">
        <c:set var="banner1_default_image" value="${ctxStatic}/front/taobaoued/img/first-banner.png"/>
        <img src="${firstBannerArticle.image eq '' ? banner1_default_image: firstBannerArticle.image}" >
        <div class="title">
            <span>${firstBannerArticle.title}</span>
        </div>
    </div>
    </a>

    <a href="${pageContext.request.contextPath}/taobao/view-${secondBannerArticle.category.id}-${secondBannerArticle.id}${fns:getUrlSuffix()}" target="_blank">
    <div class="second-banner">
        <c:set var="banner2_default_image" value="${ctxStatic}/front/taobaoued/img/second-banner.png"/>
        <img src="${ secondBannerArticle.image ne null and  secondBannerArticle.image ne ''
            ? secondBannerArticle.image :banner2_default_image }" >
    </div>

    <div class="clear"></div>
    </a>
</div>
<div class="articles">
    <c:forEach items="${page.list}" var="article">
        <%@ include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/widget/article.jsp"%>
    </c:forEach>

    <div class="clear"></div>
</div>
<%@ include file="/WEB-INF/views/modules/cms/front/themes/taobaoued/widget/pageNav.jsp"%>



</body>
</html>