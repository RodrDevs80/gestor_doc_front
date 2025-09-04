import { Route,Routes } from "react-router-dom";
import Home from "../Pages/Home";
import LoginForm from "../Pages/LoginPage.jsx";
import AdminPage from "../Pages/Admin/AdminPage.jsx";
import CreateProductModal from "../Pages/Admin/CreateProductModal.jsx";
import ProductManagementModal from "../Pages/Admin/ProductManagementModal.jsx";
import FileUploadModal from "../Pages/Admin/FileUploadModal.jsx";


const AppRoutes = () => {
    return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/create-product" element={<CreateProductModal/>}/>
        <Route path="/product-management" element={<ProductManagementModal/>}/>
        <Route path="/file-upload" element={<FileUploadModal/>}/>
    </Routes>
    </>
    )
}

export default AppRoutes