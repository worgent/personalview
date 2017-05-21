/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.service;

import com.thinkgem.jeesite.common.service.TreeService;
import com.thinkgem.jeesite.common.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thinkgem.jeesite.common.persistence.Page;
import com.thinkgem.jeesite.common.service.CrudService;
import com.thinkgem.jeesite.modules.cms.dao.CommentDao;
import com.thinkgem.jeesite.modules.cms.entity.Comment;

import java.util.List;

/**
 * 评论Service
 * @author ThinkGem
 * @version 2013-01-15
 */
@Service
@Transactional(readOnly = true)
public class CommentService extends TreeService<CommentDao, Comment> {

	@Autowired
	private ArticleService articleService;

	public Comment get(String id) {
		return super.get(id);
	}

	public List<Comment> findList(Comment comment) {
		if (StringUtils.isNotBlank(comment.getParentIds())){
			comment.setParentIds(","+comment.getParentIds()+",");
		}
		return super.findList(comment);
	}

	@Transactional(readOnly = false)
	public void save(Comment comment) {
		super.save(comment);
		//更新文章评论数木
		articleService.updateCommentsAddOne(comment.getContentId());
	}

	@Transactional(readOnly = false)
	public void delete(Comment comment) {
		super.delete(comment);
		//更新文章评论数木
		articleService.updateCommentsSubOne(comment.getContentId());

	}

}
