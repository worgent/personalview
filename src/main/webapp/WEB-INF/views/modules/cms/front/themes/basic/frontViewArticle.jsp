<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${article.title} - ${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${article.description} ${category.description}" />
	<meta name="keywords" content="${article.keywords} ${category.keywords}" />

</head>
<body>
	<div class="row">
	   <div class="span2">
	   	 <h4>栏目列表</h4>
		 <ol>
		 	<cms:frontCategoryList categoryList="${categoryList}"/>
		 </ol>
		 <h4>推荐阅读</h4>
		 <ol>
		 	<cms:frontArticleHitsTop category="${category}"/>
		 </ol>
	   </div>
	   <div class="span10">
		 <ul class="breadcrumb">
		    <cms:frontCurrentPosition category="${category}"/>
		 </ul>
	   </div>
	   <div class="span10">
	     <div class="row">
	       <div class="span10">
			<h3 style="color:#555555;font-size:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:15px;margin:25px 0;">${article.title}</h3>
			<c:if test="${not empty article.description}"><div>摘要：${article.description}</div></c:if>
			<div>${article.articleData.content}</div>
			<div style="border-top:1px solid #ddd;padding:10px;margin:25px 0;">发布者：${article.user.name} &nbsp; 点击数：${article.hits} &nbsp; 发布时间：<fmt:formatDate value="${article.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/> &nbsp; 更新时间：<fmt:formatDate value="${article.updateDate}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
  	       </div>
  	     </div>
	     <div class="row">
			<div id="comment" class="hide span10">
				正在加载评论...
			</div>
	     </div>
	     <div class="row">
	       <div class="span10">
			<h5>相关文章</h5>
			<ol><c:forEach items="${relationList}" var="relation">
				<li style="float:left;width:230px;"><a href="${ctx}/view-${relation[0]}-${relation[1]}${urlSuffix}">${fns:abbr(relation[2],30)}</a></li>
			</c:forEach></ol>
	  	  </div>
  	    </div>
  	  </div>

		<%--<div class="row">--%>
			<%--<h5>评论列表</h5>--%>
			<%--<ul>--%>
				<%--<c:forEach items="${page.list}" var="comment">--%>
					<%--<li>--%>
						<%--<h6>姓名: ${comment.name} &nbsp;时间：<fmt:formatDate value="${comment.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/>--%>
							<%--<a href="javascript:comment('${comment.id}')">回复</a></h6>--%>
						<%--<div>${comment.content}</div>--%>
						<%--<div id="commentForm${comment.id}" class="commentForm hide"></div>--%>
					<%--</li>--%>
				<%--</c:forEach>--%>
				<%--<c:if test="${fn:length(page.list) eq 0}">--%>
					<%--<li>暂时还没有人评论！</li>--%>
				<%--</c:if>--%>
			<%--</ul>--%>
			<%--<div class="pagination">${page}</div>--%>
			<%--<h5>我要评论</h5>--%>
		<%--<form:form action="${ctx}/comment" method="post" class="form-horizontal">--%>
			<%--<input type="hidden" name="category.id" value="${comment.category.id}"/>--%>
			<%--<input type="hidden" name="contentId" value="${comment.contentId}"/>--%>
			<%--<input type="hidden" name="title" value="${comment.title}"/>--%>
			<%--<input type="hidden" name="replyId"/>--%>
			<%--<div class="control-group">--%>
				<%--<label class="control-label">留言内容:</label>--%>
				<%--<div class="controls">--%>
					<%--<textarea name="content" rows="4" maxlength="200" class="txt required" style="width:400px;"></textarea>--%>
				<%--</div>--%>
			<%--</div>--%>
			<%--<div class="control-group">--%>
				<%--<label class="control-label">姓名:</label>--%>
				<%--<div class="controls">--%>
					<%--<input class="btn mid" type="submit" value="提 交"/>&nbsp;--%>
				<%--</div>--%>
			<%--</div>--%>
			<%--<div class="alert alert-error messageBox" style="display:none">输入有误，请先更正。</div>--%>
		<%--</form:form><!--*/-->--%>
		<%--</div>--%>
		<div class="container">
			<h2>赞踩区间</h2>
			<button type="button" class="btn btn-default" id="idSupport">点我点赞</button>
			<button type="button" class="btn btn-default disabled" style="display:none;" id="idSupported">已经点赞</button>
			<button type="button" class="btn btn-default" id="idUnSupport">点我来踩</button>
			<button type="button" class="btn btn-default disabled"  style="display:none;" id="idUnSupported">已经踩过</button>
		</div>
		<script type="text/javascript">
			$(document).ready(function() {
				if ("${category.allowComment}"=="1" && "${article.articleData.allowComment}"=="1"){
					$("#comment").show();
					page(1);
				}
				$("#idSupport").click(function(){
					alert("idSupport click");


					$.ajax({
						url: "${ctx}/support.${fns:getUrlSuffix()}",
						async:true,
						data:{
							articleID: "${article.id}"
						},
						success:function(ret){
							if( ret.errno == 0 ){
								alert("点赞成功");
								$("#idSupported").css("display", "block");
								$("#idSupport").css("display", "none");

							}else {
								alert(ret.errmsg);
							}
						},
						error:function(){
							alert("error");
						}
					})
				});

				$("#idUnSupport").click(function(){
					alert("idUnSupport click");

					$.ajax({
						url: "${ctx}/unsupport.${fns:getUrlSuffix()}",
						async:true,
						data:{
							articleID: "${article.id}"
						},
						success:function(ret){
							if( ret.errno == 0 ){
								alert("踩踩成功");
								$("#idUnSupported").css("display", "block");
								$("#idUnSupport").css("display", "none");

							}else {
								alert(ret.errmsg);
							}
						},
						error:function(){
							alert("error");
						}
					})
				});
			});
			function page(n,s){
				$.get("${ctx}/comment",{theme: '${site.theme}', 'category.id': '${category.id}',
					contentId: '${article.id}', title: '${article.title}', pageNo: n, pageSize: s, date: new Date().getTime()
				},function(data){
					$("#comment").html(data);
				});
			}
		</script>
   </div>
</body>
</html>