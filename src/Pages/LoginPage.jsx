import { useForm } from "react-hook-form";
import logo from '../assets/logoRayo.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// no olividar cambiar a por Link
const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [errorLogin, setErrorLogin] = useState("");

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        if (data.email === admin.email && data.password === admin.password) {
            setIsAdmin(true);
            setErrorLogin("");
            navigate("/admin");
        } else {
            setIsAdmin(false);
            setErrorLogin("Credenciales incorrectas");
        }
    };

    const admin = {
        email: 'admin@gmail.com',
        password: 'admin1234'
    }





    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-xl w-full max-w-md">
                {/* Logo */}

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img
                            src={logo}
                            alt="relampago"
                            className="w-16 h-16 object-contain drop-shadow-lg"
                        />

                    </div>
                </div>

                {/* Títulos */}
                <h2 className="text-center text-2xl font-bold text-pink-900 mb-5">
                    Inicio de sesión
                </h2>


                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            maxLength={100}
                            placeholder="Email address"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 
                ${errors.email
                                    ? "border-pink-400"
                                    : "border-pink-300 focus:border-pink-400"
                                }`}
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email inválido",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Máximo de 100 caracteres",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-pink-600 font-semibold text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            maxLength={30}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 
                ${errors.password
                                    ? "border-pink-400"
                                    : "border-pink-300 focus:border-pink-400"
                                }`}
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Máximo 30 caracteres",
                                }

                            })}
                        />
                        {errors.password && (
                            <p className="text-pink-600 font-semibold text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Opciones */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-pink-800">
                            <input type="checkbox" {...register("remember")} />
                            Recuerdame
                        </label>
                        <a href="#" className="text-pink-500 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-pink-400 font-bold cursor-pointer text-white py-2 rounded-md 
                    }hover:bg-pink-500 hover:shadow-lg transition">
                        ingresar
                    </button>
                    {/* Mensaje de error */}
                    {errorLogin && (
                        <p className="mt-3 text-center text-red-600 font-semibold">
                            {errorLogin}
                        </p>
                    )}
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-pink-700">
                    ¿Aún no tienes cuenta?
                    <a href="#" className="text-pink-500 hover:underline">
                        Regístrate
                    </a>
                </p>
                {/* Mensaje de admin logueado */}
                {isAdmin && (
                    <p className="mt-4 text-center text-green-600 font-semibold">
                        Has iniciado sesión como Administrador
                    </p>
                )}
            </div>
        </div>
    );
}
export default LoginForm;