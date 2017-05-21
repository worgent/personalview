/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.utils;

import com.google.common.collect.Lists;
import com.thinkgem.jeesite.common.config.Global;
import com.thinkgem.jeesite.common.mapper.JsonMapper;
import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.utils.CacheUtils;
import com.thinkgem.jeesite.common.utils.SpringContextHolder;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.cms.entity.*;
import com.thinkgem.jeesite.modules.cms.service.*;
import org.springframework.ui.Model;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 内容管理工具类
 * @author ThinkGem
 * @version 2013-5-29
 */
public class CmsTaobaoUtils {
	
	private static SiteService siteService = SpringContextHolder.getBean(SiteService.class);
	private static CategoryService categoryService = SpringContextHolder.getBean(CategoryService.class);
	private static ArticleService articleService = SpringContextHolder.getBean(ArticleService.class);
	private static CommentService commentService = SpringContextHolder.getBean(CommentService.class);
	private static LinkService linkService = SpringContextHolder.getBean(LinkService.class);
    private static ServletContext context = SpringContextHolder.getBean(ServletContext.class);

	private static final String CMS_CACHE = "cmsTaobaoCache";

	//获得文章点赞情况

	//首页推荐
	public static List<Article> getIndexRecommendArticles(String siteId, int limit){
		Article article = new Article();

		Page<Article> page = new Page<Article>(1, limit, -1);
		article.setPosid(String.valueOf(1));
		page.setOrderBy("weight desc");

		article.setDelFlag(Article.DEL_FLAG_NORMAL);
		page = articleService.findPage(page, article, false);
		return page.getList();
	}
	//按权重排序文章分页
	public static Page getArticlesByWeight(String siteId, int pageSize, int pageNumber, String sessionId) {
		Article article = new Article();
		Page<Article> page = new Page<Article>(pageNumber, pageSize, -1);
		page.setOrderBy("weight desc");

		article.setDelFlag(Article.DEL_FLAG_NORMAL);
		article.setSessionId(sessionId);
		page = articleService.findPage(page, article, false);
		return page;
	}
	//按标题查找
	public static Page searchArticlesByTitle(String siteId, String keyWord, int pageSize, int pageNumber, String sessionId) {
		Article article = new Article();
		Page<Article> page = new Page<Article>(pageNumber, pageSize, -1);
		page.setOrderBy("weight desc");
		article.setSessionId(sessionId);
		article.setTitle(keyWord);
		article.setDelFlag(Article.DEL_FLAG_NORMAL);
		page = articleService.findPage(page, article, false);
		return page;
	}
	//友情链接
	public static List<Link> getFriendLinkList(String siteId){
		return getLinkList(siteId, "18", 10, "");
	}
	//热门标签
	public static List<Link> getHotLabelList(String siteId){
		return getLinkList(siteId, "d28088c2037d420aaf764870e45f5d80", 10, "");
	}
	//二维码图片

	//菜单显示
	//当前菜单
	/**
	 * 获得主导航列表
	 * @param siteId 站点编号
	 */
	public static List<Category> getMainNavList(String siteId){

		List<Category> list = Lists.newArrayList();
		List<Category> sourcelist = categoryService.findByParentDelegate("1", siteId);

		Category.sortList(list, sourcelist, "1");
		return list;
//		return mainNavList;
	}
	public static void sortComment(List<Comment> list, List<Comment> sourcelist, String parentId){
		for (int i=0; i<sourcelist.size(); i++){
			Comment e = sourcelist.get(i);
			if (e.getParent()!=null && e.getParent().getId()!=null
					&& e.getParent().getId().equals(parentId)){
				list.add(e);
				// 判断是否还有子节点, 有则继续获取子节点
				for (int j=0; j<sourcelist.size(); j++){
					Comment child = sourcelist.get(j);
					if (child.getParent()!=null && child.getParent().getId()!=null
							&& child.getParent().getId().equals(e.getId())){
						sortComment(list, sourcelist, e.getId());
						break;
					}
				}
			}
		}
	}
	//获得文章对应评论
	public static List<Comment> getArticleComments(String articleId){
		Comment comment = new Comment();
		comment.setContentId(articleId);
		comment.setDelFlag(Comment.DEL_FLAG_NORMAL);
		List<Comment> sourceComments = commentService.findList(comment);
		List<Comment> comments = new ArrayList<Comment>();
		sortComment(comments, sourceComments, "0");
		return comments;
	}
	/**
	 * 获取栏目
	 * @param categoryId 栏目编号
	 * @return
	 */
	public static Category getCategory(String categoryId){
		return categoryService.get(categoryId);
	}
	
	/**
	 * 获得栏目列表
	 * @param siteId 站点编号
	 * @param parentId 分类父编号
	 * @param number 获取数目
	 * @param param  预留参数，例： key1:'value1', key2:'value2' ...
	 */
	public static List<Category> getCategoryList(String siteId, String parentId, int number, String param){
		Page<Category> page = new Page<Category>(1, number, -1);
		Category category = new Category();
		category.setSite(new Site(siteId));
		category.setParent(new Category(parentId));
		if (StringUtils.isNotBlank(param)){
			@SuppressWarnings({ "unused", "rawtypes" })
			Map map = JsonMapper.getInstance().fromJson("{"+param+"}", Map.class);
		}
		page = categoryService.find(page, category);

		return page.getList();
	}

	/**
	 * 获取栏目
	 * @param categoryIds 栏目编号
	 * @return
	 */
	public static List<Category> getCategoryListByIds(String categoryIds){
		return categoryService.findByIds(categoryIds);
	}
	
	/**
	 * 获取文章
	 * @param articleId 文章编号
	 * @return
	 */
	public static Article getArticle(String articleId){
		return articleService.get(articleId);
	}
	
	/**
	 * 获取文章列表
	 * @param siteId 站点编号
	 * @param categoryId 分类编号
	 * @param number 获取数目
	 * @param param  预留参数，例： key1:'value1', key2:'value2' ...
	 * 			posid	推荐位（1：首页焦点图；2：栏目页文章推荐；）
	 * 			image	文章图片（1：有图片的文章）
	 *          orderBy 排序字符串
	 * @return
	 * ${fnc:getArticleList(category.site.id, category.id, not empty pageSize?pageSize:8, 'posid:2, orderBy: \"hits desc\"')}"
	 */
	public static Page<Article> getArticleList(String siteId, String categoryId, int pageNo, int number, String sessionId, String param){
		Page<Article> page = new Page<Article>(pageNo, number, -1);
		Category category = new Category(categoryId, new Site(siteId));
		category.setParentIds(categoryId);
		Article article = new Article(category);
		if (StringUtils.isNotBlank(param)){
			@SuppressWarnings({ "rawtypes" })
			Map map = JsonMapper.getInstance().fromJson("{"+param+"}", Map.class);
			if (new Integer(1).equals(map.get("posid")) || new Integer(2).equals(map.get("posid"))){
				article.setPosid(String.valueOf(map.get("posid")));
			}
			if (new Integer(1).equals(map.get("image"))){
				article.setImage(Global.YES);
			}
			if (StringUtils.isNotBlank((String)map.get("orderBy"))){
				page.setOrderBy((String)map.get("orderBy"));
			}
		}
		article.setDelFlag(Article.DEL_FLAG_NORMAL);
		article.setSessionId(sessionId);

		page = articleService.findPage(page, article, false);
		return page;
	}
	
	/**
	 * 获取链接
	 * @param linkId 文章编号
	 * @return
	 */
	public static Link getLink(String linkId){
		return linkService.get(linkId);
	}
	
	/**
	 * 获取链接列表
	 * @param siteId 站点编号
	 * @param categoryId 分类编号
	 * @param number 获取数目
	 * @param param  预留参数，例： key1:'value1', key2:'value2' ...
	 * @return
	 */
	public static List<Link> getLinkList(String siteId, String categoryId, int number, String param){
		Page<Link> page = new Page<Link>(1, number, -1);
		Link link = new Link(new Category(categoryId, new Site(siteId)));
		if (StringUtils.isNotBlank(param)){
			@SuppressWarnings({ "unused", "rawtypes" })
			Map map = JsonMapper.getInstance().fromJson("{"+param+"}", Map.class);
		}
		link.setDelFlag(Link.DEL_FLAG_NORMAL);
		page = linkService.findPage(page, link, false);
		return page.getList();
	}
	
	// ============== Cms Cache ==============
	
	public static Object getCache(String key) {
		return CacheUtils.get(CMS_CACHE, key);
	}

	public static void putCache(String key, Object value) {
		CacheUtils.put(CMS_CACHE, key, value);
	}

	public static void removeCache(String key) {
		CacheUtils.remove(CMS_CACHE, key);
	}

    /**
     * 获得文章动态URL地址
   	 * @param article
   	 * @return url
   	 */
    public static String getUrlDynamic(Article article) {
        if(StringUtils.isNotBlank(article.getLink())){
            return article.getLink();
        }
        StringBuilder str = new StringBuilder();
        str.append(context.getContextPath()).append(Global.getFrontPath());
        str.append("/view-").append(article.getCategory().getId()).append("-").append(article.getId()).append(Global.getUrlSuffix());
        return str.toString();
    }

    /**
     * 获得栏目动态URL地址
   	 * @param category
   	 * @return url
   	 */
    public static String getUrlDynamic(Category category) {
        if(StringUtils.isNotBlank(category.getHref())){
            if(!category.getHref().contains("://")){
                return context.getContextPath()+Global.getFrontPath()+category.getHref();
            }else{
                return category.getHref();
            }
        }
        StringBuilder str = new StringBuilder();
        str.append(context.getContextPath()).append(Global.getFrontPath());
        str.append("/list-").append(category.getId()).append(Global.getUrlSuffix());
        return str.toString();
    }

    /**
     * 从图片地址中去除ContextPath地址
   	 * @param src
   	 * @return src
   	 */
    public static String formatImageSrcToDb(String src) {
        if(StringUtils.isBlank(src)) return src;
        if(src.startsWith(context.getContextPath() + "/userfiles")){
            return src.substring(context.getContextPath().length());
        }else{
            return src;
        }
    }

    /**
     * 从图片地址中加入ContextPath地址
   	 * @param src
   	 * @return src
   	 */
    public static String formatImageSrcToWeb(String src) {
        if(StringUtils.isBlank(src)) return src;
        if(src.startsWith(context.getContextPath() + "/userfiles")){
            return src;
        }else{
            return context.getContextPath()+src;
        }
    }
    
    public static void addViewConfigAttribute(Model model, String param){
        if(StringUtils.isNotBlank(param)){
            @SuppressWarnings("rawtypes")
			Map map = JsonMapper.getInstance().fromJson(param, Map.class);
            if(map != null){
                for(Object o : map.keySet()){
                    model.addAttribute("viewConfig_"+o.toString(), map.get(o));
                }
            }
        }
    }

    public static void addViewConfigAttribute(Model model, Category category){
        List<Category> categoryList = Lists.newArrayList();
        Category c = category;
        boolean goon = true;
        do{
            if(c.getParent() == null || c.getParent().isRoot()){
                goon = false;
            }
            categoryList.add(c);
            c = c.getParent();
        }while(goon);
        Collections.reverse(categoryList);
        for(Category ca : categoryList){
        	addViewConfigAttribute(model, ca.getViewConfig());
        }
    }
}