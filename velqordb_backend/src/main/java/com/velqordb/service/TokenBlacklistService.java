package com.velqordb.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    // Map of token -> expiration time in milliseconds
    private final Map<String, Long> blacklistedTokens = new ConcurrentHashMap<>();

    public void blacklistToken(String token, long expirationTimeMillis) {
        blacklistedTokens.put(token, expirationTimeMillis);
    }

    public boolean isBlacklisted(String token) {
        return blacklistedTokens.containsKey(token);
    }

    // Cleanup expired tokens every 10 minutes to prevent memory leaks
    @Scheduled(fixedRate = 600_000)
    public void cleanupExpiredTokens() {
        long now = System.currentTimeMillis();
        blacklistedTokens.entrySet().removeIf(entry -> entry.getValue() < now);
    }
}
