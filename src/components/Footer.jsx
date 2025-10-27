import React from "react";

const Footer = () => {
    return (
        
        <footer className="bg-light text-center text-lg-start mt-3">
            <hr/>
            <div className="text-center p-1">
                © {new Date().getFullYear()} Plataforma Retos  |  Todos los derechos reservados.
            </div>
            <hr/>
        </footer>
    );
};

export default Footer;