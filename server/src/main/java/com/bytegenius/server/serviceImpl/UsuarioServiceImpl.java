package com.bytegenius.server.serviceImpl;

import com.bytegenius.server.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bytegenius.server.repository.UsuarioRepository;
import com.bytegenius.server.service.UsuarioService;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository userRepo;

    @Override
    public List<Usuario> getUsuarios() {
        return userRepo.findAll();
    }
}
