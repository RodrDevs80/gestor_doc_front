import React from 'react'
import api from '../services/api';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
  
   const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate=useNavigate()
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          try {
            const response = await api.get("/productos/all");
            setProductos(response.data);
            setLoading(false);
          } catch (err) {
            console.log(err)
            setError("Error al cargar los productos");
            setLoading(false);
            console.error("Error al cargar los productos:", err);
          }
        }, 2000);
      } catch (err) {
        console.log(err)
        setError("Error al cargar los productos");
        setLoading(false);
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProductos();
  }, []);

  // function navergarDetalle(id){
  //   navigate(`/productos/${id}`)
  // } 

  return (
    <>
    {loading && <Loader title="Cargando..."/>}
    <section className="bg-[#FAE7EC] py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((product) => (
          <div
            key={product.id}
            className="bg-[#FDF0F3] p-6 rounded-2xl shadow-md hover:shadow-lg transition hover:scale-102"
          >
            <div className="relative">
              <img
                src={product.imagenUrl}
                alt={product.nombre}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold mt-4 mb-2 text-[#6D4C5C]">
              {product.nombre}
            </h3>
            <p className="text-[#8E6E7E] text-sm">{product.descripcion}</p>
            <div className='flex justify-between'>
            <p className="text-lg font-semibold mt-3 text-[#D689A0]">
              ${product.precio}
            </p>
           <button 
           //onClick={navergarDetalle(product.id)}
           type="button" aria-label={`Añadir ${product.nombre}`} className="px-4 py-2 text-sm font-medium text-white bg-[#E6A4B4] rounded-full hover:bg-[#D689A0] focus:outline-none focus:ring-2 focus:ring-[#D689A0] focus:ring-offset-2 focus:ring-offset-[#FDF0F3] transition" >
                 VER
                </button>
              
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Home