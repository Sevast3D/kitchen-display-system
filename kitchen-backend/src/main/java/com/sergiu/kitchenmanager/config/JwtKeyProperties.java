package com.sergiu.kitchenmanager.config;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "spring.security.oauth2.resourceserver.jwt")
public class JwtKeyProperties {

  private RSAPrivateKey privateKeyLocation;

  private RSAPublicKey publicKeyLocation;

}
