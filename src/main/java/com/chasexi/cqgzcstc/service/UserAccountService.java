package com.chasexi.cqgzcstc.service;

import com.chasexi.cqgzcstc.entity.User;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-14 3:18
 * @Description: 用户账号服务
 */
public interface UserAccountService {
    //查询邮箱是否存在
    public int queryByEmail(String email);
    //注册
    public int register(User user);
}
