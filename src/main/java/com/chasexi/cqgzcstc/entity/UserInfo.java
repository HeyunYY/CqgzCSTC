package com.chasexi.cqgzcstc.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-10 17:16
 * @Description: 用户信息实体类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    private int userId; // 用户id
    private String registrationDate; // 注册时间
    private String grade; // 年级
    private String currentClass; // 班级
    private String introduction; // 简介
}
