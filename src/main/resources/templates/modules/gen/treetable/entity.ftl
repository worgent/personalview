<?xml version="1.0" encoding="utf-8"?>
<template>
	<name>entity</name>
	<filePath>src/main/java/${packageName}/${moduleName}/entity/${subModuleName}</filePath>
	<fileName>${ClassName}.java</fileName>
	<content><![CDATA[
/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package ${packageName}.${moduleName}.entity<#if subModuleName != "">.${subModuleName}</#if>;

<#list table.importList as i>
import ${i};
</#list>

import com.thinkgem.jeesite.common.persistence.TreeEntity;

/**
 * ${functionName}Entity
 * @author ${functionAuthor}
 * @version ${functionVersion}
 */
public class ${ClassName} extends TreeEntity<${ClassName}> {
	
	private static final long serialVersionUID = 1L;
	<#-- 生成字段属性 -->
	<#list table.columnList as c>
		<#-- 如果不是基类属性 -->
		<#if c.isNotBaseField>
			<#-- 父类对象 -->
			<#if table.parentExists && table.parentTableFk == c.name>
	private ${table.parent.className?cap_first} ${c.simpleJavaField};		<#if c.comments??>// ${c.comments} 父类</#if>
			<#-- 其它字段 -->
			<#else>
	private ${c.simpleJavaType} ${c.simpleJavaField};		<#if c.comments??>// ${c.comments}</#if>
			</#if>
		</#if>
	</#list>
	<#-- 范围条件字段 -->
	<#list table.columnList as c>
		<#if c.isQuery?? && c.isQuery == "1" && c.queryType == "between">
	private ${c.simpleJavaType} begin${c.simpleJavaField?cap_first};		<#if c.comments??>// 开始 ${c.comments}</#if>
	private ${c.simpleJavaType} end${c.simpleJavaField?cap_first};		<#if c.comments??>// 结束 ${c.comments}</#if>
		</#if>
	</#list>
	<#-- 子表列表字段 -->
	<#list table.childList as c>
	private List<${c.className?cap_first}> ${c.className?uncap_first}List = Lists.newArrayList();		// 子表列表
	</#list>
	
	<#-- 构造方法 -->
	public ${ClassName}() {
		super();
	}

	public ${ClassName}(String id){
		super(id);
	}
	<#list table.columnList as c>
		<#if table.parentExists && table.parentTableFk == c.name>

	public ${ClassName}(${table.parent.className?cap_first} ${c.simpleJavaField}){
		this.${c.simpleJavaField} = ${c.simpleJavaField};
	}
		</#if>
	</#list>

	<#-- 生成get和set方法 -->
	<#list table.columnList as c>
		<#-- 如果不是基类属性 -->
		<#if c.isNotBaseField>
			<#list c.simpleAnnotationList as a>
	@${a}
			</#list>
			<#-- 父类对象 -->
			<#if table.parentExists && table.parentTableFk == c.name>
	public ${table.parent.className?cap_first} get${c.simpleJavaField?cap_first}() {
		return ${c.simpleJavaField};
	}

	public void set${c.simpleJavaField?cap_first}(${table.parent.className?cap_first} ${c.simpleJavaField}) {
		this.${c.simpleJavaField} = ${c.simpleJavaField};
	}
	
			<#-- 其它字段 -->
			<#else>
	public ${c.simpleJavaType} get${c.simpleJavaField?cap_first}() {
		return ${c.simpleJavaField};
	}

	public void set${c.simpleJavaField?cap_first}(${c.simpleJavaType} ${c.simpleJavaField}) {
		this.${c.simpleJavaField} = ${c.simpleJavaField};
	}
	
			</#if>
		</#if>
	</#list>
	<#-- 范围条件字段get和set方法 -->
	<#list table.columnList as c>
		<#if c.isQuery?? && c.isQuery == "1" && c.queryType == "between">
	public ${c.simpleJavaType} getBegin${c.simpleJavaField?cap_first}() {
		return begin${c.simpleJavaField?cap_first};
	}

	public void setBegin${c.simpleJavaField?cap_first}(${c.simpleJavaType} begin${c.simpleJavaField?cap_first}) {
		this.begin${c.simpleJavaField?cap_first} = begin${c.simpleJavaField?cap_first};
	}
	
	public ${c.simpleJavaType} getEnd${c.simpleJavaField?cap_first}() {
		return end${c.simpleJavaField?cap_first};
	}

	public void setEnd${c.simpleJavaField?cap_first}(${c.simpleJavaType} end${c.simpleJavaField?cap_first}) {
		this.end${c.simpleJavaField?cap_first} = end${c.simpleJavaField?cap_first};
	}
		
		</#if>
	</#list>
	<#-- 子表列表get和set方法 -->
	<#list table.childList as c>
	public List<${c.className?cap_first}> get${c.className?cap_first}List() {
		return ${c.className?uncap_first}List;
	}

	public void set${c.className?cap_first}List(List<${c.className?cap_first}> ${c.className?uncap_first}List) {
		this.${c.className?uncap_first}List = ${c.className?uncap_first}List;
	}
	</#list>
	<#-- JSON忽略了parent对象，添加此方法获取父类Id -->
	<#list table.columnList as c>
		<#if c.javaFieldId == 'parent.id'>
	public String getParentId() {
		return parent != null && parent.getId() != null ? parent.getId() : "0";
	}
		</#if>
	</#list>
}]]>
	</content>
</template>