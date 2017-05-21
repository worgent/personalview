/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.modules.cms.entity;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.thinkgem.jeesite.common.persistence.TreeEntity;
import org.hibernate.validator.constraints.Length;

import com.thinkgem.jeesite.common.persistence.DataEntity;
import com.thinkgem.jeesite.modules.sys.entity.User;

/**
 * 评论Entity
 * @author ThinkGem
 * @version 2013-05-15
 */

	public class Comment extends TreeEntity<Comment> {

		private static final long serialVersionUID = 1L;
		private Comment parent;		// 父ID
		private Category category;		// 栏目编号
		private String contentId;		// 栏目内容的编号
		private String title;		// 栏目内容的标题
		private String content;		// 评论内容
		private String name;		// 评论姓名
		private String ip;		// 评论IP
		private User auditUser;		// 审核人
		private Date auditDate;		// 审核时间

		public Comment() {
			super();
		}

		public Comment(String id){
			super(id);
		}

		@JsonBackReference
		public Comment getParent() {
			return parent;
		}

		public void setParent(Comment parent) {
			this.parent = parent;
		}

		public Category getCategory() {
			return category;
		}

		public void setCategory(Category category) {
			this.category = category;
		}

		@Length(min=1, max=64, message="栏目内容的编号长度必须介于 1 和 64 之间")
		public String getContentId() {
			return contentId;
		}

		public void setContentId(String contentId) {
			this.contentId = contentId;
		}

		@Length(min=0, max=255, message="栏目内容的标题长度必须介于 0 和 255 之间")
		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		@Length(min=0, max=255, message="评论内容长度必须介于 0 和 255 之间")
		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		@Length(min=0, max=100, message="评论姓名长度必须介于 0 和 100 之间")
		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		@Length(min=0, max=100, message="评论IP长度必须介于 0 和 100 之间")
		public String getIp() {
			return ip;
		}

		public void setIp(String ip) {
			this.ip = ip;
		}

		public User getAuditUser() {
			return auditUser;
		}

		public void setAuditUser(User auditUser) {
			this.auditUser = auditUser;
		}

		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
		public Date getAuditDate() {
			return auditDate;
		}

		public void setAuditDate(Date auditDate) {
			this.auditDate = auditDate;
		}

		public String getParentId() {
			return parent != null && parent.getId() != null ? parent.getId() : "0";
		}
	}
