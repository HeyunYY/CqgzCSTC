package com.chasexi.cqgzcstc.dao;

import com.chasexi.cqgzcstc.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-13 13:46
 * @Description:
 */

@Mapper
public interface UserAccountMapper {
    //注册逻辑
    //查询邮箱是否存在
    @Select("select count(*) from user where email = #{email}")
    public int queryByEmail(String email);
    //注册
    @Insert("insert into user(username,email,password,review) values(#{username},#{email},#{password},0)")
    public int register(User user);
}