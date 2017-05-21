package com.thinkgem.jeesite.modules.cms.service;

import com.google.common.collect.Lists;
import com.thinkgem.jeesite.common.utils.IdGen;
import com.thinkgem.jeesite.modules.sys.entity.Office;
import com.thinkgem.jeesite.modules.sys.entity.Role;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
//import org.activiti.engine.impl.cfg.IdGenerator;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by worgen on 2015/9/24.
 */
@Service
@Transactional(readOnly = false)
public class CmsUserService {
    private static final String defaultRegistCompany = "1";
    private static final String defaultRegistOffice = "4cf1894a6ea34ced9d27ce0451b67fe9";
    private static final String defaultRegistUserType = "3";
    private static final String defaultRegistRole = "14f6e25d0df5415dad7b23793bad6459";

    @Autowired
    private SystemService systemService;
    //生成匿名用户
    public int registAnonymousUser(User user){
//        //用户名是否重复
//        if( systemService.getUserByLoginName(phone) != null){
//            return -3;
//        }
        //默认公司 山东省总公司
        user.setCompany(new Office(defaultRegistCompany));
        //默认机构 注册会员
        user.setOffice(new Office(defaultRegistOffice));
        //默认用户类型 普通用户
        user.setUserType(defaultRegistUserType);
        //默认角色类型 普通注册用户
        user.setRole(new Role(defaultRegistRole));
        //随机生成工号
        user.setNo(IdGen.uuid());
        //用户名和工号一直
        user.setLoginName(user.getNo());
        user.setPassword(SystemService.entryptPassword(user.getNo()));

        //默认允许登录
        user.setLoginFlag("1");
        // 角色数据有效性验证，过滤不在授权内的角色
        List<Role> roleList = Lists.newArrayList();
        roleList.add(user.getRole());
        user.setRoleList(roleList);
        systemService.saveUser(user);
        // 清除当前用户缓存
        if (user.getLoginName().equals(UserUtils.getUser().getLoginName())){
            UserUtils.clearCache();
            //UserUtils.getCacheMap().clear();
        }
        return 0;
    }
    //手机号注册
    public int registUserByPhone(User user){
        //手机号判断
        String phone = user.getPhone();
        if( phone == null || phone ==""){
            return -1;
        }
        //手机号是否重复
        if( systemService.getUserByPhone(phone) != null){
            return -2;
        }
        //用户名是否重复
        if( systemService.getUserByLoginName(phone) != null){
            return -3;
        }
        //默认公司 山东省总公司
        user.setCompany(new Office(defaultRegistCompany));
        //默认机构 注册会员
        user.setOffice(new Office(defaultRegistOffice));
        //默认用户类型 普通用户
        user.setUserType(defaultRegistUserType);
        //默认角色类型 普通注册用户
        user.setRole(new Role(defaultRegistRole));
        //随机生成工号
        user.setNo(IdGen.uuid());
        //默认允许登录
        user.setLoginFlag("1");
        // 角色数据有效性验证，过滤不在授权内的角色
        List<Role> roleList = Lists.newArrayList();
        roleList.add(user.getRole());
        user.setRoleList(roleList);
        systemService.saveUser(user);
        // 清除当前用户缓存
        if (user.getLoginName().equals(UserUtils.getUser().getLoginName())){
            UserUtils.clearCache();
            //UserUtils.getCacheMap().clear();
        }
        return 0;
    }
    //QQ注册
    public int registUserByQQ(User user){
        return 0;
    }
    //微信注册
    public int registUserByWeixin(User user){
        return 0;
    }
    //修改用户资料
    public int modifyUserInfo(User user){
        return 0;
    }
    //修改密码

    //封禁
    public int banUser(User user){
        return 0;
    }
    //解禁
    public int unbanUser(User user){
        return 0;
    }


}
