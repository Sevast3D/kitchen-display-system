package com.sergiu.kitchenmanager.models.response;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {

    private String userId;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profileImage;

    private UserRole role;
}
