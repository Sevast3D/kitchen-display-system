package com.sergiu.kitchenmanager.services.impl;

import com.sergiu.kitchenmanager.services.SecurityAccessHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class SecurityAccessHandlerImpl implements SecurityAccessHandler {

    public String getEmployeeUsernameFromAuthenticationToken() {
        var authentication = getJwtAuthenticationToken();
        if (authentication.getToken().getClaim("email") == null) {
            throw new IllegalStateException("Error getting username from token!");
        }

        return authentication.getToken().getClaim("email");
    }

    private JwtAuthenticationToken getJwtAuthenticationToken() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken) {
            return (JwtAuthenticationToken) authentication;
        }

        throw new IllegalStateException("No JWT Auth found in Security Context!");
    }
}
