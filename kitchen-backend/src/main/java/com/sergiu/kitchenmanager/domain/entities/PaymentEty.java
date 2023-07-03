package com.sergiu.kitchenmanager.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentEty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer id;

    @Column(name = "payment_date")
    private LocalDateTime date;

    @Column(name = "payment_amount")
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "desk_id", referencedColumnName = "desk_id")
    private DeskEty desk;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEty user;
}
