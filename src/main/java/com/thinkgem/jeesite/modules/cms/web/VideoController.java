/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web;

import com.thinkgem.jeesite.common.mapper.JsonMapper;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.cms.entity.Article;
import com.thinkgem.jeesite.modules.cms.entity.Category;
import com.thinkgem.jeesite.modules.cms.entity.Site;
import com.thinkgem.jeesite.modules.cms.service.*;
import com.thinkgem.jeesite.modules.cms.utils.CmsUtils;
import com.thinkgem.jeesite.modules.cms.utils.TplUtils;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 文章Controller
 * @author ThinkGem
 * @version 2013-3-23
 */
@Controller
@RequestMapping(value = "${adminPath}/cms/video")
public class VideoController extends BaseController {

	@Autowired
	private ArticleService videoService;
	@Autowired
	private ArticleDataService videoDataService;
	@Autowired
	private CategoryService categoryService;
    @Autowired
   	private FileTplService fileTplService;
    @Autowired
   	private SiteService siteService;
	
	@ModelAttribute
	public Article get(@RequestParam(required=false) String id) {
		if (StringUtils.isNotBlank(id)){
			return videoService.get(id);
		}else{
			return new Article();
		}
	}
	
	@RequiresPermissions("cms:video:view")
	@RequestMapping(value = {"list", ""})
	public String list(Article video, HttpServletRequest request, HttpServletResponse response, Model model) {
//		for (int i=0; i<10000000; i++){
//			Article a = new Article();
//			a.setCategory(new Category(video.getCategory().getId()));
//			a.setTitle("测试测试测试测试测试测试测试测试"+a.getCategory().getId());
//			a.setArticleData(new ArticleData());
//			a.getArticleData().setContent(a.getTitle());
//			videoService.save(a);
//		}
		video.setArticleType(1);
        Page<Article> page = videoService.findPage(new Page<Article>(request, response), video, true);
        model.addAttribute("page", page);
		return "modules/cms/videoList";
	}

	@RequiresPermissions("cms:video:view")
	@RequestMapping(value = "form")
	public String form(Article video, Model model) {
		video.setArticleType(1);

		// 如果当前传参有子节点，则选择取消传参选择
		if (video.getCategory()!=null && StringUtils.isNotBlank(video.getCategory().getId())){
			List<Category> list = categoryService.findByParentId(video.getCategory().getId(), Site.getCurrentSiteId());
			if (list.size() > 0){
				video.setCategory(null);
			}else{
				video.setCategory(categoryService.get(video.getCategory().getId()));
			}
		}
		video.setArticleData(videoDataService.get(video.getId()));
//		if (video.getCategory()=null && StringUtils.isNotBlank(video.getCategory().getId())){
//			Category category = categoryService.get(video.getCategory().getId());
//		}
        model.addAttribute("contentViewList",getTplContent());
        model.addAttribute("video_DEFAULT_TEMPLATE",Article.DEFAULT_TEMPLATE);
		model.addAttribute("video", video);
		CmsUtils.addViewConfigAttribute(model, video.getCategory());
		return "modules/cms/videoForm";
	}

	@RequiresPermissions("cms:video:edit")
	@RequestMapping(value = "save")
	public String save(Article video, Model model, RedirectAttributes redirectAttributes) {
		video.setArticleType(1);

		if (!beanValidator(model, video)){
			return form(video, model);
		}
		videoService.save(video);
		addMessage(redirectAttributes, "保存文章'" + StringUtils.abbr(video.getTitle(),50) + "'成功");
		String categoryId = video.getCategory()!=null?video.getCategory().getId():null;
		return "redirect:" + adminPath + "/cms/video/?repage&category.id="+(categoryId!=null?categoryId:"");
	}
	
	@RequiresPermissions("cms:video:edit")
	@RequestMapping(value = "delete")
	public String delete(Article video, String categoryId, @RequestParam(required=false) Boolean isRe, RedirectAttributes redirectAttributes) {
		video.setArticleType(1);

		// 如果没有审核权限，则不允许删除或发布。
		if (!UserUtils.getSubject().isPermitted("cms:video:audit")){
			addMessage(redirectAttributes, "你没有删除或发布权限");
		}
		if( isRe!= null && isRe ){
			video.setDelFlag("0");
			videoService.update(video);
		}else{
			videoService.delete(video, isRe);
		}
		//video.setDelFlag( ? "0":"2");

		addMessage(redirectAttributes, (isRe!=null&&isRe?"发布":"删除")+"文章成功");
		return "redirect:" + adminPath + "/cms/video/?repage&category.id="+(categoryId!=null?categoryId:"");
	}

	/**
	 * 文章选择列表
	 */
	@RequiresPermissions("cms:video:view")
	@RequestMapping(value = "selectList")
	public String selectList(Article video, HttpServletRequest request, HttpServletResponse response, Model model) {
		video.setArticleType(1);

		list(video, request, response, model);
		return "modules/cms/videoSelectList";
	}
	
	/**
	 * 通过编号获取文章标题
	 */
	@RequiresPermissions("cms:video:view")
	@ResponseBody
	@RequestMapping(value = "findByIds")
	public String findByIds(String ids) {
		List<Object[]> list = videoService.findByIds(ids);
		return JsonMapper.nonDefaultMapper().toJson(list);
	}

    private List<String> getTplContent() {
   		List<String> tplList = fileTplService.getNameListByPrefix(siteService.get(Site.getCurrentSiteId()).getSolutionPath());
   		tplList = TplUtils.tplTrim(tplList, Article.DEFAULT_TEMPLATE, "");
   		return tplList;
   	}
}
