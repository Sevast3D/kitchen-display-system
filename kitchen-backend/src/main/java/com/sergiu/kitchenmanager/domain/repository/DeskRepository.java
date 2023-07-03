package com.sergiu.kitchenmanager.domain.repository;

import com.sergiu.kitchenmanager.domain.entities.DeskEty;
import com.sergiu.kitchenmanager.domain.enums.DeskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeskRepository extends JpaRepository<DeskEty, Integer> {

    List<DeskEty> findAllByStatus(DeskStatus status);

    List<DeskEty> findAllByStatusOrStatus(DeskStatus status1, DeskStatus status2);

    List<DeskEty> findAllByPlacesGreaterThanEqual(Integer places);

}
