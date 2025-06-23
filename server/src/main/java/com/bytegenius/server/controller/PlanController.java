package com.bytegenius.server.controller;

import com.bytegenius.server.model.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bytegenius.server.service.PlanService;

import java.util.List;

@RestController
@RequestMapping(path = "planes")
public class PlanController {
    @Autowired
    private PlanService planService;

    @GetMapping("/todos")
    public ResponseEntity<List<Plan>> getAllPlans(){
        List<Plan> plans = planService.getPlanes();
        System.out.println(plans);
        return new ResponseEntity<>(plans, HttpStatus.OK);
    } //the enum type, annotation absence, query in a bad state, serverapplication is no dettecticng a controller

    @GetMapping("/ram")
    public ResponseEntity<List<Plan>> getAllRamPlans(){
        List<Plan> plans = planService.getPlanesRam();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    @GetMapping("/cpu")
    public ResponseEntity<List<Plan>> getAllCpuPlans(){
        List<Plan> plans = planService.getPlanesCpu();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }
}
