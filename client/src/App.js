//import logo from './logo.svg';
//import './App.css';
import Main from "./main";
import { BrowserRouter, Routes, Route } from "react-router";
import Plans from "./Plans"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/plans" element={<Plans />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
