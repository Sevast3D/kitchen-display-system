package com.sergiu.kitchenmanager.domain.entities;

import com.sergiu.kitchenmanager.domain.enums.CookingStatus;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "desks")
@Data
public class DeskEty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "desk_id")
    private Integer id;

    @Column(name = "desk_number")
    private Integer number;

    @Column(name = "places")
    private Integer places;

    @Enumerated(EnumType.STRING)
    @Column(name = "desk_status")
    private DeskStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooking_status")
    private CookingStatus cookingStatus;

    @Column(name = "cooking_starting_time")
    private LocalDateTime cookingTime;

    @OneToMany(mappedBy = "desk", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReservationEty> reservations;

    @OneToMany(mappedBy = "desk", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEty> orderItemList;

    public void deleteAllOrderItems(){
        this.orderItemList.clear();
    }
}
