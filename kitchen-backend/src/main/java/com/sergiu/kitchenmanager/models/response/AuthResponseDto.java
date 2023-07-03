package com.sergiu.kitchenmanager.models.response;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {

    private String userId;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profileImage;

    private UserRole role;

    private String accessToken;
}
