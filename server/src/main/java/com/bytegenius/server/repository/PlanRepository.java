package com.bytegenius.server.repository;

import com.bytegenius.server.enums.PlanType;
import com.bytegenius.server.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query("SELECT p FROM Plan p WHERE p.tipo = :tipo")
    List<Plan> findAllByPlanType(@Param("tipo") PlanType tipo);
}
