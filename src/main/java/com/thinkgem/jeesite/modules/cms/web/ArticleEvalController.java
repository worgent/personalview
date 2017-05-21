/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.cms.entity.ArticleEval;
import com.thinkgem.jeesite.modules.cms.service.ArticleEvalService;

/**
 * 主子表生成Controller
 * @author ThinkGem
 * @version 2015-12-08
 */
@Controller
@RequestMapping(value = "${adminPath}/cms/articleEval")
public class ArticleEvalController extends BaseController {

	@Autowired
	private ArticleEvalService articleEvalService;
	
	@ModelAttribute
	public ArticleEval get(@RequestParam(required=false) String id) {
		ArticleEval entity = null;
		if (StringUtils.isNotBlank(id)){
			entity = articleEvalService.get(id);
		}
		if (entity == null){
			entity = new ArticleEval();
		}
		return entity;
	}
	
	@RequiresPermissions("cms:articleEval:view")
	@RequestMapping(value = {"list", ""})
	public String list(ArticleEval articleEval, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<ArticleEval> page = articleEvalService.findPage(new Page<ArticleEval>(request, response), articleEval); 
		model.addAttribute("page", page);
		return "modules/cms/articleEvalList";
	}

	@RequiresPermissions("cms:articleEval:view")
	@RequestMapping(value = "form")
	public String form(ArticleEval articleEval, Model model) {
		model.addAttribute("articleEval", articleEval);
		return "modules/cms/articleEvalForm";
	}

	@RequiresPermissions("cms:articleEval:edit")
	@RequestMapping(value = "save")
	public String save(ArticleEval articleEval, Model model, RedirectAttributes redirectAttributes) {
		if (!beanValidator(model, articleEval)){
			return form(articleEval, model);
		}
		articleEvalService.save(articleEval);
		addMessage(redirectAttributes, "保存主子表成功");
		return "redirect:"+Global.getAdminPath()+"/cms/articleEval/?repage";
	}
	
	@RequiresPermissions("cms:articleEval:edit")
	@RequestMapping(value = "delete")
	public String delete(ArticleEval articleEval, RedirectAttributes redirectAttributes) {
		articleEvalService.delete(articleEval);
		addMessage(redirectAttributes, "删除主子表成功");
		return "redirect:"+Global.getAdminPath()+"/cms/articleEval/?repage";
	}

}