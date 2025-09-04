import React, { useState } from 'react'
import '../../css/admin.css'
import CreateProductModal from './CreateProductModal'

const AdminPage = () => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false)
  const productos = [
    {
      nombre: "Producto Elegante",
      sku: "PROD-001",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKCouO4UxB4WkcV160wLrKNUX199Wm0nwYttLpAluRYQo8ZyRri3TRwS0Sl_ixuq8St2V_H0HSGIdHg6Ce7alSsZ0ox7XtcMk6zIrqz4m_i6qaC_I-YnSDHobP8ihpWWj1OeemntbEA2MPs0Hsy7-VNzEjy57zEy0_DgGu3JpcGyD7x7OjTDuwypvhdN_Bd4lEfVVzSo4UCxxOK73XHjluIXbHOrTz60XUYH6V91EQxQQdDvEaopLiRJOcpeFruDAigMsgDOiRLXM4",
      archivos: ["Manual.pdf", "Guia.pdf"]
    },
    {
      nombre: "Producto Moderno",
      sku: "PROD-002",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnUWsdsa_IgP9j8gsOribFqaO5X7RqozMOlkZqHYhKeL1vRPuMdC-PtVZvENT1qJM7F42NgssJ8uJoxLJEIRF_V_mEwEWaqau9GA7XZkPMtfiCQ6eO_64_2k_T4VjSmkgYDtmpZMc3Rf6X968mB9jqdQsgK8wFWjk1o9uJgJJZJ6Yw7aJtrXyD8nCD5DQrwIrUIYqRSKyLN77QkmvJy6yvAzd07fspKC2AGf2Z1cPBx4w21-ssVZkEvBoS0IYT06b7gpUtLwNh2vWF",
      archivos: []
    },
    {
      nombre: "Producto Clásico",
      sku: "PROD-003",
      imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe0mB6E8kHpawjLt_660E2BZCTENHHpoIWn81mmy-lpzxo1QNHM2-xKq5VpEUSsQNpB_szvSgW_cLLc6Ue5o65ZvOtzWBp03lfotAxYuH8tN_DPaFYI9sB5IAjJea0L8oPWvGx1l6ULREZKdE9H7UusFYo7O3f4-mVxLFPDmV2diR7MrBK44XFrCCkGWZ823CMoO3ummoR2aBgO0ROlEs4lNIcstQQ39qtmXU0XDDsNJARBErvZDMFUX7Ch_EEzsK2Cc-j-83P-9TH",
      archivos: ["Garantia.pdf"]
    }
  ];


  return (

    <> 
    {isCreateProductModalOpen && 
      <CreateProductModal 
      isOpen={isCreateProductModalOpen} 
      onClose={() => setIsCreateProductModalOpen(false)} 
      onCreateProduct={() => {}} />}

    <div className="container mx-auto px-4 py-8 md:py-12 bg-[var(--background-color)] text-[var(--text-primary)]">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Gestión de Archivos</h1>
          <p className="text-[var(--text-secondary)] mt-1">Administra los archivos asociados a tus productos.</p>
        </div>
        <button 
        onClick={() => setIsCreateProductModalOpen(true)}
        className="mt-4 sm:mt-0 flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[var(--primary-color)] rounded-full hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 focus:ring-offset-[var(--background-color)] transition-colors">
          <span className="material-icons mr-2">add</span> Agregar Producto
        </button>
      </header>
     
      <div className="table-container bg-[var(--secondary-color)] rounded-lg overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/60">
              <tr>
                <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">Producto</th>
                <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">SKU</th>
                <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">Archivos</th>
                <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--background-color)]">
              {productos.map((prod, i) => (
                <tr key={i} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img src={prod.imagen} alt={prod.nombre} className="h-12 w-12 rounded-md object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-[var(--text-primary)]">{prod.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">{prod.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {prod.archivos.length > 0 ? (
                      <div className="flex items-center space-x-2">
                        {prod.archivos.map((archivo, j) => (
                          <a key={j} href="#" className="flex items-center text-sm text-[var(--accent-color)] hover:text-[var(--primary-color)] transition-colors">
                            <span className="material-icons text-lg mr-1">
                              {archivo === "Garantia.pdf" ? "shield" : archivo === "Manual.pdf" ? "book" : "receipt_long"}
                            </span>
                            {archivo}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-[var(--text-secondary)] italic">Sin archivos adjuntos</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button aria-label="Adjuntar archivo" className="p-2 text-[var(--accent-color)] hover:bg-[var(--background-color)] rounded-full transition-colors">
                        <span className="material-icons">attach_file</span>
                      </button>
                      <button aria-label="Editar archivos" className="p-2 text-[var(--accent-color)] hover:bg-[var(--background-color)] rounded-full transition-colors">
                        <span className="material-icons">edit</span>
                      </button>
                      <button aria-label="Eliminar producto" className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors">
                        <span className="material-icons">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );


}

export default AdminPage