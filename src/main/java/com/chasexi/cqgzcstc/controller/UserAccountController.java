package com.chasexi.cqgzcstc.controller;

import com.chasexi.cqgzcstc.entity.User;
import com.chasexi.cqgzcstc.service.UserAccountService;
import com.chasexi.cqgzcstc.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-14 12:51
 * @Description: 用户账号管理
 */
@Controller
@ResponseBody
@RequestMapping("/userAccount")
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;
    /**
      * 注册
      * @param user
      * @param invitationCode
      * @return 返回注册状态码
      * 100:注册成功 200:注册失败 300:邀请码错误 400:邮箱存在或空
      */
    @RequestMapping("/register")
    public JsonUtils register(User user,  @RequestParam("invitationCode")String invitationCode){
        if(invitationCode == null || !invitationCode.equals("cstc1093")){
            return JsonUtils.failPs(); //300
        }
        if(user.getEmail() == null){
            return JsonUtils.failEx(); //400
        }
        if (userAccountService.queryByEmail(user.getEmail()) == 0) {
            if(userAccountService.register(user)==1){
                return JsonUtils.success();
            }else{
                return JsonUtils.fail(); //200
            }
        }
        return JsonUtils.failEx(); //400
    }

}