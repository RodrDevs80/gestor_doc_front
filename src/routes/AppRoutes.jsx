import { Route,Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LoginForm from "../Pages/LoginPage.jsx";
import AdminPage from "../Pages/Admin/AdminPage.jsx";
import CreateProductModal from "../Pages/Admin/CreateProductModal.jsx";
import ProductManagementModal from "../Pages/Admin/ProductManagementModal.jsx";
import FileUploadModal from "../Pages/Admin/FileUploadModal.jsx";
import MainLayouts from "../Pages/Layouts/MainLayouts.jsx";

const AppRoutes = () => {
    return (
    <>
    <Routes>
        <Route element={<MainLayouts/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        {/* aca falta la de detalle de productos */}
        </Route>
        
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/create-product" element={<CreateProductModal/>}/>
        <Route path="/product-management" element={<ProductManagementModal/>}/>
        <Route path="/file-upload" element={<FileUploadModal/>}/>
    </Routes>
    </>
    )
}

export default AppRoutes