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
@Table(name = "reservations")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationEty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "desk_id", referencedColumnName = "desk_id")
    private DeskEty desk;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEty user;

    @Column(name = "reservation_places")
    private Integer places;

    @Column(name = "event_description")
    private String eventDescription;

    @Column(name = "reservation_date")
    private LocalDateTime time;
}
