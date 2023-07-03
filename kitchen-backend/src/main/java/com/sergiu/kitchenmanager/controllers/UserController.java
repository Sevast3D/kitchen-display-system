package com.sergiu.kitchenmanager.controllers;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import com.sergiu.kitchenmanager.models.request.LoginRequestDto;
import com.sergiu.kitchenmanager.models.request.ProfileUpdateRequestDto;
import com.sergiu.kitchenmanager.models.request.RegistrationRequestDto;
import com.sergiu.kitchenmanager.models.response.AuthResponseDto;
import com.sergiu.kitchenmanager.models.response.UserResponseDto;
import com.sergiu.kitchenmanager.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AuthResponseDto> registerUser(
            @Valid @RequestBody RegistrationRequestDto requestDto) {
        return ResponseEntity.ok(userService.createUser(requestDto));
    }

    @PostMapping("login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AuthResponseDto> loginUser(@Valid @RequestBody LoginRequestDto loginDto) {
        return ResponseEntity.ok(userService.loginUser(loginDto));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        var usersList = userService.getAllUsers();
        return ResponseEntity.ok(usersList);
    }

    @GetMapping("roles")
    public ResponseEntity<List<UserResponseDto>> getUsersByRole(@RequestParam UserRole role){
        var userList = userService.getAllUsersByRole(role);
        return ResponseEntity.ok(userList);
    }

    @PutMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateUserProfile(@PathVariable String userId, @RequestBody ProfileUpdateRequestDto profile){
        userService.updateUser(userId,profile);
    }
}
