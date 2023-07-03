package com.sergiu.kitchenmanager.domain.repository;

import com.sergiu.kitchenmanager.domain.entities.TokenEty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenEty, String> {

}
