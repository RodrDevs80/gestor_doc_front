import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import React from 'react'

const MainLayouts = () => {
    return (
        <>
            <Navbar />
            {/* por si hay poco contenido evita que el footer se suba */}
            <main className="min-h-[calc(100vh-120px)]"> 
            <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default MainLayouts;