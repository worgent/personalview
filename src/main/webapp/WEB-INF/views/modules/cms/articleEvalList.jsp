<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>主子表管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			
		});
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
		<li class="active"><a href="${ctx}/cms/articleEval/">主子表列表</a></li>
		<shiro:hasPermission name="cms:articleEval:edit"><li><a href="${ctx}/cms/articleEval/form">主子表添加</a></li></shiro:hasPermission>
	</ul>
	<form:form id="searchForm" modelAttribute="articleEval" action="${ctx}/cms/articleEval/" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<ul class="ul-form">
			<li><label>文章ID：</label>
				<form:input path="article.id" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>赞和踩的用户：</label>
				<form:input path="user.id" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>1-赞，2-踩：</label>
				<form:input path="eval" htmlEscape="false" maxlength="11" class="input-medium"/>
			</li>
			<li><label>session_id：</label>
				<form:input path="sessionId" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>create_date：</label>
				<input name="createDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${articleEval.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>文章ID</th>
				<th>赞和踩的用户</th>
				<th>1-赞，2-踩</th>
				<th>session_id</th>
				<th>create_date</th>
				<shiro:hasPermission name="cms:articleEval:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${page.list}" var="articleEval">
			<tr>
				<td><a href="${ctx}/cms/articleEval/form?id=${articleEval.id}">
					${articleEval.article.id}
				</a></td>
				<td>
					${articleEval.user.id}
				</td>
				<td>
					${articleEval.eval}
				</td>
				<td>
					${articleEval.sessionId}
				</td>
				<td>
					<fmt:formatDate value="${articleEval.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
				</td>
				<shiro:hasPermission name="cms:articleEval:edit"><td>
    				<a href="${ctx}/cms/articleEval/form?id=${articleEval.id}">修改</a>
					<a href="${ctx}/cms/articleEval/delete?id=${articleEval.id}" onclick="return confirmx('确认要删除该主子表吗？', this.href)">删除</a>
				</td></shiro:hasPermission>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
</body>
</html>