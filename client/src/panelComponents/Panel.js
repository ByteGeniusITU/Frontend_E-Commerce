import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Button, Badge, ProgressBar } from 'react-bootstrap';
import { iniciarServidor, detenerServidor, statusServidor } from '../Services/ServidorService';
import './panel.css';
import { useParams } from 'react-router';

function Panel() {
  const {id} = useParams();
  const [serverStatus, setServerStatus] = useState('Detenido');
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3600);
  const [cpu, setCPU] = useState(0)
  const [ram, setRAM] = useState(0)

  const intervalRef = useRef();

  useEffect(() => {
    const intervalStatus = setInterval(() => {
      statusServidor(id)
        .then(response => {
          setCPU(s => response.data.cpu)
          setRAM(s => Number(response.data.ram.toPrecision(4)))
          setServerStatus('En ejecución');
        })
    }, 5000)

    return () => clearInterval(intervalStatus);
  }, [serverStatus]);

  useEffect(() => {
    if (serverStatus === 'En ejecución') {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [serverStatus]);

const stopServer = async () => {
  setLoading(true);

  detenerServidor(id)
    .then(response => {
      console.log(response)
      setServerStatus('Detenido');
    })
    .catch(e => {
      console.error('Error al iniciar:', e);
    })
    .finally(() => setLoading(false))
};


  const startServer = async () => {
  setLoading(true);

  iniciarServidor(id)
    .then(response => {
      console.log(response)
      setServerStatus('En ejecución');
    })
    .catch(e => {
      console.error('Error al iniciar:', e);
    })
    .finally(() => setLoading(false))
};



  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="panel-wrapper mt-5">
      <div className="custom-card">
        <div className="card-body">
          <h2 className="card-title mb-4">Panel de Control del Hosting</h2>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex gap-2 justify-content-center">
              <Button
                className="btn-custom-success"
                onClick={startServer}
                disabled={serverStatus === 'En ejecución' || loading}
              >
                {loading && serverStatus !== 'Detenido' ? 'Procesando...' : 'Start'}
              </Button>
              <Button
                className="btn-custom-danger"
                onClick={stopServer}
                disabled={serverStatus === 'Detenido' || loading}
              >
                {loading && serverStatus !== 'En ejecución' ? 'Procesando...' : 'Stop'}
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              Estado del servidor:{' '}
              <Badge bg={serverStatus === 'En ejecución' ? 'success' : 'danger'}>
                {serverStatus}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              Nombre del servidor: <strong>Servidor EGI Cloud</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Tiempo restante:{' '}
              <span className="fw-bold">{formatTime(remainingTime)}</span>
              <ProgressBar
                now={(remainingTime / 3600) * 100}
                className="mt-2 custom-progress"
                variant={remainingTime > 600 ? 'success' : 'danger'}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Uso de CPU: <span className="text-muted">{cpu}%</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Uso de RAM: <span className="text-muted">{ram} MB</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Última acción: <span className="text-muted">{new Date().toLocaleString()}</span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default Panel;
