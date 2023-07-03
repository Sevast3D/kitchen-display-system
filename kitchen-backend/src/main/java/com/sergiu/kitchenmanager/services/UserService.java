package com.sergiu.kitchenmanager.services;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import com.sergiu.kitchenmanager.models.request.LoginRequestDto;
import com.sergiu.kitchenmanager.models.request.ProfileUpdateRequestDto;
import com.sergiu.kitchenmanager.models.request.RegistrationRequestDto;
import com.sergiu.kitchenmanager.models.response.AuthResponseDto;
import com.sergiu.kitchenmanager.models.response.UserResponseDto;

import java.util.List;

public interface UserService {

    AuthResponseDto createUser(RegistrationRequestDto requestDto);

    AuthResponseDto loginUser(LoginRequestDto loginDto);

    List<UserResponseDto> getAllUsers();

    List<UserResponseDto> getAllUsersByRole(UserRole role);

    void updateUser(String userId, ProfileUpdateRequestDto profile);
}
