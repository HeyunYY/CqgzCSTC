package com.chasexi.cqgzcstc.config.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Created with IntelliJ IDEA.
 *
 * @author Chasexi
 * @version 1.0.0
 * @date: 2025-11-08 15:11
 * @Description: 拦截器
 */
@Component
public class Interceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        HttpSession session = request.getSession();
        if (isResourceFile(removeJSessionID(requestURI))) {
            return true;
        }
        if (requestURI.equals("/index")) {
            return true;
        }
        return true;
    }

    private boolean isResourceFile(String requestURI) {
        String[] resourceExtensions = { ".css", ".js", ".jpg", ".jpeg", ".png", ".gif", ".ico", ".svg", ".mp4", ".pdf",
                ".doc", ".xls", ".ppt", ".zip", ".txt", ".map", ".woff", ".woff2"};
        for (String extension : resourceExtensions) {
            if (requestURI.endsWith(extension)) {
                return true;
            }
        }
        return false;
    }
    // 截断请求路径中的jsessionid值
    private String removeJSessionID(String requestURI) {
        int jsessionIDIndex = requestURI.indexOf(";jsessionid=");
        if (jsessionIDIndex != -1) {
            requestURI = requestURI.substring(0, jsessionIDIndex);
        }
        return requestURI;
    }
}
