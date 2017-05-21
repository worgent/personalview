<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>视频管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		function viewComment(href){
			top.$.jBox.open('iframe:'+href,'查看评论',$(top.document).width()-220,$(top.document).height()-120,{
				buttons:{"关闭":true},
				loaded:function(h){
					$(".jbox-content", top.document).css("overflow-y","hidden");
					$(".nav,.form-actions,[class=btn]", h.find("iframe").contents()).hide();
					$("body", h.find("iframe").contents()).css("margin","10px");
				}
			});
			return false;
		}
		function page(n,s){
			$("#pageNo").val(n);
			$("#pageSize").val(s);
			$("#searchForm").submit();
        	return false;
        }
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a href="${ctx}/cms/video/?category.id=${video.category.id}">视频列表</a></li>
		<shiro:hasPermission name="cms:video:edit"><li><a href="<c:url value='${fns:getAdminPath()}/cms/video/form?id=${video.id}&category.id=${video.category.id}'><c:param name='category.name' value='${video.category.name}'/></c:url>">视频添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="article" action="${ctx}/cms/video/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<label>栏目：</label><sys:treeselect id="category" name="category.id" value="${video.category.id}" labelName="category.name" labelValue="${video.category.name}"
					title="栏目" url="/cms/category/treeData" module="video" notAllowSelectRoot="false" cssClass="input-small"/>
		<label>标题：</label><form:input path="title" htmlEscape="false" maxlength="50" class="input-small"/>&nbsp;
		<input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/>&nbsp;&nbsp;
		<label>状态：</label><form:radiobuttons onclick="$('#searchForm').submit();" path="delFlag" items="${fns:getDictList('cms_del_flag')}" itemLabel="label" itemValue="value" htmlEscape="false"/>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead><tr><th>栏目</th><th>标题</th><th>权重</th><th>视频地址</th><th>视频系列</th><th>系列索引</th><th>点击数</th><th>发布者</th><th>更新时间</th><th>操作</th></tr></thead>
		<tbody>
		<c:forEach items="${page.list}" var="video">
			<tr>
				<td><a href="javascript:" onclick="$('#categoryId').val('${video.category.id}');$('#categoryName').val('${video.category.name}');$('#searchForm').submit();return false;">${video.category.name}</a></td>
				<td><a href="${ctx}/cms/video/form?id=${video.id}" title="${video.title}">${fns:abbr(video.title,40)}</a></td>
				<td>${video.weight}</td>
				<td>${video.videoPath}</td>
				<td>${video.sequence}</td>
				<td>${video.sequenceIndex}</td>
				<td>${video.hits}</td>
				<td>${video.user.name}</td>
				<td><fmt:formatDate value="${video.updateDate}" type="both"/></td>
				<td>
					<a href="${pageContext.request.contextPath}${fns:getFrontPath()}/view-${video.category.id}-${video.id}${fns:getUrlSuffix()}" target="_blank">访问</a>
					<shiro:hasPermission name="cms:video:edit">
						<c:if test="${video.category.allowComment eq '1'}"><shiro:hasPermission name="cms:comment:view">
							<a href="${ctx}/cms/comment/?module=video&contentId=${video.id}&delFlag=2" onclick="return viewComment(this.href);">评论</a>
						</shiro:hasPermission></c:if>
	    				<a href="${ctx}/cms/video/form?id=${video.id}">修改</a>
	    				<shiro:hasPermission name="cms:video:audit">
							<a href="${ctx}/cms/video/delete?id=${video.id}${video.delFlag ne 0?'&isRe=true':''}&categoryId=${video.category.id}" onclick="return confirmx('确认要${video.delFlag ne 0?'发布':'删除'}该视频吗？', this.href)" >${video.delFlag ne 0?'发布':'删除'}</a>
						</shiro:hasPermission>
					</shiro:hasPermission>
				</td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>