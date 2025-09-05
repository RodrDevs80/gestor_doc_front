import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Package, X } from "lucide-react";
import Loader from "../../components/Loader";
import "../../css/parallax-modal.css";
import api from "../../services/api";

const CreateProductModal = ({ isOpen, onClose, onProductCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    console.log("Datos del producto:", data);
    setIsLoading(true);
    
    // Timeout de 2 segundos
    setTimeout(async () => {
      try {
        const response = await api.post("/productos", data);
        console.log(response.data,'response.data');
        if(response.success && response.status === 201){
          setError(null);
          reset();
          setIsLoading(false);
          // Notificar al componente padre que se creó el producto
          if (onProductCreated) {
            onProductCreated();
          } else {
            onClose();
          }
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  if (isLoading) return <Loader />;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* Backdrop con efecto blur y parallax */}
      <div 
        className="parallax-backdrop"
        onClick={handleCancel}
      />
      
      <div className="modal-container bg-pink-50 p-6 rounded-lg shadow-2xl w-full max-w-md border border-pink-200/50">
        {/* Botón de cerrar */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-pink-900 mb-4 flex items-center">
          <Package className="mr-2" size={24} />
          Crear Nuevo Producto
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre del producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Ej: Producto Elegante"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "No puede superar los 50 caracteres",
                },
              })}
            />
            {errors.nombre && (
              <p className="text-pink-600 font-semibold text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              placeholder="Describe las características principales del producto..."
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 10,
                  message: "Debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message: "No puede superar los 500 caracteres",
                },
              })}
            />
            {errors.descripcion && (
              <p className="text-pink-600 font-semibold text-sm mt-1">
                {errors.descripcion.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Disponible
            </label>
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="100"
              {...register("stock", {
                required: "El stock es obligatorio",
                min: {
                  value: 0,
                  message: "El stock no puede ser negativo",
                },
                max: {
                  value: 99999,
                  message: "El stock no puede superar 99,999 unidades",
                },
              })}
            />
            {errors.stock && (
              <p className="text-pink-600 font-semibold text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="49.99"
              {...register("precio", {
                required: "El precio es obligatorio",
                min: {
                  value: 0.01,
                  message: "El precio debe ser mayor a $0.00",
                },
                max: {
                  value: 999999.99,
                  message: "El precio no puede superar $999,999.99",
                },
              })}
            />
            {errors.precio && (
              <p className="text-pink-600 font-semibold text-sm mt-1">
                {errors.precio.message}
              </p>
            )}
          </div>

          {/* URL de Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL de Imagen
            </label>
            <input
              type="url"
              className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="https://ejemplo.com/imagen.jpg"
              {...register("imagenUrl", {
                required: "La URL de imagen es obligatoria",
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                  message:
                    "Debe ser una URL válida de imagen (jpg, jpeg, png, webp, gif)",
                },
              })}
            />
            {errors.imagenUrl && (
              <p className="text-pink-600 font-semibold text-sm mt-1">
                {errors.imagenUrl.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 font-bold rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 bg-pink-400 font-bold cursor-pointer text-white py-2 rounded-md hover:bg-pink-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
