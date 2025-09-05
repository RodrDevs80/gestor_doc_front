import React, { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import Loader from "../../components/Loader";
import api from "../../services/api.js";

const FileUploadModal = ({ productId, onClose, onFilesUploaded }) => {
  console.log("productId:", productId);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("archivos", file);
      });

      await api.post(`files/upload/multiple/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFiles([]);

      // Ejecutar el callback después de subir exitosamente
      if (onFilesUploaded) {
        onFilesUploaded();
      }

      if (onClose) onClose();
    } catch (error) {
      console.error("Error subiendo archivos:", error);
    } finally {
      setIsLoading(false);
    }
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
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="parallax-backdrop"></div>
      <div className="modal-container bg-pink-50 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 cursor-pointer text-xl font-bold text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-pink-900 mb-4">
          Subir archivos
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
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
            <p className="text-xs text-gray-400">
              PDF, DOCX, XLSX, PNG, JPG (máx. 10MB)
            </p>
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

          {/* Archivos cargados con preview */}
          {uploadedFiles.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Archivos seleccionados:
              </p>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border rounded-md px-3 py-2 bg-white"
                  >
                    <div className="flex items-center gap-2">
                      {/* Si es imagen, mostrar thumbnail */}
                      {file.type.startsWith("image/") && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
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
              onClick={onClose}
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
