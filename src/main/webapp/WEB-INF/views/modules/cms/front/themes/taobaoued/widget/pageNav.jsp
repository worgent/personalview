<%--
  Created by IntelliJ IDEA.
  User: worgen
  Date: 2015/12/7
  Time: 18:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-nav">
  <c:choose>
    <c:when test="${page.firstPage==true}">
      <div class="fa fa-angle-left"></div>
    </c:when>
    <c:otherwise>
      <a href="${pageContext.request.contextPath}/taobao/index-${site.id}-${page.prev}${fns:getUrlSuffix()}"
         class="fa fa-angle-left active"></a>
    </c:otherwise>
  </c:choose>
  <c:choose>
    <c:when test="${page.lastPage==true}">
      <div class="fa fa-angle-right"></div>
    </c:when>
    <c:otherwise>
      <a href="${pageContext.request.contextPath}/taobao/index-${site.id}-${page.next}${fns:getUrlSuffix()}"
         class="fa fa-angle-right active"></a>
    </c:otherwise>
  </c:choose>
  <div class="clear"></div>
</div>
