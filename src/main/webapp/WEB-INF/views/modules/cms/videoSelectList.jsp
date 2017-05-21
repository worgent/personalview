<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>选择视频</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		$(document).ready(function() {
			$("input[name=id]").each(function(){
				var videoSelect = null;
				if (top.mainFrame.cmsMainFrame){
					videoSelect = top.mainFrame.cmsMainFrame.videoSelect;
				}else{
					videoSelect = top.mainFrame.videoSelect;
				}
				for (var i=0; i<videoSelect.length; i++){
					if (videoSelect[i][0]==$(this).val()){
						this.checked = true;
					}
				}
				$(this).click(function(){
					var id = $(this).val(), title = $(this).attr("title");
					if (top.mainFrame.cmsMainFrame){
						top.mainFrame.cmsMainFrame.videoSelectAddOrDel(id, title);
					}else{
						top.mainFrame.videoSelectAddOrDel(id, title);
					}
				});
			});
		});
		function view(href){
			top.$.jBox.open('iframe:'+href,'查看视频',$(top.document).width()-220,$(top.document).height()-120,{
				buttons:{"关闭":true},
				loaded:function(h){
					$(".jbox-content", top.document).css("overflow-y","hidden");
					$(".nav,.form-actions,[class=btn]", h.find("iframe").contents()).hide();
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
	<div style="margin:10px;">
	<form:form id="searchForm" modelAttribute="article" action="${ctx}/cms/video/selectList" method="post" class="breadcrumb form-search">
		<input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
		<input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>
		<label>栏目：</label><sys:treeselect id="category" name="category.id" value="${video.category.id}" labelName="category.name" labelValue="${video.category.name}"
					title="栏目" url="/cms/category/treeData" module="video" cssClass="input-small"/>
		<label>标题：</label><form:input path="title" htmlEscape="false" maxlength="50" class="input-small"/>&nbsp;
		<input id="btnSubmit" class="btn btn-primary" type="submit" value="查询"/>&nbsp;&nbsp;
	</form:form>
	<table id="contentTable" class="table table-striped table-bordered table-condensed">
		<thead><tr><th style="text-align:center;">选择</th><th>栏目</th><th>标题</th><th>权重</th><th>点击数</th><th>发布者</th><th>更新时间</th></tr></thead>
		<tbody>
		<c:forEach items="${page.list}" var="video">
			<tr>
				<td style="text-align:center;"><input type="checkbox" name="id" value="${video.id}" title="${fns:abbr(video.title,40)}" /></td>
				<td><a href="javascript:" onclick="$('#categoryId').val('${video.category.id}');$('#categoryName').val('${video.category.name}');$('#searchForm').submit();return false;">${video.category.name}</a></td>
				<td><a href="${ctx}/cms/video/form?id=${video.id}" title="${video.title}" onclick="return view(this.href);">${fns:abbr(video.title,40)}</a></td>
				<td>${video.weight}</td>
				<td>${video.hits}</td>
				<td>${video.createBy.name}</td>
				<td><fmt:formatDate value="${video.updateDate}" type="both"/></td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<div class="pagination">${page}</div>
	</div>
</body>
</html>