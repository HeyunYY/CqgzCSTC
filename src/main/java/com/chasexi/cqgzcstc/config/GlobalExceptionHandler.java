package com.chasexi.cqgzcstc.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-08 15:04
 * @Description: 全局异常处理类
 */

@ControllerAdvice
public class GlobalExceptionHandler {
    // 处理所有异常
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception e) {
        return ResponseEntity.status(500).body("服务器内部错误: " + e.getMessage());
    }

    // 处理参数错误
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(400).body("参数错误: " + e.getMessage());
    }
}
