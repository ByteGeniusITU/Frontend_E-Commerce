import React from "react";
import "./Box.css"; // Asegúrate de crear este archivo

const Box = ({ children, className = "", style = {} }) => {
    return (
        <div
            className={`custom-box ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default Box;