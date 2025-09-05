import React, { useState } from "react";
import Loader from "../../components/Loader";
import api from "../../services/api.js";
import "../../css/parallax-modal.css";

const ProductManagementModal = ({
	isOpen=true,
	onClose,
	product,
	onSave,
}) => {
    const [id, setId] = useState(product?.id || "")
    const [name, setName] = useState(product?.nombre || product?.name || "")
    const [price, setPrice] = useState(product?.precio || product?.price || 0)
    const [stock, setStock] = useState(product?.stock || 0)
    const [description, setDescription] = useState(product?.descripcion || product?.description || "")
    const [imagenUrl, setImagenUrl] = useState(product?.imagenUrl || "")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

	// Manejo de inputs
	const handleChange = (e, setState) => {
		setState(e.target.value);
	};

	// Enviar todo el formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		// Timeout de 2 segundos
		setTimeout(async () => {
			try {
				const productData = {
					nombre: name,
					precio: parseFloat(price),
					stock: parseInt(stock),
					descripcion: description,
					imagenUrl,
				};

				console.log("Actualizando producto:", productData);
				const response = await api.put(`/productos/${product.id}`, productData);

				if (response.success) {
					console.log("Producto actualizado:", response.data);
					// Notificar al componente padre
					if (onSave) {
						onSave();
					} else {
						onClose();
					}
				} else {
					setError("Error al actualizar el producto");
				}
			} catch (error) {
				console.error("Error:", error);
				setError(error.message || "Error al actualizar el producto");
			} finally {
				setIsLoading(false);
			}
		}, 2000);
	};

	if (isLoading) return <Loader title="Actualizando producto..." />;

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="parallax-backdrop"></div>
			<div className="modal-container bg-pink-50 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
				<button onClick={onClose} className="absolute top-2 right-5 cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-800">
					X
				</button>
				<h2 className="text-2xl font-bold text-pink-900 mb-4">
					Actualizar Producto
				</h2>
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="product-name">Nombre del Producto</label>
						<input
							className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
							id="product-name"
							name="product-name"
							type="text"
							placeholder="Nombre del producto"
							value={name}
							onChange={e => handleChange(e, setName)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="product-price">Precio</label>
							<input
								className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
								id="product-price"
								name="product-price"
								type="number"
								placeholder="Precio"
								value={price}
                                onChange={e => handleChange(e, setPrice)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="product-stock">Stock</label>
							<input
								className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
								id="product-stock"
								name="product-stock"
								type="number"
								placeholder="Unidades"
								value={stock}
                                onChange={e => handleChange(e, setStock)}
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="product-description">Descripción</label>
						<textarea
							className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
							id="product-description"
							name="product-description"
							placeholder="Añada una descripción detallada del producto."
							rows={3}
							value={description}
                            onChange={e => handleChange(e, setDescription)}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="imagen-url">
							URL de Imagen
						</label>
						<input
							type="url"
							className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
							id="imagen-url"
							name="imagen-url"
							placeholder="https://ejemplo.com/imagen.jpg"
							value={imagenUrl}
							onChange={e => handleChange(e, setImagenUrl)}
						/>
					</div>
					<div className="flex justify-end space-x-4 pt-4">
						<button
							className="px-6 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--secondary-color)] border border-[var(--primary-color)] rounded-md hover:bg-[var(--background-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)]"
							type="button"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							className="px-6 py-2 text-sm font-medium text-white bg-[var(--primary-color)] border border-transparent rounded-md shadow-sm hover:bg-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)]"
							type="submit"
						>
							Guardar Cambios
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductManagementModal;
