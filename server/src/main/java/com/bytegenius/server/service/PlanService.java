package com.bytegenius.server.service;

import com.bytegenius.server.model.Plan;

import java.util.List;

public interface PlanService {
    List<Plan> getPlanes();
    List<Plan> getPlanesRam();
    List<Plan> getPlanesCpu();
}
