import Navbar from "../../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import React from 'react'

const MainLayouts = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MainLayouts;