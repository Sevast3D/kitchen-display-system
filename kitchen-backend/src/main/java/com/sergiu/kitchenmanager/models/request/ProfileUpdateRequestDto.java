package com.sergiu.kitchenmanager.models.request;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import lombok.Data;

@Data
public class ProfileUpdateRequestDto {

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String profileImage;

    private String password;

    private UserRole role;
}
