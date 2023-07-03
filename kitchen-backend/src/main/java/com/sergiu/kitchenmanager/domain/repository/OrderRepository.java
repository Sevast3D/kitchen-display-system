package com.sergiu.kitchenmanager.domain.repository;

import com.sergiu.kitchenmanager.domain.entities.OrderItemEty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderItemEty, Integer> {

}
