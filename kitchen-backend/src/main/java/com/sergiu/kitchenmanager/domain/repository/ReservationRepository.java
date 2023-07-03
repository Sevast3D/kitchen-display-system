package com.sergiu.kitchenmanager.domain.repository;

import com.sergiu.kitchenmanager.domain.entities.ReservationEty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEty, Integer> {

}
