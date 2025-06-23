package com.bytegenius.server.serviceImpl;

import com.bytegenius.server.model.Servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bytegenius.server.repository.ServicioRepository;
import com.bytegenius.server.service.ServicioService;

import java.util.List;

@Service
public class ServicioServiceImpl implements ServicioService {
    @Autowired
    private ServicioRepository servicerepo;

    @Override
    public List<Servicio> getServicios() {
        return servicerepo.findAll();
    }
}
