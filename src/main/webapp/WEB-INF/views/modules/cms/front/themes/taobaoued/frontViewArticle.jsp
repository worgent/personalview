<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/modules/cms/front/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>${article.title} - ${category.name}</title>
	<meta name="decorator" content="cms_default_${site.theme}"/>
	<meta name="description" content="${article.description} ${category.description}" />
	<meta name="keywords" content="${article.keywords} ${category.keywords}" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/front/taobaoued/css/detail.css">

</head>
<body>
<div class="content">
	<div class="article-detail">
		<div class="article-header">
			<div class="hot-tag undis">
				<span>HOT</span>
			</div>
			<a class="author-avatar" href="javascript:void(0)">
				<c:set var="default_author_avatar" value="${ctxStatic}/front/taobaoued/img/author_avatar-50x50.jpg"></c:set>
				<img src="${article.createBy.photo ne null and article.createBy.photo ne '' ? article.createBy.photo : default_author_avatar}"></a>
			<%--<img src="${ctxStatic}/front/taobaoued/img/author_avatar-50x50.jpg"></a>--%>
			<div class="article-info fl">
				<a class="title" href="">${fns:abbr(article.title, 30)}</a>
				<span class="author-name">作者：
					<a href="javascript:void(0)">${article.createBy.name ne "" ? article.createBy.name : "匿名"}</a></span>
				<span>|</span>
				<span class="send-time">时间：${article.createDate}</span>
			</div>
			<div class="clear"></div>
		</div>
		<div class="article-content">
			${article.articleData.content}
		</div>
		<div class="article-tags">
			<label class="fl">标签:</label>
			<ul class="fl">
				<li><a href="javascript:void(0)">app</a><span>、</span></li>

				<li><a href="javascript:void(0)">交互设计</a><span>、</span></li>

				<li><a href="javascript:void(0)">移动产品</a><span>、</span></li>
			</ul>
			<div class="clear"></div>
		</div>
	</div>
	<div class="article-footer">
		<a>
			<i class="fa fa-heart"></i>推荐(109)
		</a>
		/
		<a href="#i-comment-panel">
			<i class="fa fa-comment"></i>评论(${fn:length(comments)})
		</a>
		/
		<a href="javascript:void(0)" class="jiathis_button_weixin"><i class="fa fa-share"></i>分享</a>

	</div>

	<div class="page-nav">
		<c:set var="prevArticleUrl" value="${pageContext.request.contextPath}/taobao/view-${prevArticle.category.id}-${prevArticle.id}${fns:getUrlSuffix()}"></c:set>
		<a href="${prevArticle==null? "javascript:void(0)":prevArticleUrl}"
		   class="fa fa-angle-left ${prevArticle!=null?"active":""}"></a>
		<c:set var="nextArticleUrl" value="${pageContext.request.contextPath}/taobao/view-${nextArticle.category.id}-${nextArticle.id}${fns:getUrlSuffix()}"></c:set>
		<a href="${nextArticle==null? "javascript:void(0)":nextArticleUrl}" class="fa fa-angle-right ${nextArticle!=null?"active":""}"></a>
	</div>
	<div class="comment-panel" id="i-comment-panel">
		<div class="panel-header">
			<label class="label-head">全部评论：<span class="comment-num">${fn:length(comments)}</span>条</label>
		</div>
		<div class="comments">
			<c:forEach items="${comments}" var="comment">
				<c:choose>
					<c:when test="${comment.parent.id eq '0'}">
						<div class="comment comment-p1" id="comment-${comment.id}">
					</c:when>
					<c:otherwise>
						<div class="comment comment-p2" id="comment-${comment.id}">
					</c:otherwise>
				</c:choose>

					<a class="commentor-avatar" href="javascript:void(0)">
						<c:set var="default_commentor_avatar" value="${ctxStatic}/front/taobaoued/img/default-avatar.png"></c:set>
						<img src="${comment.createBy.photo ne null and comment.createBy.photo ne "" ? comment.createBy.photo : default_commentor_avatar}"></a>
					<div class="comment-info">
						<div class="first-line">
							<a href="javascript:void(0)" class="commentor-name">${comment.name}</a>
							<span>:</span>
							<c:choose>
								<c:when test="${comment.parent.id eq '0'}">
								</c:when>
								<c:otherwise>
									<a href="javascript:void(0)" class="commentor-p1-name">@${comment.parent.name}</a>
								</c:otherwise>
							</c:choose>
							<span class="comment-content">${comment.content}</span>
							<a href="javascript:void(0)" class="reply">回复</a>
						</div>
						<p class="comment-time">${comment.createDate}</p>
					</div>
					<div class="clear"></div>
				</div>

			</c:forEach>

		</div>

		<div id="J_CommenInput" class="comment-input">
			<input type="hidden" name="replyId" value="0"/>
			<input type="hidden" name="categoryId" value="${article.category.id}"/>
			<input type="hidden" name="contentId" value="${article.id}"/>
			<input type="hidden" name="title" value="${article.title}"/>
			<img class="commentor-avatar" src="${ctxStatic}/front/taobaoued/img/default-avatar.png">
			<input class="input-nickname" type="text" required="true" placeholder="昵称(必填)">
			<input class="input-email" type="text" placeholder="邮箱">
			<input class="input-site" type="text" placeholder="站点">
			<textarea class="input-comment-content" type="text" placeholder="说点什么"></textarea>
			<a href="javascript:saveComment()">发布</a>
		</div>
	</div>
</div>



<script type="text/javascript" src="${ctxStatic}/front/taobaoued/js/detail.js"></script>
	<!-- JiaThis Button BEGIN -->

	<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
	<!-- JiaThis Button END -->
<script>
	$(function () {
//		index_load();
		detail_load();
	});

</script>
</body>
</html>