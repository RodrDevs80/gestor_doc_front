# Sistema de Gestión de Productos y Archivos

## 📋 Descripción General

Este proyecto es una aplicación web construida con **React + Vite** que permite gestionar productos y sus archivos asociados. Incluye funcionalidades de administración, catálogo de productos, sistema de autenticación y gestión de archivos.

## 🚀 Características Principales

- **Gestión de Productos**: CRUD completo de productos
- **Sistema de Archivos**: Subida, descarga y eliminación de archivos asociados a productos
- **Autenticación**: Sistema de login para administradores
- **Interfaz Responsive**: Diseño adaptable usando Tailwind CSS
- **Modales Interactivos**: Para creación y edición de productos
- **Efectos Visuales**: Animaciones y efectos parallax

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Estilos**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **Formularios**: React Hook Form 7.62.0
- **HTTP Client**: Axios 1.11.0
- **Iconos**: Lucide React 0.542.0, Material Icons
- **Linting**: ESLint 9.33.0

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Footer.jsx      # Pie de página
│   ├── Loader.jsx      # Componente de carga
│   ├── Navbar.jsx      # Barra de navegación
│   └── ProductCard.jsx # Tarjeta de producto detallado
├── css/                # Estilos CSS
│   ├── admin.css       # Estilos específicos para admin
│   ├── index.css       # Estilos globales
│   └── parallax-modal.css # Efectos parallax para modales
├── Pages/              # Páginas principales
│   ├── Admin/          # Páginas de administración
│   │   ├── AdminPage.jsx           # Panel principal de admin
│   │   ├── CreateProductModal.jsx  # Modal crear producto
│   │   ├── FileUploadModal.jsx     # Modal subir archivos
│   │   └── ProductManagementModal.jsx # Modal editar producto
│   ├── Layouts/        # Layouts de la aplicación
│   │   └── MainLayouts.jsx # Layout principal
│   ├── Home.jsx        # Página de inicio
│   ├── LoginPage.jsx   # Página de login
│   └── ProductPage.jsx # Página de producto (vacía)
├── routes/             # Configuración de rutas
│   └── AppRoutes.jsx   # Definición de todas las rutas
├── services/           # Servicios externos
│   └── api.js          # Configuración de API axios
├── data/               # Datos estáticos
│   └── productData.js  # Datos de ejemplo para productos
├── assets/             # Recursos estáticos
│   └── logoRayo.png    # Logo de la aplicación
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## ⚙️ Configuración e Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd gestor_doc_front
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   ```

## 🔌 Configuración de la API

El proyecto espera una API RESTful en la URL configurada. El servicio `api.js` incluye:

- Interceptores de request para autenticación
- Manejo uniforme de respuestas
- Gestión de errores estructurada
- Soporte para descarga de archivos (blobs)

### Endpoints esperados por la API:

| Método | Endpoint                         | Descripción                     |
| ------ | -------------------------------- | ------------------------------- |
| GET    | `/productos/all`                 | Obtener todos los productos     |
| GET    | `/productos/{id}`                | Obtener producto específico     |
| POST   | `/productos`                     | Crear nuevo producto            |
| PUT    | `/productos/{id}`                | Actualizar producto             |
| DELETE | `/productos/{id}`                | Eliminar producto               |
| GET    | `/files/{productId}`             | Obtener archivos de un producto |
| POST   | `/files/upload/{productId}`      | Subir archivos a un producto    |
| GET    | `/files/download/{fileName}`     | Descargar archivo               |
| DELETE | `/files/{fileId}`                | Eliminar archivo                |
| GET    | `/files/imagenes-db/{productId}` | Obtener imágenes de producto    |

## 🎨 Sistema de Diseño

### Variables CSS personalizadas:

```css
:root {
  --primary-color: #e6a4b4; /* Rosa principal */
  --secondary-color: #fdf0f3; /* Rosa claro */
  --background-color: #fae7ec; /* Fondo */
  --text-primary: #6d4c5c; /* Texto oscuro */
  --text-secondary: #8e6e7e; /* Texto secundario */
  --accent-color: #d689a0; /* Color de acento */
}
```

### Componentes de UI:

- **Loader**: Animación personalizada con hamsters
- **Modales**: Con efectos parallax y animaciones
- **Tablas**: Estilizadas para administración
- **Cards**: Para display de productos

## 🔐 Autenticación

El sistema utiliza autenticación simple basada en localStorage:

- **Credenciales por defecto**:

  - Email: `admin@gmail.com`
  - Password: `admin1234`

- **Flujo de autenticación**:
  1. Login mediante formulario
  2. Almacenamiento de estado en localStorage
  3. Redirección automática al panel de admin
  4. Verificación en cada carga de página

## 📊 Funcionalidades Principales

### Panel de Administración

- Visualización de todos los productos en tabla
- Gestión de archivos por producto
- Creación, edición y eliminación de productos
- Subida múltiple de archivos con drag & drop

### Catálogo de Productos

- Vista grid de productos
- Pagina detallada de cada producto
- Descarga de archivos asociados
- Sistema de "carrito" (en desarrollo)

### Gestión de Archivos

- Soporte para múltiples formatos (PDF, DOCX, XLSX, PNG, JPG)
- Límite de 10MB por archivo
- Preview de imágenes antes de subir
- Descarga individual de archivos

## 🚦 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar ESLint
```

## 🐛 Solución de Problemas Comunes

### Problema: Los archivos subidos no se muestran inmediatamente

**Solución**: Asegurarse de que el componente `FileUploadModal` recibe y ejecuta el callback `onFilesUploaded` para actualizar el estado.

### Problema: Error de CORS con la API

**Solución**: Verificar que la API permite requests desde el origen del frontend y que la URL base está correctamente configurada.

### Problema: Las imágenes no se cargan

**Solución**: Verificar que las URLs de imágenes sean accesibles y estén en formatos soportados.

## 📝 Próximas Mejoras

- [ ] Implementar carrito de compras completo
- [ ] Sistema de búsqueda y filtrado
- [ ] Paginación de productos
- [ ] Mejorar manejo de estado global
- [ ] Implementar tests unitarios
- [ ] Sistema de roles y permisos
- [ ] Dashboard con métricas
- [ ] Notificaciones toast
- [ ] Modo oscuro

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas, contactar al equipo de desarrollo o crear un issue en el repositorio.

---

**Nota**: Esta documentación se actualiza regularmente. Asegúrate de consultar la última versión para estar al tanto de los cambios y nuevas funcionalidades.

## 📋 Ejemplos de Uso

### Ejemplo 1: Crear un nuevo producto

```jsx
// En tu componente
import CreateProductModal from "./Pages/Admin/CreateProductModal";

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductCreated = () => {
    console.log("Producto creado exitosamente");
    // Actualizar lista de productos
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Crear Producto</button>

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={handleProductCreated}
      />
    </>
  );
}
```

### Ejemplo 2: Subir archivos a un producto

```jsx
import FileUploadModal from "./Pages/Admin/FileUploadModal";

function FileUploadExample() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleFilesUploaded = () => {
    console.log("Archivos subidos exitosamente");
    // Actualizar lista de archivos
  };

  return (
    <>
      <button
        onClick={() => {
          setSelectedProductId(123); // ID del producto
          setIsUploadModalOpen(true);
        }}
      >
        Subir Archivos
      </button>

      <FileUploadModal
        productId={selectedProductId}
        onClose={() => setIsUploadModalOpen(false)}
        onFilesUploaded={handleFilesUploaded}
      />
    </>
  );
}
```

### Ejemplo 3: Consumir la API personalizada

```jsx
import api from "./services/api";

// Obtener todos los productos
const fetchProducts = async () => {
  try {
    const response = await api.get("/productos/all");

    if (response.success) {
      console.log("Productos:", response.data);
      return response.data;
    } else {
      console.error("Error:", response.message);
    }
  } catch (error) {
    console.error("Error en la petición:", error);
  }
};

// Crear un nuevo producto
const createProduct = async (productData) => {
  try {
    const response = await api.post("/productos", productData);

    if (response.success) {
      console.log("Producto creado:", response.data);
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("Error creando producto:", error);
  }
};
```

### Ejemplo 4: Personalizar el tema de colores

Para modificar la paleta de colores, edita las variables CSS en `src/css/index.css`:

```css
:root {
  --primary-color: #your-color; /* Color principal */
  --secondary-color: #your-color; /* Color secundario */
  --background-color: #your-color; /* Color de fondo */
  --text-primary: #your-color; /* Texto principal */
  --text-secondary: #your-color; /* Texto secundario */
  --accent-color: #your-color; /* Color de acento */
}
```

### Ejemplo 5: Agregar nuevas rutas

```jsx
// En src/routes/AppRoutes.jsx
import NewComponent from "../Pages/NewComponent";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas existentes */}
      <Route path="/nueva-ruta" element={<NewComponent />} />

      {/* O dentro del layout principal */}
      <Route element={<MainLayouts />}>
        <Route path="/ruta-con-layout" element={<OtherComponent />} />
      </Route>
    </Routes>
  );
};
```

### Ejemplo 6: Manejo de errores en peticiones API

```jsx
import api from "../services/api";

const handleApiRequest = async () => {
  try {
    const response = await api.get("/some-endpoint");

    if (response.success) {
      // Procesar respuesta exitosa
      console.log("Datos:", response.data);
    } else {
      // Manejar error específico de la API
      console.error("Error API:", response.message);
      alert(response.message);
    }
  } catch (error) {
    // Manejar errores de red u otros
    console.error("Error de red:", error.message);
    alert("Error de conexión");
  }
};
```

### Ejemplo 7: Personalizar el componente Loader

```jsx
import Loader from "../components/Loader";

// Con título personalizado
<Loader title="Procesando tu solicitud..." />;

// Con tiempo de carga específico
const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  setTimeout(async () => {
    try {
      await api.get("/data");
    } finally {
      setIsLoading(false);
    }
  }, 2000); // 2 segundos de loading
};
```

## 🔧 Configuración Avanzada

### Variables de Entorno Adicionales

```bash
# .env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME="Gestor de Documentos"
VITE_MAX_FILE_SIZE=10485760 # 10MB en bytes
VITE_ALLOWED_FILE_TYPES=image/*,application/pdf,.docx,.xlsx
```

### Personalización de Estilos

Los componentes utilizan clases de Tailwind CSS junto con las variables CSS personalizadas. Para modificar estilos:

1. **Global**: Editar `src/css/index.css`
2. **Componentes específicos**: Usar clases de Tailwind o CSS modules
3. **Tema**: Modificar las variables CSS en `:root`

### Extender la API Client

```jsx
// En src/services/api.js
api.interceptors.request.use((config) => {
  // Agregar headers personalizados
  config.headers["X-Custom-Header"] = "value";
  return config;
});

// Agregar métodos personalizados
api.downloadFile = async (fileName) => {
  return api.get(`/files/download/${fileName}`, {
    responseType: "blob",
  });
};
```

## 📱 Responsive Design

La aplicación está diseñada para ser responsive utilizando:

- Grid de Tailwind CSS (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Flexbox para layouts flexibles
- Breakpoints predefinidos de Tailwind (sm, md, lg, xl)

## 🎯 Buenas Prácticas Implementadas

1. **Manejo de errores**: Interceptores de API para respuestas uniformes
2. **Loading states**: Feedback visual durante operaciones asíncronas
3. **Validación de formularios**: React Hook Form con validaciones
4. **Responsive design**: Adaptable a diferentes dispositivos
5. **Componentes reutilizables**: Arquitectura modular
6. **Manejo de estado local**: useState para estado del componente
7. **Efectos visuales**: Animaciones y transiciones suaves

## 🔍 Debugging

Para debugging, se recomienda:

1. **Console logs**: Revisar la consola del navegador
2. **React DevTools**: Inspeccionar componentes y props
3. **Network tab**: Verificar peticiones HTTP
4. **LocalStorage**: Verificar estado de autenticación

```javascript
// Debugging de peticiones API
api.interceptors.request.use((config) => {
  console.log("Request:", config);
  return config;
});

api.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});
```

---

**¿Necesitas más ayuda?** Revisa los componentes de ejemplo o crea un issue en el repositorio para soporte específico.
