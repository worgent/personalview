<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>评论管理</title>
	<meta name="decorator" content="default"/>
	<%@include file="/WEB-INF/views/include/treetable.jsp" %>
	<script type="text/javascript">
		$(document).ready(function() {
			var tpl = $("#treeTableTpl").html().replace(/(\/\/\<!\-\-)|(\/\/\-\->)/g,"");
			var data = ${fns:toJson(list)}, ids = [], rootIds = [];
			for (var i=0; i<data.length; i++){
				ids.push(data[i].id);
			}
			ids = ',' + ids.join(',') + ',';
			for (var i=0; i<data.length; i++){
				if (ids.indexOf(','+data[i].parentId+',') == -1){
					if ((','+rootIds.join(',')+',').indexOf(','+data[i].parentId+',') == -1){
						rootIds.push(data[i].parentId);
					}
				}
			}
			for (var i=0; i<rootIds.length; i++){
				addRow("#treeTableList", tpl, data, rootIds[i], true);
			}
			$("#treeTable").treeTable({expandLevel : 5});
		});
		function addRow(list, tpl, data, pid, root){
			for (var i=0; i<data.length; i++){
				var row = data[i];
				if ((${fns:jsGetVal('row.parentId')}) == pid){
					$(list).append(Mustache.render(tpl, {
						dict: {
							delFlag: getDictLabel(${fns:toJson(fns:getDictList('del_flag'))}, row.delFlag),
						blank123:0}, pid: (root?0:pid), row: row
					}));
					addRow(list, tpl, data, row.id);
				}
			}
		}
	</script>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a href="${ctx}/cms/comment/">评论列表</a></li>
	</ul>
	<form:form id="searchForm" modelAttribute="comment" action="${ctx}/cms/comment/" method="post" class="breadcrumb form-search">
		<ul class="ul-form">
			<%--<li><label>父ID：</label>--%>
			<%--</li>--%>
				<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
				<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
				<li><label>栏目编号：</label>
				<form:input path="category.id" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>栏目内容的编号：</label>
				<form:input path="contentId" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>栏目内容的标题：</label>
				<form:input path="title" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>评论内容：</label>
				<form:input path="content" htmlEscape="false" maxlength="255" class="input-medium"/>
			</li>
			<li><label>评论姓名：</label>
				<form:input path="name" htmlEscape="false" maxlength="100" class="input-medium"/>
			</li>
			<%--<li><label>评论IP：</label>--%>
				<%--<form:input path="ip" htmlEscape="false" maxlength="100" class="input-medium"/>--%>
			<%--</li>--%>
			<%--<li><label>创建评论的人：</label>--%>
				<%--<form:input path="createBy.id" htmlEscape="false" maxlength="64" class="input-medium"/>--%>
			<%--</li>--%>
			<li><label>评论时间：</label>
				<input name="createDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${comment.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</li>
			<li><label>审核人：</label>
				<form:input path="auditUser.id" htmlEscape="false" maxlength="64" class="input-medium"/>
			</li>
			<li><label>审核时间：</label>
				<input name="auditDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate"
					value="<fmt:formatDate value="${comment.auditDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',isShowClear:false});"/>
			</li>
			<li><label>删除标记：</label>
				<form:radiobuttons path="delFlag" items="${fns:getDictList('cms_del_flag')}" itemLabel="label" itemValue="value" htmlEscape="false"/>
			</li>
			<li class="btns"><input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/></li>
			<li class="clearfix"></li>
		</ul>
	</form:form>
	<sys:message content="${message}"/>
	<table id="treeTable" class="table table-striped table-bordered table-condensed">
		<thead>
			<tr>
				<th>父ID</th>
				<th>栏目编号</th>
				<th>栏目内容的编号</th>
				<th>栏目内容的标题</th>
				<th>评论内容</th>
				<th>评论姓名</th>
				<%--<th>评论IP</th>--%>
				<%--<th>创建评论的人</th>--%>
				<th>评论时间</th>
				<th>审核人</th>
				<th>审核时间</th>
				<th>删除标记</th>
				<shiro:hasPermission name="cms:comment:edit"><th>操作</th></shiro:hasPermission>
			</tr>
		</thead>
		<tbody id="treeTableList"></tbody>
	</table>
	<script type="text/template" id="treeTableTpl">
		<tr id="{{row.id}}" pId="{{pid}}">
			<td>
				{{row.parent.id}}
			</td>
			<td>
				{{row.category.id}}
			</td>
			<td>
				{{row.contentId}}
			</td>
			<td>
				{{row.title}}
			</td>
			<td>
				{{row.content}}
			</td>
			<td>
				{{row.name}}
			</td>
			<%--<td>--%>
				<%--{{row.ip}}--%>
			<%--</td>--%>
			<%--<td>--%>
				<%--{{row.createBy.id}}--%>
			<%--</td>--%>
			<td>
				{{row.createDate}}
			</td>
			<td>
				{{row.auditUser.id}}
			</td>
			<td>
				{{row.auditDate}}
			</td>
			<td>
				{{dict.delFlag}}
			</td>
			<shiro:hasPermission name="cms:comment:edit"><td>
				<%--<a href="${ctx}/cms/comment/delete?id={{row.id}}" onclick="return confirmx('确认要删除该评论及所有子评论吗？', this.href)">删除</a>--%>
				<%--<a href="${ctx}/cms/comment/form?parent.id={{row.id}}">添加子评论</a>--%>

					<c:if test="${comment.delFlag eq '0'}"><a href="${ctx}/cms/comment/unaudit?id={{row.id}}" onclick="return confirmx('确认要恢复审核吗？', this.href)">恢复审核</a></c:if>
					<c:if test="${comment.delFlag eq '1'}"><a href="${ctx}/cms/comment/unaudit?id={{row.id}}" onclick="return confirmx('确认要恢复审核吗？', this.href)">恢复审核</a></c:if>
					<c:if test="${comment.delFlag ne '1'}"><a href="${ctx}/cms/comment/delete?id={{row.id}}" onclick="return confirmx('确认要删除吗？', this.href)">删除</a></c:if>
					<c:if test="${comment.delFlag eq '2'}"><a href="${ctx}/cms/comment/audit?id={{row.id}}">审核通过</a></c:if>

			</td></shiro:hasPermission>
		</tr>
	</script>
</body>
</html>