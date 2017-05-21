/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.service;

import java.util.List;

import com.thinkgem.jeesite.modules.cms.entity.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.modules.cms.entity.ArticleEval;
import com.thinkgem.jeesite.modules.cms.dao.ArticleEvalDao;

/**
 * 主子表生成Service
 * @author ThinkGem
 * @version 2015-12-08
 */
@Service
@Transactional(readOnly = true)
public class ArticleEvalService extends CrudService<ArticleEvalDao, ArticleEval> {
	@Autowired
	private ArticleService articleService;
	
	public ArticleEval get(String id) {
		ArticleEval articleEval = super.get(id);
        if( articleEval == null ) return null;
		return articleEval;
	}
	
	public List<ArticleEval> findList(ArticleEval articleEval) {
		return super.findList(articleEval);
	}
	
	public Page<ArticleEval> findPage(Page<ArticleEval> page, ArticleEval articleEval) {
		return super.findPage(page, articleEval);
	}
	
	@Transactional(readOnly = false)
	public void save(ArticleEval articleEval) {
		super.save(articleEval);
	}
	
	@Transactional(readOnly = false)
	public void delete(ArticleEval articleEval) {
		super.delete(articleEval);
	}

	//点赞
	@Transactional(readOnly = false)
	public int support(ArticleEval articleEval){
		//检查是否赞过
		List<ArticleEval> articleEvals = findList(articleEval);
		if( articleEvals.size() != 0 ){
			return 1;
		}
		//dao.get(articleEval)
		super.save(articleEval);
		articleService.updateSuppotsAddOne(articleEval.getArticle().getId());
		return 0;
	}
	//点踩
	@Transactional(readOnly = false)
	public boolean unSupport(ArticleEval articleEval){
		//检查是否赞过
		List<ArticleEval> articleEvals = findList(articleEval);
		if( articleEvals.size() != 0 ){
			return false;
		}
		//dao.get(articleEval)
		super.save(articleEval);
		return false;
	}

	//是否赞过该文章
	public boolean isSupport(String sessionId, String articleId){
		ArticleEval articleEval = new ArticleEval();
		articleEval.setSessionId(sessionId);
		Article article = new Article();
		article.setId(articleId);
		articleEval.setArticle(article);
		articleEval.setEval(1);

		List<ArticleEval> articleEvals = findList(articleEval);
		if( articleEvals.size() == 0 ) return false;
		return true;
	}

	//获得点赞总数
	public int getSupportNum(String articleId){
		ArticleEval articleEval = new ArticleEval();
		Article article = new Article();
		article.setId(articleId);
		articleEval.setArticle(article);
		articleEval.setEval(1);

		List<ArticleEval> articleEvals = findList(articleEval);
		return articleEvals.size();
	}
}