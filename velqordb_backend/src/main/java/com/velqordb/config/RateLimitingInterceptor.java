package com.velqordb.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class RateLimitingInterceptor implements HandlerInterceptor {

    private static final int MAX_REQUESTS_PER_MINUTE = 100;
    private static final long ONE_MINUTE_MILLIS = 60 * 1000;

    private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientIp = getClientIp(request);
        long now = System.currentTimeMillis();

        requestCounts.putIfAbsent(clientIp, new CopyOnWriteArrayList<>());
        List<Long> timestamps = requestCounts.get(clientIp);

        // Remove timestamps older than 1 minute (sliding window)
        timestamps.removeIf(timestamp -> now - timestamp > ONE_MINUTE_MILLIS);

        if (timestamps.size() >= MAX_REQUESTS_PER_MINUTE) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"status\":429,\"error\":\"Too Many Requests\","
                  + "\"message\":\"Rate limit exceeded. Maximum "
                  + MAX_REQUESTS_PER_MINUTE + " requests per minute.\"}"
            );
            return false;
        }

        timestamps.add(now);
        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
