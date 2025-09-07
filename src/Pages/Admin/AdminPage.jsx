import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/admin.css";
import CreateProductModal from "./CreateProductModal";
import FileUploadModal from "./FileUploadModal";
import api from "../../services/api";
import Loader from "../../components/Loader";
import ProductManagementModal from "../Admin/ProductManagementModal";

const AdminPage = () => {
  // para refrescar cuando subimos archivos
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [productFiles, setProductFiles] = useState({}); // Objeto que mapea productId -> archivos
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async (showMainLoading = true) => {
    try {
      if (showMainLoading) {
        setLoading(true);
      }
      const response = await api.get("/productos/all");
      console.log(response.data, "response.data");
      setProductos(response.data);
      for (let i = 0; i < response.data.length; i++) {
        getFilesbyProductId(response.data[i].id);
      }

      if (showMainLoading) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Error al cargar los productos");
      if (showMainLoading) {
        setLoading(false);
      }
      console.error("Error al cargar los productos:", err);
    }
  };

  const getFilesbyProductId = async (id) => {
    try {
      const response = await api.get(`/files/${id}`);
      console.log(`Archivos para producto ${id}:`, response.data);
      if (response.success && response.status === 200) {
        setProductFiles((prev) => ({
          ...prev,
          [id]: response.data.archivos || [],
        }));
      }
    } catch (error) {
      console.error(`Error al cargar archivos del producto ${id}:`, error);
      setProductFiles((prev) => ({
        ...prev,
        [id]: [],
      }));
    }
  };

  const dowloadFile = async (fileName) => {
    try {
      // Configurar axios para recibir datos binarios
      const response = await api.get(`/files/download/${fileName}`, {
        responseType: "blob", // Esto es crucial para archivos binarios
      });

      if (response.success && response.data) {
        // Crear un blob desde los datos
        const blob = new Blob([response.data], {
          type:
            response.headers?.["content-type"] || "application/octet-stream",
        });

        // Crear URL temporal para el blob
        const url = window.URL.createObjectURL(blob);

        // Crear elemento <a> temporal para iniciar la descarga
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Nombre del archivo a descargar

        // Agregar al DOM temporalmente y hacer click
        document.body.appendChild(link);
        link.click();

        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("No se recibieron datos válidos del servidor");
      }
    } catch (error) {
      setError(`Error al descargar el archivo: ${error.message}`);
    }
  };

  const deleteFile = async (fileId, productId) => {
    try {
      const response = await api.delete(`/files/${fileId}`);

      if (response.success) {
        console.log("Archivo eliminado exitosamente");
        // Recargar los archivos del producto específico
        await getFilesbyProductId(productId);
      } else {
        throw new Error(response.message || "Error al eliminar el archivo");
      }
    } catch (error) {
      setError(`Error al eliminar el archivo: ${error.message}`);
      console.error("Error al eliminar archivo:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsDeleting(true);

    // Timeout de 2 segundos para que el loading sea visible
    setTimeout(async () => {
      try {
        const response = await api.delete(`/productos/${id}`);

        if (response.success && response.status === 200) {
          await fetchProductos(false); // No mostrar loading principal
        } else {
          throw new Error(response.message || "Error al eliminar el producto");
        }
      } catch (error) {
        setError(`Error al eliminar el producto: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }, 2000);
  };

  return (
    <>
      {(loading || isDeleting) && (
        <Loader title={isDeleting ? "Eliminando producto..." : "Cargando..."} />
      )}
      {isCreateProductModalOpen && (
        <CreateProductModal
          isOpen={isCreateProductModalOpen}
          onClose={() => setIsCreateProductModalOpen(false)}
          onProductCreated={() => {
            fetchProductos(false); // Recargar productos sin loading principal
            setIsCreateProductModalOpen(false); // Cerrar modal
          }}
        />
      )}
      {(loading || isDeleting || loadingFiles) && (
        <Loader title="Actualizando..." />
      )}
      {fileModalOpen && (
        <FileUploadModal
          productId={selectedProductId}
          onClose={() => setFileModalOpen(false)}
          onFilesUploaded={() => {
            setLoadingFiles(true);
            setTimeout(async () => {
              await getFilesbyProductId(selectedProductId);
              setLoadingFiles(false);
            }, 1000);
          }}
        />
      )}

      {isEditProductModalOpen && (
        <ProductManagementModal
          product={selectedProduct}
          onClose={() => setIsEditProductModalOpen(false)}
          onSave={() => {
            fetchProductos(false); // Recargar productos
            setIsEditProductModalOpen(false); // Cerrar modal
          }}
        />
      )}

      <div className="container mx-auto px-4 py-8 md:py-12 bg-[var(--background-color)] text-[var(--text-primary)]">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              Gestión de Archivos
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Administra los archivos asociados a tus productos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center px-6 py-3 text-sm font-medium text-[var(--primary-color)] bg-white border border-[var(--primary-color)] rounded-full hover:bg-[var(--primary-color)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 focus:ring-offset-[var(--background-color)] transition-colors"
            >
              <span className="material-icons mr-2">home</span> Visitar Tienda
            </button>
            <button
              onClick={() => setIsCreateProductModalOpen(true)}
              className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[var(--primary-color)] rounded-full hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 focus:ring-offset-[var(--background-color)] transition-colors"
            >
              <span className="material-icons mr-2">add</span> Agregar Producto
            </button>
          </div>
        </header>

        <div className="table-container bg-[var(--secondary-color)] rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/60">
                <tr>
                  <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">
                    Producto
                  </th>
                  <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">
                    SKU
                  </th>
                  <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm">
                    Archivos
                  </th>
                  <th className="px-6 py-4 font-semibold text-[var(--text-primary)] uppercase tracking-wider text-sm text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--background-color)]">
                {productos.length &&
                  productos.map((prod, i) => (
                    <tr key={i} className="hover:bg-white/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              src={prod.imagenUrl}
                              alt={prod.nombre}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-[var(--text-primary)]">
                              {prod.nombre}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        {prod.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {productFiles[prod.id]?.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-md">
                            {productFiles[prod.id]?.map((archivo, j) => (
                              <div
                                key={j}
                                className="flex items-center justify-between text-xs bg-gray-50 rounded border p-2 hover:shadow-md transition-all min-h-8"
                              >
                                <button
                                  onClick={() => dowloadFile(archivo.nombre)}
                                  className="flex items-center text-[var(--accent-color)] hover:text-[var(--primary-color)] transition-colors flex-1 text-left min-w-0"
                                  title={`Descargar: ${
                                    archivo.nombreOriginal || archivo.nombre
                                  }`}
                                >
                                  <span className="material-icons mr-2 text-sm flex-shrink-0">
                                    download
                                  </span>
                                  <span className="truncate">
                                    {(
                                      archivo.nombreOriginal || archivo.nombre
                                    ).substring(0, 10)}
                                    ...
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    deleteFile(archivo.id, prod.id)
                                  }
                                  className="flex items-center justify-center w-7 h-7 ml-2 text-red-400 hover:text-red-600 rounded transition-colors flex-shrink-0"
                                  title={`Eliminar: ${
                                    archivo.nombreOriginal || archivo.nombre
                                  }`}
                                >
                                  <span className="material-icons text-sm">
                                    delete_outline
                                  </span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-[var(--text-secondary)] italic">
                            Sin archivos adjuntos
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            aria-label="Adjuntar archivo"
                            className="p-2 text-[var(--accent-color)] hover:bg-[var(--background-color)] rounded-full transition-colors"
                            onClick={() => {
                              setSelectedProductId(prod.id);
                              setFileModalOpen(true);
                            }}
                          >
                            <span className="material-icons">attach_file</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(prod);
                              setIsEditProductModalOpen(true);
                            }}
                            aria-label="Editar producto"
                            className="p-2 text-[var(--accent-color)] hover:bg-[var(--background-color)] rounded-full transition-colors"
                          >
                            <span className="material-icons">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            aria-label="Eliminar producto"
                            className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <span className="material-icons">
                              delete_outline
                            </span>
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
};

export default AdminPage;
