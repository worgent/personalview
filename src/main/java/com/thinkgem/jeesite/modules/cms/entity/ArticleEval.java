/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.entity;

import org.hibernate.validator.constraints.Length;
import com.thinkgem.jeesite.modules.sys.entity.User;

import com.thinkgem.jeesite.common.persistence.DataEntity;

/**
 * 主子表生成Entity
 * @author ThinkGem
 * @version 2015-12-08
 */
public class ArticleEval extends DataEntity<ArticleEval> {
	
	private static final long serialVersionUID = 1L;
	private Article article;		// 文章ID 父类
	private User user;		// 赞和踩的用户
	private Integer eval;		// 1-赞，2-踩
	private String sessionId;		// session_id
	
	public ArticleEval() {
		super();
	}

	public ArticleEval(String id){
		super(id);
	}

	public ArticleEval(Article article){
		this.article = article;
	}


	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}
	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	

	public Integer getEval() {
		return eval;
	}

	public void setEval(Integer eval) {
		this.eval = eval;
	}
	

	@Length(min=0, max=64, message="session_id长度必须介于 0 和 64 之间")
	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
}