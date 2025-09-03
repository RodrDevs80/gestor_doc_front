import React from 'react'
//import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const Home = () => {
  
/*   const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/productos");
        console.log(response)
        setProductos(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Error al cargar los productos");
        setLoading(false);
        console.error("Error al cargar los productos:", err);
      }
    };

    fetchProductos();
  }, []);
  function navergarDetalle(id){
    navigate(`/productos/${id}`)
  } */
  const productos = [
  {
    id: 1,
    nombre: "Producto Elegante",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$49.99",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCouO4UxB4WkcV160wLrKNUX199Wm0nwYttLpAluRYQo8ZyRri3TRwS0Sl_ixuq8St2V_H0HSGIdHg6Ce7alSsZ0ox7XtcMk6zIrqz4m_i6qaC_I-YnSDHobP8ihpWWj1OeemntbEA2MPs0Hsy7-VNzEjy57zEy0_DgGu3JpcGyD7x7OjTDuwypvhdN_Bd4lEfVVzSo4UCxxOK73XHjluIXbHOrTz60XUYH6V91EQxQQdDvEaopLiRJOcpeFruDAigMsgDOiRLXM4",
    tag: "NUEVO",
    tagColor: "bg-primary",
  },
  {
    id: 2,
    nombre: "Artículo de Lujo",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$129.00",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnUWsdsa_IgP9j8gsOribFqaO5X7RqozMOlkZqHYhKeL1vRPuMdC-PtVZvENT1qJM7F42NgssJ8uJoxLJEIRF_V_mEwEWaqau9GA7XZkPMtfiCQ6eO_64_2k_T4VjSmkgYDtmpZMc3Rf6X968mB9jqdQsgK8wFWjk1o9uJgJJZJ6Yw7aJtrXyD8nCD5DQrwIrUIYqRSKyLN77QkmvJy6yvAzd07fspKC2AGf2Z1cPBx4w21-ssVZkEvBoS0IYT06b7gpUtLwNh2vWF",
  },
  {
    id: 3,
    nombre: "Clásico Moderno",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$75.50",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0mB6E8kHpawjLt_660E2BZCTENHHpoIWn81mmy-lpzxo1QNHM2-xKq5VpEUSsQNpB_szvSgW_cLLc6Ue5o65ZvOtzWBp03lfotAxYuH8tN_DPaFYI9sB5IAjJea0L8oPWvGx1l6ULREZKdE9H7UusFYo7O3f4-mVxLFPDmV2diR7MrBK44XFrCCkGWZ823CMoO3ummoR2aBgO0ROlEs4lNIcstQQ39qtmXU0XDDsNJARBErvZDMFUX7Ch_EEzsK2Cc-j-83P-1TH",
    tag: "OFERTA",
    tagColor: "bg-gray-800",
  },
  {
    id: 4,
    nombre: "Diseño Premium",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$99.99",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOu0pDthwjUzuD79dqJ-uyPmygzJQFMt7FlJ_ziVg9210T_6sldqD8hArk8pUAIHy7Np11JuJk6eB2USmrh8imGGf-a663CBi1L2xpId6DhsMZcRCcrNh7sxhS7lGtT0hKSkeNl5nb7ryhvKyfxOYpqtHIJgIXZ7Tmu25HIY6N83vG-y5e2Q8ewhqkML_nkmDeJR939C020Swa2-MJkN0dd_xbPkP3G3kggkVFgzY_wR1JIglgWqE7y8oXVHZ1hZt3VARfIX6bjWf3",
  },
  {
    id: 5,
    nombre: "Estilo Urbano",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$89.99",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAv3y6CAusE_uo20dliLGmrYhkEZXYlrNd2gnxHWUq4Rt6e5hPyWTAN30yeOYuDPEDXav23uMKcWkwgdxftFeyP-B3QFoAKPc9OWygqumsM3U3wV0KAkDlhqnPTKVx4h6IBwsGDvAfNXXJkfQ_Amrz32N1Kx4h8hwYVI2rr-hpmV_UaydSnYpDamH_Vy1bxTln4kj4TaAhC7UPTAQSML7_LdwuL6jou7tOF7iYQgLR7hzHmc1eqtHGDk90cTo2IPo3P_vi9jPTMwqil",
  },
  {
    id: 6,
    nombre: "Velocidad y Confort",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$150.00",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_Rm3k-P7QjgmEIwlrVV6PcvgYRFCubbu-hEESsQoxcsySIyH6rddo3DP6j_nkzzZ-V5pEOeOEzY4-PuN328c51imMDNpjfZhucBsOOiAtG-PKEOBOeF0Kz6UtFzr9gf6Usk9EZvttrQ0A5c_6WXqPRrhl3FGy841fFALRtG3WmdSk2J6noxq3fvAOSpIWHX2bWMeuqsT9hirVG0Uc07DxzgNIY5nsoOKEJNX9PCTrEKNMHbMjbtLOmECImUvO8wwGpAVlZJHrTh2L",
  },
  {
    id: 7,
    nombre: "Toque de Color",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$65.00",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtsl3MKAUVkFlCa8e2Ec4u0ZZ7Xo1C7TwwLJ0eKGcZKpm7qXi2xuPcZ0AwHUleeS9HvVo6adxNKAMGCaziFuCditKkZxmtHYIoEhF0_M2cj1iLIEkYLWkFvgDYphxtpPrcSg8CYVC9UQtQO-MA9ad0pL250fKmXvoEAnQ8XX9WMWtKiW_GgtmGS7Jxn-Kg9xb1I83urjxTbPuQyGriBFdFWy1KzBRcyZiCUKZdqjMoJYRHO8ZrQMxsq1-IrScGkiGhO6U02b2UfpIw",
  },
  {
    id: 8,
    nombre: "Esencial Diario",
    descripcion: "Una breve y atractiva descripción de este maravilloso producto.",
    precio: "$110.00",
    imagenUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeuImRGA1-NZDVm7pUeSCkU1MMqf76ndd8E_sFP1Bw-CQl-buc0wlSDNwuj7wGYrqZLez66W4Rso9LfDcixt6eAzLOP3XhqHEWOVmNLCdudIiTBSDYJtnC2y_GBGHXMyeIa2m0FpRwXVxOC3IAK8BHqnCdaqXGNAL-0mxioDatx-5RclIF8NOcSlZmTyHpCJkKMW-edk0mv30j0hYDsRDYo4l3oUmeXwOE80hliSPF2NGFt-aBIp0X2lvyEKxdKRoTNLRfKuMXWbw3",
  },
];


  return (
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
  )
}

export default Home