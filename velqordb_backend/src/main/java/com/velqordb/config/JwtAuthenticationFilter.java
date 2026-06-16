package com.velqordb.config;

import com.velqordb.service.JwtService;
import com.velqordb.service.TokenBlacklistService;
import com.velqordb.user.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final TokenBlacklistService tokenBlacklistService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String token = authHeader.substring(7);

            // Reject blacklisted (logged-out) tokens immediately
            if (tokenBlacklistService.isBlacklisted(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            String username = jwtService.extractUsername(token);

            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails user = userDetailsService.loadUserByUsername(username);
                boolean isTokenValid = jwtService.isTokenValid(token, username);
                if(isTokenValid){
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            user.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }catch (Exception e){
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}
