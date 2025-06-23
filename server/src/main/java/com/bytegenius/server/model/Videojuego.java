package com.bytegenius.server.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "videojuegos")
public class Videojuego {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVj;

    @Basic
    private String nombre;


    public Videojuego() {
    }

    public Videojuego(int idVj, String nombre) {
        this.idVj = idVj;
        this.nombre = nombre;
    }

    public int getIdVj() {
        return idVj;
    }

    public void setIdVj(int idVj) {
        this.idVj = idVj;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
