package com.sergiu.kitchenmanager.config;

import java.time.Clock;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TimeConfiguration {

  @Bean
  @ConditionalOnMissingBean
  public Clock clock() {
    return Clock.systemDefaultZone();
  }
}
