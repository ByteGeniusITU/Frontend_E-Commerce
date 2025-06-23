package com.bytegenius.server.serviceImpl;

import com.bytegenius.server.model.Videojuego;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bytegenius.server.repository.VideojuegoRepository;
import com.bytegenius.server.service.VideojuegoService;

import java.util.List;

@Service
public class VideojuegoServiceImpl implements VideojuegoService {

    @Autowired
    private VideojuegoRepository vjrepo;

    @Override
    public List<Videojuego> getVjs() {
        return vjrepo.findAll();
    }
}
