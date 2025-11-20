package com.chasexi.cqgzcstc.service.impl;

import com.chasexi.cqgzcstc.dao.UserAccountMapper;
import com.chasexi.cqgzcstc.entity.User;
import com.chasexi.cqgzcstc.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-14 3:23
 * @Description: 用户账号服务实现类
 */
@Service
public class UserAccountServiceImpl implements UserAccountService {
    @Autowired
    private UserAccountMapper userAccountMapper;
    /**
     * 查询邮箱是否存在
     * @param email
     * @return 0:不存在 1:存在
     */
    @Override
    public int queryByEmail(String email) {
        return userAccountMapper.queryByEmail(email);
    }
    /**
     * 注册
     * @param user
     * @return 0:注册失败 1:注册成功
     */
    @Override
    public int register(User user) {
        if(user != null){
            if(userAccountMapper.register(user) != 0){
                return 1;
            }
        }
        return 0;
    }
}
