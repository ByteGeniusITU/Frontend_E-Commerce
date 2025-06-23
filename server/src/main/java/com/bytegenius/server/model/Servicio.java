package com.bytegenius.server.model;

import com.bytegenius.server.enums.PaymentStatus;
import com.bytegenius.server.enums.ServerStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "servicios")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "Id_Usuario")
    private Usuario user;

    @ManyToOne
    @JoinColumn(name = "Id_videojuego")
    private Videojuego videojuego;

    @ManyToOne
    @JoinColumn(name = "id_Plan_CPU")
    private Plan planCpu;

    @ManyToOne
    @JoinColumn(name = "id_Plan_RAM")
    private Plan planRam;

    @Basic
    @Enumerated(EnumType.STRING)
    private PaymentStatus estadoPago;
    @Enumerated(EnumType.STRING)
    private ServerStatus estadoServidor;

    public Servicio() {
    }

    public Servicio(long id, Usuario user, Videojuego videojuego, Plan planCpu, Plan planRam, PaymentStatus estadoPago, ServerStatus estadoServidor) {
        this.id = id;
        this.user = user;
        this.videojuego = videojuego;
        this.planCpu = planCpu;
        this.planRam = planRam;
        this.estadoPago = estadoPago;
        this.estadoServidor = estadoServidor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Videojuego getVideojuego() {
        return videojuego;
    }

    public void setVideojuego(Videojuego videojuego) {
        this.videojuego = videojuego;
    }

    public Plan getPlanCpu() {
        return planCpu;
    }

    public void setPlanCpu(Plan planCpu) {
        this.planCpu = planCpu;
    }

    public Plan getPlanRam() {
        return planRam;
    }

    public void setPlanRam(Plan planRam) {
        this.planRam = planRam;
    }

    public PaymentStatus getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(PaymentStatus estadoPago) {
        this.estadoPago = estadoPago;
    }

    public ServerStatus getEstadoServidor() {
        return estadoServidor;
    }

    public void setEstadoServidor(ServerStatus estadoServidor) {
        this.estadoServidor = estadoServidor;
    }
}
