package com.sergiu.kitchenmanager.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "tokens")
@NoArgsConstructor
@Setter
@Getter
public class TokenEty {
  @Id
  @Column(name = "token_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @UuidGenerator
  private String token;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEty user;

  @Column(name = "created_time")
  private Instant createdTime;

  @Column(name = "expiration_time")
  private Instant expirationTime;
}
