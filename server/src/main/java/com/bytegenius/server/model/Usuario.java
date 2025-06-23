package com.bytegenius.server.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;

    @Column(unique = true, nullable = false)
    private String auth0id;

    @OneToMany(mappedBy = "user")
    private List<Servicio> servicios = new ArrayList<>();

    public Usuario() {
    }

    public Usuario(long idUser, String auth0id, List<Servicio> servicios) {
        this.idUser = idUser;
        this.auth0id = auth0id;
        this.servicios = servicios;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public String getAuth0id() {
        return auth0id;
    }

    public void setAuth0id(String auth0id) {
        this.auth0id = auth0id;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }

    public void addServicios(Servicio servicio) {
        this.servicios.add(servicio);
    }

    public void removeServicios(Servicio servicio) {
        this.servicios.remove(servicio);
    }
}
