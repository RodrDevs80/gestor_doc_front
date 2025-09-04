import axios from "axios";
// "http://localhost:3000/api/v1"
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

api.interceptors.request.use(
  (config) => {
    console.log(config)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response con switch
api.interceptors.response.use(
  (response) => {
    // Si es exitoso, retornamos estructura uniforme
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: null,
    };
  },
  (error) => {
    const unifiedResponse = {
      success: false,
      status: null,
      message: "",
      data: null,
    };

    if (error.response) {
      // Si hubo respuesta del servidor
      const status = error.response.status;
      unifiedResponse.status = status;
      unifiedResponse.data = error.response.data || null;

      switch (status) {
        case 400:
          unifiedResponse.message =
            error.response.data?.message || "Solicitud inválida (400).";
          break;
        case 401:
          unifiedResponse.message =
            error.response.data?.message || "No autorizado (401).";
          break;
        case 403:
          unifiedResponse.message =
            error.response.data?.message || "Prohibido (403).";
          break;
        case 404:
          unifiedResponse.message =
            error.response.data?.message || "No encontrado (404).";
          break;
        case 422:
          // Por ejemplo errores de validación
          unifiedResponse.message =
            error.response.data?.message || "Error de validación (422).";
          break;
        case 500:
          unifiedResponse.message =
            "Error interno del servidor (500). Intente más tarde.";
          break;
        default:
          unifiedResponse.message =
            error.response.data?.message || `Error desconocido (${status}).`;
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      unifiedResponse.message = "No se pudo conectar con el servidor.";
    } else {
      // Error inesperado
      unifiedResponse.message = error.message;
    }

    return Promise.resolve(unifiedResponse); // siempre devolvemos estructura uniforme
  }
);

export default api;
