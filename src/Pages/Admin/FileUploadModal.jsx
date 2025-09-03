import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import Loader from "../../components/Loader";


const FileUploadModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const onSubmit = async(data) => {
        console.log("Formulario válido:", data);
        setIsLoading(true)
        //  tengo que cambiar lo siguiente por el axios
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false); 
        reset();
        setUploadedFiles([]);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    if (isLoading) return <Loader />;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-pink-50 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-pink-900 mb-4">
                    Gestionar Archivos de Producto
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* ID Producto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            ID de Producto
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="PROD-12345"
                            {...register("productId", { required: "El ID es obligatorio" })}
                        />
                        {errors.productId && (
                            <p className="text-pink-600 font-semibold text-sm mt-1">
                                {errors.productId.message}
                            </p>
                        )}
                    </div>

                    {/* Nombre descriptivo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre descriptivo
                        </label>
                        <input
                            type="text"
                            maxLength={30}
                            minLength={3}
                            className="mt-1 w-full rounded-md border border-pink-300 p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Ej: Manual de Usuario"
                            {...register("fileName", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Debe tener al menos 3 caracteres",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "No puede superar los 30 caracteres",
                                },
                            })}
                        />
                        {errors.fileName && (
                            <p className="text-pink-600 font-semibold text-sm mt-1">
                                {errors.fileName.message}
                            </p>
                        )}
                    </div>

                    {/* Subida de archivos con Drag & Drop */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center transition ${
                            isDragging ? "border-pink-500 bg-pink-100" : "border-pink-300"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <Upload className="mx-auto mb-2 text-pink-400" size={32} />
                        <p className="text-sm text-gray-600">
                            Sube archivos o arrástralos aquí
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOCX, XLSX, PNG, JPG (máx. 10MB)</p>
                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            multiple
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="mt-2 inline-block cursor-pointer rounded-md bg-pink-200 px-3 py-1 text-sm text-gray-700 hover:bg-pink-300"
                        >
                            Seleccionar archivos
                        </label>
                    </div>

                    {/* Archivos cargados */}
                    {uploadedFiles.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Archivos Cargados:
                            </p>
                            <ul className="space-y-2">
                                {uploadedFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between border rounded-md px-3 py-2 bg-white"
                                    >
                                        <span className="text-sm text-gray-700">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 font-bold rounded-md border border-gray-300 text-gray-800 hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 bg-pink-400 font-bold cursor-pointer text-white py-2 rounded-md hover:bg-pink-500 hover:shadow-lg transition"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default FileUploadModal;
