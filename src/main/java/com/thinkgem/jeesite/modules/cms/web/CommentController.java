/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.modules.sys.entity.User;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.cms.entity.Comment;
import com.thinkgem.jeesite.modules.cms.service.CommentService;
import com.thinkgem.jeesite.modules.sys.utils.DictUtils;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;

/**
 * 评论Controller
 * @author ThinkGem
 * @version 2013-3-23
 */
@Controller
@RequestMapping(value = "${adminPath}/cms/comment")
public class CommentController extends BaseController {

//	@Autowired
//	private CommentService commentService;
//
//	@ModelAttribute
//	public Comment get(@RequestParam(required=false) String id) {
//		if (StringUtils.isNotBlank(id)){
//			return commentService.get(id);
//		}else{
//			return new Comment();
//		}
//	}
//
//	@RequiresPermissions("cms:comment:view")
//	@RequestMapping(value = {"list", ""})
//	public String list(Comment comment, HttpServletRequest request, HttpServletResponse response, Model model) {
//        Page<Comment> page = commentService.findPage(new Page<Comment>(request, response), comment);
//        model.addAttribute("page", page);
//		return "modules/cms/commentList";
//	}
//
//	@RequiresPermissions("cms:comment:edit")
//	@RequestMapping(value = "save")
//	public String save(Comment comment, RedirectAttributes redirectAttributes) {
//		if (beanValidator(redirectAttributes, comment)){
//			if (comment.getAuditUser() == null){
//				comment.setAuditUser(UserUtils.getUser());
//				comment.setAuditDate(new Date());
//			}
//			comment.setDelFlag(Comment.DEL_FLAG_NORMAL);
//			commentService.save(comment);
//			addMessage(redirectAttributes, DictUtils.getDictLabel(comment.getDelFlag(), "cms_del_flag", "保存")
//					+"评论'" + StringUtils.abbr(StringUtils.replaceHtml(comment.getContent()),50) + "'成功");
//		}
//		return "redirect:" + adminPath + "/cms/comment/?repage&delFlag=2";
//	}
//
//	@RequiresPermissions("cms:comment:edit")
//	@RequestMapping(value = "delete")
//	public String delete(Comment comment, @RequestParam(required=false) Boolean isRe, RedirectAttributes redirectAttributes) {
//		commentService.delete(comment);
//		addMessage(redirectAttributes, (isRe!=null&&isRe?"恢复审核":"删除")+"评论成功");
//		return "redirect:" + adminPath + "/cms/comment/?repage&delFlag=2";
//	}
	@Autowired
	private CommentService commentService;

	@ModelAttribute
	public Comment get(@RequestParam(required=false) String id) {
		Comment entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = commentService.get(id);
		}
		if (entity == null){
			entity = new Comment();
		}
		return entity;
	}

	@RequiresPermissions("cms:comment:view")
	@RequestMapping(value = {"list", ""})
	public String list(Comment comment, HttpServletRequest request, HttpServletResponse response, Model model) {
		List<Comment> list = commentService.findList(comment);
		model.addAttribute("list", list);
		return "modules/cms/commentList";
	}

	@RequiresPermissions("cms:comment:view")
	@RequestMapping(value = "form")
	public String form(Comment comment, Model model) {
		if (comment.getParent()!=null && StringUtils.isNotBlank(comment.getParent().getId())){
			comment.setParent(commentService.get(comment.getParent().getId()));
			// 获取排序号，最末节点排序号+30
			if (StringUtils.isBlank(comment.getId())){
				Comment commentChild = new Comment();
				commentChild.setParent(new Comment(comment.getParent().getId()));
				List<Comment> list = commentService.findList(comment);
				if (list.size() > 0){
					comment.setSort(list.get(list.size()-1).getSort());
					if (comment.getSort() != null){
						comment.setSort(comment.getSort() + 30);
					}
				}
			}
		}
		if (comment.getSort() == null){
			comment.setSort(30);
		}
		model.addAttribute("comment", comment);
		return "modules/cms/commentForm";
	}

	@RequiresPermissions("cms:comment:edit")
	@RequestMapping(value = "save")
	public String save(Comment comment, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, comment)){
			return form(comment, model);
		}
		comment.setDelFlag(Comment.DEL_FLAG_NORMAL);
		commentService.save(comment);
		addMessage(redirectAttributes, "保存评论成功");
		return "redirect:"+ Global.getAdminPath()+"/cms/comment/?repage";
	}

	@RequiresPermissions("cms:comment:edit")
	@RequestMapping(value = "delete")
	public String delete(Comment comment, RedirectAttributes redirectAttributes) {
		commentService.delete(comment);
		addMessage(redirectAttributes, "删除评论成功");
		return "redirect:"+Global.getAdminPath()+"/cms/comment/?repage";
	}

	@RequiresPermissions("cms:comment:edit")
	@RequestMapping(value = "audit")
	public String audit(Comment comment, RedirectAttributes redirectAttributes) {
		comment.setDelFlag(Comment.DEL_FLAG_NORMAL);
		comment.setAuditDate(new Date());
		comment.setAuditUser(UserUtils.getUser());
		commentService.save(comment);
		addMessage(redirectAttributes, "审核评论成功");
		return "redirect:"+Global.getAdminPath()+"/cms/comment/?repage";
	}
	@RequiresPermissions("cms:comment:edit")
	@RequestMapping(value = "unaudit")
	public String unaudit(Comment comment, RedirectAttributes redirectAttributes) {
		comment.setDelFlag(Comment.DEL_FLAG_AUDIT);

		commentService.save(comment);
		addMessage(redirectAttributes, "恢复审核状态");
		return "redirect:"+Global.getAdminPath()+"/cms/comment/?repage";
	}
	@RequiresPermissions("user")
	@ResponseBody
	@RequestMapping(value = "treeData")
	public List<Map<String, Object>> treeData(@RequestParam(required=false) String extId, HttpServletResponse response) {
		List<Map<String, Object>> mapList = Lists.newArrayList();
		List<Comment> list = commentService.findList(new Comment());
		for (int i=0; i<list.size(); i++){
			Comment e = list.get(i);
			if (StringUtils.isBlank(extId) || (extId!=null && !extId.equals(e.getId()) && e.getParentIds().indexOf(","+extId+",")==-1)){
				Map<String, Object> map = Maps.newHashMap();
				map.put("id", e.getId());
				map.put("pId", e.getParentId());
				map.put("name", e.getName());
				mapList.add(map);
			}
		}
		return mapList;
	}

}
