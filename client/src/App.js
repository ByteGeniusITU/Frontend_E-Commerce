//import logo from './logo.svg';
//import './App.css';
import Main from "./main";
import Panel from "./panelComponents/Panel"; 
import { BrowserRouter, Routes, Route } from "react-router";
import Plans from "./Plans"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
<<<<<<< HEAD
        <Route path="/plans" element={<Plans />}/>
=======
        <Route path="/panel/:id" element={<Panel/>} />
>>>>>>> main
      </Routes>
    </BrowserRouter>
  );
}

export default App;
