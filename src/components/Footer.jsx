import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logoRayo.png";

const Footer = () => {
    return (
        <footer className="bg-pink-50 border-t border-pink-200 py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* Logo */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow">
                        <img src={logo} alt="Power Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <span className="text-pink-700 font-bold text-lg mt-1">Power</span>
                </div>

                {/* Redes */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <h4 className="text-pink-700 font-semibold text-sm uppercase">Seguinos</h4>
                    <div className="flex items-center gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
                            <Facebook size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
                            <Instagram size={20} />
                        </a>
                        <a href="mailto:contacto@power.com" className="hover:text-pink-500 transition">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                {/* Contacto */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <h4 className="text-pink-700 font-semibold text-sm uppercase">Contacto</h4>
                    <div className="flex items-center gap-2 text-pink-700">
                        <Phone size={18} />
                        <span className="text-sm">+54 9 351 134-5678</span>
                    </div>
                    <div className="flex items-center gap-2 text-pink-700">
                        <MapPin size={18} />
                        <span className="text-sm">Gral Paz 980, Córdoba </span>
                    </div>
                    <div className="flex items-center gap-2 text-pink-700">
                        <Mail size={18} />
                        <span className="text-sm">admin@power.com</span>
                    </div>
                </div>

            </div>
            <hr className=" my-5 mx-auto border-pink-500" />
            {/* Copyright */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Todos los derechos reservados
            </div>
        </footer>
    );
};

export default Footer;
