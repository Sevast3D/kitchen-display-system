package com.sergiu.kitchenmanager.config;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class JwtProperties {

  private final String keyId = "83fb038f22f05f0f54e9ad096198abb6";

  private final String audience = "kitchen-manager";

  private final String issuer = "kitchen-manager";

  private final String accessType = "access";

  private final Integer accessDuration = 10;

}
