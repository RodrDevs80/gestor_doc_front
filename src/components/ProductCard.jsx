import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

const ProductCard = ({
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [producto, setProducto] = useState();
  const [productImages, setProductImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id,'id-producto');

  useEffect(() => {
    getProductDetail();
    getProductImages();
    getFilesbyProductId();
  }, [])
  


  const dowloadFile = async (fileName) => {
    try {
      // Configurar axios para recibir datos binarios
      const response = await api.get(`/files/download/${fileName}`, {
        responseType: 'blob' // Esto es crucial para archivos binarios
      });

      if (response.success && response.data) {
        // Crear un blob desde los datos
        const blob = new Blob([response.data], { 
          type: response.headers?.['content-type'] || 'application/octet-stream' 
        });
        
        // Crear URL temporal para el blob
        const url = window.URL.createObjectURL(blob);
        
        // Crear elemento <a> temporal para iniciar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName; // Nombre del archivo a descargar
        
        // Agregar al DOM temporalmente y hacer click
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
      } else {
        throw new Error('No se recibieron datos válidos del servidor');
      }
    } catch (error) {
      setError(`Error al descargar el archivo: ${error.message}`);
    }
  }
  const getFilesbyProductId = async () => {
    try {
      const response = await api.get(`/files/${id}`);
      if(response.success && response.status === 200){
        setFiles(response.data.archivos);
      }
    } catch (error) {
      setError(error.message);
    }
  }

 const getProductImages = async () => {
  try {
    const response = await api.get(`/files/imagenes-db/${id}`);
    if(response.success && response.status === 200){
      console.log(JSON.stringify(response.data,null,2),'response.data');
      setProductImages(response.data.images);
    }
  } catch (error) {
    setError(error.message);
  }
 }


  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/productos/${id}`);
      
      if(response.success && response.status === 200){
        setProducto(response.data.Producto); 
      } else {
        setError(response.message || 'Error al cargar el producto');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error('Error al obtener producto:', error);
    }

  }
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(producto, quantity);
    }
  };

  return (
    <>
    {isLoading && <Loader title="Cargando..."/>}
    <div className="bg-[var(--background-color)] text-[var(--text-primary)] min-h-screen">
      <style>
        {`
          :root {
            --primary-color: #E6A4B4;
            --secondary-color: #FDF0F3;
            --background-color: #FAE7EC;
            --text-primary: #6D4C5C;
            --text-secondary: #8E6E7E;
            --accent-color: #D689A0;
          }
          .main-image {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .thumbnail:hover,
          .thumbnail.active {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sección de imágenes */}
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <div className="main-image w-full max-w-md bg-white rounded-lg overflow-hidden mb-4">
                <img
                  alt="Producto Principal"
                  className="w-full h-auto object-cover"
                  src={productImages.length > 0 ? productImages[selectedImage]?.apiUrl : producto?.imagenUrl}
                />
              </div>
              {/*  ENDPOINT PARA GRUPO DE IMAGENES */}
              <div className="flex space-x-2">
                {productImages.length && productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail w-20 h-20 rounded-md overflow-hidden transition duration-200 ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                      src={image.apiUrl}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sección de información del producto */}
          <div className="flex flex-col justify-center">
            <button
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] mb-2 flex items-center"
              onClick={() => navigate("/")}
            >
              <span className="material-icons text-base mr-1">arrow_back</span>
              Volver a productos
            </button>

            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3">
              {producto?.nombre}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex">3.5</div>
              <span className="ml-2 text-sm text-[var(--text-secondary)]">
                100 reseñas
              </span>
            </div>

            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              {producto?.descripcion}
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-[var(--primary-color)]">
                ${producto?.precio}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-[var(--accent-color)] rounded-full">
                <button
                  className="p-2 text-[var(--accent-color)] hover:bg-[var(--secondary-color)] rounded-l-full"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <span className="material-icons">remove</span>
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  className="p-2 text-[var(--accent-color)] hover:bg-[var(--secondary-color)] rounded-r-full"
                  onClick={() => handleQuantityChange(1)}
                >
                  <span className="material-icons">add</span>
                </button>
              </div>

              <button
                className="flex-1 px-8 py-4 text-lg font-bold text-white bg-[var(--primary-color)] rounded-full hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 focus:ring-offset-[var(--background-color)] transition-colors flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <span className="material-icons mr-2">shopping_cart</span>
                Añadir al carrito
              </button>
            </div>

            <div className="border-t border-[var(--accent-color)]/20 pt-4">
              <div className="flex items-center text-sm text-[var(--text-secondary)]">
                <span
                  className={`material-icons text-base mr-2 ${
                    producto?.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {producto?.stock > 0 ? "check_circle" : "cancel"}
                </span>
                <span>
                  {producto?.stock > 0 ? "En stock, listo para enviar" : "Agotado"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de archivos asociados */}
        <div className="mt-12 pt-8 border-t border-[var(--accent-color)]/20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Archivos Asociados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.length && files.map((file, index) => (
              <div
                key={file.id}
                className="bg-[var(--secondary-color)] rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <span className="material-icons text-5xl text-[var(--primary-color)] mb-4">
                  {'book'}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {file.nombreOriginal}
                </h3>
                <button 
                className="mt-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--accent-color)] rounded-full hover:bg-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--secondary-color)] transition-colors"
                onClick={() => dowloadFile(file.nombre)}
                >
                  <span className="material-icons mr-2 text-base">
                    download
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
