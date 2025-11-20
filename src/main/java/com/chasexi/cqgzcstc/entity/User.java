package com.chasexi.cqgzcstc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-10 17:13
 * @Description: 用户实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int id; // 用户id
    private String email; // 邮箱
    private String username; // 用户名
    private String password; // 密码
    private String review; // 审核状态
}
