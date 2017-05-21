package com.thinkgem.jeesite.modules.cms.web.front;

import com.alibaba.fastjson.JSONObject;
import com.thinkgem.jeesite.common.utils.StringUtils;
import com.thinkgem.jeesite.common.web.BaseController;
import com.thinkgem.jeesite.modules.cms.constants.CmsConstants;
import com.thinkgem.jeesite.modules.cms.enums.SessionAttributeEnum;
import com.thinkgem.jeesite.modules.cms.service.CmsUserService;
import com.thinkgem.jeesite.modules.cms.utils.SessionUtil;
import com.thinkgem.jeesite.modules.cms.utils.TimeUtil;
import com.thinkgem.jeesite.modules.sys.entity.User;
import com.thinkgem.jeesite.modules.sys.service.SystemService;
import com.thinkgem.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by worgen on 2015/9/24.
 */
@Controller
@RequestMapping(value = "${frontPath}/cmsUser")
public class CmsUserController extends BaseController{

    @Autowired
    private CmsUserService cmsUserService;

    @RequestMapping(value = "registUserByPhone")
    public String registUserByPhone(HttpServletRequest request, Model model){
//        if(UserUtils.userLogin() == true){
//            return "error";
//        }

        return "modules/cms/front/themes/basic/registUser";
    }
    @ResponseBody
    @RequestMapping(value = "ajaxRegistUserByPhone")
    public JSONObject ajaxRegistUserByPhone(HttpServletRequest request, Model model){
        JSONObject jsonRet = new JSONObject();
        jsonRet.put("errno", 0);
        if(UserUtils.userLogin() == true){
            jsonRet.put("errno", 1);
            jsonRet.put("errmsg", "已经登录");
            return jsonRet;
        }
        //头像

        //姓名
        String name = request.getParameter("fname");
        //登录名，默认为手机号
        String phone = request.getParameter("lname");
        //密码，默认为手机号
        //手机号
        String verficationCode = request.getParameter("verfication_code");
        //校验验证码
        HttpSession session = request.getSession(true);
        String code = SessionUtil.getString(session, SessionAttributeEnum.REGIST_USER_CODE.getKey());
        long codeTime = SessionUtil.getLong(session, SessionAttributeEnum.REGIST_USER_CODE_TIME.getKey());
        String lastPhone = SessionUtil.getString(session, SessionAttributeEnum.REGIST_USER_PHONE.getKey());
        if( lastPhone.equals(phone) == false || code.equals(verficationCode) == false ){
            logger.error("code not same,"+verficationCode+","+code+","+lastPhone+","+phone);
            jsonRet.put("errno", 2);
            jsonRet.put("error", "验证码错误");
            return jsonRet;
        }
        if( codeTime + CmsConstants.registUserCodeExpireTime < TimeUtil.now() ){
            logger.error("code expired");
            jsonRet.put("errno", 1);
            jsonRet.put("error", "验证码超时，请重新获取");
            return jsonRet;
        }

        //
        User user = new User();
        user.setName(name);
        user.setPhone(phone);
        user.setPassword(SystemService.entryptPassword(phone));

        user.setLoginName(phone);
        int ret = cmsUserService.registUserByPhone(user);
        if( ret != 0 ){
            jsonRet.put("errno", ret);
            jsonRet.put("errmsg", "注册出错，错误码"+ret);
        }
        return jsonRet;
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
