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


        {!loading && productos.length ?
        productos.map((product) => (
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
        )): 
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
          <div className="bg-[#FDF0F3] p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#E6A4B4] to-[#D689A0] rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#6D4C5C] mb-3">
              ¡Catálogo en construcción!
            </h3>
            <p className="text-[#8E6E7E] text-lg leading-relaxed mb-6">
              Estamos preparando productos increíbles para ti. Vuelve pronto para descubrir nuestras novedades.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E6A4B4] to-[#D689A0] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Próximamente
            </div>
          </div>
        </div>}
      </div>
    </section>
    </>
  )
}

export default Home