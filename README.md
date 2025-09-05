# Documentación del Sistema de Gestión de Productos y Archivos

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
