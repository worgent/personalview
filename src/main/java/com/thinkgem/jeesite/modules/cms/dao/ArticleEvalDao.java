/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.dao;

import com.thinkgem.jeesite.common.persistence.CrudDao;
import com.thinkgem.jeesite.common.persistence.annotation.MyBatisDao;
import com.thinkgem.jeesite.modules.cms.entity.ArticleEval;

/**
 * 主子表生成DAO接口
 * @author ThinkGem
 * @version 2015-12-08
 */
@MyBatisDao
public interface ArticleEvalDao extends CrudDao<ArticleEval> {
	
}