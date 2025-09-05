import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/logoRayo.png";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const adminStatus = localStorage.getItem("isAdmin");
        setIsAdmin(adminStatus === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        setIsAdmin(false);
        navigate("/");
    };

    // Verificar si estamos en la página de admin
    const isOnAdminPage = location.pathname === '/admin';

    return (
        <nav className="w-full  bg-gray-50 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-10 h-10 object-contain"
                    />
                </div>
                <span className="font-bold text-pink-700 text-lg">Power</span>
            </Link>

            {/* Botones de sesión */}
            {isAdmin ? (
                <div className="flex gap-2 md:gap-3">
                    {!isOnAdminPage && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="bg-blue-500 text-white font-semibold px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-xl hover:bg-blue-600 transition shadow"
                        >
                            Panel de Admin
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-pink-400 text-white font-semibold px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-xl hover:bg-pink-500 transition shadow"
                    >
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <Link
                    to="/login"
                    className="bg-pink-400 text-white font-semibold px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-xl hover:bg-pink-500 transition shadow"
                >
                    Iniciar sesión
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
