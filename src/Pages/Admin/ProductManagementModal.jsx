// Import statements and other components may exist above this line
import React from "react";
import { useState } from "react";

const handleChange = (e, setState) => {
    setState(e.target.value);
};
const ProductManagementModal = ({
	isOpen=true,
	onClose,
	product = {
		id: "PROD-12345",
		price: 99.99,
		stock: 150,
		description: "Este es un producto de ejemplo con una descripción básica.",
		files: [
			{ name: "documento_tecnico.pdf" },
			{ name: "imagen_producto.jpg" },
		],
	},
	onSave,
}) => {
    const [id, setId] = useState(product.id)
    const [price, setPrice] = useState(product.price)
    const [stock, setStock] = useState(product.stock)
    const [description, setDescription] = useState(product.description)
    const [files, setFiles] = useState(product.files)

	if (!isOpen) return null;


	return (
		<div className="inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="w-full max-w-lg p-8 space-y-6 bg-[var(--secondary-color)] rounded-2xl shadow-2xl">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-[var(--text-primary)]">Gestionar Archivos de Producto</h2>
					<button
						className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] cursor-pointer"
						onClick={onClose}
						aria-label="Cerrar"
						type="button"
					>
						<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
						</svg>
					</button>
				</div>
				<form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave && onSave(); }}>
					<div>
						<label className="block text-sm font-medium text-[var(--text-secondary)]" htmlFor="product-id">ID de Producto</label>
						<input
							className="mt-1 relative block w-full px-3 py-3 text-base bg-white border border-[var(--primary-color)] rounded-md placeholder-[var(--text-secondary)] appearance-none text-[var(--text-primary)] focus:z-10 focus:border-[var(--accent-color)] focus:outline-none focus:ring-[var(--accent-color)] sm:text-sm"
							id="product-id"
							name="product-id"
							type="text"
							value={id}
							onChange={e => handleChange(e, setId)}
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
						<label className="block text-sm font-medium text-[var(--text-secondary)]">Archivos del Producto</label>
						<div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--primary-color)] border-dashed rounded-md">
							<div className="space-y-1 text-center">
								<svg aria-hidden="true" className="mx-auto h-12 w-12 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 48 48">
									<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
								</svg>
								<div className="flex text-sm text-gray-600">
									<label className="relative cursor-pointer bg-[var(--secondary-color)] rounded-md font-medium text-[var(--primary-color)] hover:text-[var(--accent-color)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--accent-color)]" htmlFor="file-upload">
										<span>Sube un archivo</span>
										<input className="sr-only" id="file-upload" name="file-upload" type="file" multiple/>
									</label>
									<p className="pl-1 text-[var(--text-secondary)]">o arrastra y suelta</p>
								</div>
								<p className="text-xs text-[var(--text-secondary)]">PNG, JPG, GIF hasta 10MB</p>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<p className="text-sm font-medium text-[var(--text-secondary)]">Archivos Cargados:</p>
						<ul className="border border-[var(--primary-color)] rounded-md divide-y divide-[var(--primary-color)]">
							{product.files.map((file, idx) => (
								<li key={file.name} className="p-3 flex items-center justify-between text-sm">
									<div className="flex items-center">
										<svg className="h-5 w-5 text-[var(--accent-color)] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
										</svg>
										<span className="text-[var(--text-primary)]">{file.name}</span>
									</div>
									<button className="text-red-400 hover:text-red-600" type="button" aria-label="Eliminar archivo">
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
										</svg>
									</button>
								</li>
							))}
						</ul>
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
