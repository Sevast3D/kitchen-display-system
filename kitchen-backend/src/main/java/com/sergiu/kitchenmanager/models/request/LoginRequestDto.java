package com.sergiu.kitchenmanager.models.request;

import lombok.Data;

@Data
public class LoginRequestDto {
  private String email;
  private String password;
}
