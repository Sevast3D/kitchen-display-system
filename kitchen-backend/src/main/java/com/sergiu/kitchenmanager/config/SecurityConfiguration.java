package com.sergiu.kitchenmanager.config;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(4);
  }

  @Bean
  public JwtKeyProperties jwtKeyProperties() {
    return new JwtKeyProperties();
  }

  private Converter<Jwt, ? extends AbstractAuthenticationToken> jwtAuthenticationConverter() {
    var jwtConverter = new JwtAuthenticationConverter();
    jwtConverter.setJwtGrantedAuthoritiesConverter(jwt -> {
      var roles = jwt.getClaim("roles");
      return roles == null ? null
          : new HashSet<>(mapRolesToGrantedAuthorities((Collection<String>) roles));
    });
    return jwtConverter;
  }

  private static List<GrantedAuthority> mapRolesToGrantedAuthorities(Collection<String> roles) {
    return roles.stream()
        .map(role -> "ROLE_" + role)
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
        auth -> auth
                .requestMatchers("/users/registration", "/users/login").permitAll()
                //TODO DELETE THIS WHEN IN PRODUCTION
                .requestMatchers(PathRequest.toH2Console()).permitAll()
                .anyRequest().authenticated()
    );
    http.csrf().disable();
    http.headers().frameOptions().disable();
    http.httpBasic().disable();
    http.cors();
    http.oauth2ResourceServer(
        oauth -> oauth.jwt(
            token -> token.jwtAuthenticationConverter(jwtAuthenticationConverter()))
    );
    http.sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    );
    http.exceptionHandling(
        exception -> exception
            .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
            .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
    );

    return http.build();
  }
}
