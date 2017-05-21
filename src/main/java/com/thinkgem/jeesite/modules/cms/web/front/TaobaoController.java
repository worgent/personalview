/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.web.front;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.cms.entity.*;
import com.thinkgem.jeesite.modules.cms.service.*;
import com.thinkgem.jeesite.modules.cms.utils.CmsTaobaoUtils;
import com.thinkgem.jeesite.modules.cms.utils.CmsUtils;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

//import org.activiti.engine.impl.util.json.JSONObject;

/**
 * 网站Controller
 * @author ThinkGem
 * @version 2013-5-29
 */
@Controller
@RequestMapping(value = "taobao")
public class TaobaoController extends BaseController{
	
	@Autowired
	private ArticleService articleService;
	@Autowired
	private ArticleDataService articleDataService;
	@Autowired
	private LinkService linkService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private ArticleEvalService articleEvalService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private SiteService siteService;
	//菜单显示
	//当前菜单

	//首页推荐

	//按权重排序文章分页

	//友情链接

	//热门标签

	//二维码图片



	/**
	 * 网站首页
	 */
	@RequestMapping
	public String index(Model model) {
		Site site = CmsUtils.getSite(Site.defaultSiteId());
		model.addAttribute("site", site);
		model.addAttribute("isIndex", true);
		return "modules/cms/front/themes/"+site.getTheme()+"/frontIndex";
	}
	
	/**
	 * 网站首页
	 */
	@RequestMapping(value = "index-{siteId}-{pageNo}${urlSuffix}")
	public String index(@PathVariable String siteId, @PathVariable int pageNo, Model model, HttpServletRequest request) {
//		if (siteId.equals("1")){
//			return "redirect:"+Global.getFrontPath();
//		}
		Site site = CmsUtils.getSite(siteId);
		List<Category> categories = CmsTaobaoUtils.getMainNavList(siteId);
		List<Article> recommendArticles = CmsTaobaoUtils.getIndexRecommendArticles(siteId, 2);
		Page<Article> page = CmsTaobaoUtils.getArticlesByWeight(siteId, 15, pageNo, request.getRequestedSessionId());
		List<Link> friendLinks = CmsTaobaoUtils.getFriendLinkList(siteId);
		List<Link> hotLabels = CmsTaobaoUtils.getHotLabelList(siteId);

		model.addAttribute("currentMenu", "-1");
		model.addAttribute("site", site);
		model.addAttribute("categories", categories);
		model.addAttribute("firstBannerArticle", recommendArticles.size() > 1 ? recommendArticles.get(0) : null);
		model.addAttribute("secondBannerArticle", recommendArticles.size() > 2 ? recommendArticles.get(1) : null);
		model.addAttribute("page", page);
		model.addAttribute("friendLinks", friendLinks);
		model.addAttribute("hotLabels", hotLabels);
		return "modules/cms/front/themes/taobaoued/frontIndex";
	}
	
	/**
	 * 内容列表
	 */
	@RequestMapping(value = "list-{categoryId}-{pageNo}${urlSuffix}")
	public String list(@PathVariable String categoryId, @PathVariable int pageNo,
					   @RequestParam(required=false, defaultValue="15") Integer pageSize, Model model, HttpServletRequest request) {
		Category category = categoryService.get(categoryId);
		if (category==null){
			Site site = CmsUtils.getSite(Site.defaultSiteId());
			model.addAttribute("site", site);
			return "error/404";
		}
		String siteId = category.getSite().getId();
		Site site = siteService.get(siteId);
		List<Category> categories = CmsTaobaoUtils.getMainNavList(siteId);
		Page<Article> page = CmsTaobaoUtils.getArticleList(siteId, categoryId, pageNo, 20, request.getRequestedSessionId(), "orderBy:'weight desc'");
		List<Link> friendLinks = CmsTaobaoUtils.getFriendLinkList(siteId);
		List<Link> hotLabels = CmsTaobaoUtils.getHotLabelList(siteId);

		model.addAttribute("currentMenu", categoryId);
		model.addAttribute("site", site);
		model.addAttribute("categories", categories);
		model.addAttribute("page", page);
		model.addAttribute("friendLinks", friendLinks);
		model.addAttribute("hotLabels", hotLabels);
		return "modules/cms/front/themes/taobaoued/frontListCategory";

	}

	/**
	 *  搜索文章
	 */
	@RequestMapping(value = "search-{siteId}-{pageNo}-{keyWord}${urlSuffix}")
	public String search( @PathVariable String siteId, @PathVariable int pageNo,
					   @PathVariable String keyWord,
					   @RequestParam(required=false) String keyWordPost,
					   Model model, HttpServletRequest request) {
		if(keyWordPost!=null && (keyWordPost.isEmpty() == false)){
			keyWord = keyWordPost;
		}
		Site site = siteService.get(siteId);
		List<Category> categories = CmsTaobaoUtils.getMainNavList(siteId);
		Page<Article> page = CmsTaobaoUtils.searchArticlesByTitle(siteId, keyWord,20, pageNo, request.getRequestedSessionId());
		List<Link> friendLinks = CmsTaobaoUtils.getFriendLinkList(siteId);
		List<Link> hotLabels = CmsTaobaoUtils.getHotLabelList(siteId);


		model.addAttribute("site", site);
		model.addAttribute("keyWord", keyWord);
		model.addAttribute("categories", categories);
		model.addAttribute("page", page);
		model.addAttribute("friendLinks", friendLinks);
		model.addAttribute("hotLabels", hotLabels);
		return "modules/cms/front/themes/taobaoued/frontSearch";
	}

	/**
	 * 显示内容
	 */
	@RequestMapping(value = "view-{categoryId}-{contentId}${urlSuffix}")
	public String view(@PathVariable String categoryId, @PathVariable String contentId, Model model) {
		Category category = categoryService.get(categoryId);
		if (category==null){
			Site site = CmsUtils.getSite(Site.defaultSiteId());
			model.addAttribute("site", site);
			return "error/404";
		};
		String siteId = category.getSite().getId();
		Site site = siteService.get(siteId);
		List<Category> categories = CmsTaobaoUtils.getMainNavList(siteId);
		List<Link> friendLinks = CmsTaobaoUtils.getFriendLinkList(siteId);
		List<Link> hotLabels = CmsTaobaoUtils.getHotLabelList(siteId);
		List<Comment> comments = CmsTaobaoUtils.getArticleComments(contentId);

		model.addAttribute("currentMenu", categoryId);
		model.addAttribute("site", site);
		model.addAttribute("categories", categories);
		model.addAttribute("comments", comments);
		model.addAttribute("friendLinks", friendLinks);
		model.addAttribute("hotLabels", hotLabels);

		if ("article".equals(category.getModule())){
			// 如果没有子栏目，并父节点为跟节点的，栏目列表为当前栏目。
			List<Category> categoryList = Lists.newArrayList();
			if (category.getParent().getId().equals("1")){
				categoryList.add(category);
			}else{
				categoryList = categoryService.findByParentId(category.getParent().getId(), category.getSite().getId());
			}
			// 获取文章内容
			Article article = articleService.get(contentId);
			if (article==null /*|| !Article.DEL_FLAG_NORMAL.equals(article.getDelFlag())*/){
				return "error/404";
			}
			// 文章阅读次数+1
			articleService.updateHitsAddOne(contentId);
			// 获取推荐文章列表
			List<Object[]> relationList = articleService.findByIds(articleDataService.get(article.getId()).getRelation());
			// 将数据传递到视图
			article.setArticleData(articleDataService.get(article.getId()));
			model.addAttribute("article", article);
			Article prevArticle = articleService.findPrevArticleByWeight(article);
			Article nextArticle = articleService.findNextArticleByWeight(article);
			model.addAttribute("prevArticle", prevArticle);
			model.addAttribute("nextArticle", nextArticle);

//			return "modules/cms/front/themes/"+category.getSite().getTheme()+"/"+getTpl(article);
            return "modules/cms/front/themes/taobaoued/"+getTpl(article);
		}

		return "error/404";
	}

	
	/**
	 * 内容评论保存
	 */
	@ResponseBody
	@RequestMapping(value = "commentSave", method=RequestMethod.POST)
	public JSONObject commentSave(@RequestParam(required=true) String replyId,
								  @RequestParam(required=true) String categoryId,
								  @RequestParam(required=true) String contentId,
								  @RequestParam(required=true) String title,
								  @RequestParam(required=true) String name,
								  @RequestParam(required=true) String email,
								  @RequestParam(required=true) String site,
								  @RequestParam(required=true) String content,
								  HttpServletRequest request) {
		JSONObject jsonRet = new JSONObject();
		jsonRet.put("errno", 0);
		Comment comment = new Comment();
//		//用户ID
		if (StringUtils.isNotBlank(replyId)) {
			Comment replyComment = commentService.get(replyId);
			comment.setParent(replyComment);

		}
		comment.setIp(request.getRemoteAddr());
		comment.setCategory(new Category(categoryId));
		comment.setContentId(contentId);
		comment.setTitle(title);
		comment.setName(name);
		comment.setContent(content);
		comment.setCreateDate(new Date());
//		comment.setCreateBy(user);
		comment.setDelFlag(Comment.DEL_FLAG_NORMAL);
		commentService.save(comment);
		return jsonRet;
	}
	/**
	 * 点赞
	 */
	@ResponseBody
	@RequestMapping(value = "support")
	public JSONObject supportArticle(@RequestParam(required=true) String articleID,
									 HttpServletRequest request){
//		String articleID = request.getParameter("articleID");
		JSONObject jsonRet = new JSONObject();
		jsonRet.put("errno", 0);
		User user = null;
		String sessionId = "";
		//用户ID
		if(UserUtils.userLogin() != false){
			user = UserUtils.getUser();
		}else{
			user = new User();
		}
		sessionId = request.getRequestedSessionId();

		//赞
		ArticleEval articleEval = new ArticleEval();
//		if( user != null )
			articleEval.setUser(user);

		articleEval.setSessionId(sessionId);
		Article article = new Article();
		article.setId(articleID);
		articleEval.setArticle(article);
		articleEval.setEval(1);
		//articleEval.setDelFlag();

		int errorno = articleEvalService.support(articleEval);
		jsonRet.put("errno", errorno);
		if( errorno != 0 ){
			jsonRet.put("errmsg", "已经赞过了");
		}else{
			jsonRet.put("supportNum", articleEvalService.getSupportNum(articleID));
		}
		//文章
		return jsonRet;
	}
	/**
	 * 点踩
	 */
	@ResponseBody
	@RequestMapping(value = "unsupport")
	public JSONObject unSupportArticle(HttpServletRequest request){
		String articleID = request.getParameter("articleID");
		JSONObject jsonRet = new JSONObject();
		jsonRet.put("errno", 0);
		//用户ID
		if(UserUtils.userLogin() == false){
			jsonRet.put("errno", 2);
			jsonRet.put("errmsg", "请先登录");
			return jsonRet;
		}
		User user = UserUtils.getUser();
		//赞
		ArticleEval articleEval = new ArticleEval();
		articleEval.setUser(user);
		Article article = new Article();
		article.setId(articleID);
		articleEval.setArticle(article);
		articleEval.setEval(2);
		//articleEval.setDelFlag();

		int errorno = articleEvalService.support(articleEval);
		jsonRet.put("errno", errorno);
		if( errorno != 0 ){
			jsonRet.put("errmsg", "已经踩过了");
		}
		//文章
		return jsonRet;
	}
	/**
	 * 站点地图
	 */
	@RequestMapping(value = "map-{siteId}${urlSuffix}")
	public String map(@PathVariable String siteId, Model model) {
		Site site = CmsUtils.getSite(siteId!=null?siteId:Site.defaultSiteId());
		model.addAttribute("site", site);
		return "modules/cms/front/themes/"+site.getTheme()+"/frontMap";
	}

    private String getTpl(Article article){
        if(StringUtils.isBlank(article.getCustomContentView())){
            String view = null;
            Category c = article.getCategory();
            boolean goon = true;
            do{
                if(StringUtils.isNotBlank(c.getCustomContentView())){
                    view = c.getCustomContentView();
                    goon = false;
                }else if(c.getParent() == null || c.getParent().isRoot()){
                    goon = false;
                }else{
                    c = c.getParent();
                }
            }while(goon);
            return StringUtils.isBlank(view) ? Article.DEFAULT_TEMPLATE : view;
        }else{
            return article.getCustomContentView();
        }
    }

}
