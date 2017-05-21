<%--
  Created by IntelliJ IDEA.
  User: worgen
  Date: 2015/11/25
  Time: 9:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="article ${article.weight >= 100 ? 'hot-article' : ''} ${not empty article.image ? 'pic-article' : ''}">
<div class="summary">
  <p class="span-summary">${article.description} …
    <a href="${pageContext.request.contextPath}/taobao/view-${article.category.id}-${article.id}${fns:getUrlSuffix()}" target="_blank">
      <span>更多></span></a></p>
  <a href="${pageContext.request.contextPath}/taobao/view-${article.category.id}-${article.id}${fns:getUrlSuffix()}" target="_blank">
    <c:set var="default_article_cover" value="${ctxStatic}/front/taobaoued/img/article-cover.jpg"/>
    <img class="lazy" src="${ctxStatic}/front/taobaoued/img/grey.gif" data-original="${not empty article.image and article.image ne "" ? article.image : default_article_cover}"
         onerror="javascript:this.src='${default_article_cover}';"></a>
  <div class="hot-tag undis">
    <span>HOT</span>
  </div>
</div>

<div class="detail post-${article.id}">
  <a href="${pageContext.request.contextPath}/taobao/view-${article.category.id}-${article.id}${fns:getUrlSuffix()}" target="_blank">
    <span class="title">${fns:abbr(article.title, 30)}</span></a>
  <div class="section-detail">
    <span class="send-date">${article.endDate}</span>
    <a href="${pageContext.request.contextPath}/taobao/view-${article.category.id}-${article.id}${fns:getUrlSuffix()}#i-comment-panel">
      <span class="comment"><i class="fa fa-comment"></i>${article.commentNum}</span></a>
    <a href="javascript:void(0)" onclick="supportClick('${article.id}')">
      <span class="support"><i class="fa fa-heart ${article.isSupport == null or article.isSupport=='' ? '' : 'active'}"></i><span class="num">${article.supportNum}</span></span>
    </a>
    <div class="clear"></div>
  </div>
</div>

</div>

