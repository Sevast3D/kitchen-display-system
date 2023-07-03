package com.sergiu.kitchenmanager.models.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegistrationRequestDto {

  @NotBlank
  private String firstName;

  @NotBlank
  private String lastName;

  @NotBlank
  private String email;

  @NotBlank
  @Size(min = 9, message = "Minimum length for phone number is 9!")
  private String phoneNumber;

  @NotBlank
  @Size(min = 6, message = "Password length minimum 6!")
  private String password;
}
