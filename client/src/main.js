import { useNavigate } from "react-router";
import Navbar from "./maincomponentes/Navbar";
import Box from "./maincomponentes/Box";
import bloqueComando from "./assets/Bloque_de_comandos_condicional_de_impulso.gif";
import ReadStone from "./assets/redstone.png";

const Main = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#23272b", color: "#fff" }}>
            <Navbar />
            <h1 className="text-center">
                Bienvenido a la página principal
            </h1>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", fontWeight: "bold" }}>
                            Juega con tus amigos
                        </h1>
                        <p>
                            Brindamos un servicio sin lag, rápido y con muchas opciones para jugar con tus amigos.
                        </p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img 
                            src="https://pngimg.com/uploads/minecraft/minecraft_PNG66.png" 
                            alt="Minecraft Hosting" 
                            className="img-fluid"
                            style={{ maxHeight: "300px" }}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <Box className="mb-4">
                    <button onClick={() => { navigate("/plans") }} style={{all: "unset", cursor: "pointer", width: "100%"}}>
                    <h2>MINECRAFT</h2>
                    <img 
                        src={bloqueComando}
                        alt="Bloque de comandos"
                        style={{ width: "90px", height: "90px", margin: "16px auto", display: "block" }}
                    />
                    <p>
                        El servidor de supervivencia que necesitas para jugar con tus amigos.
                    </p>
                    </button>
                </Box>
            </div>
            <div style={{ margin: "100px" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img
                        src={ReadStone}
                        alt="ReadStone"
                        style={{ width: "90px", height: "90px", margin: "16px auto", display: "block" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>Acerca de Nosotros</h2>
                        <p>
                            Somos un equipo apasionado por Minecraft, ofreciendo servidores de alta calidad y una experiencia de juego excepcional. Nuestro objetivo es proporcionar un entorno divertido y seguro para todos los jugadores.
                        </p>
                    </div>
                </div>
            </div>    
        </div>
    );
}
export default Main;