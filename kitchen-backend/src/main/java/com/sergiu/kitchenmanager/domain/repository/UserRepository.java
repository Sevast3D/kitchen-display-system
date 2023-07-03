package com.sergiu.kitchenmanager.domain.repository;

import com.sergiu.kitchenmanager.domain.entities.UserEty;

import java.util.List;
import java.util.Optional;

import com.sergiu.kitchenmanager.domain.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEty, String> {

    Optional<UserEty> findUserEtyByEmail(String email);

    List<UserEty> findAllByRole(UserRole userRole);

}
