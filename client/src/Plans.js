import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Plans.css';
import axios from 'axios';
import {BACKEND_HOSTING_URL, BACKEND_ECOMMERCE_URL} from './Services/constants.js';

const Plans = () => {
    const navigate = useNavigate();
    const summaryRef = useRef(null);

    // Estados para almacenar las selecciones y precios
    const [selectedRamPlan, setSelectedRamPlan] = useState('');
    const [selectedRamPrice, setSelectedRamPrice] = useState(0);
    const [selectedCpuPlan, setSelectedCpuPlan] = useState('');
    const [selectedCpuPrice, setSelectedCpuPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('$');
    const [selectedBilling, setSelectedBilling] = useState('monthly');

    // Estados para almacenar las opciones de RAM y CPU desde los endpoints
    const [ramOptions, setRamOptions] = useState([]);
    const [cpuOptions, setCpuOptions] = useState([]);
    const [loadingRam, setLoadingRam] = useState(true);
    const [loadingCpu, setLoadingCpu] = useState(true);

    const [serverName, setServerName] = useState('');

    // Obtener las opciones de RAM del endpoint
    useEffect(() => {
        const fetchRamOptions = async () => {
            try {
                setLoadingRam(true);
                const response = await fetch(`${BACKEND_ECOMMERCE_URL}/ram-options`);
                const data = await response.json();

                if (data && data.resources && Array.isArray(data.resources)) {
                    const ramValues = data.resources.filter(value => value >= 2);
                    setRamOptions(ramValues);

                    if (ramValues.length > 0) {
                        const defaultRamIndex = ramValues.findIndex(val => val >= 6) !== -1
                            ? ramValues.findIndex(val => val >= 6) 
                            : Math.floor(ramValues.length / 2);
                        const defaultRamValue = ramValues[defaultRamIndex];
                        setSelectedRamPlan(`plan-${defaultRamValue}gb`);
                        setSelectedRamPrice(calculateRamPrice(defaultRamValue));
                    }
                }
            } catch (error) {
                console.error('Error fetching RAM options:', error);
                // Opciones por si no funciona la API
                setRamOptions([2, 4, 6, 8]);
                setSelectedRamPlan('plan-6gb');
                setSelectedRamPrice(16.87);
            } finally {
                setLoadingRam(false);
            }
        };

        fetchRamOptions();
    }, []);

    // Obtener las opciones de CPU del endpoint
    useEffect(() => {
        const fetchCpuOptions = async () => {
            try {
                setLoadingCpu(true);
                const response = await fetch(`${BACKEND_ECOMMERCE_URL}/cpu-options`);
                const data = await response.json();

                if (data && data.resources && Array.isArray(data.resources)) {
                    const cpuValues = data.resources.filter(value => value >= 1);
                    setCpuOptions(cpuValues);

                    if (cpuValues.length > 0) {
                        const defaultCpuIndex = cpuValues.findIndex(val => val >= 2) !== -1
                            ? cpuValues.findIndex(val => val >= 2) 
                            : Math.floor(cpuValues.length / 2);
                        const defaultCpuValue = cpuValues[defaultCpuIndex];
                        setSelectedCpuPlan(`cpu-${defaultCpuValue}`);
                        setSelectedCpuPrice(calculateCpuPrice(defaultCpuValue));
                    }
                }
            } catch (error) {
                console.error('Error fetching CPU options:', error);
                // Opciones por si no funciona la API
                setCpuOptions([1, 2, 4, 8]);
                setSelectedCpuPlan('cpu-2');
                setSelectedCpuPrice(10.00);
            } finally {
                setLoadingCpu(false);
            }
        };

        fetchCpuOptions();
    }, []);

    // Ayuda para calcular precio por RAM
    const calculateRamPrice = (gb) => {
        switch(gb) {
            case 2: return 5.99;
            case 4: return 11.24;
            case 6: return 16.87;
            case 8: return 20.99;
            default: return gb * 2.5;
        }
    };

    const handleInput = (e) => {
        setServerName(s => e.target.value) 
    }

    const handleRequest = (e) => {
        if(!serverName) return alert("Debe de ingresar un nombre del servidor")

        let cpu = selectedCpuPlan.split("-")[1]
        let ram = selectedRamPlan.split("-")[1].substring(0,1)

        axios.post(`${BACKEND_HOSTING_URL}/server`, {
            id: serverName,
            cpu: Number(cpu),
            ram: Number(ram)
        }).then(response => {
            console.log(response.data)
            navigate(`/panel/${serverName}`)
        }).catch(error => {
            console.log(error)
            alert("Ocurrió un error al crear el servidor")
        })
    }

    // Ayuda para calcular precio por CPU
    const calculateCpuPrice = (cores) => {
        switch(cores) {
            case 1: return 5.00;
            case 2: return 10.00;
            case 4: return 18.00;
            case 8: return 32.00;
            default: return cores * 4.5;
        }
    };

    // Actualizar precio total cuando cambian los precios de RAM o CPU
    useEffect(() => {
        setTotalPrice(selectedRamPrice + selectedCpuPrice);
    }, [selectedRamPrice, selectedCpuPrice]);

    // Manejador para selección de plan RAM
    const handleRamPlanSelect = (planId) => {
        setSelectedRamPlan(planId);

        // Obtiene la opcion de RAM seleccionada
        const gbValue = parseInt(planId.replace('plan-', '').replace('gb', ''), 10);

        // Calcula y muestra el precio basado en la RAM
        const price = calculateRamPrice(gbValue);
        setSelectedRamPrice(price);
    };

    // Manejador para selección de núcleos CPU
    const handleCpuSelect = (cpuId) => {
        setSelectedCpuPlan(cpuId);

        // Obtiene la opcion de CPU seleccionada
        const coresValue = parseInt(cpuId.replace('cpu-', ''), 10);

        // Calcula y muestra el precio basado en la CPU
        const price = calculateCpuPrice(coresValue);
        setSelectedCpuPrice(price);
    };

    // Función para desplazarse a la sección de resumen
    const scrollToSummary = () => {
        summaryRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container py-5">
            <div className="plan-header">
                <h1 className="mb-3">PLANES DISPONIBLES</h1>
            </div>

            {loadingRam ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Cargando opciones de RAM...</p>
                </div>
            ) : (
                <div className="row g-4">
                    {ramOptions.map((ramValue) => {
                        const planId = `plan-${ramValue}gb`;
                        const isSelected = selectedRamPlan === planId;
                        const price = calculateRamPrice(ramValue);
                        const recurringPrice = (price * 1.33).toFixed(2);

                        // Determina la descripcion basado en el tamño de RAM
                        let description = "";
                        if (ramValue <= 2) {
                            description = "Servidores básicos & algunos modpacks. Mínimo para Minecraft: Java Edition";
                        } else if (ramValue <= 4) {
                            description = "Servidores básicos & muchos modpacks";
                        } else if (ramValue <= 6) {
                            description = "Servidores básicos & muchos modpacks";
                        } else {
                            description = "Servidores avanzados & todos los modpacks";
                        }

                        return (
                            <div className="col-md-6 col-lg-3" key={planId}>
                                <div 
                                    className={`plan-card ${isSelected ? 'popular' : ''}`} 
                                    id={planId}
                                    onClick={() => handleRamPlanSelect(planId)}
                                >
                                    {isSelected && ramValue >= 6 && <span className="popular-badge">popular</span>}
                                    <h2 className="ram-size" style={{color: isSelected ? 'white' : 'var(--primary)'}}>
                                        {ramValue}
                                    </h2>
                                    <div className="ram-label">GB RAM</div>
                                    <div className="plan-description">
                                        {description}
                                    </div>
                                    <div className="price-first">${price.toFixed(2)} primer mes</div>
                                    <div className="price-recurring">Precio Recurrente ${recurringPrice}</div>
                                    <button 
                                        className="btn btn-success btn-buy"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRamPlanSelect(planId);
                                            scrollToSummary();
                                        }}
                                    >Comprar Ahora</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="cpu-selector">
                <h2 className="section-title">SELECCIONA NÚCLEOS CPU</h2>
                {loadingCpu ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Cargando opciones de CPU...</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {cpuOptions.map((cpuValue) => {
                            const cpuId = `cpu-${cpuValue}`;
                            const isSelected = selectedCpuPlan === cpuId;
                            const price = calculateCpuPrice(cpuValue);

                            // Determina la descripcion dependiendo de la cantidad de nucleos
                            let description = "";
                            if (cpuValue === 1) {
                                description = "Ideal para servidores pequeños con pocos jugadores";
                            } else if (cpuValue === 2) {
                                description = "Recomendado para la mayoría de servidores";
                            } else if (cpuValue === 4) {
                                description = "Para servidores con muchos jugadores y plugins";
                            } else if (cpuValue >= 8) {
                                description = "Rendimiento máximo para servidores grandes";
                            } else {
                                description = "Buen rendimiento para servidores medianos";
                            }

                            return (
                                <div className="col-md-6 col-lg-3" key={cpuId}>
                                    <div 
                                        className={`cpu-card ${isSelected ? 'selected' : ''}`} 
                                        id={cpuId}
                                        onClick={() => handleCpuSelect(cpuId)}
                                    >
                                        <div className="cpu-size">{cpuValue}</div>
                                        <div className="cpu-label">{cpuValue === 1 ? 'Núcleo CPU' : 'Núcleos CPU'}</div>
                                        <div className="cpu-description mb-3">
                                            {description}
                                        </div>
                                        <div className="cpu-price">${price.toFixed(2)} / mes</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="summary-section" ref={summaryRef}>
                <h3 className="summary-title">Resumen de tu plan</h3>

                {loadingRam || loadingCpu ? (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Calculando precios...</p>
                    </div>
                ) : (
                    <>
                        <div className="summary-item">
                            <span>Memoria RAM ({selectedRamPlan ? selectedRamPlan.replace('plan-', '').replace('gb', '') : '0'} GB)</span>
                            <span>${selectedRamPrice.toFixed(2)}</span>
                        </div>

                        <div className="summary-item">
                            <span>Núcleos CPU ({selectedCpuPlan ? selectedCpuPlan.replace('cpu-', '') : '0'})</span>
                            <span>${selectedCpuPrice.toFixed(2)}</span>
                        </div>

                        <div className="summary-item">
                            <span>Nombre del Servidor</span>
                            <input id='name'type="text" placeholder="Ingrese un nombre..." onChange={handleInput} value={serverName}></input>
                        </div>

                        <div className="summary-total">
                            <span>Total Mensual:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <button 
                            className="btn btn-success btn-buy"
                            disabled={!selectedRamPlan || !selectedCpuPlan}
                            onClick={handleRequest}
                        >Contratar Ahora</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Plans;
