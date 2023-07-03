package com.sergiu.kitchenmanager.services.impl;

import com.nimbusds.jwt.SignedJWT;
import com.sergiu.kitchenmanager.config.JwtProperties;
import com.sergiu.kitchenmanager.exceptions.UserNotFoundException;
import com.sergiu.kitchenmanager.mappers.UserMapper;
import com.sergiu.kitchenmanager.models.request.LoginRequestDto;
import com.sergiu.kitchenmanager.models.request.ProfileUpdateRequestDto;
import com.sergiu.kitchenmanager.models.request.RegistrationRequestDto;
import com.sergiu.kitchenmanager.models.response.AuthResponseDto;
import com.sergiu.kitchenmanager.exceptions.InvalidUserCredentialsException;
import com.sergiu.kitchenmanager.exceptions.UserAlreadyExistsException;
import com.sergiu.kitchenmanager.domain.entities.TokenEty;
import com.sergiu.kitchenmanager.domain.entities.UserEty;
import com.sergiu.kitchenmanager.domain.enums.UserRole;
import com.sergiu.kitchenmanager.models.response.UserResponseDto;
import com.sergiu.kitchenmanager.domain.repository.TokenRepository;
import com.sergiu.kitchenmanager.domain.repository.UserRepository;
import com.sergiu.kitchenmanager.services.UserService;

import java.text.ParseException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final TokenGenerationHandle tokenGeneration;

    private final JwtProperties jwtProperties;

    @Override
    public AuthResponseDto createUser(RegistrationRequestDto requestDto) {
        Optional<UserEty> existingUser = userRepository.findUserEtyByEmail(requestDto.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists!");
        }

        UserEty newUser = new UserEty();
        newUser.setEmail(requestDto.getEmail());
        newUser.setFirstName(requestDto.getFirstName());
        newUser.setLastName(requestDto.getLastName());
        newUser.setPhoneNumber(requestDto.getPhoneNumber());
        newUser.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        newUser.setRole(UserRole.WAITER);

        var accessToken = tokenGeneration.generateToken(newUser, jwtProperties.getAccessDuration(),
                jwtProperties.getKeyId());
        userRepository.save(newUser);

        try {
            saveToken(accessToken, newUser);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        var authResponse = UserMapper.INSTANCE.userEtyToAuthResponseDto(newUser);
        authResponse.setAccessToken(accessToken.serialize());

        return authResponse;
    }

    @Override
    public AuthResponseDto loginUser(LoginRequestDto loginDto) {

        UserEty existingUser = checkUserCredentials(loginDto.getEmail(), loginDto.getPassword());
        var accessToken = tokenGeneration.generateToken(existingUser, jwtProperties.getAccessDuration(),
                jwtProperties.getKeyId());
        try {
            saveToken(accessToken, existingUser);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        var authResponse = UserMapper.INSTANCE.userEtyToAuthResponseDto(existingUser);
        authResponse.setAccessToken(accessToken.serialize());
        return authResponse;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        var userEtyList = userRepository.findAll();
        return userEtyList.stream()
                .map(UserMapper.INSTANCE::userEtyToUserResponseDto)
                .sorted(getFirstLastNameComparator())
                .toList();
    }

    @Override
    public List<UserResponseDto> getAllUsersByRole(UserRole role) {
        var userEtyList = userRepository.findAllByRole(role);
        return userEtyList.stream()
                .map(UserMapper.INSTANCE::userEtyToUserResponseDto)
                .sorted(getFirstLastNameComparator())
                .toList();
    }


    @Override
    public void updateUser(String userId, ProfileUpdateRequestDto profile) {
        var userEty = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with id:%s not found", userId)));
        if (profile.getFirstName() != null)
            userEty.setFirstName(profile.getFirstName());
        if (profile.getLastName() != null)
            userEty.setLastName(profile.getLastName());
        if (profile.getEmail() != null)
            userEty.setEmail(profile.getEmail());
        if (profile.getPassword() != null)
            userEty.setPassword(passwordEncoder.encode(profile.getPassword()));
        if (profile.getPhoneNumber() != null)
            userEty.setPhoneNumber(profile.getPhoneNumber());
        if (profile.getProfileImage() != null)
            userEty.setProfileImage(profile.getProfileImage());
        if (profile.getRole() != null)
            userEty.setRole(profile.getRole());
        userRepository.save(userEty);
    }

    private Comparator<UserResponseDto> getFirstLastNameComparator() {
        return Comparator.comparing(UserResponseDto::getFirstName)
                .thenComparing(UserResponseDto::getLastName);
    }

    private UserEty checkUserCredentials(String email, String password) {
        UserEty existingUser = userRepository.findUserEtyByEmail(email)
                .orElseThrow(() -> new InvalidUserCredentialsException("Email or Password is incorrect!"));

        String userPassword = existingUser.getPassword();

        if (!passwordEncoder.matches(password, userPassword)) {
            throw new InvalidUserCredentialsException("Email or Password is incorrect!");
        }

        return existingUser;
    }

    private void saveToken(SignedJWT token, UserEty user) throws ParseException {
        var generatedToken = new TokenEty();
        generatedToken.setUser(user);
        generatedToken.setCreatedTime(token.getJWTClaimsSet().getNotBeforeTime().toInstant());
        generatedToken.setExpirationTime(token.getJWTClaimsSet().getExpirationTime().toInstant());
        tokenRepository.save(generatedToken);
    }
}
