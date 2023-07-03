package com.sergiu.kitchenmanager.services.impl;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.sergiu.kitchenmanager.config.JwtKeyProperties;
import com.sergiu.kitchenmanager.config.JwtProperties;
import com.sergiu.kitchenmanager.exceptions.TokenGenerationException;
import com.sergiu.kitchenmanager.domain.entities.UserEty;
import jakarta.annotation.PostConstruct;
import java.time.Clock;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TokenGenerationHandle {

  private final JwtProperties jwtProperties;

  private final JwtKeyProperties jwtKeyProperties;

  private final Clock clock;

  private RSASSASigner signer;

  @PostConstruct
  public void setup() {
    signer = new RSASSASigner((jwtKeyProperties.getPrivateKeyLocation()));
  }

  public SignedJWT generateToken(UserEty userEty, int duration, String keyId) {
    JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
        .subject(userEty.getUserId())
        .audience(jwtProperties.getAudience())
        .issuer(jwtProperties.getIssuer())
        .expirationTime(Date.from(clock.instant().plus(duration, ChronoUnit.HOURS)))
        .notBeforeTime(Date.from(clock.instant()))
        .claim("email", userEty.getEmail())
        .claim("type", jwtProperties.getAccessType())
        .claim("roles", Collections.singleton(userEty.getRole()))
        .build();

    var jwtToken = new SignedJWT(new JWSHeader
        .Builder(JWSAlgorithm.RS256).keyID(keyId).build(), claimsSet);

    try {
      jwtToken.sign(signer);
      return jwtToken;
    } catch (JOSEException e) {
      throw new TokenGenerationException("Error generating access token!");
    }
  }
}
