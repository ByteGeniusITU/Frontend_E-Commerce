package com.bytegenius.server.model;

import com.bytegenius.server.enums.PlanStatus;
import com.bytegenius.server.enums.PlanType;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "planes")
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPlan;

    @ManyToOne
    @JoinColumn(name = "id_videojuego")
    private Videojuego videojuego;

    @Basic
    @Enumerated(EnumType.STRING)
    private PlanType tipo;
    private int cantidad;
    private int precio_hora;
    @Enumerated(EnumType.STRING)
    private PlanStatus estado;

    public Plan() {
    }

    public Plan(long idPlan, Videojuego videojuego, PlanType tipo, int cantidad, int precio_hora, PlanStatus estado) {
        this.idPlan = idPlan;
        this.videojuego = videojuego;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.precio_hora = precio_hora;
        this.estado = estado;
    }

    public long getIdPlan() {
        return idPlan;
    }

    public void setIdPlan(long idPlan) {
        this.idPlan = idPlan;
    }

    public Videojuego getVideojuego() {
        return videojuego;
    }

    public void setVideojuego(Videojuego videojuego) {
        this.videojuego = videojuego;
    }

    public PlanType getTipo() {
        return tipo;
    }

    public void setTipo(PlanType tipo) {
        this.tipo = tipo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getPrecio_hora() {
        return precio_hora;
    }

    public void setPrecio_hora(int precio_hora) {
        this.precio_hora = precio_hora;
    }

    public PlanStatus getEstado() {
        return estado;
    }

    public void setEstado(PlanStatus estado) {
        this.estado = estado;
    }
}
